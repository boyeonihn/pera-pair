const playwalkDateInput = document.querySelector('.playwalkDate');
const petsittingDateInput = document.querySelector('.petsittingDate');
const locationInput = document.querySelector('.locationInfo');
const topicInput = document.getElementById('topic');
const playwalkDateInputEl = playwalkDateInput.querySelectorAll('input');
const petsittingDateInputEl = petsittingDateInput.querySelectorAll('input');

const setDisplay = (element, displayType) =>
  (element.style.display = displayType);

setDisplay(playwalkDateInput, 'none');
setDisplay(petsittingDateInput, 'none');
setDisplay(locationInput, 'none');

const handleTopicSelection = (event) => {
  const topic = event.target.value;

  if (topic.includes('pack') || topic.includes('date')) {
    setDisplay(playwalkDateInput, 'block');
    setDisplay(locationInput, 'block');
    setDisplay(petsittingDateInput, 'none');

    playwalkDateInputEl.forEach((el) => (el.required = 'true'));
    petsittingDateInputEl.forEach((el) => el.removeAttribute('required'));
  } else if (topic.includes('sitting')) {
    setDisplay(petsittingDateInput, 'block');
    setDisplay(locationInput, 'block');
    setDisplay(playwalkDateInput, 'none');

    playwalkDateInputEl.forEach((el) => el.removeAttribute('required'));
    petsittingDateInputEl.forEach((el) => (el.required = 'true'));
  } else {
    setDisplay(petsittingDateInput, 'none');
    setDisplay(locationInput, 'none');
    setDisplay(playwalkDateInput, 'none');
    playwalkDateInputEl.forEach((el) => el.removeAttribute('required'));
    petsittingDateInputEl.forEach((el) => el.removeAttribute('required'));
  }
};

topicInput.addEventListener('input', handleTopicSelection);
