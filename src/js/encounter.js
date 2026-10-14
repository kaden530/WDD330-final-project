import { loadHeaderFooter } from './utils.mjs';
import DndApi from "./D&DAPI.js";
import open5eApi from "./Open5eAPI.js";
import { monsterTemplate, monsterListTemplate, lootButtonTemplate } from "./templates.js";

import { findMonstersByEnviroment } from './environment.js';


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
    const errorBox = document.getElementById("validation-alert");
    const partyLevel = Number(form.partyLevel.value);
    const partySize = Number(form.partySize.value);
    const enemyPartySize = Number(form.enemyParty.value);
    const environment = form.environment.value;
    const difficulty = form.difficulty.value;
      if (partyLevel === "") {
    errorBox.style.display = "block";
    return
  } else if(partySize=== ""){
errorBox.style.display = "block";
return
  }else if(enemyPartySize=== ""){
errorBox.style.display = "block";
return  
}else if(environment=== ""){
errorBox.style.display = "block";
return  
}else if(difficulty===""){
errorBox.style.display = "block";
return
}else {
    errorBox.style.display = "none";
}


const targetCR = calculatePartyChallenege(partyLevel, partySize, difficulty, enemyPartySize);
const monsterEnvironment = findMonstersByEnviroment(environment)
console.log(targetCR)
console.log(`the environment monsters ${monsterEnvironment}`)
//const api = new open5eApi()
const api = new DndApi();
// Get the available monsters
const monsterData = await api.fetchDnDMonstersInBatches(targetCR, monsterEnvironment)

//const monsterData = await api.fetchAllCreatures(targetCR);

// Get the full information for each monster
let selectedMonsters = [];
for (let i = 0; i != enemyPartySize; i++) {

    // Pick a random monster for now
    const randomMonster = (Math.floor(Math.random() * monsterData.length));
    // Get the full monster information
const monster = monsterData[randomMonster];
selectedMonsters.push(monster);}

return selectedMonsters;
}







//Form submission
const encounterForm = document.querySelector("#encounterForm");
const monsterContainer = document.querySelector("#monster-container");
const lootButton = document.querySelector("#lootPage")
encounterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
const encounterError = document.getElementById("list-alert");
    const encounter = await generateEncounter(encounterForm);
    const errorBox = document.getElementById("validation-alert");
if(errorBox.style.display != "block"){
    monsterContainer.innerHTML = monsterListTemplate(encounter);
    console.log(encounter.length);
    console.log(encounter);
    if(encounterError.style.display != "block"){const userData = { partyLevel : Number(encounterForm.partyLevel.value),   partySize : Number(encounterForm.partySize.value), enemyPartySize : Number(encounterForm.enemyParty.value), environment : encounterForm.environment.value, difficulty : encounterForm.difficulty.value};
localStorage.setItem("sharedData", JSON.stringify(userData));
lootButton.innerHTML = lootButtonTemplate()}
else{
}
}
});
