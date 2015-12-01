var projectionConstants = [{
	"OSNG" : {
			F0 : 0.9996012717,	// NatGrid scale factor on central meridian
			lat0 : 49.0,		// NatGrid true origin - Latitude
			lon0 : -2.0,		// NatGrid true origin - Longitude
			N0 : -100000,		// Northing of true origin (metres)		
			E0 : 400000,		// Easting of true origin (meters)
		},
}];

var ellipoidConstants = [{
	"Airy1830" : {
		a : 6377563.396,	// Semi-major axis (metres)
		b : 6356256.909,	// Semi-minor axis (metres)
	},
	"GRS80": {
		a: 6378137.0,		// Semi-major axis (metres)
		b: 6356752.3141		// Semi-minor axis (metres)
	}
}];