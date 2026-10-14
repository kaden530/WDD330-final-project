export default class DndApi {
    constructor() {
        this.baseUrl = "https://www.dnd5eapi.co/api/2014";
    }

    async getMonsters() {
        const response = await fetch(`${this.baseUrl}/monsters`);

        if (!response.ok) {
            throw new Error("Unable to retrieve monsters.");
        }

        return response.json();
    }
    
  async getAllMonsterDetails() {
  try {
    const monstersData = await this.getMonsters();
    const allMonstersDetails = [];

    for (const monster of monstersData.results) {
      const response = await fetch(`${this.baseUrl}/monsters/${monster.index}`);
      
      if (!response.ok) {
        console.error("Critical error in sequential execution:", error);
        continue;
      }
      
      const details = await response.json();
      allMonstersDetails.push(details);
    }

    return allMonstersDetails;
    
  } catch (error) {
    console.error("Critical error in sequential execution:", error);
    return [];
  }
}

    async getMonsterDetails(monster) {
        const response = await fetch(`${this.baseUrl}/monsters/${monster}`);

        if (!response.ok) {
            throw new Error(`Unable to retrieve details for monster: ${monster.name}`);
        }

        return response.json();
}

    //new strat
  async  fetchDnDMonstersInBatches(targetCr, environment) {
    const BASE_URL = 'https://www.dnd5eapi.co';
    const BATCH_SIZE = 50; 

    try {
      // grab the monsters
      const indexResponse = await fetch(`${BASE_URL}/api/monsters?challenge_rating=${targetCr}`);
      const indexData = await indexResponse.json();
      const monsterList = indexData.results;
      let allDetailedMonsters = [];

      // group together into groups of 50
      for (let i = 0; i < monsterList.length; i += BATCH_SIZE) {
        const batch = monsterList.slice(i, i + BATCH_SIZE);       
        const batchPromises = batch.map(async (monster) => {
          const detailResponse = await fetch(`${BASE_URL}${monster.url}`);
          return detailResponse.json();
        });

        const batchResults = await Promise.all(batchPromises);
        
        allDetailedMonsters = allDetailedMonsters.concat(batchResults);
      }
        let monsterIndex =[]
        let namedIndex =[]
                  const indexed = allDetailedMonsters.filter(monster => 
            environment.some(envName => 
              String(envName).toLowerCase().includes(monster.name.toLowerCase()))
          );
          if (indexed) {
           namedIndex = namedIndex.concat(indexed)
          } else {
          console.log(`No valid Creatures found`);      
        }
                  const creature = namedIndex.filter(monster =>  
            monster.challenge_rating === targetCr)
          if (creature) {
            monsterIndex = monsterIndex.concat(creature);
        } else {
          console.log(`No valid Creatures found`);      
        }
         const errorBox = document.getElementById("list-alert");
if (monsterIndex?.length ===0){
  errorBox.style.display = "block";
    }else{
  errorBox.style.display = "none";

}
    return monsterIndex;
    } catch (error) {
        console.error("Critical error building bestiary:", error);
    }
  
  
  }
}
