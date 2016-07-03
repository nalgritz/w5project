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
    var places = fromSearchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
  });
  toSearchBox.addListener('places_changed', function() {
    var places = toSearchBox.getPlaces();
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

/*
 *  datetimepicker
 */
jQuery('#datetimepicker').datetimepicker({
 allowTimes:[
  '00:00', '00:30',
  '01:00', '01:30',
  '02:00', '02:30',
  '03:00', '03:30',
  '04:00', '04:30',
  '05:00', '05:30',
  '06:00', '06:30',
  '07:00', '07:30',
  '08:00', '08:30',
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
  '18:00', '18:30',
  '19:00', '19:30',
  '20:00', '20:30',
  '21:00', '21:30',
  '22:00', '22:30',
  '23:00', '23:30',
  ],
  minDate: '0'
});

  // // change background in every 15 sec
  // var rotateBackground = function() {
  //   var curImgId = 0;
  //   var numberOfImages = 5; // Change this to the number of background images
  //   window.setInterval(function() {
  //   $('body').css('background', "url('/assets/background' + curImgId + '.jpg')");
  //     curImgId = (curImgId + 1) % numberOfImages;
  //     console.log('run')}, 15*1000);
  // }();
  // rotateBackground();