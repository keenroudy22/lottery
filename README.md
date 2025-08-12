# NFL Lottery (Players-only + POT)

This version uses only your Players sheet and shows a centered **Weekly POT** from the row where `Player = POT` (amount in column F). Weeks in parentheses inside team cells still render as small badges.

## Upload
Place these files in `/lottery/`:
- index.html
- styles.css
- (keep your existing `/logos` folder with all team SVGs)

## Sheet format
```
Player | AFC1 | AFC2 | NFC1 | NFC2 | Total Owed
```
- Normal players go on their own rows.
- Add a row with `POT` in the **Player** column and the pot amount in **Total Owed**.
- Parentheses like `(9)` in team cells are displayed as badges.

No Weeks tab or admin page is required in this version.
