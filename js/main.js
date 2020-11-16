$(document).ready(function() {

	// when the zip code changes.
	$("zip").on("change", function() {
		
		let zipCode = $("#zip").val();
		let url = `https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip?zip=${zipCode}`;
		let response = await fetch(url);
		let data = await response.json();
		console.log(data);
	}); // zip.onChange()

});