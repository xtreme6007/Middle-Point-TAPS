var secondLocation = $("#secondDestination").val();


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var currentLat =  position.coords.latitude;
  var currentlon = position.coords.longitude;

}

$("#submitButton").on("click", getLocation());



