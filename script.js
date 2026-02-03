

//Map is created, coordinates are where the map is centered
const map = L.map('map').setView([52.1326, 5.2913], 7);

//Makes the map more visible
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  .addTo(map);

const addBtn = document.getElementById("addBtn"); //finding the red (main) button
const eventForm = document.getElementById("eventForm"); //obviously getting the event form
const closeBtn = document.getElementById("closeBtn"); // getting the close button

//removes hidden thing from form so then the form is now revealed no more not hidden
addBtn.onclick = () => {
  eventForm.classList.remove("hidden");
};

//opposite to what happens earlier when close is clicked the hidden trait is added
closeBtn.onclick = () => {
  eventForm.classList.add("hidden");
};

//had to search this up because the events kept deleting, search what it does later
function getEvents() {
  return JSON.parse(localStorage.getItem("events") || "[]");
}
function saveEvents(events) {
  localStorage.setItem("events", JSON.stringify(events));
}

//references the publish button
const publishBtn = document.getElementById("publishBtn");
//reads the form values
publishBtn.onclick = async () => {
  const team = document.getElementById("team").value;
  const address = document.getElementById("address").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const description = document.getElementById("description").value;

  // (I also don't really understand how this works) But basically it converts an adress into longitude and latitude
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
  );
  const data = await res.json();
  //in case a location is not found
  if (!data.length) {
    alert("Location not found");
    return;
  }

  const event = {
    team,
    address,
    lat: data[0].lat,
    lng: data[0].lon,
    startTime,
    endTime,
    description
  };

  const events = getEvents();
  events.push(event);
  saveEvents(events);

  eventForm.classList.add("hidden");
  renderEvents();
};

function renderEvents() {
  const now = new Date();
  const events = getEvents();

  // Clear old markers
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  const activeEvents = events.filter(e => new Date(e.endTime) > now);
  saveEvents(activeEvents);

  activeEvents.forEach(e => {
    L.marker([e.lat, e.lng])
      .addTo(map)
      .bindPopup(`
        <b>${e.team}</b><br>
        ${e.address}<br>
        ${e.startTime} → ${e.endTime}<br>
        ${e.description || ""}
      `);
  });
}

renderEvents();
setInterval(renderEvents, 60000);

