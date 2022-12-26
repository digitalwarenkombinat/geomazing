# Geomazing

> A scavenger hunt web application created with Twine and Mapbox GL JS.

## TODO
1. Implement a map in Twine. Install [Twine](https://twinery.org/) to create a new story.
2. Make the map compatible with Mapbox. [Here](https://docs.mapbox.com/mapbox-gl-js/example/) is an example how to display a Mapbox map on a website. 
3. Show the player's position on the map.
4. Create a geofence example (circle) that could be duplicated and adjusted.
5. Implement a visual representation of the geofence on the map - either a polygon in Mapbox Studio or as an PNG graphic.
6. Implement a logic that detects when the player has entered a certain geofence.
7. Implement a visual feedback that the player knows he/she has entered the geofence - prompt or PNG changes the colour from red to green.
8. Implement an interaction that allows the player to access the corresponding twine passage (it would be best if the player could press directly on the green geofence circle and then be directed to the corresponding passage).
9. Implement a logic that disables geofences that have already been entered, so that the content cannot be accessed more than once.
10. Make sure that the GPS tracking also works when the display is switched off and is updated regulary.
