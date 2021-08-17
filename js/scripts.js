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
		pokemonList.push(pokemon);
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
		pokemonList.appendChild(button);
	}

	function addEventListener(button) {
		button.addEventListener('click', function(event) {
			showDetails(pokemon);
			console.log(pokemon)
		});
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