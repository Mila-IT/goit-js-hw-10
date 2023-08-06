import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  spanLoader: document.querySelector('.js-loader'),
};

refs.select.addEventListener('change', handlerSelect);

refs.select.hidden = true;
refs.error.hidden = true;
refs.loader.hidden = false;
refs.spanLoader.hidden = false;

fetchBreeds()
  .then(data => {
    refs.select.innerHTML = createList(data);
    new SlimSelect({
      select: 'select',
    });
    refs.select.classList.remove('is-hidden');
  })
  .catch(error => {
    refs.error.hidden = false;
    Notiflix.Report.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    refs.select.hidden = false;
    refs.loader.hidden = true;
    refs.spanLoader.hidden = true;
  });

function createList(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function handlerSelect(evt) {
  const userSelect = evt.target.value;
  refs.catInfo.hidden = true;
  refs.loader.hidden = false;
  refs.spanLoader.hidden = false;

  fetchCatByBreed(userSelect)
    .then(info => {
      console.log(info);
      refs.catInfo.innerHTML = createCatInfo(info);
    })
    .catch(error => {
      refs.error.hidden = false;
      Notiflix.Report.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      refs.catInfo.hidden = false;
      refs.loader.hidden = true;
      refs.spanLoader.hidden = true;
    });
}

function createCatInfo(catDesc) {
  return catDesc
    .map(({ url, breeds }) => {
      const { name, description, temperament } = breeds[0];
      return `<img src="${url}" alt="${name}" width = 400>
    <h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p>`;
    })
    .join('');
}
