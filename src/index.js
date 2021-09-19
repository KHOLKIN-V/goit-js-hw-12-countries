import countryCards from '../templates/country-card.hbs';
// import countryArray from '../templates/country-array.hbs';
import debounce from 'lodash.debounce';

const cardContainer = document.querySelector('.js-card-container');
const searchCountry = document.querySelector('.js-search-form');

searchCountry.addEventListener('input', debounce(onSearch, 500));
// searchCountry.addEventListener('input', onSearch);

// function onSearchInput(i) {
//     i.preventDefault();

//     if (10 >= i.length >= 2) {
//         import countryArray from '../templates/country-array.hbs';
//     } else if (i.length === 1) {
//         import countryCards from '../templates/country-card.hbs';
//         onSearch();
//     } else if (i.length > 10) {

//     }
// }

function onSearch (e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;

    fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(fetchError)
    .finally(() => form.reset());
}

function fetchCountries(countryId) {
return fetch(`https://restcountries.eu/rest/v2/name/${countryId}`)
.then(response => response.json());
};

function renderCountryCard (country) {
    const markup = countryCards(country);
    console.log(country);
    cardContainer.innerHTML = markup;
}

function fetchError(error) {
    alert('r u srsly?!?!?');
};