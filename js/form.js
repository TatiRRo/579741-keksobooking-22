import { disableFormElements, enableFormElements } from './util.js';
import {
  LAT_TOKYO,
  LNG_TOKYO,
  mapFilters,
  drawPin,
  data,
  mainPinMarker,
  map
} from './map.js';
import { createMessage } from './message.js';
import { sendData } from './api.js';

const coordinateAdress = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');
const adFormFieldsetArray = adForm.children;

const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';
const MIN_PRICE_FLAT = 1000;
const mapTypePrice = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};
const mapRoomNumber = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MAX_PRICE = 1000000;
const MAX_LENGHT_INPUT = 100;
const MIN_LENGHT_INPUT = 30;

const allTypeHouse = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const inputTimeIn = document.querySelector('#timein');
const inputTimeOut = document.querySelector('#timeout');
const inputTitle = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const capacityGuests = document.querySelector('#capacity');

inputPrice.placeholder = MIN_PRICE_FLAT;
capacityGuests.value = mapRoomNumber['1'];



inputPrice.setAttribute('required', 'required');
inputPrice.setAttribute('max', MAX_PRICE);
inputTitle.setAttribute('required', 'required');
inputTitle.setAttribute('minlength', MIN_LENGHT_INPUT);
inputTitle.setAttribute('maxlength', MAX_LENGHT_INPUT);

const resetFiltersMap = () => {
  mapFilters.reset();
  drawPin(data);
  mainPinMarker.setLatLng([LAT_TOKYO, LNG_TOKYO]);
  map.setView(
    {
      lat: LAT_TOKYO,
      lng: LNG_TOKYO,
    },
    9,
  );
}

const calcRoomCapacity = () => {
  const selectedRoomNumber = roomNumber.value;
  const allowedGuests = mapRoomNumber[selectedRoomNumber];
  const allOptions = capacityGuests.querySelectorAll('option');
  capacityGuests.value = allowedGuests[0];

  allOptions.forEach((option) => {
    const index = allowedGuests.findIndex((el) => el === +option.value);
    option.removeAttribute('disabled');
    if (index === -1) {
      option.setAttribute('disabled', 'disabled');
    }
  });
};

calcRoomCapacity();

coordinateAdress.setAttribute('readonly', 'true');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  disableFormElements(adFormFieldsetArray);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  enableFormElements(adFormFieldsetArray);
};

const setAddressValue = (lat, lng) => {
  coordinateAdress.value = `${lat}, ${lng}`;
};

const onFormSubmitSuccess = () => {
  createMessage('success');
  adForm.reset();
  setAddressValue(LAT_TOKYO, LNG_TOKYO);
  resetFiltersMap();
};

const onFormSubmitError = () => {
  createMessage('error');
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(SEND_DATA_URL, formData, onFormSubmitSuccess, onFormSubmitError);
});

adForm.addEventListener('reset', () => {
  setTimeout(() => {
    setAddressValue(LAT_TOKYO, LNG_TOKYO)
    capacityGuests.value = mapRoomNumber['1'];
  }, 0);
});


allTypeHouse.addEventListener('change', () => {
  const selectedTypeHouse = allTypeHouse.value;
  const priceHome = mapTypePrice[selectedTypeHouse];
  inputPrice.placeholder = priceHome;
  inputPrice.setAttribute('min', priceHome);
});

inputTimeIn.addEventListener('change', () => {
  inputTimeOut.value = inputTimeIn.value;
});

inputTimeOut.addEventListener('change', () => {
  inputTimeIn.value = inputTimeOut.value;
});

roomNumber.addEventListener('change', calcRoomCapacity);

export {
  coordinateAdress,
  adForm,
  adFormFieldsetArray,
  deactivateForm,
  activateForm,
  setAddressValue,
  resetFiltersMap
};
