# NFL Lottery — Scoreboard

A clean, modern scoreboard that pulls data from your Google Sheet and renders **player cards** with AFC/NFC teams and a bold winnings total. Weeks shown in **parentheses** are automatically highlighted as badges (e.g., `(9)`), making it easy to see scoring weeks at a glance.

## How it works

- `index.html` fetches your published Google Sheet **CSV** and builds cards.
- Each row should be: `Player, AFC1, AFC2, NFC1, NFC2, Total Owed`.
- Parentheses inside any team cell (e.g., `Vikings (16)(17)`) are rendered as yellow badges.
- Styling lives in `styles.css` (no frameworks).

## Setup (Google Sheet → CSV)

1. In your Google Sheet, go to **File → Share → Publish to the web**.
2. Choose the correct sheet/tab and publish as **CSV**.
3. Copy the CSV link.
4. In `index.html`, replace the value of `SHEET_CSV` with your published CSV URL.

> Tip: If you update the sheet structure, keep the first row headers in this order: `Player, AFC1, AFC2, NFC1, NFC2, Total Owed`.

## Local development

Just open `index.html` in a browser. Because it reads a public CSV URL, it works without a server.

## Deploy (GitHub Pages)

1. Create a new GitHub repo (or use your existing one).
2. Add `index.html` and `styles.css` to the repo.
3. Push to `main` (or `master`).
4. In the repo settings, enable **Pages** → **Deploy from branch** → root `/`.
5. Your site will be available at `https://<username>.github.io/<repo>/`.

## Customize

- Colors: adjust CSS variables at the top of `styles.css`.
- Layout: cards are responsive; tweak the `minmax(290px, 1fr)` value to change how many per row.
- Badges: tweak `.week-badge` style for different emphasis.

## Troubleshooting

- **Nothing loads**: make sure the CSV link is public and points to the correct tab.
- **Weird characters or misaligned rows**: avoid commas inside team names. If you need commas, wrap entire cells in quotes in the sheet.
- **Totals show as $0.00**: ensure the last column is a number in the sheet (no `$` symbol needed; we format it in the UI).

---

Built with ❤️ for Kinnon. PRs welcome.
