import countryCards from '../templates/country-card.hbs';
import countryArray from '../templates/country-array.hbs';
import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

const cardContainer = document.querySelector('.js-card-container');
const searchCountry = document.querySelector('.js-search-form');
const arrayContainer = document.querySelector('.js-array-container');

searchCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch (e) {
    const form = e.target;
    const searchQuery = form.value;

    fetchCountries(searchQuery)
    .then(render => {
        if (render.length >= 2 && render.length <= 10) {
            return renderCountryArray(render);
        } else if (render.length === 1) {
            return renderCountryCard(render);
        } else if (i.length > 10) {
            alert({
                text: 'Too many matches found. Please, enter a more specific query!'
              });
        }
    })
    .catch(fetchError);
}

function fetchCountries(countryId) {
return fetch(`https://restcountries.eu/rest/v2/name/${countryId}`)
.then(response => response.json());
};

function renderCountryCard (country) {
    const markup = countryCards(country[0]);
    console.log(country);
    cardContainer.innerHTML = markup;
};

function renderCountryArray (country) {
    const markup = countryArray(country);
    console.log(country);
    arrayContainer.innerHTML = markup;
};

function fetchError(error) {
    alert('EEERRRRROOOOOORRRR');
};