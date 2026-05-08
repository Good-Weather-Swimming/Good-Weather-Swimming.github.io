module.exports = {
  areas: [
    {
      id: "peyia",
      name: "Peyia",
      urlPath: "/peyia/",
      description: "Western shores of Paphos with beautiful sandy and rocky beaches",
      whatsappGroup: "https://chat.whatsapp.com/Fz2UKMPTm5q0ABkD2Oz89I",
      region: "Paphos, Cyprus"
    }
  ],
  locations: [
    {
      id: "coral-bay",
      areaId: "peyia",
      name: "Coral Bay",
      urlPath: "/cyprus-peyia-coral-bay-beach/",
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
      weatherDataUrl: "https://rezerv.it/weather/v1/forecast?latitude=34.884468&longitude=32.367428&preset=openwater_swimming"
    },
    {
      id: "laourou-beach",
      areaId: "peyia",
      name: "Laourou Beach",
      urlPath: "/cyprus-peyia-laourou-beach/",
      region: "Peyia, Paphos",
      coordinates: {
        lat: 34.8847,
        lng: 32.3521,
        zoom: 15
      },
      googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.0!2d32.3521!3d34.8847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb4e3e7f3e3e3e3f!2sLaourou%20Beach!5e0!3m2!1sen!2s!4v1234567890",
      description: "Scenic beach with rocky areas and calm waters",
      whatsappGroup: "https://chat.whatsapp.com/LOCATION-LAOUROU", // Location-level group
      meetingNotes: "Meet at the main beach entrance near the parking area",
      weatherDataUrl: "https://rezerv.it/weather/v1/forecast?latitude=34.8847&longitude=32.3521&preset=openwater_swimming"
    }
  ]
};
