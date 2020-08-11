var secondLocation = $("#secondDestination").val();
var fourSquareId = "YN1AUPOE5HOWLFCHNIO3YUILB3APQWNFSKZO5Q03JODNYNUC"
var fourSquareSecret = "BXRN2XVMQSMXHWT1EKRZMJWLJNN3IAUEFULDKBUGRZ4XZQA4";



$(document).ready(function () {

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    var currentLat = position.coords.latitude;
    var currentLon = position.coords.longitude;
    callLocation(currentLat, currentLon);
  }

  function callLocation(lat, lon) {
    var placesURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + fourSquareId + "&client_secret=" + fourSquareSecret + "&v=20180323&ll=" + lat + "," + lon + "&query=coffee";
    $.ajax({
      url: placesURL,
      method: "GET"
    }).then(function (response) {
      //console.log(response);
      var locations = response.response.groups[0].items
      for (var i = 0; i < locations.length; i++) {
        console.log(locations[i]);
      }
      /*response.response.groups[0].items.forEach(location => {
        console.log(location)
    
      })*/
    });
  }

  $("#submitButton").on("click", getLocation());



})


/*
// Tabs
function openLink(evt, linkName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("myLink");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(linkName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}


Click on the first tablink on load
document.getElementsByClassName("tablink")[0].click();
*/