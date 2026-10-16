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
  return lines.join('\r\n');
}

function uidFor(locationId, date) {
  return `${locationId}-${date}@good-weather-swimming`;
}

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error.message);
    return null;
  }
}

function maxHourlyValue(hourly, date, field) {
  if (!hourly?.time || !hourly[field]) return null;
  const values = hourly.time
    .map((time, index) => time.startsWith(date) ? hourly[field][index] : null)
    .filter(value => value !== null && value !== undefined);
  return values.length ? Math.max(...values) : null;
}

function evaluateDay(dayIndex, air, marine) {
  const airDaily = air.daily;
  const marineDaily = marine.daily;
  const date = airDaily.time[dayIndex];
  const nextDate = new Date(`${date}T00:00:00Z`);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);

  const seaTemp = maxHourlyValue(marine.hourly, date, 'sea_surface_temperature');
  const waveMax = marineDaily?.wave_height_max?.[dayIndex] ?? null;
  const precip = airDaily?.precipitation_sum?.[dayIndex] ?? null;
  const uv = airDaily?.uv_index_max?.[dayIndex] ?? null;
  const wind = maxHourlyValue(air.hourly, date, 'wind_speed_10m');
  const precipProbability = maxHourlyValue(air.hourly, date, 'precipitation_probability');

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

  return {
    date,
    nextDate: nextDate.toISOString().slice(0, 10),
    summary: reasons.length ? `Caution: ${reasons.join('; ')}` : 'Recommended swim day',
    description: `Evaluation: ${reasons.length ? reasons.join('; ') : 'Conditions look ok'}`
  };
}

async function generateForLocation(location) {
  console.log('Generating iCal for', location.id);

  const [air, marine] = await Promise.all([
    fetchJSON(location.weatherDataUrl),
    fetchJSON(location.marineDataUrl)
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