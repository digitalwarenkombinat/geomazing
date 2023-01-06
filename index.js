mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VyZGVzcXVlIiwiYSI6ImNsNnowcWg1eDAwZmQzY211cTYyZ2FsaHYifQ.gOYM4cFcp8rcqUCwsgsjug';
const isInside = true;
// Create new Mapbox
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v12',
  center: [12, 51],
  zoom: 1
});

// Add fullscreen control
map.addControl(new mapboxgl.FullscreenControl());

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
  // for (const fence of fences) {
  //   if (fence.inside(lat, lon)) {
  //   }
  // }
});

map.on('load', () => {
  renderMap();    
})

function renderMap() {
  // Resize map on load
  map.resize();

  // Add polygon 'lene_wiese'
  map.addSource('lene_wiese', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
              [12.4043691, 51.3331807],
              [12.4044308, 51.3331975],
              [12.4045005, 51.3334103],
              [12.4044496, 51.3334522],
              [12.4030682, 51.333717],
              [12.4029797, 51.3336969],
              [12.4028644, 51.333469],
              [12.4043691, 51.3331807]
            ]
          ]
        }
    }
  });
  map.addLayer({
    'id': 'lene_wiese',
    'type': 'fill',
    'source': 'lene_wiese',
    'layout': {},
    'paint': {
      'fill-color': isInside ? 'red' : 'blue',
      'fill-opacity': 0.5
    }
  });

  // Add polygon 'lene_tischtennis'
  map.addSource('lene_tischtennis', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [12.4028054, 51.3334371],
            [12.401998, 51.333593],
            [12.4020168, 51.3334019],
            [12.4027169, 51.3332595],
            [12.4028054, 51.3334371 ]
          ]
        ]
      }
    }
  });
  map.addLayer({
    'id': 'lene_tischtennis',
    'type': 'fill',
    'source': 'lene_tischtennis',
    'layout': {},
    'paint': {
      'fill-color': 'blue',
      'fill-opacity': 0.5
    }
  });

  // Add polygon 'wiedebach_spielplatz'
  map.addSource('wiedebach_spielplatz', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [
              12.3772895,
              51.3099782
            ],
            [
              12.3772466,
              51.3098323
            ],
            [
              12.3773673,
              51.3097837
            ],
            [
              12.3775953,
              51.3097904
            ],
            [
              12.3778045,
              51.3098625
            ],
            [
              12.3777696,
              51.309995
            ],
            [
              12.3772895,
              51.3099782
            ]
          ]
        ]
      }
    }
  });
  map.addLayer({
    'id': 'wiedebach_spielplatz',
    'type': 'fill',
    'source': 'wiedebach_spielplatz',
    'layout': {},
    'paint': {
      'fill-color': 'blue',
      'fill-opacity': 0.5
    }
  });

  // Add polygon 'wiedebach_tram'
  map.addSource('wiedebach_tram', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [
              12.3787621,
              51.3101324
            ],
            [
              12.3786816,
              51.3101291
            ],
            [
              12.3785797,
              51.3101006
            ],
            [
              12.3784938,
              51.3100687
            ],
            [
              12.378526,
              51.3099664
            ],
            [
              12.3786601,
              51.3099178
            ],
            [
              12.3787916,
              51.3099413
            ],
            [
              12.378864,
              51.3099933
            ],
            [
              12.3788452,
              51.310062
            ],
            [
              12.3787621,
              51.3101324
            ]
          ]
        ]
      }
    }
  });
  map.addLayer({
    'id': 'wiedebach_tram',
    'type': 'fill',
    'source': 'wiedebach_tram',
    'layout': {},
    'paint': {
      'fill-color': 'blue',
      'fill-opacity': 0.5
    }
  });
}