
// global varabiles

  // get second location
  var secondLocation;

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
    // Devices current lattitude
    var currentLat = position.coords.latitude;
    // Devices current longitude
    var currentLon = position.coords.longitude;
    // call 
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
      // variable for locations objects
      var locations = response.response.groups[0].items
      for (var i = 0; i < locations.length; i++) {
        console.log(locations[i]);

        // name of locations
        var name = locations[i].venue.name;
        // adress of locations
        var address = locations[i].venue.location.address;
        // summary of location
        var summary = locations[i].reasons.items[0].summary;


        
        
        
        
      }
      /*response.response.groups[0].items.forEach(location => {
        console.log(location)
    
      })*/
    });
  }
    // Map quest api to reverse single line addresses into lat and lon 
    function reverseGeo() {
     secondLocation = $("#secondDestination").val();
    var reverseGeoURL = "http://www.mapquestapi.com/geocoding/v1/address?key=F2IINs24ZwJe2OApHyVeK1ARNa0ugysB&location=" + secondLocation;
    $.ajax({
      url: reverseGeoURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      // second destination latitude
      var secondLat = response.results[0].locations[0].latLng.lat;
      // second destination longitude
      var secondLong = response.results[0].locations[0].latLng.lng;
      console.log(secondLat);
      console.log(secondLong);

    });
    return [secondLong, secondLat];
  }

// JS fiddle by Kévin Rignault link: http://jsfiddle.net/kevinrignault/gzq64p56/ 
  //-- Define middle point function
function middlePoint(lat1, lng1, lat2, lng2) {
	
  //-- Longitude difference
  var dLng = (lng2 - lng1).toRad();

  //-- Convert to radians
  lat1 = currentLat.toRad();
  lat2 = lat2.toRad();
  lng1 = secondLong.toRad();

  var bX = Math.cos(lat2) * Math.cos(dLng);
  var bY = Math.cos(lat2) * Math.sin(dLng);
  var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
  var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

  //-- Return result
  return [lng3.toDeg(), lat3.toDeg()];
}

  
  
  $("#submitButton").on("click", function(){
    callLocation();
    reverseGeo();
  });
  
  


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