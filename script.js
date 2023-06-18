// Get the timers container and add event listener for add timer button
const timersContainer = document.getElementById('timers-container');
const addTimerBtn = document.getElementById('add-timer-btn');
addTimerBtn.addEventListener('click', showModal);

// Get the timer modal and its elements
const timerModal = document.getElementById('timer-modal');
const modalTitle = document.getElementById('modal-title');
const timerForm = document.getElementById('timer-form');
const eventNameInput = document.getElementById('event-name');
const eventDateInput = document.getElementById('event-date');
const eventColorInput = document.getElementById('event-color');

// Create an empty array to store the timers
let timers = [];

// Load the timers from local storage if they exist
if (localStorage.getItem('timers')) {
  timers = JSON.parse(localStorage.getItem('timers'));
  sortTimers();
  renderTimers();
}

// Show the timer modal
function showModal() {
  modalTitle.textContent = 'Add Timer';
  eventNameInput.value = '';
  eventDateInput.value = '';
  eventColorInput.value = '#000000';
  timerModal.style.display = 'block';
}

// Hide the timer modal
function hideModal() {
  timerModal.style.display = 'none';
}

// Add a new timer to the array and render it on the page
function addTimer(eventName, eventDate, eventColor) {
  const timer = {
    name: eventName,
    date: new Date(eventDate).getTime(),
    color: eventColor,
  };

  timers.push(timer);
  sortTimers();
  localStorage.setItem('timers', JSON.stringify(timers));
  renderTimers();
}

// Remove a timer from the array and render the updated timers on the page
function removeTimer(index) {
  timers.splice(index, 1);
  localStorage.setItem('timers', JSON.stringify(timers));
  renderTimers();
}

// Edit a timer in the array and render the updated timers on the page
function editTimer(index, eventName, eventDate, eventColor) {
  sortTimers();
  localStorage.setItem('timers', JSON.stringify(timers));
  renderTimers();
}

// Sort the timers by due date
function sortTimers() {
  timers.sort((a, b) => a.date - b.date);
}

// Render the timers on the page
function renderTimers() {
  timersContainer.innerHTML = '';

  timers.forEach((timer, index) => {
    // Calculate the time remaining
    const now = new Date().getTime();
    const timeRemaining = timer.date - now;

    // add 1 to make 0 be today
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)) + 1;

    // Create a timer element
    const timerEl = document.createElement('div');
    timerEl.classList.add('timer');

    // Create a header element for the days remaining
    const daysRemainingEl = document.createElement('h2');
    daysRemainingEl.classList.add('days-remaining');
    daysRemainingEl.textContent = `${daysRemaining}`;
    timerEl.appendChild(daysRemainingEl);

    // Create a paragraph element for the due date and timer name
    const dueDateEl = document.createElement('p');
    dueDateEl.classList.add('due-date');
    // add random color background
    // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    dueDateEl.style.color = `${timer.color}`;
    dueDateEl.textContent = `${timer.name}`;
    timerEl.appendChild(dueDateEl);

    // Create a button element to edit the timer
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    // output the date as a day of the week (e.g Mon) and date (e.g 01/01/2021)

    // output timer.date as day of week and date
    editBtn.textContent = `${new Date(timer.date).toLocaleDateString('en-NZ', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}`;

    // editBtn.textContent = `Edit (${new Date(timer.date).getDay().} ${new Date(timer.date).toLocaleDateString()})`;
    // editBtn.textContent = `Edit (${new Date(timer.date).toLocaleDateString()})`;
    editBtn.addEventListener('click', () => {
      showModal();
      modalTitle.textContent = 'Edit Timer';
      eventNameInput.value = timer.name;
      eventDateInput.value = new Date(timer.date).toISOString().slice(0, 10);
      eventColorInput.value = timer.color;
      const submitBtn = document.getElementById('submit-timer-btn');
      submitBtn.textContent = 'Save Changes';
      submitBtn.removeEventListener('click', addTimer);
      submitBtn.addEventListener('click', () => {
        editTimer(
          index,
          eventNameInput.value.trim(),
          eventDateInput.value,
          eventColorInput.value
        );
        hideModal();
      });
    });
    timerEl.appendChild(editBtn);

    // Create a button element to remove the timer
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = '&times';
    removeBtn.addEventListener('click', () => {
      removeTimer(index);
    });
    timerEl.appendChild(removeBtn);

    timersContainer.appendChild(timerEl);
  });
}

// Add event listener for the timer form submission
timerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const eventName = eventNameInput.value.trim();
  const eventDate = eventDateInput.value;
  const eventColor = eventColorInput.value;
  if (eventName && eventDate) {
    addTimer(eventName, eventDate, eventColor);
    hideModal();
  }
});

// Add event listener for the modal close button
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', hideModal);

// Use flexbox to lay out the timers
timersContainer.style.display = 'flex';
timersContainer.style.flexWrap = 'wrap';
timersContainer.style.justifyContent = 'center';
timersContainer.style.alignItems = 'center';

// Find the h1#date element and set its value to today's date
// It should be in the format: Monday, 26 July 2023
const dateEl = document.getElementById('date');
const today = new Date().toLocaleDateString('en-NZ', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

dateEl.textContent = today;

// Add some basic styling to the timers
const style = document.createElement('style');
style.textContent = `

`;

document.head.appendChild(style);
