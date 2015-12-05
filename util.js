// Utility function to convert degrees to radians
Math.deg2Rad = function(degrees) {
	return degrees * Math.PI / 180;
};

// Utility function to convert radians to degrees
Math.rad2Deg = function(radians) {
	return radians * 180 / Math.PI;
};


function invertSign (number) {

	if (!isNaN(parseFloat(number)) && isFinite(number)) {
		var invertedNumber = number * -1;
		return invertedNumber;
	} else {
		return number;
	}	
}

function recursiveLoop(object) {
	for (var property in object) {
		if (object.hasOwnProperty(property)) {

			if (typeof object[property] == 'object') {
					recursiveLoop(object[property]);
			} else {
				object[property] = invertSign(object[property]);
			}
		}
	}

	return object;
}