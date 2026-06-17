const listElem = document.getElementById("list")
fetch(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPiYdoSQNgTidpgT0sYGm_eyybqh2NpeUtz5EX96D89_8N6o2JoWueiXCeJaWl-I8S1Dnaz2psro2a/pub?gid=1988050984&single=true&output=csv'
)
  .then((response) => response.text())
  .then((csvText) => {
    const rows = csvText.split('\n');

    rows.forEach((row, idx) => {
      if (idx != 0) {
        if (idx == 26) {
          const extElem = document.createElement('h1');
          extElem.innerText = 'EXTENDED LIST:';
          extElem.className = 'title'
          list.appendChild(extElem);
        }
        if (idx == 51) {
          const extElem = document.createElement('h1');
          extElem.innerText = 'LEGACY LIST:';
          extElem.className = 'title'
          const info = document.createElement("span")
          info.innerText = "?"
          info.title = "Legacy list levels are NOT maintained, placements are not shifted, and they dont count for points. We also will not be adding victors to legacy list levels."
          const leglistdiv = document.createElement('div')
          leglistdiv.style.flexDirection = "rows"
          leglistdiv.appendChild(extElem);
          leglistdiv.appendChild(info);
          list.appendChild(leglistdiv)
        }
        entry = row.split(',');

        const entryElem = document.createElement('div');
        entryElem.className = 'listEntry';

        // Name & Placement
        const titleElem = document.createElement('h2');
        const title = `#${idx}${idx >  50 ? ` (Leg ${idx-50})` : idx > 25 ? ` (Ext ${idx-25})` : ""}: ${entry[0]}`;
        titleElem.innerText = title;
        entryElem.appendChild(titleElem);

        // --- FIXED VICTOR COUNT LOGIC ---
        const victorsString = entry[4] ? entry[4].trim() : "";

        // If the string is empty or undefined, count is 0. 
        // Otherwise, split by "&" to count them.
        const victorCount = (victorsString === "" || victorsString === "None")
          ? 0
          : victorsString.split("&").length;

        // Verifier
        const verifierElem = document.createElement('p');
        const verifier = `Verifier: ${entry[3]} | Creator: ${entry[2]} | Victors: ${victorCount}`;
        verifierElem.innerText = verifier;
        entryElem.appendChild(verifierElem);

        list.appendChild(entryElem);

        entryElem.addEventListener('click', (e) => {
          window.location.href = `./level/index.html?placement=${idx}`;
        });
      } else {
        const extElem = document.createElement('h1');
        extElem.innerText = 'MAIN LIST:';
        extElem.className = 'title'
        list.appendChild(extElem);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
