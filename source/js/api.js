const sendData = (url, formData, onSuccess, onFail) => {
  fetch(url, {
    method: 'POST',
    body: formData,
    'Content-Type': 'multipart/form-data',
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onFail();
    });
};

export { sendData, getData };
