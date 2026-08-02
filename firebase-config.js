/* ============================================================
   Coin Club — live sync + notifications config
   ============================================================ */

/* 1) LIVE SYNC (Firebase Realtime Database)
   Until you paste your project's web config below, the app still
   works — it just keeps data on each phone separately.
   Replace `null` with the firebaseConfig object from the Firebase
   console (Project settings → Your apps → Web app). Example:

   window.FIREBASE_CONFIG = {
     apiKey: "AIza...",
     authDomain: "coin-club-xxxx.firebaseapp.com",
     databaseURL: "https://coin-club-xxxx-default-rtdb.firebaseio.com",
     projectId: "coin-club-xxxx",
     appId: "1:1234567890:web:abcdef"
   };
*/
window.FIREBASE_CONFIG = null;

/* 2) NOTIFICATIONS (ntfy.sh)
   Parents subscribe to this topic in the free ntfy app to get a
   push the moment Katia taps "done". It's a private, random name.
*/
window.NTFY_TOPIC = "coinclub-barnes-2f9k7q4m";
