const mood_display = document.querySelector('.mood-display');

const happy_button = document.querySelector('.happy')
const sad_button = document.querySelector('.sad');
const angry_button = document.querySelector('.angry');
const confused_button = document.querySelector('.confused');

happy_button.addEventListener('click', function () {
  store.dispatch({ type: 'HAPPY', payload: '(◑‿◐)' });
  const new_mood = store.getState().mood;
  mood_display.innerText = new_mood;
});


sad_button.addEventListener('click', function () {
  store.dispatch({ type: 'SAD', payload: 'ಠ╭╮ಠ'  });
  const new_mood = store.getState().mood;
  mood_display.innerText = new_mood;
});


angry_button.addEventListener('click', function () {
  store.dispatch({ type: 'ANGRY', payload: '(ಠ⌣ಠ)'  });
  const new_mood = store.getState().mood;
  mood_display.innerText = new_mood;
});


confused_button.addEventListener('click', function () {
  store.dispatch({ type: 'CONFUSED', payload: '◔_◔'  });
  const new_mood = store.getState().mood;
  mood_display.innerText = new_mood;
});