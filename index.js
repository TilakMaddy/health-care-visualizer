// DOM elements
const btns = document.querySelectorAll('button');
const form = document.querySelector('form');
const formAct = document.querySelector('form span');
const input = document.querySelector('input');
const error = document.querySelector('.error');

let activity = 'cycling';

btns.forEach(btn => {
  btn.addEventListener('click', e => {

    if(activity == e.target.dataset.activity)
      return;

    // new activity chosen
    activity = e.target.dataset.activity;

    const video = document.querySelector('video');
    video.querySelector('source').remove();

    const source = document.createElement('source');

    source.setAttribute('src', `./${activity}.mp4`);
    source.setAttribute('type', 'video/mp4');

    video.append(source);
    video.load();
    video.play();

    // remove and add active class
    btns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // set id of input field
    input.setAttribute('id', activity);

    // set text of form span (the activity)
    formAct.textContent = activity;

    // call the update function
    update(data);
  });
});

// form submit
form.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault()

  const distance = parseInt(input.value);
  if(distance > 0){
    db.collection('activities').add({
      distance,
      activity,
      date: new Date().toString()
    }).then(() => {
      error.textContent = '';
      input.value = '';
    }).catch(err => console.log(err));
  } else {
    error.textContent = 'Please enter a valid distance'
  }

  input.value = "";
});

document.querySelector('#run').addEventListener('click', function() {
  console.log('registered click event');
  var elems = document.querySelector('#run-modal');
  M.Modal.init(elems).open();
});

document.querySelector('#swim').addEventListener('click', function() {
  console.log('registered click event');
  var elems = document.querySelector('#swim-modal');
  M.Modal.init(elems).open();
});

document.querySelector('#cycle').addEventListener('click', function() {
  console.log('registered click event');
  var elems = document.querySelector('#cycle-modal');
  M.Modal.init(elems).open();
});