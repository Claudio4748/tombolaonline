import { db, ref, set, update, onValue } from "./firebase.js";

// SUONI
const sounds = {
  extract: new Audio("audio/extract.mp3"),
  ambo: new Audio("audio/ambo.mp3"),
  terna: new Audio("audio/terna.mp3"),
  quaterna: new Audio("audio/quaterna.mp3"),
  cinquina: new Audio("audio/cinquina.mp3"),
  tombola: new Audio("audio/tombola.mp3")
};
sounds.extract.preload = "auto";

// VARIABILI GLOBALI
let card = [];
let gameCode = "";
let playerId = "";
let lastWins = {
  ambo:false, terna:false, quaterna:false, cinquina:false, tombola:false
};
let lastExtractCount = 0;

// JOIN SESSIONE
document.getElementById("joinBtn").onclick = () => {
  gameCode = document.getElementById("codeInput").value.toUpperCase();
  const name = document.getElementById("nameInput").value.trim();

  if (!gameCode || !name) {
    alert("Inserisci codice e nome");
    return;
  }

  // NASCONDI FORM
  document.getElementById("join").style.display = "none";

  // CREA PLAYER
  playerId = crypto.randomUUID();

  // GENERA E MOSTRA SCHEDINA
  card = generateCard();
  renderCard(card);

  // SALVA PLAYER SU FIREBASE
  set(ref(db, `games/${gameCode}/players/${playerId}`), {
    name: name,
    card: card,
    wins: { ambo:false, terna:false, quaterna:false, cinquina:false, tombola:false }
  });

  // ASCOLTA NUMERI
  onValue(ref(db, `games/${gameCode}/numbers`), snap => {
    const nums = snap.val() || [];

    // SUONO ESTRAZIONE SOLO SE NUMERO NUOVO
    if (nums.length > 0 && nums.length !== lastExtractCount) {
      sounds.extract.play().catch(e => console.log("Errore suono:", e));
      lastExtractCount = nums.length;
    }

    // evidenzia numeri sulla schedina
    mark(nums);

    // controlla vincite
    const wins = checkWins(card, nums, lastWins);
    playWins(wins);

    // aggiorna vincite su firebase
    update(ref(db, `games/${gameCode}/players/${playerId}/wins`), wins);
    lastWins = wins;
  });
};

// Riproduce suono vincita solo se prima non era stata vinta
function playWins(wins) {
  for (let k in wins) {
    if (wins[k] && !lastWins[k]) {
      sounds[k].play();
    }
  }
}

// FUNZIONI UTILI

function generateCard() {
  let card = Array.from({length:3},()=>Array(9).fill(null));
  let cols = [
    range(1,9), range(10,19), range(20,29),
    range(30,39), range(40,49), range(50,59),
    range(60,69), range(70,79), range(80,90)
  ];

  for (let r=0;r<3;r++) {
    shuffle([...Array(9).keys()]).slice(0,5).forEach(c=>{
      card[r][c] = cols[c].splice(Math.random()*cols[c].length|0,1)[0];
    });
  }

  // ordina numeri nelle colonne
  for (let c=0;c<9;c++) {
    let nums = [];
    for(let r=0;r<3;r++) if(card[r][c]) nums.push(card[r][c]);
    nums.sort((a,b)=>a-b);
    let i=0;
    for(let r=0;r<3;r++) if(card[r][c]) card[r][c] = nums[i++];
  }

  return card;
}

function renderCard(card) {
  const table = document.getElementById("card");
  table.innerHTML = "";
  table.style.display = "table";

  card.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      if (cell === null) td.className = "empty";
      else {
        td.textContent = cell;
        td.dataset.num = cell;
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

function mark(nums) {
  document.querySelectorAll("td[data-num]").forEach(td => {
    if (nums.includes(+td.dataset.num)) td.classList.add("marked");
  });
}

// controlla vincite (solo una volta)
function checkWins(card, nums, alreadyWon) {
  let result = {
    ambo: alreadyWon.ambo,
    terna: alreadyWon.terna,
    quaterna: alreadyWon.quaterna,
    cinquina: alreadyWon.cinquina,
    tombola: alreadyWon.tombola
  };

  let totalMarked = 0;

  card.forEach(row => {
    const marked = row.filter(n => nums.includes(n)).length;
    totalMarked += marked;

    if (marked >= 2 && !result.ambo) result.ambo = true;
    if (marked >= 3 && !result.terna) result.terna = true;
    if (marked >= 4 && !result.quaterna) result.quaterna = true;
    if (marked === 5 && !result.cinquina) result.cinquina = true;
  });

  if (totalMarked === 15 && !result.tombola) result.tombola = true;

  return result;
}

const range = (a,b)=>Array.from({length:b-a+1},(_,i)=>i+a);
const shuffle = a => a.sort(()=>Math.random()-0.5);
