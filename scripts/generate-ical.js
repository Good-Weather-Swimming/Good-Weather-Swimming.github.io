#!/usr/bin/env node
// Generates .ics files per location using Open-Meteo forecasts.

const fs = require('fs/promises');
const path = require('path');
const ICAL = require('ical.js');
const locations = require('../src/_data/locations.js');

ICAL.foldLength = 73;

const OUT_DIR = path.join(__dirname, '..', 'src', 'ical');
const LOCATION_TIME_ZONE = 'Asia/Nicosia';

const THRESHOLDS = {
  minWaterTemp: 18,
  maxWaveHeight: 0.5,
  maxWindSpeed: 8,
  maxPrecipProb: 30,
  maxUVIndex: 3
};

async function ensureOutDir() {
  await fs.mkdir(OUT_DIR, { recursive: true });
}

function createICS(calendarName, events) {
  const calendar = new ICAL.Component('vcalendar');
  calendar.addPropertyWithValue('version', '2.0');
  calendar.addPropertyWithValue('prodid', '-//Good-Weather-Swimming//Open-Meteo iCal Generator//EN');
  calendar.addPropertyWithValue('x-wr-calname', calendarName);

  for (const event of events) {
    const component = new ICAL.Component('vevent');
    const calendarEvent = new ICAL.Event(component);
    calendarEvent.uid = event.uid;
    calendarEvent.startDate = ICAL.Time.fromJSDate(new Date(`${event.start}:00Z`), true);
    calendarEvent.endDate = ICAL.Time.fromJSDate(new Date(`${event.end}:00Z`), true);
    calendarEvent.summary = event.summary;
    calendarEvent.description = event.description;
    component.addPropertyWithValue('dtstamp', ICAL.Time.fromJSDate(new Date(), true));
    calendar.addSubcomponent(component);
  }

  return calendar.toString();
}

function uidFor(locationId, start) {
  return `${locationId}-${start.replace(/[-:]/g, '')}@good-weather-swimming`;
}

function openMeteoMarineUrl(latitude, longitude) {
  return `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height,wave_period,sea_surface_temperature&timezone=UTC`;
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

function hourlyValue(hourly, index, field) {
  const value = hourly?.[field]?.[index];
  return Number.isFinite(value) ? value : null;
}

function formatLocalTime(utcDateTime) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: LOCATION_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(new Date(`${utcDateTime}:00Z`));
}

function addOneHour(utcDateTime) {
  return new Date(new Date(`${utcDateTime}:00Z`).getTime() + 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);
}

