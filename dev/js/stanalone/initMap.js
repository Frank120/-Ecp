let InitMap;

InitMap = (function () {

    function InitMap(el, options, forcedOptions) {
        this.markers = [];
        this.infoWindows = [];
        this.mapOptions = {
            zoom: 10,
            scorllwheel: false,
            mapTypeControl: false,
            zoomControl: true,
            panControl: false,
            streetViewControl: false,
            center: new google.maps.LatLng(0,0)
        };

        if ((options.lat != null) && (options.lng != null)) {
            this.mapOptions.center = new google.maps.LatLng(options.lat, options.lng);
        }
    }

    return InitMap;
})();