import { getLvlPts, usrBeat, rank, victors } from '../points.js';

const listelem = document.getElementById("list")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let users = {}
fetch(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPiYdoSQNgTidpgT0sYGm_eyybqh2NpeUtz5EX96D89_8N6o2JoWueiXCeJaWl-I8S1Dnaz2psro2a/pub?gid=1988050984&single=true&output=csv'
)
  .then((response) => response.text())
  .then((csvText) => {
    const rows = csvText.split('\n');
    rows.forEach((row, idx) => {
        if (idx != 0) {
            const rowParsed = row.split(",")
            const complete = victors(row)
            complete.forEach((v) => {
              if (getLvlPts(idx) != "Legacy") {
                if (v in users) {
                    users[v] += getLvlPts(idx)
                } else {
                    users[v] = getLvlPts(idx)
                }
              }
            })
        }
    })

    users = Object.fromEntries(
        Object.entries(users).sort((a, b) => b[1] - a[1]) // Sorts by value (index 1) in descending order
    );

    for (const [user, points] of Object.entries(users)) {
        const entry = document.createElement('li')
        entry.innerText = `${user}: ${points} (${rank(points).rank})`
        listelem.appendChild(entry)
    }
  })
  .catch((error) => {
    console.error(error);
  });