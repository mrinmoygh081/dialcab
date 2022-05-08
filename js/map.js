

/* ============================================
Google Map
============================================ */

$(window).on('load', function () {

    // Map Variables
    var addressString = 'Houston Taxi Services, USA';
    var myLatlng = {
        lat: 29.9908,
        lng: -95.348293
    };

    // 1. Render Map
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: myLatlng
    });

    // 2. Add Marker
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Click To See Address"
    });

    // 3. Add Info Window
    var infowindow = new google.maps.InfoWindow({
        content: addressString
    });

    // Show info window when user clicks marker
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    // 4. Resize Function
    google.maps.event.addDomListener(window, 'resize', function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });
});



var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: { lat: 29.9908, lng: -95.348293 },
        zoom: 13
    });

    new AutocompleteDirectionsHandler(map);

}

function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsRenderer.setMap(map);


    var source = document.getElementById('origin-input');

    var destination = document.getElementById('destination-input');


    var originAutocomplete = new google.maps.places.Autocomplete(source);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(['place_id']);

    var destinationAutocomplete = new google.maps.places.Autocomplete(destination);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(['place_id']);

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
}


AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
    autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            window.alert('Please select an option from the dropdown list.');
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
        findDist1();
    });
};

AutocompleteDirectionsHandler.prototype.route = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;

    this.directionsService.route(
        {
            origin: { 'placeId': this.originPlaceId },
            destination: { 'placeId': this.destinationPlaceId },
            travelMode: this.travelMode
        },
        function (response, status) {
            if (status === 'OK') {
                me.directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
};

function findDist1() {

    var addr1 = document.getElementById("origin-input").value;

    var addr2 = document.getElementById("destination-input").value;

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [addr1],
        destinations: [addr2],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;

            distancefinel = distance.split(" ");
            var onlyDistanceValue = distancefinel[0];

            var str2 = onlyDistanceValue.replace(/\,/g, "");
            var numDistance = parseFloat(str2, 10)

            // km to Mile conver
            var DistanceInMile = parseFloat(0.621371 * numDistance).toFixed(2);


            $('.distance').val(DistanceInMile);

            // set distance between two place
            document.getElementById("distance2").innerHTML = "<label>Distance between LOCATIONS</label><p>Distance between the location is " + DistanceInMile + ".</p>";
            document.getElementById("travelTime").innerHTML = "<label>Duration: </label><p>Travel time is approximately " + duration + ".</p>";

            var low_price = Math.round(1.67764 * DistanceInMile)
            var high_price = Math.round(2.6 * DistanceInMile);

            if (low_price < 20) {
                low_price = 20;
            }
            if (high_price < 25) {
                high_price = 25
            }
            var continueBtn = document.getElementById("continueBtn");
            continueBtn.addEventListener("click", () => {
                var strDistance = DistanceInMile.toString();
                // localStorage.setItem("distance", strDistance);

                $.ajax({
                    url: "process.php",
                    method: "post",
                    data: { dist: JSON.stringify(strDistance) },
                    success: function (res) {
                        console.log(res);
                    },
                    error: function (xhr, type, exception) {
                        // if ajax fails display error alert
                        alert("ajax error response type " + type);
                    }
                })
            });
        } else {
            alert("Unable to find the distance between selected locations");
        }
    });
}

function onError(error) {

    switch (error.code) {

        case PERMISSION_DENIED:

            alert("User denied permission");
            break;

        case TIMEOUT:

            alert("Geolocation timed out");
            break;

        case POSITION_UNAVAILABLE:

            alert("Geolocation information is not available");
            break;

        default:

            alert("Unknown error");
            break;
    }

}
