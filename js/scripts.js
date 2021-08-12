// objects in pokemonList
let pokemonList = [{
	pokename: 'Bulbasaur',
	height: 0.7,
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
//puts an array of objects in pokemonList
// forEach list Pokemon names height and types
pokemonList.forEach(function(pokemon) {
	console.log(pokemon.pokename + '  ' + pokemon.height + ' ' + pokemon.types + ' ');
});

