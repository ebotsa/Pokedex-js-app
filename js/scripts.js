let pokemonRepository = (function() {
	let pokemonList = [{
		pokename: "Bulbasaur",
		height: 0.7,
		types: ["grass", "poison"],
	}, {
		pokename: "Charizard",
		height: 1.7,
		types: ["fire", "flying"],
	}, {
		pokename: 'Butterfree',
		height: 1.1,
		types: ['Bug', 'Flying']
	}, {
		pokename: 'Pidgeot',
		height: 1.5,
		types: ['Flying', 'Normal']
	}, {
		pokename: 'Beedrill',
		height: 1,
		types: ['Bug', 'Poison']
	}];

	function add(pokemon) {
		if(typeof pokemon === "object" && "name" in pokemon && "height" in pokemon && "types" in pokemon) {
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
		button.innerText = pokemon.pokename;
		button.classList.add("button-class");
		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);
		let addEventListener = document.querySelector('button');
		button.addEventListener('click', function(event) {
			console.log(event);
		});
	}

	function showDetails(pokemon) {
		console.log(pokemon)
	}
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem
	};
})();
console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});