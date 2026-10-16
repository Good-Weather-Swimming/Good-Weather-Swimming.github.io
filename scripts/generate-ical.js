#!/usr/bin/env node
// Generates .ics files per location using Open-Meteo forecasts.

const fs = require('fs/promises');
const path = require('path');
const locations = require('../src/_data/locations.js');

const OUT_DIR = path.join(__dirname, '..', 'src', 'ical');

const THRESHOLDS = {
  minWaterTemp: 18,
  maxWaveHeight: 1.5,
  maxWindSpeed: 8,
  maxPrecipProb: 30,
  maxUVIndex: 8
};

async function ensureOutDir() {
  await fs.mkdir(OUT_DIR, { recursive: true });
}

function formatICalDate(date) {
  return date.replace(/-/g, '');
}

function escapeICalText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function foldICalLine(line) {
  const folded = [];
  let current = '';
  let byteLength = 0;

  for (const character of line) {
    const characterBytes = Buffer.byteLength(character, 'utf8');
    if (byteLength + characterBytes > 75) {
      folded.push(current);
      current = ` ${character}`;
      byteLength = 1 + characterBytes;
    } else {
      current += character;
      byteLength += characterBytes;
    }
  }

  folded.push(current);
  return folded.join('\r\n');
}

function createICS(calendarName, events) {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Good-Weather-Swimming//Open-Meteo iCal Generator//EN',
    `X-WR-CALNAME:${escapeICalText(calendarName)}`
  ];

  for (const event of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.uid}`);
    lines.push(`DTSTAMP:${now}`);
    lines.push(`DTSTART;VALUE=DATE:${formatICalDate(event.date)}`);
    lines.push(`DTEND;VALUE=DATE:${formatICalDate(event.nextDate)}`);
    lines.push(`SUMMARY:${escapeICalText(event.summary)}`);
    if (event.description) lines.push(`DESCRIPTION:${escapeICalText(event.description)}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.map(foldICalLine).join('\r\n');
}

function uidFor(locationId, date) {
  return `${locationId}-${date}@good-weather-swimming`;
}

function openMeteoMarineUrl(latitude, longitude) {
  return `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height,wave_period,sea_surface_temperature&daily=wave_height_max&timezone=auto`;
}

