export function monsterTemplate(monster) {
    if(monster=== undefined){
        return
    } else {return `
        <article class="monster-card">   
        <header class="monster-card-header">
        <section>
                <h2>${monster.name}</h2>
                <img src="https://www.dnd5eapi.co/api/images/monsters/${monster.index}.png">
                <p>${monster.size} ${monster.type}, ${monster.alignment}</p>
            </section>
                </header>

<section>
            <section class="monster-card-stats">
                <p>
                    <strong>Armor Class:</strong>
                    ${monster.armor_class[0].value}
                </p>

                <p>
                    <strong>Hit Points:</strong>
                    ${monster.hit_points}
                </p>
<p>
                    <strong>Fly Speed:</strong>
                    ${monster.speed.fly ?? "N/A"}
                </p>
                <p>
                    <strong>Swim Speed:</strong>
                    ${monster.speed.swim ?? "N/A"}
                </p>
                <p>
                    <strong>Speed:</strong>
                    ${monster.speed.walk ?? "N/A"}
                </p>

                <p>
                    <strong>Challenge Rating:</strong>
                    ${monster.challenge_rating}
                </p>

                <p>
                    <strong>XP:</strong>
                    ${monster.xp ?? "N/A"}
                </p>
                <p><strong>Immunities</strong>
                ${monster.damage_immunities?? "N/A"} 
                </p>
                <p><strong>Condition immunities</strong>
                ${monster.condition_immunities.name ?? "N/A"}
                </p>
                <p><strong>Damage resistances</strong>
                </p>${monster.damage_resistances ?? "N/A"}
                <p><strong>Damage vulnerabilities</strong>
                </p>${monster.damage_vulnerabilities ?? "N/A"}
                <p><strong>Sense</strong>
                blindsight: ${monster.senses.blindsight ?? "N/A"}, 
                darkvision: ${monster.senses.darvision ?? "N/A"},
                passive perception: ${monster.senses.passive_perception ?? "N/A"}
                </p>
               
            </section>

            <section class="monster-card-abilities">
                <h3>Ability Scores</h3>

                <div class="monster-ability-scores">
                    <p><strong>PB</strong> ${monster.proficiency_bonus}</p>
                    <p><strong>STR</strong> ${monster.strength}</p>
                    <p><strong>DEX</strong> ${monster.dexterity}</p>
                    <p><strong>CON</strong> ${monster.constitution}</p>
                    <p><strong>INT</strong> ${monster.intelligence}</p>
                    <p><strong>WIS</strong> ${monster.wisdom}</p>
                    <p><strong>CHA</strong> ${monster.charisma}</p>
                </div>
            </section>
</section>
            <section class="monster-card-actions">
              <section>
                  <h3>Special Abilities</h3>

                ${monster.special_abilities?.map(action => `
                    <div class="monster-action">
                        <h4>${action.name}</h4>
                        <p>${action.desc}</p>
                    </div>
                `).join("") ?? "<p>No actions available.</p>"}
            </section>
            <section>
            <h3>Legendary Actions</h3>

                ${monster.legendary_actions?.map(action => `
                    <div class="monster-action">
                        <h4>${action.name}</h4>
                        <p>${action.desc}</p>
                    </div>
                `).join("") ?? "<p>No actions available.</p>"}
            </section>
            <section>
                <h3>Actions</h3>

                ${monster.actions?.map(action => `
                    <div class="monster-action">
                        <h4>${action.name}</h4>
                        <p>${action.desc}</p>
                    </div>
                `).join("") ?? "<p>No actions available.</p>"}
            </section>
            </section>
        </article>
    `;
}}
export function monsterListTemplate(monsters) {
    return monsters.map(monster => monsterTemplate(monster)).join("");
}
export function lootButtonTemplate(){
return`
<a href="/src/loot/index" class="lootButton">
              Loot the Bodies
            </a>
`
}
export function lootCardTemplate(loot){
    if(loot.rarity != "none" ){
        let item =magicLootCardTemplate(loot);
        return item;
    }else{
    return `
        <article class="lootCard">
            <header class="lootCardHeader">
                <h2>${loot.name}</h2>
                <p>${loot.category.name}, ${loot.weight} ${loot.weight_unit}</p>
            </header>

            <section class="lootCardDesc">
            <div class ="lootCardValues">    
            <p> 
                <strong> value:</strong>
                ${loot.cost} GP
                </p>
                <br>
                <p>
                <strong> Size:</strong>
                ${loot.size.name}</p>
                </div>
                <br>
                <p>
                    <strong>Item Desc:</strong>
                    ${loot.desc}
                </p>

            </section>
        </article>
    `;
}}
export function lootListTemplate(items) {
    return items.map(loot => lootCardTemplate(loot)).join("");}

export function magicLootCardTemplate(loot){return `
        <article class="magicLootCard${loot.rarity.key}">
        <section class = "${loot.rarity.name}">
            <header class="magicLootCardHeader">
                <h2>${loot.name}</h2>
                <p>${loot.category.name}, ${loot.weight} ${loot.weight_unit}, ${loot.rarity.name}</p>
            </header>

            <section class="magicLootCardDesc">
            <div class ="magicLootCardValues">
                <p> 
                <strong> value:</strong>
                ${loot.cost} GP
                </p>
                <br>
                <p>
                <strong> Size:</strong>
                ${loot.size.name}</p>
                <br>
                <p>
                <strong> attunement:</strong>
                ${loot.requires_atunement?? "none"}: ${loot.atunement_detail ?? ""} </p>
                </div>
                <br/>
                <p>
                    <strong>Item Desc:</strong>
                    ${loot.desc}
                </p>

            </section>
        <section>

        </article>
    `;
}