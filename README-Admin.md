# Admin Flow (Option B)

This adds `/lottery/admin.html` to click winners each week. It writes rows to a `Weeks` tab in your Google Sheet. The scoreboard (`/lottery/index.html`) reads both **Players** and **Weeks** CSVs, shows badges, and computes **POT with rollover** + player totals.

## 1) Create and publish the `Weeks` tab
In your same Google Sheet:
```
Week,Team,Timestamp
```
(Keep a header row.) Then **File → Share → Publish to web** and copy the CSV link for the Weeks tab.

## 2) Deploy Google Apps Script (write endpoint)
Sheet → Extensions → Apps Script → paste this, then deploy as **Web app** (Execute as Me; Who has access: Anyone). Copy the Web App URL.

```javascript
function doPost(e){
  try{
    var body = JSON.parse(e.postData.contents);
    var week = body.week;
    var winners = body.winners || [];
    var sh = SpreadsheetApp.getActive().getSheetByName('Weeks') || SpreadsheetApp.getActive().insertSheet('Weeks');
    if(sh.getLastRow() === 0){ sh.appendRow(['Week','Team','Timestamp']); }
    var now = new Date();
    if(winners.length === 0){ sh.appendRow([week, '', now]); }
    else { winners.forEach(function(team){ sh.appendRow([week, team, now]); }); }
    return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin','*');
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({status:'error', message:String(err)}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin','*');
  }
}
function doGet(e){ return ContentService.createTextOutput('OK'); }
```

## 3) Wire your URLs
- In **admin.html**, set `SCRIPT_WEB_APP_URL` to your Web App URL.
- In **index.html**, set `SHEET_WEEKS_CSV` to your Weeks CSV URL. Players CSV is already set.

## 4) Rules and tweaks
- Base pot = `BUY_IN * COUNT_PLAYERS` (edit in `index.html`).
- If no winners, pot rolls over to the next week.
- A player earns one share per week if any of their teams hit (can change to per-team if you want).

Upload `admin.html`, `index.html`, and `styles.css` into `/lottery/` next to your `logos` folder.
