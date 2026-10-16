function openMeteoWeatherUrl(latitude, longitude) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation_probability,weathercode,uv_index&daily=sunrise,sunset&timezone=UTC`;
}

function createListedBeach({ id, areaId, name, region, latitude, longitude, description, lifeguardSeason, safetySourceUrl }) {
  return {
    id,
    areaId,
    name,
    urlPath: `/${id}/`,
    region,
    coordinates: { lat: latitude, lng: longitude, zoom: 15 },
    googleMapsEmbed: `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`,
    description,
    meetingNotes: "Use the public beach access; check posted flags and current lifeguard hours.",
    openMeteoLat: latitude,
    openMeteoLng: longitude,
    weatherDataUrl: openMeteoWeatherUrl(latitude, longitude),
    dataCacheExpiryMinutes: 30,
    blueFlagSourceUrl: safetySourceUrl,
    lifeguardSeason
  };
}

module.exports = {
  areas: [
    {
      id: "peyia",
      name: "Peyia",
      urlPath: "/peyia/",
      description: "Western shores of Paphos with beautiful sandy and rocky beaches",
      whatsappGroup: "https://chat.whatsapp.com/Fz2UKMPTm5q0ABkD2Oz89I",
      region: "Paphos, Cyprus"
    },
    {
      id: "ayia-napa",
      name: "Ayia Napa",
      urlPath: "/ayia-napa/",
      description: "Blue Flag-listed sandy beaches and coves on the southeast coast.",
      region: "Famagusta, Cyprus"
    },
    {
      id: "protaras",
      name: "Protaras",
      urlPath: "/protaras/",
      description: "Organized bathing beaches and clear-water coves on the east coast.",
      region: "Famagusta, Cyprus"
    },
    {
      id: "larnaca",
      name: "Larnaca",
      urlPath: "/larnaca/",
      description: "Urban Blue Flag beaches along Larnaca's palm-lined waterfront.",
      region: "Larnaca, Cyprus"
    },
    {
      id: "limassol",
      name: "Limassol",
      urlPath: "/limassol/",
      description: "Blue Flag-listed beaches from the city coast to Pissouri Bay.",
      region: "Limassol, Cyprus"
    }
  ],
  locations: [
    {
      id: "coral-bay",
      areaId: "peyia",
      name: "Coral Bay",
      urlPath: "/peyia-coral-bay-beach/",
      region: "Peyia, Paphos",
      coordinates: {
        lat: 34.853807656535146,
        lng: 32.369171826053105,
        zoom: 15
      },
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.096295122031!2d32.369171826053105!3d34.853807656535146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e709002bc60d11%3A0x2368ebdf6a9da634!2sGood%20Weather%20Swimming%20-%20Coral%20Bay!5e0!3m2!1sen!2s!4v1766509943632!5m2!1sen!2s",
      description: "Beautiful golden sandy beach in western Peyia",
      whatsappGroup: "https://chat.whatsapp.com/LW7HuuSKNrQ5xIRWjk8uau", // Location-level group
      meetingNotes: "Decided on the spot - choose between Left or Right side based on conditions",
      blueFlagSourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/coral-bay-beach-blue-flag/",
      lifeguardSeason: "April-October",
      // Open-Meteo fields (used by the generate-ical script and API integration)
      openMeteoLat: 34.884468,
      openMeteoLng: 32.367428,
      weatherDataUrl: openMeteoWeatherUrl(34.884468, 32.367428),
      dataCacheExpiryMinutes: 30
    },
    {
      id: "laourou-beach",
      areaId: "peyia",
      name: "Laourou Beach",
      urlPath: "/peyia-laourou-beach/",
      region: "Peyia, Paphos",
      coordinates: {
        lat: 34.8847,
        lng: 32.3521,
        zoom: 15
      },
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.0!2d32.3521!3d34.8847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb4e3e7f3e3e3e3f!2sLaourou%20Beach!5e0!3m2!1sen!2s!4v1234567890",
      description: "Scenic beach with rocky areas and calm waters",
      whatsappGroup: "https://chat.whatsapp.com/GJgJGYaQTmFGIOaQRdjv8I",
      meetingNotes: "Meet at the main beach entrance near the parking area",
      blueFlagSourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/laourou-beach-blue-flag/",
      lifeguardSeason: "April-October",
      openMeteoLat: 34.8847,
      openMeteoLng: 32.3521,
      weatherDataUrl: openMeteoWeatherUrl(34.8847, 32.3521),
      dataCacheExpiryMinutes: 30
    },
    createListedBeach({
      id: "nissi-beach",
      areaId: "ayia-napa",
      name: "Nissi Beach",
      region: "Ayia Napa, Famagusta",
      latitude: 34.98829,
      longitude: 33.9712,
      description: "Blue Flag-listed sandy bay with shallow, sheltered water and an offshore islet.",
      lifeguardSeason: "April-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/nissi-beach-blue-flag/"
    }),
    createListedBeach({
      id: "makronisos-beach",
      areaId: "ayia-napa",
      name: "Makronisos Beach",
      region: "Ayia Napa, Famagusta",
      latitude: 34.982847,
      longitude: 33.955065,
      description: "Blue Flag-listed group of sandy bays with relatively calm, clear water.",
      lifeguardSeason: "April-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/makronisos-beach-blue-flag/"
    }),
    createListedBeach({
      id: "landa-beach",
      areaId: "ayia-napa",
      name: "Landa Beach",
      region: "Ayia Napa, Famagusta",
      latitude: 34.98743,
      longitude: 33.95833,
      description: "Blue Flag-listed sandy beach with organized swimming facilities.",
      lifeguardSeason: "April-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/landa-beach-blue-flag/"
    }),
    createListedBeach({
      id: "fig-tree-bay",
      areaId: "protaras",
      name: "Fig Tree Bay",
      region: "Protaras, Famagusta",
      latitude: 35.012567,
      longitude: 34.058549,
      description: "Blue Flag-listed sandy beach with clear water and an organized bathing area.",
      lifeguardSeason: "April-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/protaras-beach-fig-tree-bay-blue-flag/"
    }),
    createListedBeach({
      id: "konnos-bay",
      areaId: "protaras",
      name: "Konnos Bay",
      region: "Protaras, Famagusta",
      latitude: 34.98378,
      longitude: 34.06916,
      description: "Blue Flag-listed sandy cove in a sheltered setting between Protaras and Cape Greco.",
      lifeguardSeason: "April-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/konnos-bay-blue-flag/"
    }),
    createListedBeach({
      id: "foinikoudes-beach",
      areaId: "larnaca",
      name: "Foinikoudes Beach",
      region: "Larnaca, Cyprus",
      latitude: 34.913895,
      longitude: 33.638418,
      description: "Blue Flag-listed urban beach with shallow water along Larnaca's palm-lined promenade.",
      lifeguardSeason: "June-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/foinikoudes-beach-blue-flag/"
    }),
    createListedBeach({
      id: "mackenzie-beach",
      areaId: "larnaca",
      name: "Mackenzie Beach",
      region: "Larnaca, Cyprus",
      latitude: 34.889136,
      longitude: 33.637372,
      description: "Blue Flag-listed Larnaca beach described by Visit Cyprus as calm, clear and shallow.",
      lifeguardSeason: "June-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/mckenzie-beach-blue-flag/"
    }),
    createListedBeach({
      id: "pissouri-beach",
      areaId: "limassol",
      name: "Pissouri Beach",
      region: "Pissouri, Limassol",
      latitude: 34.64974,
      longitude: 32.72205,
      description: "Blue Flag-listed resort beach with golden sand, pebbles and seasonal lifeguard service.",
      lifeguardSeason: "April-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/pissouri-beach-blue-flag/"
    }),
    createListedBeach({
      id: "kourion-beach",
      areaId: "limassol",
      name: "Kourion Beach",
      region: "Episkopi Bay, Limassol",
      latitude: 34.663057,
      longitude: 32.882584,
      description: "Blue Flag-listed sand-and-pebble beach with a designated bathing area.",
      lifeguardSeason: "April-October",
      safetySourceUrl: "https://www.visitcyprus.com/discover-cyprus/sun-sea/beaches/kourion-beach-blue-flag/"
    })
  ]
};
