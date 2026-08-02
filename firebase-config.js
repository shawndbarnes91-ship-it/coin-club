/* ============================================================
   Coin Club — live sync + notifications config
   Sync runs over ntfy.sh (no account needed). Two SEPARATE channels:

   • SYNC_TOPIC  — the app's PRIVATE data channel. Do NOT subscribe to
                   this in the ntfy app; the app listens to it silently.
   • NTFY_TOPIC  — parent alerts. Mom & Dad subscribe to THIS one in the
                   free ntfy app to get a push when Katia taps "done".
   ============================================================ */
window.SYNC_TOPIC = "coinclub-barnes-sync-k4w9r2mt";
window.NTFY_TOPIC = "coinclub-barnes-2f9k7q4m";
