import { getUsr } from '../points.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

getUsr(urlParams.get('username')).then((user) => {
  console.log(user);
  document.getElementById('Username').innerText = urlParams.get('username');
  document.getElementById('Pts').innerText = 'Points: ' + user.points;
  document.getElementById(
    'completionsHeader'
  ).innerText = `Completions (${user.complete.length}):`;
  const completionsList = document.getElementById('completions');
  user.complete.forEach((comp, idx) => {
    const completion = document.createElement('li');
    completion.innerText = comp.name;
    if (comp.verif) {
      completion.innerText += ' (Verified)';
    }
    completionsList.appendChild(completion);
  });
});
