// XYZ Coordinate Abstract Class
var xyzCoordinate = xyzCoordinate || function() {

	this.xAxis = 0;
	this.yAxis = 0;
	this.zAxis = 0;

	throw new Error("Cannot create and instance of an abstract class");
};

xyzCoordinate.prototype.setCoordinates = function(x, y, z) {
	
	this.isNumeric = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	if (this.isNumeric(x)) {
		this.xAxis = x;
	} else {
		throw new Error("x-Axis must be numeric");
	}

	if (this.isNumeric(y)) {
		this.yAxis = y;
	} else {
		throw new Error("y-Axis must be numeric");
	}

	if (this.isNumeric(z)) {
		this.zAxis = z;
	} else {
		throw new Error("z-Axis must be numeric");
	}

	return;
};

xyzCoordinate.prototype.getXAxis = function(){
	return this.xAxis;
};
xyzCoordinate.prototype.getYAxis = function(){
	return this.yAxis;
};
xyzCoordinate.prototype.getZAxis = function(){
	return this.zAxis;
};

var eastNorthValues = function(easting, northing, height) {

	this.setCoordinates(easting, northing, height);
};

eastNorthValues.prototype = Object.create(xyzCoordinate.prototype);

var lonLatValues = function(longitude, latitude, height) {

	this.setCoordinates(longitude, latitude, height);
};

lonLatValues.prototype = Object.create(xyzCoordinate.prototype);

var xYValues = function(x, y, z) {

	this.setCoordinates(x, y, z);
};

xYValues.prototype = Object.create(xyzCoordinate.prototype);