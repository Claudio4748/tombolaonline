import { db, ref, update, onValue, set } from "./firebase.js";

const gameCode = Math.random().toString(36).substring(2,7).toUpperCase();
document.getElementById("gameCode").textContent = gameCode;

set(ref(db, `games/${gameCode}`), { numbers: [], players: {} });

let currentNumbers = [];
const board = document.getElementById("board");

// CREA TABELLONE 1-90
for (let i=1;i<=90;i++){
  const d=document.createElement("div");
  d.textContent=i;
  d.className="boardNum";
  d.onclick=()=>{
    if(currentNumbers.includes(i)) return;
    const newNumbers = [...currentNumbers, i];
    update(ref(db,`games/${gameCode}`), { numbers:newNumbers });
  };
  board.appendChild(d);
}

// AGGIORNA NUMERI SELEZIONATI
onValue(ref(db,`games/${gameCode}/numbers`), snap => {
  currentNumbers = snap.val() || [];
  document.querySelectorAll(".boardNum").forEach(b=>{
    if(currentNumbers.includes(+b.textContent)) b.classList.add("selected");
  });
});

// MOSTRA NOMI PLAYER E VINCITE
onValue(ref(db,`games/${gameCode}/players`), snap => {
  const div = document.getElementById("players");
  div.innerHTML="";
  snap.forEach(c=>{
    const p = c.val();
    const w = p.wins || {};
    const row = document.createElement("div");
    row.className = "playerRow";
    row.innerHTML=`
      <b>${p.name}</b>
      <span class="${w.ambo?'win':''}">Ambo</span>
      <span class="${w.terna?'win':''}">Terna</span>
      <span class="${w.quaterna?'win':''}">Quaterna</span>
      <span class="${w.cinquina?'win':''}">Cinquina</span>
      <span class="${w.tombola?'win':''}">Tombola</span>
    `;
    div.appendChild(row);
  });
});
