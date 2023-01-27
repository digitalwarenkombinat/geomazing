setup.JSLoaded = false;
var lockID = LoadScreen.lock();
importStyles("https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css");
importScripts("https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js")
	.then(function() {
		setup.JSLoaded = true;
		Engine.play(passage(), true);
		LoadScreen.unlock(lockID);
	}).catch(function(error) {
		alert(error);
	}
);

class CircularGeofenceRegion {
  constructor(opts) {
    Object.assign(this, opts)
  }

  inside(lat2, lon2) {
    const lat1 = this.latitude
    const lon1 = this.longitude
    const R = 63710; // Earth's radius in m
    // console.log(lat1, lat2, lon1, lon2)
  
    return Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
                     Math.cos(lat1)*Math.cos(lat2) *
                     Math.cos(lon2-lon1)) * R < this.radius;
  }
}

setup.storyinit = function () {
    const fenceA = new CircularGeofenceRegion({
      id: 'lene_tauscho',
      latitude: 51.3331807,
      longitude: 12.4043691,
      radius: 10000, // meters
      alreadyEntered: false
    });

    const fenceB = new CircularGeofenceRegion({
      id: 'lene_tischtennis',
      latitude: 51.3334271,
      longitude: 12.4023682,
      radius: 10, // meters
      alreadyEntered: false
    });

    const fenceC = new CircularGeofenceRegion({
      id: 'wiedebach_spielplatz',
      latitude: 51.3098843,
      longitude: 12.3776221,
      radius: 10, // meters
      alreadyEntered: false
    });

    const fenceD = new CircularGeofenceRegion({
      id: 'wiedebach_tram',
      latitude: 51.3099849,
      longitude: 12.3787808,
      radius: 10, // meters
      alreadyEntered: false
    });

    const fences = [fenceA, fenceB, fenceC, fenceD]
    return fences;
};

(function () {
  
  window.geolocation = {

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