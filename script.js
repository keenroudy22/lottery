const sheetUrl = 'https://docs.google.com/spreadsheets/d/1OgXbvmA8leuimASUFLbHeWMBhncy2_r1Il9S-NrBTTQ/pub?output=csv'; // Your Google Sheets CSV URL

document.getElementById('submitButton').addEventListener('click', () => {
    const teamName = document.getElementById('teamName').value.trim();
    if (teamName) {
        fetchSheetData(teamName);
    }
});

async function fetchSheetData(teamName) {
    try {
        const response = await fetch(sheetUrl);
        const csvData = await response.text();
        const data = Papa.parse(csvData, { header: true }).data;
        processSheetData(data, teamName);
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
    }
}

function processSheetData(data, teamName) {
    let winnerFound = false;

    data.forEach(player => {
        const playerName = player.Player;
        const afcTeams = [player.AFC1, player.AFC2];
        const nfcTeams = [player.NFC1, player.NFC2];
        let totalOwed = parseFloat(player.TotalOwed) || 0;

        if (afcTeams.includes(teamName) || nfcTeams.includes(teamName)) {
            totalOwed += 70;
            winnerFound = true;
        }

        if (winnerFound) {
            updateSheet(playerName, totalOwed);
        }
    });

    if (winnerFound) {
        displayResults(data);
    } else {
        alert("No player has the winning team.");
    }
}

function updateSheet(playerName, totalOwed) {
    // Logic to update Google Sheets with the new total
    // This would typically involve Google Apps Script or another service
}

function displayResults(data) {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.Player}</td>
            <td>${player.TotalOwed}</td>
        `;
        tableBody.appendChild(row);
    });
}
