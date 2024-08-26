const sheetUrl = 'https://docs.google.com/spreadsheets/d/1OgXbvmA8leuimASUFLbHeWMBhncy2_r1Il9S-NrBTTQ/pub?output=csv';

document.getElementById('submitButton').addEventListener('click', () => {
    const teamName = document.getElementById('teamName').value.trim();
    if (teamName) {
        fetchSheetData(teamName);
    }
});

async function fetchSheetData(teamName) {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.text();
        const parsedData = Papa.parse(data, { header: true }).data;
        processSheetData(parsedData, teamName);
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
    }
}

function processSheetData(data, teamName) {
    let winnerFound = false;
    let updatedData = [];

    data.forEach(player => {
        let totalOwed = parseFloat(player['Total Owed']) || 0;

        if (player['AFC1'] === teamName || player['AFC2'] === teamName || player['NFC1'] === teamName || player['NFC2'] === teamName) {
            totalOwed += 70;
            winnerFound = true;
        }

        updatedData.push({
            Player: player['Player'],
            AFC1: player['AFC1'],
            AFC2: player['AFC2'],
            NFC1: player['NFC1'],
            NFC2: player['NFC2'],
            'Total Owed': totalOwed
        });
    });

    if (winnerFound) {
        displayResults(updatedData);
    } else {
        alert("No player has the winning team.");
    }
}

function displayResults(data) {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player['Player']}</td>
            <td>${player['AFC1']}, ${player['AFC2']}</td>
            <td>${player['NFC1']}, ${player['NFC2']}</td>
            <td>$${player['Total Owed']}</td>
        `;
        tableBody.appendChild(row);
    });
}
