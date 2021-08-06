// objects in pokemonList
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
}]
//puts an array of objects in pokemonList
// forEach list Pokemon names and heights
for(let i = 0; i < pokemonList.length; i++) console.log(i);
// document.write("<p>" + pokemonList[i].name + "</p>");
 document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
//Conditional to print " - Wow, that's big!" if height is over 1.5
if(pokemon.height > 1.5) {
	document.write(" - Wow, that's big!");
}
console.log(pokemonList[i].name + " ");
//Line break between each pokemon's name