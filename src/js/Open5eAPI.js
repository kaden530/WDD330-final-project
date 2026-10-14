export default class Open5eApi {
    constructor() {
        this.baseUrl = "https://api.open5e.com/v2";
    }

/*Loot generation*/


async getItems(highestValue){
  let pageCount = 1;
  let itemUrl = `${this.baseUrl}/items/?page=2&page=${pageCount}`;
  let allItems =[]
  if (allItems.length > 0){
    allItems.length=0
  }
  console.log('Starting data retrieval from Open5e API for items...');

  try {
    // Keep looping as long as the API provides a 'next' page URL
    while (itemUrl) {
            const response = await fetch(itemUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const items = data.results || [];



      const loot = items.filter(item => item.cost < highestValue)
            //const matchingItems = items.filter(item => item.cost < 500);
            //allItems.push(...matchingItems);
      if (loot) {
        loot.forEach(loot => {
          loot.rarity ='none'
          const cleanText = (loot.desc).replace(/\n/g, ' ');
          loot.desc = cleanText
           loot.weight = Math.round(loot.weight)
          loot.cost = Math.round(loot.cost)
        });
        allItems = allItems.concat(loot);
        itemUrl = data.next; 
        pageCount++;
      } else {
      console.log(`No treasure found on page ${pageCount} of results.`);
            itemUrl = data.next; 
      pageCount++;
      
    }
    }
  
  
  } catch (error) {
    console.error('An error occurred while pulling all pages:', error);
  }
  return allItems
}


/*Get magic Items*/
async getMagicItems(rarity){
  let pageCount = 1;
  let magicItemUrl = `${this.baseUrl}/magicitems/?page=${pageCount}`;
  let allItems =[]
  console.log('Starting data retrieval from Open5e API for magic items...');

  try {
    // Keep looping as long as the API provides a 'next' page URL
    while (magicItemUrl) {
      const response = await fetch(magicItemUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const items = data.results || [];



      let loot = items.filter(item => item.rarity.rank <= rarity)
      if (loot) {
        loot.forEach(loot => {
          const cleanText = (loot.desc).replace(/\n/gi, "<br />");
          loot.desc = cleanText
          loot.weight = Math.round(loot.weight)
          loot.cost = Math.round(loot.cost)
          let diceroll=1
          let cost =0
          if(loot.rarity.rank == 1){
            //common magic items cos
            diceroll = Math.floor(Math.random() * 6) +2
            cost = diceroll * 10
          }else if(loot.rarity.rank == 2){
            //uncommon magic items cost
            diceroll = Math.floor(Math.random() * 6) + 1
            cost = diceroll * 100
          }else if(loot.rarity.rank == 3){
            //rare magic items cost
            diceroll = (Math.floor(Math.random() * 10) + 1) + (Math.floor(Math.random() * 10) + 1)
            cost =  diceroll * 1000
          }else if(loot.rarity.rank == 4){
            //very-rare magic items cost
            diceroll = (Math.floor(Math.random() * 4) + 1)
            cost = diceroll * 10000
          }else if(loot.rarity.rank == 5){
            //legendary magic items cost
            diceroll = (Math.floor(Math.random() * 6) +1) +(Math.floor(Math.random() * 6) + 1)
            cost = diceroll * 25000
          }
          loot.cost = cost
        });
        allItems = allItems.concat(loot);
        magicItemUrl = data.next; 
        pageCount++;
      } else {
      console.log(`No magic treasure found on page ${pageCount} of results.`);
            magicItemUrl = data.next; 
      pageCount++;
      
    }
    }
  
  
  } catch (error) {
    console.error('An error occurred while pulling all pages:', error);
  }
  return allItems
}




/*store generation */


}


  



