const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

const input = document.createElement('input');
input.setAttribute('class', 'inputValue');
input.setAttribute('type', 'text');

container.appendChild(input)

const button = document.createElement('button');
button.setAttribute('class', 'submit');

container.appendChild(button);

var request = new XMLHttpRequest();

const key = '4ca0d0dfe6ec424cb9d72bc2a80e1f1d';
const url = 'https://api.opencagedata.com/geocode/v1/json?' + 'q=' + input.value + '&key=' + key

request.open('GET', url, true);

request.onload = function() {
	var data = JSON.parse(this.response);

	if (request.status >= 200 && request.status < 400) {
		data.forEach(location => {
			const card = document.createElement('div')
			card.setAttribute('class', 'card')

			const h1 = document.createElement('h1')
			h1.textContent = location.geometry

			const p = document.createElement('p')
			location.lat = '${location.lat}'

			container.appendChild(card)

			card.appendChild(h1)
			card.appendChild(p)


			console.log(location.geometry)
			console.log(location.lat)
		} )
	} else {
		const errorMessage = document.createElement('marquee')
		errorMessage.textContent = "Gah it's not working!"
		app.appendChild(errorMessage)
	}
}

request.send()