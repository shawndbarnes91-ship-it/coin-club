# Coin Club

A tiny, installable allowance app for one kid — weekly required chores that pay out a set
allowance, an extra-jobs board to earn more on the side, a wallet, payday history, streaks
and badges.

Runs as a home-screen web app (PWA). Open the site on a phone and use **Share → Add to Home Screen**.

- **Week** — tap a day, snap a photo of the finished work, a parent approves it. The jar fills
  as you go.
- **Jobs** — claim extra paid jobs, or suggest your own for a parent to price and post.
- **Wallet** — this week's running total, split into chores vs. side hustle.
- **History** — every logged payday, with the chores/jobs breakdown.
- **Wins** — streak and 15 badges.

## How the money works

The weekly allowance is **pro-rated across every star**. Each chore's slice of the week is
`allowance × (its need ÷ total need across all chores)`, and each star inside a chore is worth
that slice divided by the chore's need.

A "6 of 7 days" chore therefore maxes out at six stars — the seventh day stays a free spare, so
the one-slip cushion still applies. Add, edit or delete a chore and every value re-splits
automatically; same if you change the allowance. The jar's dollar figure is always the real
amount earned so far.

**Extra-job money never touches the jar math.** It stacks on top as "side hustle" coins on the
jar lid and is added at payday.

## Parent mode

Everything for parents lives behind the PIN (default `11514`, changeable in Settings), in a
single **parent dashboard** that opens as soon as the PIN is accepted: pending approvals with
photo proof, this week's totals, the weekly allowance, and the week controls.

**Every action in the app asks for confirmation** — both roles. Katia's chore-star confirm is
merged into the photo step so it's one deliberate action rather than two. The one exception is
drag-to-reorder, which is a continuous gesture and isn't worth a popup (order isn't money).

The week **never resets or locks on its own.** A week ends only when a parent taps *Pay* (logs
the payday and starts a fresh week) or *Reset the week (no payout)*. Nothing is ever locked or
wiped automatically.

If the Saturday–Friday window passes before a parent gets to it, the week simply keeps running —
Katia can still finish anything she missed and it still counts. The Week tab shows a friendly
"Week finished! — waiting on a parent to pay it out" nudge and the dashboard flags *ready for
payday*, but neither blocks anything.

This replaced an automatic rollover that wiped chore marks on the first load of a new calendar
week and silently deleted unpaid extra-job earnings along with them.

## Photo proof

Marking a chore or job done opens the **camera directly** (`capture="environment"` — no picking
from the photo library) and the picture is attached to the parent push notification, so mom and
dad see the actual proof in the alert and in the approval card.

Photos are deliberately kept **out of the synced state** (see below) — they live in a small local
cache on the device that took them, and ntfy drops attachments after a few hours. It's
verify-in-the-moment, not an archive.

Photos can be turned off per chore ("Needs a photo" toggle when adding or editing) for things a
picture can't show, like reading or brushing teeth.

## Sync & notifications

Live sync runs over [ntfy.sh](https://ntfy.sh) with no account. Two separate topics in
`firebase-config.js` — the filename is a leftover from the Firebase version and is kept only so
existing installs don't break:

- `SYNC_TOPIC` — the app's private data channel. **Don't** subscribe to it in the ntfy app.
- `NTFY_TOPIC` — parent alerts. Mom & dad subscribe to this one.

ntfy only caches messages **≤4KB** as inline text, so `pruneState()` keeps the synced state lean:
current week's earnings only, history capped at 10 paydays, hard-trimmed under 3.8KB. That cap is
why the History tab tops out at 10 weeks and why photos are local-only. Last write wins,
version-stamped so a stale device can't clobber a newer edit.

Deployed from `main` via GitHub Pages.
