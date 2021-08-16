let pokemonRepository = (function() {
	let pokemonList = [{
		pokename: 'Bulbasaur',
		height: 7,
		types: ['Grass', 'Poison']
	}, {
		pokename: 'Charizard',
		height: 1.7,
		types: ['Fire', 'Flying']
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
	return {
		add: add,
		getAll: getAll
	};
})();
console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function (pokemon) {
console.log(pokemon)
});


