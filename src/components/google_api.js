// fetches promise, use like this...

// getLocationInfo('oakland ca')
// 		.then(function (r) { return r.json(); })
// 		.then(function (data) {
// 						return {
// 										lat: data.results[0].geometry.location.lat,
// 										lng: data.results[0].geometry.location.lng
// 						};
// 		})
// 		.catch(function (e) { console.log('oops'); });

export function getLocationInfo(input) {
	var input = input.replace(/\s+/g, '+');
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + input + '&key=AIzaSyAY7_4Ja1beJEByz8uTmziyb7lmQld7B0s';
	return fetch(url);
}