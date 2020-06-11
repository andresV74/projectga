const fetchData = (url_api) => {
	return new Promise((resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", url_api, true);
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState === 4) {
				xhttp.status === 200
					? resolve(JSON.parse(xhttp.responseText))
					: reject(new Error("Error", url_api));
			}
		};
		xhttp.send();
	});
};

const API = "https://rickandmortyapi.com/api/character/";
const CONTAINER = document.querySelector('.grid')

const characterGrid = async (url_api) => {
	try {
		const data = await fetchData(url_api);
		const characters = data.results
		const view = `
			${characters
				.map(
					(character) => `
				<article class="character">
					<figure class="character-image">
						<img src="${character.image}" alt="${character.name}">
					</figure>
					<p class="character-name">${character.name}</p>
					<p class="character-location">${character.location.name}</p>
				</article>
			`
				)
				.join("")}
		`;
		return CONTAINER.innerHTML = view

	} catch(error) {
		console.error(error);
	}
};

characterGrid(API)