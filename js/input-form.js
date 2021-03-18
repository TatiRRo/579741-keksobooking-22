const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;

const allTypeHouse = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
inputPrice.placeholder = MIN_PRICE_FLAT;


allTypeHouse.addEventListener('change', () => {
  const selectedTypeHouse = allTypeHouse.value;
  if (selectedTypeHouse === 'house'){
    inputPrice.placeholder = MIN_PRICE_HOUSE;
    inputPrice.setAttribute('min', MIN_PRICE_HOUSE);
  }
  if (selectedTypeHouse === 'flat'){
    inputPrice.placeholder = MIN_PRICE_FLAT;
    inputPrice.setAttribute('min', MIN_PRICE_FLAT);
  }
  if (selectedTypeHouse === 'palace'){
    inputPrice.placeholder = MIN_PRICE_PALACE;
    inputPrice.setAttribute('min', MIN_PRICE_PALACE);
  }
  if (selectedTypeHouse === 'bungalow'){
    inputPrice.placeholder = MIN_PRICE_BUNGALOW;
    inputPrice.setAttribute('min', MIN_PRICE_BUNGALOW);
  }
});


const inputTimeIn = document.querySelector('#timein');
const inputTimeOut = document.querySelector('#timeout');


inputTimeIn.addEventListener('change', () => {
  const selectedTimeIn = inputTimeIn.value;
  inputTimeOut.value = selectedTimeIn;
});

inputTimeOut.addEventListener('change', () => {
  const selectedTimeOut = inputTimeOut.value;
  inputTimeIn.value = selectedTimeOut;

});
