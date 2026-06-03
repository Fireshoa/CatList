fetch(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPiYdoSQNgTidpgT0sYGm_eyybqh2NpeUtz5EX96D89_8N6o2JoWueiXCeJaWl-I8S1Dnaz2psro2a/pub?gid=1988050984&single=true&output=csv'
)
  .then((response) => response.text())
  .then((csvText) => {
    const rows = csvText.split('\n');

    rows.forEach((row, idx) => {
      if (idx != 0) {
        if (idx == 25) {
          const extElem = document.createElement('h1');
          extElem.innerText = 'EXTENDED LIST:';
          document.body.appendChild(extElem);
        }
        entry = row.split(',');

        const entryElem = document.createElement('div');
        entryElem.className = 'listEntry';

        // Name & Placement
        const titleElem = document.createElement('h2');
        const title = `${idx}: ${entry[0]}`;
        titleElem.innerText = title;
        entryElem.appendChild(titleElem);

        // Verifier
        const verifierElem = document.createElement('p');
        const verifier = `Verifier: ${entry[3]}`;
        verifierElem.innerText = verifier;
        entryElem.appendChild(verifierElem);

        document.body.appendChild(entryElem);

        entryElem.addEventListener('click', (e) => {
          window.location.href =
            window.location.origin + `level/index.html?placement=${idx}`;
        });
      } else {
        const extElem = document.createElement('h1');
        extElem.innerText = 'MAIN LIST:';
        document.body.appendChild(extElem);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
