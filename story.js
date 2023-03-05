importStyles("https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css");
setup.mapboxLoaded = importScripts("https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js")

class CircularGeofenceRegion {
  constructor(opts) {
    Object.assign(this, opts)
  }
}

const fenceA = new CircularGeofenceRegion({
  id: 'lene_tauscho',
  latitude: 51.3331807,
  longitude: 12.4043691,
  description: 'Hier steht Lenes Tauscho.',
  radius: 10, // meters
  alreadyEntered: false
});

const fenceB = new CircularGeofenceRegion({
  id: 'lene_tischtennis',
  latitude: 51.3334271,
  longitude: 12.4023682,
  description: 'Hier befindet sich eine Platte zum Tischtennis.',
  radius: 10, // meters
  alreadyEntered: false
});

const fenceC = new CircularGeofenceRegion({
  id: 'wiedebach_spielplatz',
  latitude: 51.3098843,
  longitude: 12.3776221,
  description: 'Ein Spielplatz am Wiedebachplatz.',
  radius: 10, // meters
  alreadyEntered: false
});

const fenceD = new CircularGeofenceRegion({
  id: 'wiedebach_tram',
  latitude: 51.3099849,
  longitude: 12.3787808,
  description: 'An dieser Stelle hält die Tram.',
  radius: 10, // meters
  alreadyEntered: false
});

const fences = [fenceA, fenceB, fenceC, fenceD]

setup.getFences = function () {
  return fences;
};

setup.getDisplayedFences = function (displayFences) {
  return fences.filter(f => displayFences.some(df => f.id === df));
};

(function () {
  
  window.geolocation = {

    getGeolocateControl: function() {
      return {
          positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }
    },
    
    inside: function(lat1, lon1, radius, lat2, lon2) {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2-lat1) * Math.PI / 180;
      const dLon = (lon2-lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c * 1000;
      // console.log(distance)
      return distance < radius;
	},
    
    createGeoJSONCircle: function(center, radius) {
      const points = 64;
      const coords = {
        latitude: center[1],
        longitude: center[0]
      };
  
      let ret = [];
      const distanceX = radius / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
      const distanceY = radius / 110.574;
  
      var theta, x, y;
      for (var i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);
  
        ret.push([coords.longitude + x, coords.latitude + y]);
      }
      ret.push(ret[0]);
  
      return {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [ret]
            }
          }]
        }
      };
    }

  };

}());