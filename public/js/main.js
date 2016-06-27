/**
 *  searchbar autocomplete
 */
function initAutocomplete() {
  // Create the search box and link it to the UI element.
  var inputs = document.getElementsByClassName('location');
  var fromSearchBox = new google.maps.places.SearchBox(inputs[0]);
  var toSearchBox = new google.maps.places.SearchBox(inputs[1]);

// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
  fromSearchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
  });
  toSearchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
  });
}

/**
 *  Socket.io
 */
var socket = io();
socket.on('connect', function() {
  console.log('Connected');
});
socket.on('app:welcome', function(msg){
  console.log(msg);
});