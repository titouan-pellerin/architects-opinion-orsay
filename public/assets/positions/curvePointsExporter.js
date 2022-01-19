#target illustrator

// the current selection
var selection = app.activeDocument.selection;

// create a txt-file for the data
var file = File.saveDialog('Save a comma-separated list of the x and y coordinates of the points of the current selection, relative to the coordinate system of the artboard.', 'Comma-separated values:*.csv');

// enable writing to the file
file.open('w')

// iterate through each selected item
for (var i = 0; i < selection.length; i++) {
  var item = selection[i];

  // check if selection is a PathItem
  if (item.typename === "PathItem") {

    // every PathItem has a list of pathPoints
    var points = item.pathPoints;

    // iterate through each pathPoint of the item
    // for (var j = points.length - 1; j >= 0; j--) {
    for (var j = 0; j < points.length; j++) {

      // the point in document coordinates, relative to the center of the whole document
      var documentPoint = points[j].anchor;

      // the point converted to artboard coordinates, relative to where you have placed the origin of the coordinate system
      var artboardPoint = app.activeDocument.convertCoordinate(documentPoint, app.coordinateSystem, CoordinateSystem.ARTBOARDCOORDINATESYSTEM);

      // write the artboard coordinates to the file
      file.write(documentPoint[0] + "," + (-documentPoint[1]) + "\n");
    }
  }
}

// stop writing to the file and save it
file.close();