const sheetUrl = 'https://docs.google.com/spreadsheets/d/1OgXbvmA8leuimASUFLbHeWMBhncy2_r1Il9S-NrBTTQ/pub?gid=0&single=true&output=csv'; // Replace with your Google Sheets published URL

document.getElementById('submitButton').addEventListener('click', () => {
    const teamName = document.getElementById('teamName').value.trim();
    if (teamName) {
        fetchSheetData(teamName);
    }
});

async function fetchSheetData(teamName) {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();
        processSheetData(data, teamName);
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
    }
}

function processSheetData(data, teamName) {
    const players = data.values.slice(1); // Skip header row
    let winnerFound = false;

    players.forEach(player => {
        const playerName = player[0];
        const afcTeams = [player[1], player[2]];
        const nfcTeams = [player[3], player[4]];
        let totalOwed = parseFloat(player[5]) || 0;

        if (afcTeams.includes(teamName) || nfcTeams.includes(teamName)) {
            totalOwed += 70;
            winnerFound = true;
        }

        // Update the Total Owed in the Google Sheet
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

    data.values.slice(1).forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player[0]}</td>
            <td>${player[5]}</td> <!-- Assuming Total Owed is the 6th column -->
        `;
        tableBody.appendChild(row);
    });
}
const sheetUrl = 'YOUR_PUBLISHED_SHEET_URL'; // Replace with your Google Sheets published URL

document.getElementById('submitButton').addEventListener('click', () => {
    const teamName = document.getElementById('teamName').value.trim();
    if (teamName) {
        fetchSheetData(teamName);
    }
});

async function fetchSheetData(teamName) {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();
        processSheetData(data, teamName);
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
    }
}

function processSheetData(data, teamName) {
    const players = data.values.slice(1); // Skip header row
    let winnerFound = false;

    players.forEach(player => {
        const playerName = player[0];
        const afcTeams = [player[1], player[2]];
        const nfcTeams = [player[3], player[4]];
        let totalOwed = parseFloat(player[5]) || 0;

        if (afcTeams.includes(teamName) || nfcTeams.includes(teamName)) {
            totalOwed += 70;
            winnerFound = true;
        }

        // Update the Total Owed in the Google Sheet
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

    data.values.slice(1).forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player[0]}</td>
            <td>${player[5]}</td> <!-- Assuming Total Owed is the 6th column -->
        `;
        tableBody.appendChild(row);
    });
}
