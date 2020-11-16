window.onload = async function() {
	let url = 'https://cst336.herokuapp.com/projects/api/state_abbrAPI.php';
	let response = await fetch(url);
	let data = await response.json();

	if(data !== false) {
		$("#state").empty(); // remove old values first.
		for(let i=0; i < data.length; i++) {
			$("#state").append(`<option value="${data[i].usps}"> ${data[i].state} </option>`);
		}
	}
}

$(document).ready(function() {

	var userNameAvailable = false;

	// when the zip code changes.
	$("#zip").on("change", async function() {
		
		let zipCode = $("#zip").val();
		let url = `https://itcdland.csumb.edu/~milara/ajax/cityInfoByZip?zip=${zipCode}`;
		let response = await fetch(url);
		let data = await response.json();
		//console.log(data);

		if(data !== false) {
			$("#city").html(data.city);
			$("#latitude").html(data.latitude);
			$("#longitude").html(data.longitude);

			$("#zipError").html("Valid zipcode.");
			$("#zipError").css("color", "green");
			//console.log(data.latitude, data.longitude)
		}
		else {
			$("#city").html("N/A");
			$("#latitude").html("N/A");
			$("#longitude").html("N/A");

			$("#zipError").html("Invalid zipcode.");
			$("#zipError").css("color", "red");
		}
	}); // zip.onChange()

	$("#state").on("change", async function() {
		let state = $("#state").val();
		let url = `https://itcdland.csumb.edu/~milara/ajax/countyList.php?state=${state}`;
		let response = await fetch(url);
		let data = await response.json();
		$("#county").empty(); // remove old values first.
		for(let i=0; i < data.length; i++) {
			$("#county").append(`<option> ${data[i].county} </option>`);
		}
		//console.log(data);
	}); // state

	$("#username").on("change", async function() {
		let username = $("#username").val();
		let url = `https://cst336.herokuapp.com/projects/api/usernamesAPI.php?username=${username}`;
		let response = await fetch(url);
		let data = await response.json();

		if(data.available) {
			$("#usernameError").html("Username available.");
			$("#usernameError").css("color", "green");
			userNameAvailable = true;
			console.log("Username available");
		} else {
			$("#usernameError").html("Username unavailable.");
			$("#usernameError").css("color", "red");
			userNameAvailable = false;
			console.log("Username unavailable.");
		}
		
	}); // username

	$("#password").on("change", function() {

		passwordLength = $("#password").val().length;

		if(passwordLength >= 6) {
			$("#passwordError").html("Password must be 6 characters in length.");
			$("#passwordError").css("color", "green");
		} else {
			$("#passwordError").html("Password must be 6 characters in length.");
			$("#passwordError").css("color", "red");
		}

	}); // password

	$("#signupForm").on("submit", function(event) {

		if(!isFormValid()) {
			event.preventDefault();
		}
		
	}); // submit form

	function isFormValid() {
		isValid = true;

		if(!userNameAvailable) {
			isValid = false;
		}

		if($("#username").val().length == 0) {
			isValid = false;
			$("#usernameError").html("Username is required");
			$("#usernameError").css("color", "red");
		}

		if($("#password").val() != $("#passwordRepeat").val()) {
			isValid = false;
			$("#passwordRepeatError").html("Password mismatch");
			$("#passwordRepeatError").css("color", "red");
		}

		return isValid;
	}

});