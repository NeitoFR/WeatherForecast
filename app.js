// Vérifie si JS est pret pour éxecuter JQuery
$(document).ready(() => {
	console.log('jQuery est prêt');

	// On selectionne le bouton et le conteneur(div) calendar
	const button = document.querySelector('.submit');
	const weatherDisplayZone = document.querySelector('.calendar');

	// On enregistre les valeurs des clés dans des variables
	const openCageKey = '4ca0d0dfe6ec424cb9d72bc2a80e1f1d';
	const openWeatherMapKey = 'dfe4987b3df1347984efa6ad81e18757';
	var dayList = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",               // On crée une liste avec les jours de la semaine
		"Thursday",
		"Friday",
		"Saturday"
	];

	/* 	On utilise la méthode addEventListener pour gérer 
		l'evenement quand l'utilisateur clic sur le bouton Submit */
	button.addEventListener('click', evt => {
		// console.log('click');
		resetCalendar();
		getCityCoordinate(evt).then(data => {
			console.log('got city coord', data);
			var lat = data['results'][0]['geometry']['lat'];
			var lng = data['results'][0]['geometry']['lng'];
			getWeather(lat, lng).then(data => {
				console.log(data);
				// En fonction de l'heure, changer le background du body
				if (data.current.sunrise < data.current.dt && data.current.dt < data.current.sunset) {
					$('body').addClass("daytime");
					$('body').removeClass("nighttime");
				} else {
					$('body').addClass("nighttime");
					$('body').removeClass("daytime");
				}

				console.log(data.current.sunrise);
				console.log(data.current.dt);
				console.log(data.current.sunset);
				console.log(data.current.sunrise < data.current.dt < data.current.sunset);
				console.log(data.current.dt < data.current.sunset);
				console.log(data.current.sunrise < data.current.dt);

				// Découper la liste des jours de la semaine et réafficher en fonction de la date du jour
				var tempDay = dayList.splice(0, new Date().getDay());
				tempDay = dayList.concat(tempDay);
				console.log('Jour de la semaine réarranger', tempDay);

				tempDay.forEach((day, i) => {
					// Récupérer le temps, le % de nuage et l'afficher dans le HTML
					var weather = data['daily'][i]['weather'][0]['main'];
					var cloudiness = data['daily'][i]['clouds'];
					var dayToDisplay = $("#daysForecasted").val();
					$('.calendar').append($([
						"<div class='dayDisplay " + isDisplay(i, dayToDisplay - 1) + "'  >",
						"	<div class='dayname'>" + day + "</div>",
						"	<div class='icon'>",
						"		<img src='weather_icons/" + getIcon(weather, cloudiness) + ".svg' alt='' srcset=''>",
						"	</div>",
						"</div>"
					].join("\n")));
				});
			}).catch(err => {
				console.log("Error getting weather", err);
				alert("Error getting weather", err); // Indiquer à l'utilisateur qu'il y a eu une erreur pendant la requête

			});
		}).catch(err => {
			console.log("Error getting city coordinates", err);
			alert("Error getting city coordinates ", err); // Indiquer à l'utilisateur qu'il y a eu une erreur pendant la requête
		})
	});

	/* 	On crée une fonction pour récupérer 
		la latitude et la longitude depuis l'API openCageData */

	function getCityCoordinate(event) {
		return new Promise((resolve, reject) => {
			// On récupère la valeur du formulaire (la ville indiqué par l'utilisateur)
			var cityInput = document.getElementById('citiesInput').value;
			console.log(cityInput);
			// On utilise jQuery pour faire la requête GET sur l'API OpenCageData
			$.ajax({
				type: "GET",
				url: "https://api.opencagedata.com/geocode/v1/json",
				data: 'q=' + cityInput + '&key=' + openCageKey,
				success: function (data) {
					// event.preventDefault();
					resolve(data);
				},
				error: err => {
					// event.preventDefault();
					reject(err);
				}
			});
		})
	}
	// Fonction qui traite les informations du temps
	function getIcon(weather, cloudiness) {
		switch (weather) {
			case "Clear":
				return "sun";
			case "Snow":
				return "snow";
			case "Clouds":
				if (0 < cloudiness < 50) {
					return "clouds";
				} else {
					return "cloudy";
				}
			default:
				return "rain";
		}

	}
	// Fonction qui gère l'affichage de la date et des icones en fonction du nombre de jour selectionné
	function isDisplay(i, nb) {
		return i > nb ? "hidden" : "";
	}
	function resetCalendar() {
		dayList = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		document.querySelector('.calendar').innerHTML = "";
	
	}
	// Fonction qui fait la demarche de requete à l'API via le verbe HTTP GET
	function getWeather(lat, lng) {
		return new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: "https://api.openweathermap.org/data/2.5/onecall",
				data: 'lat=' + lat + '&lon=' + lng + '&appid=' + openWeatherMapKey,
				success: function (data) {
					resolve(data);
				},
				error: err => {
					reject(err);
				}
			});
		})
	}

})

/* Un callback, est une fonction qui est passé en argument à une autre fonction,
ce qui permet à cette derniere de faire usage de cette fonction à n'importe
quelle fonction alors qu'elle ne la connait pas par avance */

/* Les promesses sont des objets qui retournent la valeur d'une opération asynchrone,
elle represente une valeur future. Elles disposent de méthodes permettant
de traiter le résultat une fois l'opération accomplie (then() et catch()).
Les promesses vont permettre de nous affranchir des callback des fonctions,
qui sont désormais attachés à la promesse. */