function formatValue(value, decimals = 1) {
  return Number.isFinite(value) ? Number(value.toFixed(decimals)) : 'N/A';
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

function meetsSwimCriteria(sample) {
  return sample.waterTemp >= THRESHOLDS.minWaterTemp
    && sample.uvIndex <= THRESHOLDS.maxUVIndex
    && sample.waveHeight <= THRESHOLDS.maxWaveHeight
    && sample.windSpeed <= THRESHOLDS.maxWindSpeed
    && sample.precipProbability <= THRESHOLDS.maxPrecipProb;
}

function findSwimWindows(air, marine) {
  const marineIndices = new Map(marine.hourly.time.map((time, index) => [time, index]));
  const daylightByDate = new Map(air.daily.time.map((date, index) => [date, {
    sunrise: air.daily.sunrise?.[index],
    sunset: air.daily.sunset?.[index]
  }]));
  const windows = [];
  let currentWindow = null;

  function finishWindow() {
    if (currentWindow) windows.push(currentWindow);
    currentWindow = null;
  }

  for (let index = 0; index < air.hourly.time.length; index++) {
    const start = air.hourly.time[index];
    const end = addOneHour(start);
    const marineIndex = marineIndices.get(start);
    const daylight = daylightByDate.get(start.slice(0, 10));
    const startTime = new Date(`${start}:00Z`).getTime();
    const endTime = new Date(`${end}:00Z`).getTime();
    const sunrise = daylight?.sunrise ? new Date(`${daylight.sunrise}:00Z`).getTime() : NaN;
    const sunset = daylight?.sunset ? new Date(`${daylight.sunset}:00Z`).getTime() : NaN;
    const isDaylight = Number.isFinite(sunrise) && Number.isFinite(sunset)
      && startTime >= sunrise && endTime <= sunset;
    const sample = marineIndex === undefined ? null : {
      start,
      airTemp: hourlyValue(air.hourly, index, 'temperature_2m'),
      windSpeed: hourlyValue(air.hourly, index, 'wind_speed_10m'),
      windDirection: hourlyValue(air.hourly, index, 'wind_direction_10m'),
      precipProbability: hourlyValue(air.hourly, index, 'precipitation_probability'),
      weatherCode: hourlyValue(air.hourly, index, 'weathercode'),
      uvIndex: hourlyValue(air.hourly, index, 'uv_index'),
      waterTemp: hourlyValue(marine.hourly, marineIndex, 'sea_surface_temperature'),
      waveHeight: hourlyValue(marine.hourly, marineIndex, 'wave_height'),
      wavePeriod: hourlyValue(marine.hourly, marineIndex, 'wave_period')
    };
    const hasRequiredData = sample && [
      sample.waterTemp,
      sample.uvIndex,
      sample.waveHeight,
      sample.windSpeed,
      sample.precipProbability
    ].every(Number.isFinite);
    if (!hasRequiredData || !isDaylight || !meetsSwimCriteria(sample)) {
      finishWindow();
      continue;
    }

    if (currentWindow && currentWindow.end === start) {
      currentWindow.end = end;
      currentWindow.samples.push(sample);
    } else {
      finishWindow();
      currentWindow = {
        start,
        end,
        sunrise: daylight.sunrise,
        sunset: daylight.sunset,
        samples: [sample]
      };
    }
  }

  finishWindow();
  return windows;
}

function createSwimEvent(location, window) {
  const samples = window.samples;
  const valuesOf = field => samples.map(sample => sample[field]).filter(Number.isFinite);
  const minOf = field => valuesOf(field).length ? Math.min(...valuesOf(field)) : null;
  const maxOf = field => valuesOf(field).length ? Math.max(...valuesOf(field)) : null;
  const averageOf = field => valuesOf(field).length
    ? valuesOf(field).reduce((sum, value) => sum + value, 0) / valuesOf(field).length
    : null;
  const maxWindSample = samples.reduce((maximum, sample) => sample.windSpeed > maximum.windSpeed ? sample : maximum);
  const duration = samples.length;
  const weather = [...new Set(samples.map(sample => sample.weatherCode).filter(Number.isFinite))]
    .map(code => describeWeatherCode(code))
    .join(', ') || 'Not available';

  return {
    uid: uidFor(location.id, window.start),
    start: window.start,
    end: window.end,
    summary: `Ideal swim window (${duration} ${duration === 1 ? 'hour' : 'hours'})`,
    description: [
      `Daylight: ${formatLocalTime(window.sunrise)} sunrise to ${formatLocalTime(window.sunset)} sunset (Cyprus time).`,
      `Water temperature: ${formatValue(minOf('waterTemp'))}-${formatValue(maxOf('waterTemp'))}°C (minimum limit ${THRESHOLDS.minWaterTemp}°C).`,
      `UV index: up to ${formatValue(maxOf('uvIndex'))} (limit ${THRESHOLDS.maxUVIndex}).`,
      `Wave height: up to ${formatValue(maxOf('waveHeight'))} m (limit ${THRESHOLDS.maxWaveHeight} m).`,
      `Wave period: ${formatValue(averageOf('wavePeriod'))} s average.`,
      `Wind: up to ${formatValue(maxOf('windSpeed'))} m/s${maxWindSample.windDirection === null ? '' : ` from ${Math.round(maxWindSample.windDirection)}°`} (limit ${THRESHOLDS.maxWindSpeed} m/s).`,
      `Rain probability: up to ${formatValue(maxOf('precipProbability'), 0)}% (limit ${THRESHOLDS.maxPrecipProb}%).`,
      `Air temperature: ${formatValue(minOf('airTemp'))}-${formatValue(maxOf('airTemp'))}°C.`,
      `Conditions: ${weather}.`
    ].join('\n')
  };
}

async function generateForLocation(location) {
  console.log('Generating iCal for', location.id);

  const [air, marine] = await Promise.all([
    fetchJSON(location.weatherDataUrl),
    fetchJSON(openMeteoMarineUrl(location.openMeteoLat, location.openMeteoLng))
  ]);
  if (!air?.hourly?.time?.length || !air?.daily?.time?.length || !marine?.hourly?.time?.length) {
    console.warn(`Skipping ${location.id} due to missing data`);
    return;
  }

  const events = findSwimWindows(air, marine)
    .map(window => createSwimEvent(location, window));

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