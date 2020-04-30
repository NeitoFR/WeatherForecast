$(document).ready(() => {
	const button = document.querySelector('.submit')
	const conteneur = document.querySelector('.calendar')
	const container = document.querySelector('.displayDay')

	const key1 = '4ca0d0dfe6ec424cb9d72bc2a80e1f1d';
	var dayList = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];


	button.addEventListener('click', getCityCoordinate);

	function getCityCoordinate(event) {

		dayList = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		var input = document.getElementById('inputValue').value;
		// console.log(input);

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

			// console.log(lat);
			// console.log(lng);


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
	function isDisplay(i, nb) {
		return i > nb ? "hidden" : "";
	}
	function getWeather(lat, lng) {

		url = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lng + '&appid=' + key2;
		let request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.send();
		request.onload = function () {
			var data = JSON.parse(this.response);

			var tempDay = dayList.splice(0, new Date().getDay());
			// console.log(tempDay);


			dayList.concat(tempDay).forEach((day, i) => {
				// console.log(data['daily'][i]['weather'][0]['main'], data['daily'][i]['clouds']);
				var weather = data['daily'][i]['weather'][0]['main'];
				var cloudiness = data['daily'][i]['clouds'];
				var dayToDisplay = $("#days").val()
				$('.calendar').append($([
					"<div class='dayDisplay " + isDisplay(i, dayToDisplay - 1) + "'  >",
					"	<div class='dayname'>" + day + "</div>",
					"	<div class='icon'>",
					// "		<img src='weather_icons/" + getIcon(data['daily'][i]['weather'][0]['main'], data['daily'][i]['clouds']) + ".svg'>",
					"		<img src='weather_icons/" + getIcon(weather, cloudiness) + ".svg' alt='' srcset=''>",
					"	</div>",
					"</div>"
				].join("\n")));
			});
		}
	}

})
