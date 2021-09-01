let pokemonRepository = (function() {
  let pokemonList = [];
    // Addition of API link
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector('#searchIn');

  // to push pokemons
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else alert('try again');
  }
  //returning pokemon list
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('.list-group-item', 'list-group-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-block');
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
        //Event listener on a click of a button
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  //fetching pokemon list from API
    function loadList() {
    return fetch(apiUrl)
    .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }
    //Fetching pokemon detail from API

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
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
      })
       .catch(function(e) {
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
  // MODAL
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    // Clear all existing modal content
    modalTitle.empty();
    modalBody.empty();
     //Name of a Pokemon
    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:40%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:40%">');
    imageElementBack.attr('src', item.imageUrlBack);
     let heightElement = $('<p>' + 'height :' + item.height + '</p>');
      let weightElement = $('<p>' + 'weight :' + item.weight + '</p>');
      let typesElement = $('<p>' + 'types :' + item.types + '</p>');
      let abilitiesElement = $('<p>' + 'abilities :' + item.abilities + '</p>');
      //Event listener used to search for pokemon
    searchInput.addEventListener('input', function() {
      let listPokemon = document.querySelectorAll('.list-group-itm');
      let value = searchInput.value.toUpperCase();
      listPokemon.forEach(function(pokemon) {
        if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
          pokemon.style.display = '';
        } else {
          pokemon.style.display = 'none';
        }
        });
    });

    //Appending the modal elements
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

