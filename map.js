var map;

function createMap(){
    var options = {
        center: { lat: 40.753259, lng: -74.003804},
        zoom: 17
    };

    map = new google.maps.Map(document.getElementById('map'), options);

    var input = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });


 addMarker({
   coords:{lat:39.9621, lng:-75.1716},
});


 addMarker({
   coords:{lat:42.1860196, lng:-79.0314869},
   content: "<h1>Conewango Creek</h1>"
});

 addMarker({
   coords:{lat:40.7827725, lng:-73.9653627},
});


// -----------------------------------------------------

 //Add marker Function


 function addMarker(props){
     var marker = new google.maps.Marker({
         position:props.coords,
         map:map,
         //icon:props.iconImage
     });

     if (props.content){
        var infoWindow = new google.maps.InfoWindow({
            content: props.content
      });
    
      marker.addListener('click', function(){
          infoWindow.open(map,marker);
      });

     }
 }

  var markers = [];

    searchBox.addListener('places_changed', function(){
        var places= searchBox.getPlaces();

        if (places.length === 0)
            return;
        
        markers.forEach(function (m) {m.setMap(null); });
        markers = [];

        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (p) {
            if (!p.geometry)
                return;

            markers.push(new google.maps.Marker({
                map: map,
                title: p.name,
                position: p.geometry.location
            }));

            if (p.geometry.viewport)
                bounds.union(p.geometry.viewport);
            else
                bounds.extend(p.geometry.location);
        });
        map.fitBounds(bounds);
    });

}

// -----------------------------------------------------

// markers

function centerMap(lat, lng) {

  var latLng = new google.maps.LatLng(lat, lng)
    var tracer = {
    url: "garage.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    position:latLng
};
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: tracer,
});
  map.panTo(latLng);
}

// document.getElementById('testtest').onmouseover = function() {
//   centerMap(39.9621, -75.1716)
// };

// function circleMap(lati, long, radi) {
//   var cityCircle = new google.maps.Circle({
//       strokeColor: '#FF0000',
//       strokeOpacity: 0.8,
//       strokeWeight: 2,
//       fillColor: '#FF0000',
//       fillOpacity: 0.35,
//       map: map,
//       center: {lat: lati, lng: long},
//       radius: radi
//     });
// }

