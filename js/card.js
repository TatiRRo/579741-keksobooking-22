const mapTypeToHeader = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const card = document.querySelector('#card');
const createCard = (data) => {
  const cloneCard = card.cloneNode(true).content.querySelector('.popup')
  const popupTitle = cloneCard.querySelector('.popup__title');
  const popupTextAddress = cloneCard.querySelector('.popup__text--address');
  const popupTextPrice = cloneCard.querySelector('.popup__text--price');
  const popupType = cloneCard.querySelector('.popup__type');
  const popupTextCapacity = cloneCard.querySelector('.popup__text--capacity');
  const popupTextTime = cloneCard.querySelector('.popup__text--time');
  const popupDescription = cloneCard.querySelector('.popup__description');
  const popupAvatar = cloneCard.querySelector('.popup__avatar');
  const popupFeatures = cloneCard.querySelector('.popup__features');
  const popupPhotos = cloneCard.querySelector('.popup__photos');


  if (data.offer.title) {
    popupTitle.textContent = data.offer.title;
  } else {
    popupTitle.style.display = 'none';
  }

  if (data.offer.address) {
    popupTextAddress.textContent = data.offer.address;
  } else {
    popupTextAddress.style.display = 'none';
  }

  if (data.offer.price) {
    popupTextPrice.textContent = `${data.offer.price} ₽/ночь`;
  } else {
    popupTextPrice.style.display = 'none';
  }

  if (data.offer.type) {
    popupType.textContent = mapTypeToHeader[data.offer.type];
  } else {
    popupType.style.display = 'none';
  }

  if (data.offer.rooms && data.offer.guests) {
    popupTextCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  } else {
    popupTextCapacity.style.display = 'none';
  }

  if (data.offer.checkin && data.offer.checkout) {
    popupTextTime.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  } else {
    popupTextTime.style.display = 'none';
  }

  if (!data.offer.features.length) {
    popupFeatures.style.display = 'none';
  } else {
    const featuresContainer = popupFeatures;
    featuresContainer.innerHTML = '';
    for (let i = 0; i < data.offer.features.length; i++) {
      const itemFeature = document.createElement('li');
      itemFeature.classList.add('popup__feature');
      itemFeature.classList.add(`popup__feature--${data.offer.features[i]}`);
      featuresContainer.appendChild(itemFeature);
    }
  }


  if (data.offer.description) {
    popupDescription.textContent = data.offer.description;
  } else {
    popupDescription.style.display = 'none';
  }

  if (!data.offer.photos.length) {
    popupPhotos.style.display = 'none';
  } else {
    const photosContainer = popupPhotos;
    photosContainer.innerHTML = '';
    for (let i = 0; i < data.offer.photos.length; i++) {
      const itemPhoto = document.createElement('img');
      itemPhoto.classList.add('popup__photo');
      itemPhoto.src = data.offer.photos[i];
      itemPhoto.height = 40;
      itemPhoto.width = 45;
      itemPhoto.alt = 'Фотография жилья';
      photosContainer.appendChild(itemPhoto);
    }
  }

  if (data.author.avatar) {
    popupAvatar.src = data.author.avatar;
  } else {
    popupAvatar.style.display = 'none';
  }

  return cloneCard;
}

export {
  createCard
};
