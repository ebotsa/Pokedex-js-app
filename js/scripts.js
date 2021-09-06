let pokemonRepository = (function () {
  let pokemonList = [];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

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
    imageElementFront.attr('src', pokemon.image_front);
    let imageElementBack = $('<img class="modal-img" style="width:40%">');
    imageElementBack.attr('src', pokemon.image_back);
    let heightElement = $('<p>' + 'height :' + pokemon.height + '</p>');
  let weightElement = $('<p>' + 'weight :' + item.weight + '</p>');
   let abilitiesElement = $('<p>' + 'abilities :' + item.abilities + '</p>');
    let typesElement = $('<p>' + 'types : ' + pokemon.types.join(', ') + '</p>');
	


    //Appending the modal elements
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
	
  }

  //adds pokemon to pokedex
  function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listPokemon = document.createElement('li');
      listPokemon.classList.add('.list-group-item', 'list-group-item-action');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary');
      button.setAttribute('data-target', '#exampleModal');
      button.setAttribute('data-toggle', 'modal');
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);
      button.addEventListener('click', function() {
          showDetails(pokemon);
     });
  }

//shows details when user clicks pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    showModal(pokemon);
  });
}

//fetchs pokemon details from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

//load details of pokemon from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add the details to the item
      const pokemonType = details.types.map((type) => type.type.name);
      item.image_front = details.sprites.front_default;
      item.image_back = details.sprites.back_default;
		item.height = details.height;
		item.weight = details.weight;
      item.types = pokemonType; 
      
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function() {
//displays pokemon in respository on DOM
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)
});
});