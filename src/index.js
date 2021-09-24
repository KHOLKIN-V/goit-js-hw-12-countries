import countryCards from './templates/country-card.hbs';
import countryArray from './templates/country-array.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
// import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
import { alert, notice, info, success, error } from '@pnotify/core';
import API from '../src/fetch.js'

const cardContainer = document.querySelector('.js-card-container');
const searchCountry = document.querySelector('.js-search-form');
const arrayContainer = document.querySelector('.js-array-container');

searchCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch (e) {
    const form = e.target;
    const searchQuery = form.value;
    searchQuery.trim();

    if (searchQuery !== '') {
        API.fetchCountries(searchQuery)
        .then(render => {
            if (render.length >= 2 && render.length <= 10) {
                return renderCountryArray(render);
            } else if (render.length === 1) {
                return renderCountryCard(render);
            } else if (render.length > 10) {
                alert({
                    text: 'Too many matches found. Please, enter a more specific query!'
                  });
            } else {
                alert({
                    text: 'Nothing found'
                  });
            }
        })
        .catch(fetchError);
    };

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