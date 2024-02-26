import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = Number(event.currentTarget.delay.value);
  const stepInput = Number(event.currentTarget.step.value);
  const amountInput = Number(event.currentTarget.amount.value);

  for (let i = 1; i <= amountInput; i++) {
    createPromise(i, delayInput + stepInput * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) =>{
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    resolve({ position, delay });
    // Fulfill
  } else {
    reject({ position, delay});
    // Reject
  }
});
});
}
