export function getLvlPts(placement) {
  if (placement > 50) {
    return 'Legacy';
  }

  return 1000 - 20 * (placement - 1);
}

export function getUsr(username) {
  let pts = 0;
  let comp = [];
  return fetch(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPiYdoSQNgTidpgT0sYGm_eyybqh2NpeUtz5EX96D89_8N6o2JoWueiXCeJaWl-I8S1Dnaz2psro2a/pub?gid=1988050984&single=true&output=csv'
  )
    .then((response) => response.text())
    .then((csvText) => {
      const rows = csvText.split('\n');
      rows.forEach((row, idx) => {
        const level = row.split(',');
        if (level[3] == username || level[4].split('&').includes(username)) {
          pts += getLvlPts(idx);
          comp.push({
            name: level[0],
            verif: level[3] == username,
          });
        }
      });

      return {
        points: pts,
        complete: comp,
      };
    })
    .catch((error) => {
      console.error(error);
    });
}
