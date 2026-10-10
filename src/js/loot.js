import { loadHeaderFooter } from './utils.mjs';
import open5eApi from "./Open5eAPI.js";
import { lootListTemplate } from "./templates.js";


loadHeaderFooter();
function rarities(partyLevel, difficulty){
   const tier = 1
   if(partyLevel >4 && partyLevel < 11 ){ tier =2
   }
   else if (partyLevel > 10 && partyLevel < 17){ tier = 3
   }
   else if(partyLevel > 16 ){ tier = 4
   }
   
    



}
export async function generateLoot(form) {
    const partyLevel = Number(form.partyLevel.value);
    const enemyPartySize = Number(form.enemyParty.value);
    const difficulty = form.difficulty.value;



    const rarity = ("placeholder");

    const lootSize = ("placeholder");


const highestValue = 25
const api = new open5eApi();
// Get the available items
const itemData = await api.getItems(highestValue);

console.log(itemData);
let lootedItems = [];
for (let i = 0; i != enemyPartySize; i++) {

    // Pick a random item
    const randomItem = Math.floor(Math.random() * itemData.length);
    console.log(randomItem)

    // Get the Items information
const item = itemData[randomItem];
console.log(item)
console.log("Selected Item:", item)
lootedItems.push(item);}
console.log(lootedItems);
return lootedItems
}



const lootForm = document.querySelector("#lootForm");
const lootContainer = document.querySelector("#lootContainer");

lootForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const loot = await generateLoot(lootForm);
    console.log(loot);
    lootContainer.innerHTML = lootListTemplate(loot);
});