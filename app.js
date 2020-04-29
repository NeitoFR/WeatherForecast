$(document).ready(() => {
	const button = document.querySelector('.submit')
	const conteneur = document.querySelector('.conteneur2')
	const container = document.querySelector('.displayDay')

	const key1 = '4ca0d0dfe6ec424cb9d72bc2a80e1f1d';
	const dayList = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	]
		;


	button.addEventListener('click', getCityCoordinate);

	function getCityCoordinate(event) {

		var input = document.getElementById('inputValue').value;
		console.log(input);

		conteneur.innerHTML = "";


		request_url = 'https://api.opencagedata.com/geocode/v1/json?' + 'q=' + input + '&key=' + key1;

		let request = new XMLHttpRequest();
		request.open('GET', request_url, true);
		request.send();
		request.onload = function () {
			var data = JSON.parse(this.response);
			var lat = data['results'][0]['geometry']['lat'];
			var lng = data['results'][0]['geometry']['lng'];

			input = "";

			console.log(lat);
			console.log(lng);


			getWeather(lat, lng);
		}

		event.preventDefault();

	}

	function getIcon(weather, cloudiness) {
		switch (weather) {
			case "Clear":
				return "sun";
			case "Snow":
				return "snow"
			case "Clouds":
				if (0 < cloudiness < 50) {
					return "clouds"
				} else {
					return "cloudy"
				}
			default:
				return "rain"
		}

	}
	const key2 = 'dfe4987b3df1347984efa6ad81e18757';

	function getWeather(lat, lng) {

		url = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lng + '&appid=' + key2;
		let request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.send();
		request.onload = function () {
			var data = JSON.parse(this.response);

			dayList.forEach((day, i) => {
				console.log(data['daily'][i]['weather'][0]['main'], data['daily'][i]['clouds']);
				var weather = data['daily'][i]['weather'][0]['main'];

				var cloudiness = data['daily'][i]['clouds'];
				$('.calendar').append($([
					"<div class='dayDisplay'>",
					"	<div class='dayname'>" + day + "</div>",
					"	<div class='icon'>",
					"		<img src='weather_icons/" + getIcon(data['daily'][i]['weather'][0]['main'], data['daily'][i]['clouds']) + ".svg' alt='' srcset='' width='100px' height='100px'>",
					// "		<img src='weather_icons/" + getIcon(weather, cloudiness) + ".svg' alt='' srcset=''>",
					"	</div>",
					"</div>"
				].join("\n")));
			});
			// for (var i = 0; i < 7; i++) {
			// 	var longueur = data['daily'].length

			// 	var weather = data['daily'][i]['weather'][0]['main'];

			// 	var cloudiness = data['daily'][i]['clouds'];
			// 	var weatherDate = data['daily'][i]['dt'];


			// 	if (weather === "Clear") {

			// 		const clearIcon = document.createElement('img');
			// 		clearIcon.src = 'weather_icons/sun.svg';
			// 		conteneur.appendChild(clearIcon);



			// 	} else if (weather === "Snow") {
			// 		const snowIcon = document.createElement('img');
			// 		snowIcon.src = 'weather_icons/snow.svg';
			// 		conteneur.appendChild(snowIcon)

			// 	} else if (weather === "Clouds") {

			// 		if (cloudiness > 50) {
			// 			const cloudsIcon = document.createElement('img');
			// 			cloudsIcon.src = 'weather_icons/clouds.svg';
			// 			conteneur.appendChild(cloudsIcon)


			// 		} else if (0 < cloudiness < 50) {
			// 			weather = "Cloudy";
			// 			const cloudyIcon = document.createElement('img');
			// 			cloudyIcon.src = 'weather_icons/cloudy.svg';
			// 			conteneur.appendChild(cloudyIcon)

			// 		}

			// 	} else {
			// 		const rainIcon = document.createElement('img');
			// 		rainIcon.src = 'weather_icons/rain.svg';
			// 		conteneur.appendChild(rainIcon)

			// 	}

			// 	console.log(weather);
			// 	console.log(cloudiness);
			// 	console.log(weatherDate);
			// 	console.log(longueur)


			// 	getDayOfWeather();

			// }

			// function getDayOfWeather() {

			// 	for (var i = 0; i < 7; i++) {
			// 		var today = new Date();
			// 		var day = today.getDay();
			// 		var dayList = new Array(
			// 			"Sunday",
			// 			"Monday",
			// 			"Tuesday",
			// 			"Wednesday",
			// 			"Thursday",
			// 			"Friday",
			// 			"Saturday"
			// 		);

			// 		console.log(dayList[(day + i) % 7])



			// 	}

			// 	var displayDay = document.createElement('p');
			// 	displayDay.innerHTML = dayList[(day + i) % 7];
			// 	container.appendChild(displayDay)

			// }
		}

	}



})
