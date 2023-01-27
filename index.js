$(document).one(":passagedisplay", function(event) {
  
  mapboxgl.accessToken = State.variables.accessToken

  var map = new mapboxgl.Map({
    container: 'map',
    style: State.variables.style,
  });

  var geolocate = new mapboxgl.GeolocateControl(window.geolocation.getGeolocateControl());

  map.addControl(geolocate);

  var remainingFences = State.variables.fences.filter(f => f.alreadyEntered === false)

  geolocate.on('geolocate', ({ coords }) => {
    const lat = coords.latitude
    const lon = coords.longitude
    // console.log(`Koordinaten : ${lat}; ${lon}`);

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
            case 'johannistorturm':
              $.wiki('<<goto "1.1">>')
              break;
            case 'marsfeld':
              $.wiki('<<goto "2.1">>')
              break;
            case 'grauer_hof':
              $.wiki('<<goto "3.1">>')
              break;
            case 'markt':
              $.wiki('<<goto "4.1">>')
              break;
            case 'holzmarkt':
              $.wiki('<<goto "5.1">>')
              break;
            case 'halken':
              $.wiki('<<goto "6.1">>')
              break;
            case 'rabenturm':
              $.wiki('<<goto "7.1">>')
              break;
            case 'ozelot':
              $.wiki('<<goto "8.1">>')
              break;
            case 'pferd':
              $.wiki('<<goto "9.1">>')
              break;
            case 'schildkröte':
              $.wiki('<<goto "10.1">>')
              break;
            case 'schlange':
              $.wiki('<<goto "11.1">>')
              break;
            case 'schwein':
              $.wiki('<<goto "12.1">>')
              break;
            case 'truthahn':
              $.wiki('<<goto "13.1">>')
              break;
            case 'zebra':
              $.wiki('<<goto "14.1">>')
              break;
            case 'affe':
              $.wiki('<<goto "15.1">>')
              break;
            case 'eule':
              $.wiki('<<goto "16.1">>')
              break;
            case 'gazelle':
              $.wiki('<<goto "17.1">>')
              break;
            case 'katze':
              $.wiki('<<goto "18.1">>')
              break;
            case 'krokodil':
              $.wiki('<<goto "19.1">>')
              break;
            case 'lama':
              $.wiki('<<goto "20.1">>')
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
    // console.log($(".mapboxgl-ctrl-geolocate"));
	  $(".mapboxgl-ctrl-geolocate").click();
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