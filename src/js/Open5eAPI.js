export default class Open5eApi {
    constructor() {
        this.baseUrl = "https://api.open5e.com/v2";
    }

    async parseMonsterList(targetEnvironment) {
        try {
            const response = await fetch(`${this.baseUrl}/creatures/`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const monsters = data.results || [];

            console.log(`--- Total Monsters Fetched: ${monsters.length} ---`);

            monsters.forEach(monster => {
                console.log(`Name: ${monster.name} | CR: ${monster.challenge_rating} | Habitat: ${monster.environments?.join(', ') || 'N/A'}`);
            });
    const filteredCreatures = monsters.filter(creature => {
      if (!creature.environments || !Array.isArray(creature.environments)) return false;
      
      // Perform a case-insensitive match inside the environments array
      return creature.environments.some(env => 
        env.toLowerCase().includes(targetEnvironment.toLowerCase())
      );
    });

    console.log(`\n--- Found ${filteredCreatures.length} creatures in the "${targetEnvironment}" environment ---`);
    
    // Output a few results to check
    filteredCreatures.slice(0, 10).forEach(c => {
      console.log(`- ${c.name} (CR: ${c.challenge_rating})`);
    });

    return filteredCreatures;

        } catch (error) {
            console.error('Error fetching or parsing monster data:', error);
            return [];
        }
    }



//Attempt 2
async fetchAllCreatures(targetCR) {
  // Start with the initial Open5e v2 API page
    let pageCount = 1;
   let currentUrl = `${this.baseUrl}/creatures/?page=${pageCount}`;
  let allCreatures = [];


  console.log('Starting data retrieval from Open5e API...');

  try {
    // Keep looping as long as the API provides a 'next' page URL
    while (currentUrl) {
      console.log(`Fetching page ${pageCount}...`);
      
      const response = await fetch(currentUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
       const data = await response.json();
            const monsters = data.results || [];
      const creature = monsters.find(monster => monster.challenge_rating === targetCR /*&& monster.environment === environment*/);
    
    if (creature) {
      console.log(`Found Creature!Name: ${creature.name}, AC: ${creature.armor_class}, HP: ${creature.hit_points}`);
      allCreatures = allCreatures.concat(creature);
        currentUrl = data.next; 
      pageCount++;
      } else {
      console.log(`No valid Creatures found on page ${pageCount} of results.`);
            currentUrl = data.next; 
      pageCount++;
      
    }

      
      //Merge the current page's results into our main array
     
      
      // Update currentUrl to the next page link, or null to exit the loop
    }

    console.log(`\n Success! Total Creatures Fetched: ${allCreatures.length}`);
    
    // Now you can safely use your .find() or .filter() on the complete array
    const goblin = allCreatures.find(c => c.name.toLowerCase() === 'goblin');
    if (goblin) {
      console.log(`Found Goblin! AC: ${goblin.armor_class}, HP: ${goblin.hit_points}`);
    }

    return allCreatures;

  } catch (error) {
    console.error('An error occurred while pulling all pages:', error);
  }
}
  }



