let pokemonRepository = (function() {
	let modalContainer = document.querySelector('#modal-container');
	let modal = document.querySelector('.modal');
	let modalClose = document.createElement('button');
	modalClose.classList.add('modal-close');
	let pokemonName = document.createElement('h1');
	pokemonName.classList.add('Pokemon-name');
	let pokemonHeight = document.createElement('p');
	pokemonHeight.classList.add('Pokemon-height');
	let pokemonType = document.createElement('p');
	pokemonType.classList.add('Pokemon-type');
	let imageContainer = document.createElement('div');
	imageContainer.classList.add('img-container');
	let pokemonImage = document.createElement('img');
	pokemonImage.classList.add('Pokemon-image');
	let pokemonList = [{
		pokename: "Bulbasaur",
		height: 0.7,
		types: ["grass", "poison"]
	}, ];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/1/limit=150';

	function add(pokemon) {
		if(typeof pokemon === "object" && "name" in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log("pokemon is not correct");
		}
	}

	function getAll() {
		return pokemonList;
	}

	function addListItem(pokemon) {
		let pokemonList = document.querySelector(".pokemon-list");
		let listpokemon = document.createElement("li");
		let button = document.createElement("button");
		button.innerText = pokemon.name;
		button.classList.add("button-class");
		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);
		button.addEventListener("click", function(event) {
			showDetails(pokemon);
		});
	}
	// REST OF CODE
	function showModal(title, text) {
		// Clear all existing modal content
		modalContainer.innerHTML = '';
		let modal = document.createElement('div');
		modal.classList.add('modal');
		// Add the new modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);
		let titleElement = document.createElement('h1');
		titleElement.innerText = title;
		let contentElement = document.createElement('p');
		contentElement.innerText = text;
		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modalContainer.appendChild(modal);
		modalContainer.classList.add('is-visible');
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	function showDetails() {
		loadDetails().then(function() {
			pokemonName.innerHTML = pokemon.name;
			pokemonHeight.innerHTML = 'Height: ' + pokemon.height;
			pokemonType.innerHTML = 'Type: ' + pokemon.type;
			pokemonImage.src = pokemon.imageUrl;
			modalClose.innerHTML = "Close";
			showModal(pokemon.name);
		});
	}
	document.querySelector('#show-modal').addEventListener('click', () => {
		showModal('Bulbasaur', 'This is a pokemon!');
	});
	window.addEventListener('keydown', (e) => {
		if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});
	modalContainer.addEventListener('click', (e) => {
		// Since this is also triggered when clicking INSIDE the modal container,
		// We only want to close if the user clicks directly on the overlay
		let target = e.target;
		if(target === modalContainer) {
			hideModal();
		}
	});
})();

function loadList() {
	return fetch(apiUrl).then(function(response) {
		return response.json();
	}).then(function(json) {
		json.results.forEach(function(item) {
			let pokemon = {
				name: item.name,
				detailsUrl: item.url,
			};
			add(pokemon);
			console.log(pokemon);
		});
	}).catch(function(e) {
		console.error(e);
	})
}

function loadDetails(item) {
	let url = item.detailsUrl;
	return fetch(url).then(function(response) {
		return response.json();
	}).then(function(details) {
		item.imageUrl = details.sprites.front_default;
		item.height = details.height;
		item.types = details.types;
	})
}
Object.keys(pokemonRepository).forEach(function(property) {
	console.log(pokemonRepository[property]);
});
// console.log(pokemonRepository.getAll());
pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
	let result = pokemonRepository.getAll().filter(pokemon => pokemon.length > 4);
	console.log(result);
});
