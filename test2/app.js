var input = document.querySelector('.inputValue');
var date = document.querySelector('.day');
var icon = document.querySelector('.icons');
var button = document.querySelector('.submit');

const weather = {};

const key = '4ca0d0dfe6ec424cb9d72bc2a80e1f1d';

button.addEventListener('click', getCityData);

function getCityData() {
	fetch('https://api.opencagedata.com/geocode/v1/json?' + 'q=' + input.value + '&key=' + key)
	.then(response => response.json())
	.then(data => {
		var lat = data['results'][0]['geometry']['lat'];
		var lng = data['results'][0]['geometry']['lng'];

		input.value ="";

	console.log(lat)
	console.log(lng)

	getWeather(lat,lng)

})

}

const key2 = 'dfe4987b3df1347984efa6ad81e18757'

button.addEventListener('click', getWeather);

function getWeather(lat,lng){
	let api = 'https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lng + '&appid=' + key2

	fetch(api)
		.then(function(response){
			let data = response.json();
			return data
	})
	
	.then(function(data){
		weather.iconId = data['current'];
		weather.description = data['current'];


	})

	.then(function(){
		displayWeather();

	})
}

function dispayWeather(){

	icon.innerHTML = '<img src"icons/${weather.iconId}.png"/>';
}
