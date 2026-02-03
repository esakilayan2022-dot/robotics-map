const map = L.map('map').setView([52.1326, 5.2913], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  .addTo(map);
