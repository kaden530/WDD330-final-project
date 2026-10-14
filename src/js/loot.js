import { loadHeaderFooter } from './utils.mjs';
import open5eApi from "./Open5eAPI.js";
import { lootListTemplate } from "./templates.js";


loadHeaderFooter();
function rarities(difficulty){
   let rarity = 0.5
    if (difficulty= "medium"){rarity = 0.75
    }
    else if (difficulty= "hard"){rarity  = 1
    }
    else if(difficulty= "deadly"){rarity = 1.5
    }
    return rarity
}const rarityLevels = [
  { name: 'legendary', key: 5, minScore: 160 },
  { name: 'very-rare', key: 4, minScore: 110  },
  { name: 'rare',      key: 3, minScore: 90  },
  { name: 'uncommon',  key: 2, minScore: 50  },
  { name: 'common',    key: 1, minScore: 0   }
];

function calculateLootRarity(partyLevel, difficulty) {
  const difficultyMod = rarities(difficulty);

  // 3. Calculate Loot Points (LP)
  // Higher level + tougher encounter = higher baseline score
  const levelBonus = partyLevel * 1; 
  const lootPoints = Math.floor(levelBonus * difficultyMod * 10);

  // 4. Simulate the RNG Roll (Base 1 to 100)
  const baseRoll = Math.floor(Math.random() * 50) + 1;
  
  // Total Score combining luck, skill/level, and danger
  const finalLootScore = baseRoll + lootPoints;
console.log(lootPoints, "lootpoints ")
console.log(baseRoll," baseroll")
console.log(finalLootScore ,"Final loot Score")
  // 5. Match final score against thresholds
  // Looks at highest tier first, falls back to Common
  const awardedRarity = rarityLevels.find(tier => finalLootScore >= tier.minScore);

  return awardedRarity.key;
}




export async function generateLoot(form) {
    let partyLevel="";
    let enemyPartySize="";
    let difficulty ="";

    if(localStorage.length!=0){
  let data = JSON.parse(localStorage.getItem("sharedData"));
     partyLevel = Number(data.partyLevel);
     enemyPartySize = Number(data.enemyPartySize);
     difficulty = data.difficulty;
     localStorage.removeItem("sharedData");
     console.log("check 0", partyLevel, enemyPartySize, difficulty )
}else{
    partyLevel = Number(form.partyLevel.value);
    enemyPartySize = Number(form.enemyParty.value);
    difficulty = form.difficulty.value;}
    console.log("check 1", partyLevel )



    const rarity = calculateLootRarity(partyLevel ,difficulty);

    let lootSize = 0;
    for(let i = 0; i != enemyPartySize; i++){
        const randomAmounts = Math.floor(Math.random()*3);
        lootSize = lootSize + randomAmounts;
    }

    function priceCeiling(partyLevel) {
        let maxPrice = partyLevel
        if (partyLevel < 5){
            maxPrice = partyLevel * 100
        }
        else if (partyLevel < 8){
            maxPrice = partyLevel * 400
        }
        else if (partyLevel  < 12){ 
            maxPrice = partyLevel * 1000
        }
        else if(partyLevel <16){
            maxPrice = partyLevel * 4000
        }
        else if(partyLevel < 20){
            maxPrice = partyLevel *40000
        }
        else if(partyLevel > 19){
            maxPrice = partyLevel * 200000
        }
        return maxPrice
    }
    function magicItemAmounts(partyLevel, difficulty,) {
        let magicAmounts = 1
        if (partyLevel < 5){
            magicAmounts = magicAmounts * Math.floor(Math.random()*2);
        }else if (partyLevel < 8){
            magicAmounts= magicAmounts * (Math.floor(Math.random()*3) );
        }else if (partyLevel  < 12){ 
            magicAmounts = magicAmounts * (Math.floor(Math.random()*3));
        }else if(partyLevel <16){
            magicAmounts = magicAmounts * (Math.floor(Math.random()*3) + 1);
        }else if(partyLevel < 20){
            magicAmounts = magicAmounts * (Math.floor(Math.random()*3) + 2 );
        }else if(partyLevel > 19){
            magicAmounts = magicAmounts * (Math.floor(Math.random()*3) + 2);
        }
        console.log(magicAmounts)
        if (difficulty ==="easy"){
            magicAmounts = magicAmounts * 0.5;
        }else if (difficulty ==="medium"){
            magicAmounts = magicAmounts * 1;       
        } else if (difficulty ==="hard"){
            magicAmounts = (magicAmounts * 1) + 1;        
        }else if (difficulty ==="deadly"){
            magicAmounts = (magicAmounts * 1.5) + 1;        
        }
        console.log(magicAmounts)
        return magicAmounts
    }

const magicItemAmount = magicItemAmounts(partyLevel, difficulty)
const highestValue = priceCeiling(partyLevel);
    console.log(rarity);
console.log("MagicItemAmount is: ",magicItemAmount)
console.log("highestValue is: ",highestValue)
console.log("Lootsize is: ",lootSize)
const api = new open5eApi();
// Get the available items
const magicItemData =await api.getMagicItems(rarity)
const itemData = await api.getItems(highestValue);
console.log(magicItemData.length , "amount of magic items returned");
console.log(itemData.length , "amount of non-magic items returned");
let lootedItems = [];
for (let i = 0; i < lootSize ; i++) {

    // Pick a random item

    let randomItem = Math.floor(Math.random() * (itemData.length + 1));

    // Get the Items information
let item = itemData[randomItem];


lootedItems.push(item);}
console.log(lootedItems.length , "item cards before magic items");
//Get random magic Items
for (let i = 0; i < magicItemAmount ; i++) {

    // Pick a random item

    let randomMagicItem = Math.floor(Math.random() * (magicItemData.length + 1));

    // Get the Items information
let item = magicItemData[randomMagicItem];
console.log(item)
lootedItems.push(item);}

console.log(lootedItems.length, "item cards with magic items");
return lootedItems
}



const lootForm = document.querySelector("#lootForm");
const lootContainer = document.querySelector("#lootContainer");
window.addEventListener('load', async () => {
    try {
        if (localStorage.length != 0) {
            const loot = await generateLoot(lootForm);
            lootContainer.innerHTML = lootListTemplate(loot);
        } else {
            lootForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                console.log("button pressed");

                const loot = await generateLoot(lootForm);
                lootContainer.innerHTML = lootListTemplate(loot);
            });
        }
    } catch (error) {
        console.error("Failed to verify user:", error);
    }
});

