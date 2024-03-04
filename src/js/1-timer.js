import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const activeButton = document.querySelector('[data-start]');

class Timer {
  constructor() {
    this.isActive = false;
  }
  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const current = Date.now();
      const diff = userSelectedDate - current;
      if (diff <= 0) {
        clearInterval(this.intervalId);
        diff = 0;
      }
      const timeObj = this.convertMs(diff);
      updateTimerElement(timeObj);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}
const timer = new Timer();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timer.isActive) {
      return;
    }

    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      activeButton.disabled = true;

      iziToast.error({
        title: 'Hey',
        message: 'Choose the date in future',
      });
      //
      return;
    } else {
      userSelectedDate = selectedDate;
      activeButton.disabled = false;
    }
  },
};
const datetimePicker = flatpickr('#datetime-picker', options);

activeButton.addEventListener('click', e => {
  e.target.disabled = true;
  document.querySelector('#datetime-picker').disabled = true;

  timer.start();
});

function updateTimerElement(timeObj) {
  document.querySelector('[data-days]').textContent = addLeadingZero(
    timeObj.days
  );
  document.querySelector('[data-hours]').textContent = addLeadingZero(
    timeObj.hours
  );
  document.querySelector('[data-minutes]').textContent = addLeadingZero(
    timeObj.minutes
  );
  document.querySelector('[data-seconds]').textContent = addLeadingZero(
    timeObj.seconds
  );
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
