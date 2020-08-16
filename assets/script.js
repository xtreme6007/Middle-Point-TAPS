// global varabiles

// get second location
var secondLocation;

//FourSquare API ID
var fourSquareId = "YN1AUPOE5HOWLFCHNIO3YUILB3APQWNFSKZO5Q03JODNYNUC"

// FourSquare API Secret
var fourSquareSecret = "BXRN2XVMQSMXHWT1EKRZMJWLJNN3IAUEFULDKBUGRZ4XZQA4";

// Map Quest id
var mapQuestId = "F2IINs24ZwJe2OApHyVeK1ARNa0ugysB";
// lat variables
var currentLat;
var currentLon;
var secondLat;
var secondLon;
var middlePointResults;
var map;
var middlepoint;
// Define radius function
if (typeof (Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }
}

// Define degrees function
if (typeof (Number.prototype.toDeg) === "undefined") {
  Number.prototype.toDeg = function () {
    return this * (180 / Math.PI);
  }
}

// when page loads
$(document).ready(function () {
  // get current location fiunction
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  
  // current lat and lon positions
  function showPosition(position) {
    // Devices current lattitude
    currentLat = position.coords.latitude;
    // Devices current longitude
    currentLon = position.coords.longitude;
    L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

    map = L.mapquest.map('map', {
      center: [currentLat, currentLon],
      layers: L.mapquest.tileLayer('map'),
      zoom: 10
    });

  }

  // function to call location with Midle point coords
  function callLocation(lat, lon) {
    var query = $("#query").val()
    //console.log(query);
    // four square api URL
    var placesURL = "http://api.foursquare.com/v2/venues/explore?client_id=" + fourSquareId + "&client_secret=" + fourSquareSecret + "&v=20180323&ll=" + lon + "," + lat + "&query="+ query;
    $.ajax({
      url: placesURL,
      method: "GET"
    }).then(function (response) {
      
      // variable for locations objects
      var locations = response.response.groups[0].items
      // empty array for results
      var returnLocations = [];
      for (var i = 0; i < locations.length; i++) {

        // name of locations
        var name = locations[i].venue.name;
        // adress of locations
        var address = locations[i].venue.location.formattedAddress[0] + " " + locations[i].venue.location.formattedAddress[1]+ " " + locations[i].venue.location.formattedAddress[2];
        // summary of location
        var summary = locations[i].reasons.items[0].summary;
        // variable for location coords for markers on map 
        var locationCoord = [locations[i].venue.location.lat, locations[i].venue.location.lng]
        // store results in an aray
        returnLocations.push({ name, address, summary, locationCoord });
      }
      displayResults(returnLocations);
      
    });
  }

  function displayResults(results) {
    // console.log(results);
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      // set value for name of venue
      var name = $("<h3>").text(element.name)
      // append name
      $("#infoResults").append(name);
      // set summary value
      var summary = $("<h4>").text(element.summary)
      // append summary
      $("#infoResults").append(summary);
      // set value of address
      var address = $("<h5>").text(element.address)
      // append address
      $("#infoResults").append(address);
      // place marker for each result
      L.marker(element.locationCoord, {
        icon: L.mapquest.icons.marker(),
        draggable: false
        // Display Address and name on markers in pop up when clicked 
      }).bindPopup(element.name + "<br>" + element.address).addTo(map);
    }
  
  }

  // Map quest api to reverse single line addresses into lat and lon 
  function reverseGeo() {
    // get value from second address text box
    secondLocation = $("#secondDestination").val();
    // URL to reverse single line addresses to lat and lon
    var reverseGeoURL = "http://www.mapquestapi.com/geocoding/v1/address?key=F2IINs24ZwJe2OApHyVeK1ARNa0ugysB&location=" + secondLocation;
    $.ajax({
      url: reverseGeoURL,
      method: "GET"
    }).then(function (response) {
      // second destination latitude
      secondLat = response.results[0].locations[0].latLng.lat;
      // second destination longitude
      secondLon = response.results[0].locations[0].latLng.lng;
      $("#infoResults").empty();




    });

  }

  // This function is with the  help from a JS fiddle by Kévin Rignault link: http://jsfiddle.net/kevinrignault/gzq64p56/ 
  //-- Define middle point function
  function middlePoint(lat1, lng1, lat2, lng2) {

    //-- Longitude difference
    var dLng = (lng2 - lng1).toRad();

    //-- Convert to radians
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();
    lng1 = lng1.toRad();

    var bX = Math.cos(lat2) * Math.cos(dLng);
    var bY = Math.cos(lat2) * Math.sin(dLng);
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
    var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    //-- Return result
    return [lng3.toDeg().toFixed(5), lat3.toDeg().toFixed(5)];
  }
  


  // submit button on click event
  $("#submitButton").on("click", function () {
    
    
    reverseGeo();
    //console.log(secondLocation)
    
    setTimeout(function () {
      // call middlePoint function with cords
      middlepoint = middlePoint(currentLat, currentLon, secondLat, secondLon);
      // return responses with middlepoint coords
      middlePointResults = callLocation(middlepoint[0], middlepoint[1]);
    }, 1000);

    
  });




});





