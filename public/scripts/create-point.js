
function populateUfs() {
    const ufSelect = document.querySelector('select[name=uf]')
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then( res =>  res.json() )
        .then( states => {

            for(const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        } );
};

populateUfs();

function getCities(event) {
    const citySelect = document.querySelector('[name=city]');
    const stateInput = document.querySelector('[name=state]');

    const indexOfSelectesState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectesState].text;

    const ufValue = event.target.value;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Select City</select>";
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        });
};

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities);

//Collect Items

const itemsToCollect = document.querySelectorAll('.items-grid li');

for( const item of itemsToCollect ) {
    item.addEventListener('click', handleSelectedItem);
}

//search for hidden input
const collectedItems = document.querySelector('input[name=items]');

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle('selected');

    const itemId = itemLi.dataset.id;

    //Check if item of selectedItems_array == itemId 
    const alreadySelected = selectedItems.findIndex( item => item == itemId ); //true or false

    //Remove item of selectedItems_array
    if( alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter( item => item != itemId );

        //update selectedItems
        selectedItems = filteredItems;
    } else {
        //if not selected add to selection
        selectedItems.push(itemId);
    }

    //update hidden input
    collectedItems.value = selectedItems
}