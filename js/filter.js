import { mapFilters, data, drawPin, markersDb} from './map.js';

const DEFAULT_FILTER_VALUE = 'any';
const ROOM_MAX_PRICE = 50000;
const ROOM_MIN_PRICE = 10000;
const HIGH_PRICE = 'high';
const MIDDLE_PRICE = 'middle';
const LOW_PRICE = 'low';


const housingTypeSelect = mapFilters.querySelector('#housing-type');
const housingPriceSelect = mapFilters.querySelector('#housing-price');
const housingRoomsSelect = mapFilters.querySelector('#housing-rooms');
const housingGuestsSelect = mapFilters.querySelector('#housing-guests');
const showFiltredAds = () => {
  markersDb.forEach(marker => marker.remove());
  const filteredAds = toFilterAds();
  drawPin(filteredAds);
};

const filterState = {
  type: DEFAULT_FILTER_VALUE,
  price: DEFAULT_FILTER_VALUE,
  rooms: DEFAULT_FILTER_VALUE,
  guests: DEFAULT_FILTER_VALUE,
}

const toFilterAds = () => {
  return data
    .filter(function(ads) {
      const filteredByType = ads.offer.type === filterState.type || filterState.type === DEFAULT_FILTER_VALUE;
      const filteredByRooms = ads.offer.rooms === +(filterState.rooms) || filterState.rooms === DEFAULT_FILTER_VALUE;
      const filteredByGuests = ads.offer.guests === +(filterState.guests) || filterState.guests === DEFAULT_FILTER_VALUE;
      const filteredByPrice =
      filterState.price === DEFAULT_FILTER_VALUE ||
      (filterState.price === HIGH_PRICE && ads.offer.price <= ROOM_MIN_PRICE) ||
      (filterState.price === MIDDLE_PRICE && ads.offer.price >= ROOM_MIN_PRICE && ads.offer.price <= ROOM_MAX_PRICE) ||
      (filterState.price === LOW_PRICE && ads.offer.price >= ROOM_MAX_PRICE);
      if (filteredByType && filteredByRooms && filteredByGuests && filteredByPrice) {
        return true;
      }
    })
}


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
  const housingPriceValue = housingRoomsSelect.value;
  filterState.rooms = housingPriceValue;

  showFiltredAds();
});




housingGuestsSelect.addEventListener('change', () => {
  const housingPriceValue = housingRoomsSelect.value;
  filterState.guests = housingPriceValue;

  showFiltredAds();
});
