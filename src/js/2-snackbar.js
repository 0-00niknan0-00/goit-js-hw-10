import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = document.querySelector('[name="delay"]').value;

  const promiseType = document.querySelector('[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseType === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(result => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise: ${result}`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise: ${error}`,
        position: 'topRight',
      });
    });
});
