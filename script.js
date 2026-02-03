const map = L.map('map').setView([52.1326, 5.2913], 7);

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
