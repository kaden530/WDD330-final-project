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

    // Correctly structured sequential loop
    for (const monster of monstersData.results) {
      const response = await fetch(`${this.baseUrl}/monsters/${monster.name}`);
      
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

}