async function fetchJSON(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
      return await response.json();
    } catch (error) {
      console.error(`Fetch error (${attempt}/3):`, error.message);
      if (attempt < 3) {
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  return null;
}

function hourlyValuesForDate(hourly, date, field) {
  if (!hourly?.time || !hourly[field]) return [];
  return hourly.time.flatMap((time, index) => {
    const value = hourly[field][index];
    return time.startsWith(date) && Number.isFinite(value) ? [{ value, index }] : [];
  });
}

function maxHourlyEntry(hourly, date, field) {
  return hourlyValuesForDate(hourly, date, field)
    .reduce((maximum, entry) => !maximum || entry.value > maximum.value ? entry : maximum, null);
}

function averageHourlyValue(hourly, date, field) {
  const values = hourlyValuesForDate(hourly, date, field);
  if (!values.length) return null;
  return values.reduce((sum, entry) => sum + entry.value, 0) / values.length;
}

function formatValue(value, decimals = 1) {
  return value === null || value === undefined ? 'N/A' : Number(value.toFixed(decimals));
}

function describeWeatherCode(code) {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return descriptions[code] || 'Unknown conditions';
}

function evaluateDay(dayIndex, air, marine) {
  const airDaily = air.daily;
  const marineDaily = marine.daily;
  const date = airDaily.time[dayIndex];
  const nextDate = new Date(`${date}T00:00:00Z`);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);

  const seaTemp = averageHourlyValue(marine.hourly, date, 'sea_surface_temperature');
  const wavePeriod = averageHourlyValue(marine.hourly, date, 'wave_period');
  const waveMax = marineDaily?.wave_height_max?.[dayIndex] ?? null;
  const precip = airDaily?.precipitation_sum?.[dayIndex] ?? null;
  const uv = airDaily?.uv_index_max?.[dayIndex] ?? null;
  const airMin = airDaily?.temperature_2m_min?.[dayIndex] ?? null;
  const airMax = airDaily?.temperature_2m_max?.[dayIndex] ?? null;
  const weatherCode = airDaily?.weathercode?.[dayIndex] ?? null;
  const windEntry = maxHourlyEntry(air.hourly, date, 'wind_speed_10m');
  const wind = windEntry?.value ?? null;
  const windDirection = windEntry ? air.hourly.wind_direction_10m?.[windEntry.index] ?? null : null;
  const precipProbability = maxHourlyEntry(air.hourly, date, 'precipitation_probability')?.value ?? null;

  const reasons = [];
  if (seaTemp !== null && seaTemp < THRESHOLDS.minWaterTemp) {
    reasons.push(`Cold water: ${seaTemp}°C`);
  }
  if (waveMax !== null && waveMax > THRESHOLDS.maxWaveHeight) {
    reasons.push(`High waves: ${waveMax} m`);
  }
  if (wind !== null && wind > THRESHOLDS.maxWindSpeed) {
    reasons.push(`High wind: ${wind} m/s`);
  }
  if (precip !== null && precip > 2) {
    reasons.push(`Precipitation: ${precip} mm`);
  }
  if (precipProbability !== null && precipProbability > THRESHOLDS.maxPrecipProb) {
    reasons.push(`Rain probability: ${precipProbability}%`);
  }
  if (uv !== null && uv > THRESHOLDS.maxUVIndex) {
    reasons.push(`High UV index: ${uv}`);
  }

  const condition = reasons.length ? reasons.join('; ') : 'Conditions look ok';
  const description = [
    `Evaluation: ${condition}`,
    `Weather: ${weatherCode === null ? 'N/A' : `${describeWeatherCode(weatherCode)} (code ${weatherCode})`}`,
    `Air temperature: ${formatValue(airMin)}°C min / ${formatValue(airMax)}°C max`,
    `Wind: ${wind === null ? 'N/A' : `${formatValue(wind)} m/s`}${windDirection === null ? '' : ` from ${Math.round(windDirection)}°`}`,
    `Rain: ${formatValue(precipProbability, 0)}% max probability / ${formatValue(precip)} mm total`,
    `UV index: ${formatValue(uv)} max`,
    `Sea temperature: ${formatValue(seaTemp)}°C average`,
    `Wave height: ${formatValue(waveMax)} m max`,
    `Wave period: ${formatValue(wavePeriod)} s average`
  ].join('\n');

  return {
    date,
    nextDate: nextDate.toISOString().slice(0, 10),
    summary: reasons.length ? `Caution: ${reasons.join('; ')}` : 'Recommended swim day',
    description
  };
}

async function generateForLocation(location) {
  console.log('Generating iCal for', location.id);

  const [air, marine] = await Promise.all([
    fetchJSON(location.weatherDataUrl),
    fetchJSON(openMeteoMarineUrl(location.openMeteoLat, location.openMeteoLng))
  ]);
  if (!air?.daily?.time?.length || !marine?.daily) {
    console.warn(`Skipping ${location.id} due to missing data`);
    return;
  }

  const events = [];
  const dayCount = Math.min(air.daily.time.length, 7);
  for (let index = 0; index < dayCount; index++) {
    const event = evaluateDay(index, air, marine);
    events.push({ uid: uidFor(location.id, event.date), ...event });
  }

  const ics = createICS(`${location.name} - Swim calendar`, events);
  const outFile = path.join(OUT_DIR, `${location.id}.ics`);
  await fs.writeFile(outFile, ics, 'utf8');
  console.log('Wrote', outFile);
}

async function main() {
  await ensureOutDir();
  for (const location of locations.locations) {
    try {
      await generateForLocation(location);
    } catch (error) {
      console.error('Error generating for', location.id, error.message);
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});