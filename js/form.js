import {
  disableFormElements,
  enableFormElements
} from './util.js';
import {
  LAT_TOKYO,
  LNG_TOKYO
} from './map.js';
import {
  createMessage
} from './message.js';
import {
  sendData
} from './api.js';

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
}
const allTypeHouse = document.querySelector('#type');
const inputPrice = document.querySelector('#price');


coordinateAdress.setAttribute('readonly', 'true');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  disableFormElements(adFormFieldsetArray);
}

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  enableFormElements(adFormFieldsetArray);
}

const setAddressValue = (lat, lng) => {
  coordinateAdress.value = `${lat}, ${lng}`;
}

const onFormSubmitSuccess = () => {
  createMessage('success');
  adForm.reset();
  setAddressValue(LAT_TOKYO, LNG_TOKYO);
};
const onFormSubmitError = () => {
  createMessage('error');
};


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(SEND_DATA_URL,formData,onFormSubmitSuccess,onFormSubmitError);
});


adForm.addEventListener('reset', () => {
  setTimeout(() => setAddressValue(LAT_TOKYO, LNG_TOKYO), 0)
})


inputPrice.placeholder = MIN_PRICE_FLAT;


allTypeHouse.addEventListener('change', () => {
  const selectedTypeHouse = allTypeHouse.value;
  const priceHome = mapTypePrice[selectedTypeHouse];
  inputPrice.placeholder = priceHome;
  inputPrice.setAttribute('min', priceHome);
});


const inputTimeIn = document.querySelector('#timein');
const inputTimeOut = document.querySelector('#timeout');


inputTimeIn.addEventListener('change', () => {
  inputTimeOut.value = inputTimeIn.value;
});

inputTimeOut.addEventListener('change', () => {
  inputTimeIn.value = inputTimeOut.value;
});




export {
  coordinateAdress,
  adForm,
  adFormFieldsetArray,
  deactivateForm,
  activateForm,
  setAddressValue
};
