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

	var ellipoid = ellipoidConstants[ellipsoidCode];
	
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

	var ellipoid = ellipoidConstants[ellipsoidCode];
	
	var x = coordinates.getXAxis();
	var y = coordinates.getYAxis();
	var z = coordinates.getZAxis();

	var semiMajor = ellipoid.a
	var semiMinor = ellipoid.b
	var e2 = TransversMercatorConversion.eccentricitySquared(semiMajor,semiMinor);

	var lon = Math.atan2(y , x);

	var v = semiMajor / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(y),2))));
	var p = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	var lat = Math.atan2(z , p * (1 - e2));

	while (Math.abs(y - lat) > (4 / semiMajor)) {
		y = lat;
		var v = semiMajor / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(y),2))));
		var lat = Math.atan2((z + e2 * v * Math.sin(y)) , p);
	}

	var height = (p / Math.cos(lat)) - v;

	lon = Math.rad2Deg(lon);
	lat = Math.rad2Deg(lat);
	return new lonLatValues(lon, lat, height);
};

DatumConversion.helmertTransformation = function (x, y, z, t) {

	var tx = t["translationVectors"]["x"];
	var ty = t["translationVectors"]["y"];
	var tz = t["translationVectors"]["z"];


	var rx = Math.deg2Rad(t["rotationMatrix"]["x"] / 3600);
	var ry = Math.deg2Rad(t["rotationMatrix"]["y"] / 3600);
	var rz = Math.deg2Rad(t["rotationMatrix"]["z"] / 3600);

	var s = t["scaleFactor"] / 1e6;

	var xAxis = tx + x * (1 + s) - y * rz + z * ry;
	var yAxis = ty + x * rz + y * (1 + s) - z * rx;
	var zAxis = tz - x * ry + y * rx + z * (1 + s);

	return [xAxis, yAxis, zAxis];
};