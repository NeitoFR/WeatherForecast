const button = document.querySelector('.submit')
const conteneur = document.querySelector('.conteneur2')
const container = document.querySelector('.conteneur1')


const key1 = '4ca0d0dfe6ec424cb9d72bc2a80e1f1d';


function getDayOfWeather(event) {
	var today = new Date();
	var day = today.getDay();
	var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

	console.log(dayList[day])

	var displayDay = document.createElement('p');
	displayDay.innerHTML = dayList[day];
	container.replaceChild(displayDay, container.childNodes[4])

}

button.addEventListener('click', getCityCoordinate);

function getCityCoordinate(event) {

	var input = document.getElementById('inputValue').value;
	console.log(input);

	request_url = 'https://api.opencagedata.com/geocode/v1/json?' +'q=' + input + '&key=' + key1;

	let request = new XMLHttpRequest();
	request.open('GET', request_url, true);
	request.send();
	request.onload = function()  {
		var data = JSON.parse(this.response);		
		var lat = data['results'][0]['geometry']['lat'];
		var lng = data['results'][0]['geometry']['lng'];

		input = "";

		console.log(lat);
		console.log(lng);

		getWeather(lat,lng);
	}

	event.preventDefault();

}

	
const key2 = 'dfe4987b3df1347984efa6ad81e18757';

function getWeather(lat,lng) {

	url = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lng + '&appid=' + key2;
	let request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.send();
	request.onload = function () {
		var data = JSON.parse(this.response);
		var weather = data['daily'][0]['weather'][0]['main'];
		
		var cloudiness = data['daily'][0]['clouds'];	
		var weatherDate = data['daily'][0]['dt'];
		var weatherDate2 = data['daily'][1]['dt'];
		var weatherDate3 = data['daily'][2]['dt'];
		var weatherDate4 = data['daily'][3]['dt'];
		var weatherDate5 = data['daily'][4]['dt'];
		var weatherDate6 = data['daily'][5]['dt'];
		var weatherDate7 = data['daily'][6]['dt'];

		if (weather === "Clear") {

			const clearIcon = document.createElement('img');
			clearIcon.src = 'weather_icons/sun.svg';
			conteneur.replaceChild(clearIcon, conteneur.childNodes[0])

		} else if (weather === "Snow") {
			const snowIcon = document.createElement('img');
			snowIcon.src = 'weather_icons/snow.svg';
			conteneur.replaceChild(snowIcon, conteneur.childNodes[0])

		} else if (weather === "Clouds") {

			if (cloudiness > 50) {
				const cloudsIcon = document.createElement('img');
				cloudsIcon.src = 'weather_icons/clouds.svg';
				conteneur.replaceChild(cloudsIcon, conteneur.childNodes[0])
			} else if (0 < cloudiness < 50) {
				weather = "Cloudy";
				const cloudyIcon = document.createElement('img');
				cloudyIcon.src = 'weather_icons/cloudy.svg';
				conteneur.replaceChild(cloudyIcon, conteneur.childNodes[0])
			}

		} else {
			const rainIcon = document.createElement('img');
			rainIcon.src = 'weather_icons/rain.svg';
			conteneur.replaceChild(rainIcon, conteneur.childNodes[0])
		}

		console.log(weather);
		console.log(cloudiness);
		console.log(weatherDate);
		console.log(weatherDate2);
		console.log(weatherDate3);
		console.log(weatherDate4);
		console.log(weatherDate5);

		getDayOfWeather();			
	
	}

}



