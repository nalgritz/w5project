$(document).ready(function() {
/**
 *  searchbar autocomplete
 */
  function initAutocomplete() {
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
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

});