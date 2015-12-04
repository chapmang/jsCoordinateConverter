DatumConversion = function () {};

// Utility function to convert degrees to radians
Math.deg2Rad = function(degrees) {
	return degrees * Math.PI / 180;
};

// Utility function to convert radians to degrees
Math.rad2Deg = function(radians) {
	return radians * 180 / Math.PI;
};


DatumConversion.toCartesian = function (coordinates, ellipsoidCode) {

	var ellipoid = ellipoidConstants[0][ellipsoidCode];
	
	var lon = Math.deg2Rad(coordinates.getXAxis());
	var lat = Math.deg2Rad(coordinates.getYAxis());
	var height = coordinates.getZAxis();

	var semiMajor = ellipoid.a
	var semiMinor = ellipoid.b
	var e2 = TransversMercatorConversion.eccentricitySquared(semiMajor,semiMinor);

	var sinLat = Math.sin(lat);
	var cosLat = Math.cos(lat);
	var sinLon = Math.sin(lon);
	var cosLon = Math.cos(lon);

	var v = semiMajor / (Math.sqrt(1 - (e2 * Math.pow(sinLat,2))));
	var x = (v + height) * cosLat * cosLon;
	var y = (v + height) * cosLat * sinLon;
	var z = ((1 - e2) * v + height) * sinLat;


	return new xYValues(x,y,z);

};

DatumConversion.fromCartesian = function (coordinates, ellipsoidCode) {


}