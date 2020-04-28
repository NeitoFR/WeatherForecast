const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


const weather = {};

weather.temperature = {
	unit : "celsius"
}

const key = "4ca0d0dfe6ec424cb9d72bc2a80e1f1d";

function get_city(city){
	var request = new XMLHttpRequest();
	var city = document.getElementById("inputValue").value;
	var key = "4ca0d0dfe6ec424cb9d72bc2a80e1f1d";
	const request_url = "https://api.opencagedata.com/geocode/v1/json"
				+ "?"
				+ "q=" + city
				+"&key=" + key;

	request.open("GET", url, false)
	request.send();

	var response = request.response;
	var data = JSON.parse(response);

	console.log(data)
}



function show_icons() {
	var clouds = document.createElement("img");
	clouds.setAttribute("src", "weather_icons/clouds.svg");
	var snow = document.createElement("img");
	snow.setAttribute("src", "weather_icons/clouds.svg");
	var cloudy = document.createElement("img");
}