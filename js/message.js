const successTemplate = document.querySelector('#succes');
const errorTemplate = document.querySelector('#error');

const createMessage = (className, textMessage) => {
  const cardMessage = className === 'success' ? successTemplate : errorTemplate;
  const cloneMessage = cardMessage
    .cloneNode(true)
    .content.querySelector(`.${className}`);

  const onClickMessageRemove = () => {
    document.body.removeChild(cloneMessage);
    document.removeEventListener('click', onClickMessageRemove);
    document.removeEventListener('keydown', escMessageRemove);
  };

  const escMessageRemove = (evt) => {
    if (evt.keyCode === 27) {
      document.body.removeChild(cloneMessage);
      document.removeEventListener('keydown', escMessageRemove);
      document.removeEventListener('click', onClickMessageRemove);
    }
  };

  const errorTitle = cloneMessage.querySelector(`.${className}__message`);
  if (textMessage) {
    const errorButton = cloneMessage.querySelector(`.${className}__button`);
    errorButton.onclick = () => {
      document.body.removeChild(cloneMessage);
    };
    errorTitle.textContent = textMessage;
    errorButton.textContent = 'Закрыть';
  }
  cloneMessage.style.zIndex = 1000;
  document.body.appendChild(cloneMessage);

  document.addEventListener('click', onClickMessageRemove);
  document.addEventListener('keydown', escMessageRemove);
}

export { createMessage };
