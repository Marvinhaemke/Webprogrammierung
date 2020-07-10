
//In diesem Script wird die Karte erzeugt. Hierzu wird die Google Maps Api, Google Directions Api, Google Geocoding Api und die and diese Seite übermittelten Daten des Nutzers benutzt

var geocoder;
var map;
var directionsService;
var directionsRenderer;


//Die Karte wird initialisiert, zuerst mit beliebigen Längen und Breitengraden.
function initMap() {
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(50.278, 8.802);
    //Das ZoomLevel und Zenter der Map wird festgelegt
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //die erstellte Map wird dem Directionsrenderer zugewiesen
    directionsRenderer.setMap(map);
    //diese Funktion wird aufgerufen um die Route anzuzeigen

    calculateAndDisplayRoute(directionsService, directionsRenderer);
}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    //Ursprung und Ziel der Route wird anhand der übermittelten Werte festgelegt, dan wird die Route berechnet
    directionsService.route(
        {
            origin: {query: document.getElementById('address').value},
            destination: {query: document.getElementById('standort').value},
            travelMode: 'DRIVING'
        }, //anschließend wird die Route auf der Map angezeigt
        function(response, status) {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}



