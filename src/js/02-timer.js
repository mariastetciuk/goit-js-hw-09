import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataPickerEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button');
const deysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let currentDate = new Date();
let selectedDate = null;
let deltaTime = null;
let intervalId = null;

buttonEl.setAttribute('disabled', 'true');

buttonEl.addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    deltaTime = selectedDate - currentDate;

    if (selectedDate <= currentDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    buttonEl.removeAttribute('disabled');
  },
};

const fp = flatpickr(dataPickerEl, options);

function onStartTimer(event) {
  updateComponentsTimer(convertMs(deltaTime));
  startTimer();
  buttonEl.setAttribute('disabled', 'true');
  dataPickerEl.setAttribute('disabled', 'true');
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function startTimer() {
  intervalId = setInterval(() => {
    stopTimer();

    deltaTime -= 1000;
    convertMs(deltaTime);
    updateComponentsTimer(convertMs(deltaTime));
  }, 1000);
}

function stopTimer() {
  if (
    (deysEl.textContent === '00') &
    (hoursEl.textContent === '00') &
    (minutesEl.textContent === '00') &
    (secondsEl.textContent === '01')
  ) {
    clearInterval(intervalId);
  }
}

function updateComponentsTimer({ days, hours, minutes, seconds }) {
  deysEl.textContent = days.toString();
  hoursEl.textContent = hours.toString();
  minutesEl.textContent = minutes.toString();
  secondsEl.textContent = seconds.toString();
}
