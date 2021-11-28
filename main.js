const elapsedTime = document.getElementById('elapsed');
const homeTeamImg = document.getElementById('homeLogo');
const homeTeamName = document.getElementById('homeName');
const awayTeamImg = document.getElementById('awayLogo');
const awayTeamName = document.getElementById('awayName');
const matchTable = document.getElementById('matchTable');
const score = document.getElementById('liveScore');

const addMatchTile = data => {
    const matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");
    const elapsedTime = document.createElement('p');
    elapsedTime.classList.add("elapsed-time");
    elapsedTime.innerHTML = data['fixture']['status']['elapsed'] + "'";

    const homeTeam = document.createElement('div');
    homeTeam.classList.add('team');
    const homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    const homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src = data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamName);
    homeTeam.appendChild(homeTileTeamLogo);

    const awayTeam = document.createElement('div');
    awayTeam.classList.add('team');
    const awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    const awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src = data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamName);
    awayTeam.appendChild(awayTileTeamLogo);

    const score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];

    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);
    matchtile.appendChild(elapsedTime);

    matchTable.appendChild(matchtile);
    const tileBreak = document.createElement('hr');
    matchTable.appendChild(tileBreak);
}

fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5930dd09fbfeea16782aac6acdfb1edf"
    }
}).then(response => response.json().then(data => {
    const matchesList = data['response'];

    for (let i = 0; i < matchesList.length; i++) {
        console.log('loop');
        addMatchTile(matchesList[i]);
    }
}))
    .catch(err => {
        console.log(err);
    });
