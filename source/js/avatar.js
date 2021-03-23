const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePhotoPreview = document.querySelector('.ad-form__photo');

const listHousePhotos = document.createElement('ul');
listHousePhotos.setAttribute(
  'style',
  'list-style:none; display:flex; margin:0; padding:0; width: 261px; flex-wrap: wrap;',
);
housePhotoPreview.appendChild(listHousePhotos);

// Загрузка фото аватара

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

// Загрузка фотографий жилья

housePhotoFileChooser.addEventListener('change', () => {
  const file = housePhotoFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const unitHousePhoto = document.createElement('li');
      listHousePhotos.appendChild(unitHousePhoto);

      const pictureHousePhoto = document.createElement('img');
      unitHousePhoto.appendChild(pictureHousePhoto);
      pictureHousePhoto.setAttribute('src', 'true');
      pictureHousePhoto.setAttribute('width', '70');
      pictureHousePhoto.setAttribute('height', '70');
      pictureHousePhoto.setAttribute('alt', 'Фотография жилья');
      pictureHousePhoto.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export { listHousePhotos, avatarPreview };
