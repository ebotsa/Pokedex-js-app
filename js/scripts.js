let pokemonRepository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');
	let searchInput = document.querySelector('#searchIn');
	// to push pokemons
	function add(pokemon) {
		if(typeof pokemon === 'object' && 'name' in pokemon) {
			pokemonList.push(pokemon);
		} else alert('try again');
	}
	//returning pokemon list
	function getAll() {
		return pokemonList;
	}
	//shows modal with pokemon info
	function showModal(pokemon) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		let modalHeader = $('.modal-header');
		modalTitle.empty();
		modalBody.empty();
		let nameElement = $('<h1>' + pokemon.name + '</h1>');
		let imageElementFront = $('<img class="modal-img" style="width:40%">');
		imageElementFront.attr('src', pokemon.imageUrlFront);
		let imageElementBack = $('<img class="modal-img" style="width:40%">');
		imageElementBack.attr('src', pokemon.imageUrlBack);
		let heightElement = $('<p>' + 'height :' + pokemon.height + '</p>');
		let weightElement = $('<p>' + 'weight :' + pokemon.weight + '</p>');
		let typesElement = $('<p>' + 'types :' + pokemon.types + '</p>');
		let abilitiesElement = $('<p>' + 'abilities :' + pokemon.abilities + '</p>');

		//Appending the modal elements
		modalTitle.append(nameElement);
		modalBody.append(imageElementFront);
		modalBody.append(imageElementBack);
		modalBody.append(heightElement);
		modalBody.append(weightElement);
		modalBody.append(typesElement);
		modalBody.append(abilitiesElement);
	}
  
	// //adds pokemon to pokedex
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.list-group');
		let listPokemon = document.createElement('li');
		listPokemon.classList.add('.list-group-item', 'list-group-item-action');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('btn', 'btn-primary');
		button.setAttribute('data-target', '#exampleModal');
		button.setAttribute('data-toggle', 'modal');
		listPokemon.appendChild(button);
		pokemonList.appendChild(listPokemon);
	}
	//shows details when user clicks pokemon
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			showModal(pokemon);
		});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function(response) {
			return response.json();
		}).then(function(details) {
			item.imageUrlFront = details.sprites.front_default;
			item.imageUrlBack = details.sprites.back_default;
			item.height = details.height;
			item.weight = details.weight;
			/*  const typesArray = [];
			details.types.forEach(function(pokemonType) {
			  typesArray.push(pokemonType.type.name);
			});*/
			item.types = details.types.map(function(x) {
				return x.type.name;
			});
			item.abilities = details.abilities.map(function(x) {
				return x.ability.name;
			});
		}).catch(function(e) {
			/* eslint-disable no-console */
			console.error(e);
			/* eslint-enable no-console */
		});
	}

	function showDetails(item) {
		loadDetails(item).then(function() {
			showModal(item);
		});
	}
	//fetchs pokemon details from API
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
			});
		}).catch(function(e) {
			console.error(e);
		})
	}
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		showDetails: showDetails,
		loadList: loadList,
		loadDetails: loadDetails,
	}
})();
pokemonRepository.loadList().then(function() {
	//displays pokemon in respository on DOM
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon)
	});
});