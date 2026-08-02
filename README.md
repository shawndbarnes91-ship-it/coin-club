# Coin Club

A tiny, installable allowance app for one kid — weekly required chores that unlock a set
allowance, an optional extra-jobs board to earn more, a wallet, streaks and badges.

Runs as a home-screen web app (PWA). Open the site on a phone and use **Share → Add to Home Screen**.

- **Week** — check off chores; a parent approves. Fill the jar to lock the weekly allowance.
- **Jobs** — claim extra paid jobs, or suggest your own.
- **Wallet** — Friday payout total + all-time earnings; parent taps *Pay* to roll to a new week.
- **Wins** — streak and badges.

Parent mode is behind a PIN (default `11514`, change it in Settings).

Live sync across phones is powered by Firebase Realtime Database (see `firebase-config.js`).
Parent push notifications use [ntfy.sh](https://ntfy.sh) — subscribe to the topic in `firebase-config.js`.
