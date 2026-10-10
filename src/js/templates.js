export function monsterTemplate(monster) {
    return `
        <article class="monster-card">
            <header class="monster-card-header">
                <h2>${monster.name}</h2>
                <p>${monster.size.name} ${monster.type.name}, ${monster.alignment}</p>
            </header>

            <section class="monster-card-stats">
                <p>
                    <strong>Armor Class:</strong>
                    ${monster.armor_class}
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
                    ${monster.experience_points ?? "N/A"}
                </p>
            </section>

            <section class="monster-card-abilities">
                <h3>Ability Scores</h3>

                <div class="monster-ability-scores">
                    <p><strong>STR</strong> ${monster.ability_scores.strength}</p>
                    <p><strong>DEX</strong> ${monster.ability_scores.dexterity}</p>
                    <p><strong>CON</strong> ${monster.ability_scores.constitution}</p>
                    <p><strong>INT</strong> ${monster.ability_scores.intelligence}</p>
                    <p><strong>WIS</strong> ${monster.ability_scores.wisdom}</p>
                    <p><strong>CHA</strong> ${monster.ability_scores.charisma}</p>
                </div>
            </section>

            <section class="monster-card-actions">
                <h3>Actions</h3>

                ${monster.actions?.map(action => `
                    <div class="monster-action">
                        <h4>${action.name}</h4>
                        <p>${action.desc}</p>
                    </div>
                `).join("") ?? "<p>No actions available.</p>"}
            </section>
        </article>
    `;
}
export function monsterListTemplate(monsters) {
    return monsters.map(monster => monsterTemplate(monster)).join("");
}

export function lootCardTemplate(loot){return `
        <article class="lootCard">
            <header class="loot-card-header">
                <h2>${loot.name}</h2>
                <p>${loot.size.name} ${loot.category.name}, ${loot.weight} ${loot.wight_unit}</p>
            </header>

            <section class="loot-card-desc">
                <p> 
                <strong> value:</strong>
                ${loot.cost}
                </p>
                <p>

                    <strong>Item Desc:</strong>
                    ${loot.desc}
                </p>

            </section>
        </article>
    `;
}
export function lootListTemplate(items) {
    return items.map(loot => lootCardTemplate(loot)).join("");}