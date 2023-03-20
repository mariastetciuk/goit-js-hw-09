function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let timerId = null;

stopBtnEl.setAttribute('disabled', 'true');

function onColorSwitcherStart() {
  document.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  stopBtnEl.removeAttribute('disabled');
  startBtnEl.setAttribute('disabled', 'true');
}

function onColorSwitcherStartStop() {
  clearInterval(timerId);
  startBtnEl.removeAttribute('disabled');
  stopBtnEl.setAttribute('disabled', '');
}
startBtnEl.addEventListener('click', onColorSwitcherStart);
stopBtnEl.addEventListener('click', onColorSwitcherStartStop);
