export const SheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQPiYdoSQNgTidpgT0sYGm_eyybqh2NpeUtz5EX96D89_8N6o2JoWueiXCeJaWl-I8S1Dnaz2psro2a/pub?gid=1988050984&single=true&output=csv"

export function getLvlPts(placement) {
  if (placement > 50) {
    return 'Legacy';
  }

  return 1000 - 20 * (placement - 1);
}

export function usrBeat(username, levelrow) {
  if (levelrow.split(",")[4].split("&").includes(username)) {
    return true
  }
  if (username == levelrow.split(","[3])) {
    return true
  }
  return false
}

export function victors(levelrow) {
  let usrs = []
  usrs.push(levelrow.split(",")[3].trim())
  levelrow.split(",")[4].trim().split("&").forEach(user => {
    usrs.push(user)
  })
  if (usrs[0] == '') {
    return []
  }
  return usrs
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
          if (getLvlPts(idx) != "Legacy") {
            pts += getLvlPts(idx);
          }
          comp.push({
            name: level[0],
            place: idx,
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

export function rank(points) {
  // Define your rank thresholds from highest to lowest
  const rankThresholds = [
    { limit: 25000, name: "Diamond III", color: "#0ff" },
    { limit: 20000, name: "Diamond II", color: "#0ff"  },
    { limit: 15000, name: "Diamond I", color: "#0ff"  },
    { limit: 10000, name: "Gold III", color: "#ff0"  },
    { limit: 7500,  name: "Gold II", color: "#ff0"  },
    { limit: 5000,  name: "Gold I", color: "#ff0"  },
    { limit: 4000,  name: "Silver III", color: "#aaa"  },
    { limit: 3000,  name: "Silver II", color: "#aaa"  },
    { limit: 2500,  name: "Silver I", color: "#aaa"  },
    { limit: 2000,  name: "Copper III", color: "#b87333"  },
    { limit: 1000,  name: "Copper II", color: "#b87333"  },
    { limit: 500,   name: "Copper I", color: "#b87333"  }
  ];

  // Loop through and find the first threshold the player's score passes
  for (const rank of rankThresholds) {
    if (points >= rank.limit) {
      return {
        rank: rank.name,
        color: rank.color
      };
    }
  }

  // If they don't even meet the lowest limit (under 500 points)
  return {
    rank: "Newb",
    color: "#7B3F00"
  }
}