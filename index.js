$(document).one(":passagedisplay", function(event) {
  
  mapboxgl.accessToken = State.variables.accessToken

  var map = new mapboxgl.Map({
    container: 'map',
    style: State.variables.style,
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
          // State.variables.fence = State.variables.fences.find(f => f.id === fence.id)
          // State.variables.fence.alreadyEntered = true;
          // try {
          // 	$.wiki('<<goto $fence.id >>')
          // } catch (ex) {
          // 	console.log(`${fence.id} not found`);
          // }
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
      map.addSource(fence.id, window.geolocation.createGeoJSONCircle([fence.longitude, fence.latitude], fence.radius / 1000));

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