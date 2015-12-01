OpenLayers.Projection.OSNG = OpenLayers.Class(OpenLayers.Projection, {
	getCode: function() {
		return "ESPG:27700";
	},
	getUnits: function() {
		return "m";
	}
});

OpenLayers.Projection.OSNG.enToWgs84 = function () {
		
};

OpenLayers.Projection.OSNG.wgs84ToEn = function () {
	
};

OpenLayers.Projection.addTransform("ESPG:27700", "ESPG:4326", OpenLayers.Projection.OSNG.enToWgs84);
OpenLayers.Projection.addTransform("ESPG:4326", "ESPG:27700", OpenLayers.Projection.OSNG.wgs84ToEn);




// @TODO Add these at the end if worth while 
OpenLayers.Projection.OSNG.gridRefToWgs84 = function () {
	
};

OpenLayers.Projection.OSNG.wgs84ToGridRef = fucntion () {
	
};