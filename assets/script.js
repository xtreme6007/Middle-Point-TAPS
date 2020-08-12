
// global varabiles

  // get second location
  var secondLocation = $("#secondDestination").val();

  //FourSquare API ID
  var fourSquareId = "YN1AUPOE5HOWLFCHNIO3YUILB3APQWNFSKZO5Q03JODNYNUC"

  // FourSquare API Secret
  var fourSquareSecret = "BXRN2XVMQSMXHWT1EKRZMJWLJNN3IAUEFULDKBUGRZ4XZQA4";

  // Map Quest id
  var mapQuestId = "F2IINs24ZwJe2OApHyVeK1ARNa0ugysB";


// when page loads
$(document).ready(function () {
  // get current location fiunction
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  // current lat and lon positions
  function showPosition(position) {
    var currentLat = position.coords.latitude;
    var currentLon = position.coords.longitude;
    callLocation(currentLat, currentLon);
  }

  function callLocation(lat, lon) {
    // four square api URL
    var placesURL = "https://api.foursquare.com/v2/venues/explore?client_id=" + fourSquareId + "&client_secret=" + fourSquareSecret + "&v=20180323&ll=" + lat + "," + lon + "&query=coffee";
    $.ajax({
      url: placesURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var locations = response.response.groups[0].items
      for (var i = 0; i < locations.length; i++) {
        console.log(locations[i]);
        var name = locations[i].venue.name;
        var address = locations[i].venue.location.address;
        var summary = locations[i].reasons.items[0].summary;


        
        
        
        
      }
      /*response.response.groups[0].items.forEach(location => {
        console.log(location)
    
      })*/
    });
  }
    // Map quest api to reverse single line addresses into lat and lon 
    function reverseGeo() {
    var reverseGeoURL = "http://www.mapquestapi.com/geocoding/v1/address?key=F2IINs24ZwJe2OApHyVeK1ARNa0ugysB&location=" + secondLocation;
    $.ajax({
      url: reverseGeoURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var secondLat = response.results[0].locations[0].latLng.lat;
      var secondLong = response.results[0].locations[0].latLng.lng;
      console.log(secondLat);
      console.log(secondLong);

    });
  }

  
  
  $("#submitButton").on("click", getLocation());
  $("#submitButton").on("click", reverseGeo());
  


});


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