fetch(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPiYdoSQNgTidpgT0sYGm_eyybqh2NpeUtz5EX96D89_8N6o2JoWueiXCeJaWl-I8S1Dnaz2psro2a/pub?gid=1988050984&single=true&output=csv'
  )
    .then((response) => response.text())
    .then((csvText) => {
            console.log(csvText)
        }
    )