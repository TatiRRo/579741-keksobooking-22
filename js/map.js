/* global L:readonly */

import { createCard } from './card.js';
import { setAddressValue } from './form.js';
import { disableFormElements } from './util.js';
import { activateForm } from './form.js';
import { enableFormElements } from './util.js';
import { createMessage } from './message.js';
import { getData } from './api.js';

const LAT_TOKYO = 35.6895;
const LNG_TOKYO = 139.69171;
const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const QUANTITY_ADS = 10;
const DIGITS = 5;

const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsetArray = mapFilters.children;

const markersDb = [];

const drawPin = (ads) => {
  ads.forEach((similarAd) => {
    const pinIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: similarAd.location.lat,
        lng: similarAd.location.lng,
      },
      { icon: pinIcon },
    );
    markersDb.push(marker);
    marker.addTo(map).bindPopup(createCard(similarAd));
  });
};

disableFormElements(mapFiltersFieldsetArray);

let data = null;

const getDataSuccess = (ads) => {
  data = ads;
  data.length = QUANTITY_ADS;
  drawPin(ads);
};
const getDataError = () => {
  createMessage(
    'error',
    'Произошла ошибка запроса при загрузке данных с сервера',
  );
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    getData(GET_DATA_URL, getDataSuccess, getDataError);

    enableFormElements(mapFiltersFieldsetArray);
  })
  .setView(
    {
      lat: LAT_TOKYO,
      lng: LNG_TOKYO,
    },
    9,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const mainPinMarker = L.marker(
  {
    lat: LAT_TOKYO,
    lng: LNG_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  setAddressValue(lat.toFixed(DIGITS), lng.toFixed(DIGITS));
});

setAddressValue(LAT_TOKYO, LNG_TOKYO);

export {
  LAT_TOKYO,
  LNG_TOKYO,
  mapFilters,
  data,
  markersDb,
  drawPin,
  mainPinMarker,
  map
};
