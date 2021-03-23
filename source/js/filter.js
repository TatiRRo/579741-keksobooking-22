/* global _:readonly */

import {
  mapFilters,
  data,
  drawPin,
  markersDb
} from './map.js';
import { hasSubArray } from './util.js';
import { resetFiltersMap } from './form.js';


const DEFAULT_FILTER_VALUE = 'any';
const ROOM_MAX_PRICE = 50000;
const ROOM_MIN_PRICE = 10000;
const HIGH_PRICE = 'high';
const MIDDLE_PRICE = 'middle';
const LOW_PRICE = 'low';
const RERENDER_DELAY = 500;

const housingTypeSelect = mapFilters.querySelector('#housing-type');
const housingPriceSelect = mapFilters.querySelector('#housing-price');
const housingRoomsSelect = mapFilters.querySelector('#housing-rooms');
const housingGuestsSelect = mapFilters.querySelector('#housing-guests');
const housingFeaturesInput = mapFilters.querySelector('#housing-features');
const resetButton = document.querySelector('.ad-form__reset');

const showFiltredAds = _.debounce(() => {
  markersDb.forEach((marker) => marker.remove());
  const filteredAds = filterAds();
  drawPin(filteredAds);
}, RERENDER_DELAY);

const filterState = {
  type: DEFAULT_FILTER_VALUE,
  price: DEFAULT_FILTER_VALUE,
  rooms: DEFAULT_FILTER_VALUE,
  guests: DEFAULT_FILTER_VALUE,
  features: [],
};

const filterAds = () => {
  return data.filter(function (ads) {
    const filteredByType =
      ads.offer.type === filterState.type ||
      filterState.type === DEFAULT_FILTER_VALUE;
    const filteredByRooms =
      ads.offer.rooms === +filterState.rooms ||
      filterState.rooms === DEFAULT_FILTER_VALUE;
    const filteredByGuests =
      ads.offer.guests === +filterState.guests ||
      filterState.guests === DEFAULT_FILTER_VALUE;
    const filteredByPrice =
      filterState.price === DEFAULT_FILTER_VALUE ||
      (filterState.price === HIGH_PRICE && ads.offer.price <= ROOM_MIN_PRICE) ||
      (filterState.price === MIDDLE_PRICE &&
        ads.offer.price >= ROOM_MIN_PRICE &&
        ads.offer.price <= ROOM_MAX_PRICE) ||
      (filterState.price === LOW_PRICE && ads.offer.price >= ROOM_MAX_PRICE);
    const filteredByFeautes = hasSubArray(
      ads.offer.features,
      filterState.features,
    );

    if (
      filteredByType &&
      filteredByRooms &&
      filteredByGuests &&
      filteredByPrice &&
      filteredByFeautes
    ) {
      return true;
    }
  });
};

housingTypeSelect.addEventListener('change', () => {
  const housingTypeValue = housingTypeSelect.value;
  filterState.type = housingTypeValue;

  showFiltredAds();
});

housingPriceSelect.addEventListener('change', () => {
  const housingPriceValue = housingPriceSelect.value;
  filterState.price = housingPriceValue;

  showFiltredAds();
});

housingRoomsSelect.addEventListener('change', () => {
  const housingRoomsValue = housingRoomsSelect.value;
  filterState.rooms = housingRoomsValue;

  showFiltredAds();
});

housingGuestsSelect.addEventListener('change', () => {
  const housingGuestsValue = housingGuestsSelect.value;
  filterState.guests = housingGuestsValue;

  showFiltredAds();
});

housingFeaturesInput.addEventListener('change', () => {
  const checkboxesInput = housingFeaturesInput.querySelectorAll(
    'input:checked',
  );
  filterState.features = [];
  checkboxesInput.forEach((checkbox) => {
    filterState.features.push(checkbox.value);
  });

  showFiltredAds();
});

resetButton.addEventListener('click', () => {
  resetFiltersMap();
});
