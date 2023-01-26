$(document).one(":passagedisplay", function(event) {
  var createGeoJSONCircle = function(center, radius) {
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
  };

  mapboxgl.accessToken = State.variables.accessToken

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gerdesque/clckluor2000l14lbev40r74r',
  });

  var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  })

  map.addControl(geolocate);

  var remainingFences = State.variables.fences.filter(f => f.alreadyEntered === false)

  geolocate.on('geolocate', ({ coords }) => {
    const lat = coords.latitude
    const lon = coords.longitude

    for (const fence of remainingFences) {
      if (fence.inside(lat, lon)) {
        map.setPaintProperty(fence.id, 'fill-color', 'red');

        map.on('click', fence.id, (e) => {
          State.variables.fences.find(f => f.id === fence.id).alreadyEntered = true;
          switch (fence.id) {
            case 'lene_tauscho':
              $.wiki('<<goto "lene_tauscho">>')
              break;
            case 'lene_tischtennis':
              $.wiki('<<goto "lene_tischtennis">>')
              break;
            case 'wiedebach_spielplatz':
              $.wiki('<<goto "wiedebach_spielplatz">>')
              break;
            case 'wiedebach_tram':
              $.wiki('<<goto "wiedebach_tram">>')
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
    map.resize();

    for (const fence of remainingFences) {
      map.addSource(fence.id, createGeoJSONCircle([fence.longitude, fence.latitude], fence.radius / 1000));

      map.addLayer({
        'id': fence.id,
        'type': 'fill',
        'source': fence.id,
        'layout': {},
        'paint': {
          'fill-color': 'blue',
          'fill-opacity': 0.6
        }
      });
    }

  }
});