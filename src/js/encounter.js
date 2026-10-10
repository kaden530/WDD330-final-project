import { loadHeaderFooter } from './utils.mjs';
import DndApi from "./D&DAPI.js";
import open5eApi from "./Open5eAPI.js";
import { monsterTemplate, monsterListTemplate } from "./templates.js";


loadHeaderFooter();
function calculatePartyChallenege(partyLevel, partySize, difficulty, EnemyPartySize) {
let CR= partyLevel;
if (partySize < 4 ) {
    CR= CR - 1;
} else if (partySize ===5) {
    CR= CR + 1;
} else if (partySize === 6) {
    CR= CR + 2;
}
else if (partySize > 6) {
CR= CR +(partySize *1.5);
}
if (difficulty === "easy") {
    CR=(CR - 1);
}
else if (difficulty === "hard") {
    CR=(CR + 1);
}
else if (difficulty === "deadly") {
    CR=(CR + 3);    
}
CR = (CR / EnemyPartySize);
if (CR > 0) {CR = Math.round(CR);}
return CR;
}



export async function generateEncounter(form) {
    const partyLevel = Number(form.partyLevel.value);
    const partySize = Number(form.partySize.value);
    const enemyPartySize = Number(form.enemyParty.value);
    const environment = form.environment.value;
    const difficulty = form.difficulty.value;

const targetCR = calculatePartyChallenege(partyLevel, partySize, difficulty, enemyPartySize);


const api = new open5eApi();
// Get the available monsters
const monsterData = await api.fetchAllCreatures(targetCR);
console.log("Fetched monsters:", monsterData);
// Get the full information for each monster
console.log(Array.isArray(monsterData));
let selectedMonsters = [];
for (let i = 0; i != enemyPartySize; i++) {

    // Pick a random monster for now
    const randomMonster = Math.floor(Math.random() * monsterData.length);
    // Get the full monster information
const monster = monsterData[randomMonster];
console.log("Selected monster:", monster)
selectedMonsters.push(monster);}

console.log(Array.isArray(selectedMonsters));
return selectedMonsters;
}

const encounterForm = document.querySelector("#encounter-form");
const monsterContainer = document.querySelector("#monster-container");

encounterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const encounter = await generateEncounter(encounterForm);
console.log(Array.isArray(encounter));
    monsterContainer.innerHTML = monsterListTemplate(encounter);
});