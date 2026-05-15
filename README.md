## 🎰 Tombola Online
Un'applicazione web interattiva per giocare alla Tombola online con amici e familiari in tempo reale!

✨ Caratteristiche Principali
🎯 Multiplayer in Real-Time: Host che gestisce le estrazioni e giocatori connessi via Firebase
🎲 Generazione Casuale: Schedine uniche generate proceduralmente per ogni giocatore
🔊 Effetti Sonori Immersivi: Audio per estrazioni e vincite (Ambo, Terna, Quaterna, Cinquina, Tombola)
📱 Interfaccia Responsiva: Compatibile con desktop e dispositivi mobili
🚀 Zero Installazione: Gioca direttamente dal browser
🔥 Sincronizzazione Live: Database Firebase per aggiornamenti istantanei

🎮 Come Funziona

Host avvia una partita e ottiene un codice di accesso
Giocatori si uniscono inserendo il codice e il loro nome
Host estrae i numeri uno per uno
Giocatori vedono i numeri evidenziati automaticamente sulla loro schedina
Sistema rileva e notifica le vincite in real-time

🏆 Tipi di Vincite

✅ Ambo (2 numeri su una riga)
✅ Terna (3 numeri su una riga)
✅ Quaterna (4 numeri su una riga)
✅ Cinquina (5 numeri su una riga)
✅ Tombola (tutti i 15 numeri)

🛠️ Stack Tecnologico

Frontend: HTML5, CSS3, JavaScript (ES6+)
Backend: Firebase Realtime Database
Audio: MP3

📂 Struttura Progetto
├── index.html          # Pagina principale
├── host.html           # Interfaccia host
├── player.html         # Interfaccia giocatore
├── css/
│   └── style.css       # Stilizzazione
├── js/
│   ├── firebase.js     # Configurazione Firebase
│   ├── host.js         # Logica host
│   └── player.js       # Logica giocatore
└── audio/              # Effetti sonori

🚀 Quick Start

Apri index.html in un browser moderno
Condividi il codice partita con gli amici!
