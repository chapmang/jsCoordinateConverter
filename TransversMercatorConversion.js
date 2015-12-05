TransversMercatorConversion = function () {};

// Utility function to convert degrees to radians
Math.deg2Rad = function(degrees) {
	return degrees * Math.PI / 180;
};

// Utility function to convert radians to degrees
Math.rad2Deg = function(radians) {
	return radians * 180 / Math.PI;
};

TransversMercatorConversion.meridionalArc = function (b, F0, n, lat, lat0) {
	
	var Ma = (1 + n + ((5 / 4) * Math.pow(n, 2)) + ((5 / 4) * Math.pow(n, 3))) * (lat - lat0);
  	var Mb = ((3 * n) + (3 * Math.pow(n, 2)) + ((21 / 8) * Math.pow(n, 3))) * Math.sin(lat - lat0) * Math.cos(lat + lat0);
  	var Mc = ((15 / 8) * Math.pow(n, 2) + (15 / 8) * Math.pow(n, 3)) * Math.sin(2 * (lat - lat0)) * Math.cos(2 * (lat + lat0));
  	var Md = (35 / 24) * Math.pow(n, 3) * Math.sin(3 * (lat - lat0)) * Math.cos(3 * (lat + lat0));
  	var M = b * F0 * (Ma - Mb + Mc - Md);

  	return M;
};

TransversMercatorConversion.eccentricitySquared = function(a,b) {

	var e2 = (Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(a, 2);
	return e2;
};

TransversMercatorConversion.latLonToEN = function(coordinates, projectionCode, ellipsoidCode) {

	var projection = projectionConstants[projectionCode];
	var ellipoid = ellipoidConstants[ellipsoidCode];

	var lon = Math.deg2Rad(coordinates.getXAxis());
	var lat = Math.deg2Rad(coordinates.getYAxis());

	var F0 = projection.F0;
	var lon0 = Math.deg2Rad(projection.lon0);
	var lat0 = Math.deg2Rad(projection.lat0);
	var N0 = projection.N0;
	var E0 = projection.E0;
	var a = ellipoid.a;
	var b = ellipoid.b;
	var e2 = TransversMercatorConversion.eccentricitySquared(a,b);
	var n = (a - b) / (a + b);


	var cosLat = Math.cos(lat);
	var sinLat = Math.sin(lat);
	var tanLat = Math.tan(lat);
	var nu = a * F0 * (Math.pow(1 - e2 * Math.pow(sinLat, 2), -0.5));
	var rho = a * F0 * (1 - e2) * Math.pow(1 - e2 * Math.pow(sinLat, 2), -1.5);
	var eta2 = (nu / rho) - 1;

	var M = TransversMercatorConversion.meridionalArc(b, F0, n, lat, lat0);	

	var I = M + N0;
	var II = (nu / 2) * sinLat * cosLat;
	var III = (nu / 24) * sinLat * Math.pow(cosLat, 3) * (5 - Math.pow(tanLat, 2) + 9 * eta2);
	var IIIA = (nu / 720) * sinLat * Math.pow(cosLat, 5) * (61 - 58 * Math.pow(tanLat, 2) + Math.pow(tanLat, 4));
	var IV = nu * cosLat;
	var V = (nu / 6) * Math.pow(cosLat, 3) * (nu / rho - Math.pow(tanLat, 2));
	var VI = (nu / 120) * Math.pow(cosLat, 5) * (5 - 18 * Math.pow(tanLat, 2) + Math.pow(tanLat, 4) + 14 * eta2 - 58 * Math.pow(tanLat, 2) * eta2);

	var dLon = lon - lon0;

	var N = I + II * Math.pow(dLon, 2) + III * Math.pow(dLon, 4) + IIIA * Math.pow(dLon, 6);
	var E = E0 + IV * dLon + V * Math.pow(dLon, 3) + VI * Math.pow(dLon, 5);

	return new eastNorthValues(E, N, 0);
};

TransversMercatorConversion.enToLonLat = function(coordinates, projectionCode, ellipsoidCode) {

	var E = coordinates.getXAxis();
	var N = coordinates.getYAxis();

	var projection = projectionConstants[projectionCode];
	var ellipoid = ellipoidConstants[ellipsoidCode];

	var a = ellipoid.a;
	var b = ellipoid.b;
	var F0 = projection.F0;
	var lat0 = Math.deg2Rad(projection.lat0);
	var lon0 = Math.deg2Rad(projection.lon0);
	var N0 = projection.N0;
	var E0 = projection.E0;
	var e2 = TransversMercatorConversion.eccentricitySquared(a,b);
	var n = (a - b) / (a + b);

	var lat1 = ((N - N0) / (a * F0)) + lat0;
	var M = TransversMercatorConversion.meridionalArc(b, F0, n, lat1, lat0);

	do {
		lat1 = (N - N0 - M) / (a * F0) + lat1;
		M = TransversMercatorConversion.meridionalArc(b, F0, n, lat1, lat0);
	} while (N - N0 - M >= 0.00001);

	var cosLat1 = Math.cos(lat1);
	var sinLat1 = Math.sin(lat1);
	var tanLat1 = Math.tan(lat1);
	var nu = a * F0 * (Math.pow(1 - e2 * Math.pow(sinLat1, 2), -0.5));
	var rho = a * F0 * (1 - e2) * Math.pow(1 - e2 * Math.pow(sinLat1, 2), -1.5);
	var eta2 = (nu / rho) - 1;

	var VII = tanLat1 / (2 * rho * nu);
	var VIII = tanLat1 / (24 * rho * Math.pow(nu, 3)) * (5 + 3 * Math.pow(tanLat1, 2) + eta2 - 9 * Math.pow(tanLat1, 2) * eta2);
	var IX = tanLat1 / (720 * rho * Math.pow(nu, 5)) * (61 + 90 * Math.pow(tanLat1, 2) + 45 * Math.pow(tanLat1, 4));
	var X = (1 / cosLat1) / nu;
	var XI = (1 / cosLat1) / (6 * Math.pow(nu, 3)) * (nu / rho + 2 * Math.pow(tanLat1, 2));
	var XII = (1 / cosLat1) / (120 * Math.pow(nu, 5)) * (5 + 28 * Math.pow(tanLat1, 2) + 24 * Math.pow(tanLat1, 4));
	var XIIA = (1 / cosLat1) / (5040 * Math.pow(nu,7)) * (61 + 662 * Math.pow(tanLat1, 2) + 1320 * Math.pow(tanLat1, 4) + 720 * Math.pow(tanLat1, 6));

	var lat = lat1 - (VII * Math.pow((E - E0), 2)) + (VIII * Math.pow((E - E0), 4)) - (IX * Math.pow((E - E0), 6));
	var lon = lon0 + X * (E - E0) - XI * Math.pow((E - E0), 3) + XII * Math.pow((E - E0), 5) - XIIA * Math.pow((E - E0), 7);
	
	return new lonLatValues(Math.rad2Deg(lon), Math.rad2Deg(lat), 0);		
};

function ENPoint(location) {

	this.east = location.getXAxis();
	this.north = location.getYAxis();
}

function lonLatPoint(location) {

	this.lon = location.getXAxis();
	this.lat = location.getYAxis();
}

