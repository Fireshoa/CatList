import { getLvlPts } from '/points.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
fetch(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPiYdoSQNgTidpgT0sYGm_eyybqh2NpeUtz5EX96D89_8N6o2JoWueiXCeJaWl-I8S1Dnaz2psro2a/pub?gid=1988050984&single=true&output=csv'
)
  .then((response) => response.text())
  .then((csvText) => {
    const rows = csvText.split('\n');
    const level = rows[urlParams.get('placement')].split(',');
    console.log(level);

    document.getElementById('Title').innerText =
      '#' + urlParams.get('placement') + ': ' + level[0];
    document.getElementById('Creators').innerText = 'Creator(s): ' + level[2];
    document.getElementById('Verifier').innerText = 'Verifier: ' + level[3];
    document.getElementById('Pts').innerText =
      'Points on completion: ' + getLvlPts(urlParams.get('placement'));
    document.getElementById('Id').innerText = 'ID: ' + level[1];

    const victorsList = document.getElementById('Victors');
    const victors = level[4].split('&');
    if (victors.length == 1 && victors[0] == '') {
      document.getElementById('VictorHeader').innerText =
        'No Victors! Be the first!';
    } else {
      victors.forEach((user, idx) => {
        const victor = document.createElement('li');
        victor.innerText = user;
        victorsList.appendChild(victor);

        victor.addEventListener('click', (e) => {
          window.location.href = '../user/index.html?username=' + user;
        });
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });
