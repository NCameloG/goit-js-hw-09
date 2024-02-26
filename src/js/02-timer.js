import notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future.');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      countdownDate = selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let countdownDate;
startButton.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', () => {
  startButton.disabledd = true;
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = countdownDate - currentTime;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
});