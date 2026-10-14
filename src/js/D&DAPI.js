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
    async getMonstersByEnvironment(environment) {
       const environmentKey = environment.toLowerCase();
      let monsterName =""
      let currentUrl =`${this.baseUrl}/monsters/$${monsterName}` 
  console.log(environment)
        console.log(environment[9])
    const batchPromises = environment.map(async (name) => {
          const detailResponse = await fetch(`${this.baseUrl}/monsters/${name}`);
          return detailResponse.json(); // returns full monster stat block
        });


    const promiseAll = Promise.all(batchPromises)
    .then((environmentMonsters)=>{
      environmentMonsters.forEach(monster => {
      console.log(monster);})
    }
    
    )

   .catch((error) => {
    // If ANY of the spells fail (e.g., a typo like 'fireballz'), 
    // Promise.all fails fast and triggers this catch immediately
    console.error("🧙‍♂️ The wizard miscast! Error fetching data:", error.message);
  });

const allCreatureData = await Promise.all(promiseAll);


        return allCreatureData.json();
    }
  async getAllMonsterDetails() {
  try {
    const monstersData = await this.getMonsters();
    const allMonstersDetails = [];
    console.log(monster)

    // Correctly structured sequential loop
    for (const monster of monstersData.results) {
      const response = await fetch(`${this.baseUrl}/monsters/${monster.index}`);
      
      if (!response.ok) {
        console.warn(`Skipping ${monster.name}: standard error profile encountered.`);
        continue; // Keep going if one single monster entry breaks
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
    const BATCH_SIZE = 50; // Pulling 50 stat blocks at a time 

    try {
      console.log("Gathering the monster index list...");
      // Step 1: Grab the massive list of all monster summaries
      const indexResponse = await fetch(`${BASE_URL}/api/monsters?challenge_rating=${targetCr}`);
      const indexData = await indexResponse.json();
      const monsterList = indexData.results; // Array of { index, name, url }
      console.log(monsterList);
      console.log(`Found ${monsterList.length} monsters. Fetching stat blocks...`);
      let allDetailedMonsters = [];

      // Step 2: Use a sequential loop to chunk requests safely into groups of 50
      for (let i = 0; i < monsterList.length; i += BATCH_SIZE) {
        const batch = monsterList.slice(i, i + BATCH_SIZE);
        console.log(`Fetching batch: items ${i + 1} to ${Math.min(i + BATCH_SIZE, monsterList.length)}...`);

        // Fire off 50 fetch requests simultaneously
        const batchPromises = batch.map(async (monster) => {
          const detailResponse = await fetch(`${BASE_URL}${monster.url}`);
          return detailResponse.json(); // returns full monster stat block
        });

        // Wait for the entire batch of 50 to complete
        const batchResults = await Promise.all(batchPromises);
        
        // Save results
        allDetailedMonsters = allDetailedMonsters.concat(batchResults);
        // Optional: Add a brief 200ms rest between batches if the API gets unstable
        // await new Promise(resolve => setTimeout(resolve, 200));
      }
      console.log(`🎉 Complete Bestiary compiled! Total monsters fetched: ${allDetailedMonsters.length}`);
        let monsterIndex =[]
        let namedIndex =[]
          console.log("these are the creatures",environment)
          const indexed = allDetailedMonsters.filter(monster => 
            environment.some(envName => 
              String(envName).toLowerCase().includes(monster.name.toLowerCase()))
          );
          if (indexed) {
           namedIndex = namedIndex.concat(indexed)
          } else {
          console.log(`No valid Creatures found`);      
        }
           console.log(namedIndex)
          const creature = namedIndex.filter(monster =>  
            monster.challenge_rating === targetCr)
          if (creature) {
            monsterIndex = monsterIndex.concat(creature);
        } else {
          console.log(`No valid Creatures found`);      
        }
         const errorBox = document.getElementById("list-alert");
      console.log(`🎉 Complete Bestiary compiled! Total monsters fetched: ${monsterIndex.length}`);
console.log(Array.isArray(monsterIndex))
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
  // Run the script
}
