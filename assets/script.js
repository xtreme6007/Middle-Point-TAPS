var secondLocation = $("#secondDestination").val();


var yelpKey = "ZeJDS-vTBehDf73kWJJZwa3WUhjV_JMDGmmxNGqnk7j-78M7ndWokKYbsOGzo20ihX6snK1WsaBTYThWvaC5oMlsuNcw94qvi1WCdKXh6QCP03K5Ylo3fu_8roowX3Yx"

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


$.ajax({
  url: placeURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

});

$("#submitButton").on("click", getLocation());



