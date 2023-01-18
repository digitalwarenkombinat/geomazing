var createGeoJSONCircle = function(center, radius) {
  const points = 64;

  const coords = {
      latitude: center[1],
      longitude: center[0]
  };

  let ret = [];
  const distanceX = radius/(111.320*Math.cos(coords.latitude*Math.PI/180));
  const distanceY = radius/110.574;

  var theta, x, y;
  for(var i=0; i<points; i++) {
      theta = (i/points)*(2*Math.PI);
      x = distanceX*Math.cos(theta);
      y = distanceY*Math.sin(theta);

      ret.push([coords.longitude+x, coords.latitude+y]);
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
};

class CircularGeofenceRegion {
  constructor(opts) {
    Object.assign(this, opts)
  }

  inside(lat2, lon2) {
    const lat1 = this.latitude
    const lon1 = this.longitude
    const R = 63710; // Earth's radius in m
    console.log(lat1, lat2, lon1, lon2)
  
    return Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
                     Math.cos(lat1)*Math.cos(lat2) *
                     Math.cos(lon2-lon1)) * R < this.radius;
  }
}

const fenceA = new CircularGeofenceRegion({
  id: 'lene_tauscho',
  latitude: 51.3331807,
  longitude: 12.4043691,
  radius: 10, // meters
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

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VyZGVzcXVlIiwiYSI6ImNsNnowcWg1eDAwZmQzY211cTYyZ2FsaHYifQ.gOYM4cFcp8rcqUCwsgsjug';

// Create new Mapbox
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/gerdesque/clckluor2000l14lbev40r74r',
});

// Add fullscreen control
// map.addControl(new mapboxgl.FullscreenControl());

// Add geolocate control
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
})

map.addControl(geolocate);

geolocate.on('geolocate', ({coords}) => {
  const lat = coords.latitude
  const lon = coords.longitude

  console.log('Your current position is:');
  console.log(`Latitude : ${lat}`);
  console.log(`Longitude: ${lon}`);
  for (const fence of fences) {
    if (fence.inside(lat, lon)) {
      map.setPaintProperty(fence.id, 'fill-color', 'red');
      fence.alreadyEntered = true;

      map.on('click', fence.id, (e) => {
        switch (fence.id) {
          case 'lene_tauscho':
            $.wiki('<<goto "lene_tauscho">>')
            break;
          case 'lene_tischtennis':
            $.wiki('<<goto "lene_tischtennis">>')
            break;
          default:
            console.log(`${fence.id} not found`);
        }
      });

    } else {
      map.setPaintProperty(fence.id, 'fill-color', 'blue');
    }
  }
});

map.on('load', () => {
  renderMap();    
})

function renderMap() {
  // Resize map on load
  map.resize();

  for (const fence of fences) {
    map.addSource(fence.id, createGeoJSONCircle([fence.longitude, fence.latitude], fence.radius/1000));
  }
  
  map.addLayer({
    'id': 'lene_tauscho',
    'type': 'fill',
    'source': 'lene_tauscho',
    'layout': {},
    'paint': {
      'fill-color': 'blue',
      'fill-opacity': 0.6
    }
  });

  map.addLayer({
    'id': 'lene_tischtennis',
    'type': 'fill',
    'source': 'lene_tischtennis',
    'layout': {},
    'paint': {
      'fill-color': 'blue',
      'fill-opacity': 0.6
    }
  });

  map.addLayer({
    'id': 'wiedebach_spielplatz',
    'type': 'fill',
    'source': 'wiedebach_spielplatz',
    'layout': {},
    'paint': {
      'fill-color': 'blue',
      'fill-opacity': 0.6
    }
  });

  map.addLayer({
    'id': 'wiedebach_tram',
    'type': 'fill',
    'source': 'wiedebach_tram',
    'layout': {},
    'paint': {
      'fill-color': 'blue',
      'fill-opacity': 0.6
    }
  });
}