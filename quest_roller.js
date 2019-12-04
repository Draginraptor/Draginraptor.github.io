// Quest rolling guide: https://docs.google.com/document/d/1FDjHQsT14CPCc1fP7h-LXIRlxeio-HcdzRcLQJoL7eg/edit#heading=h.pztac1lg3zon
/*
    Roller inputs:
    - Quest
    - Dragon Rank
    - Temper
    - Magic Restoration
    - Items, Familiars, Taming (A bunch of checkboxes)
    - Includes bonded dragon/companion or dragon in the same flight
    - Includes another dragon not of the above
*/

class Quest {
    constructor(name, quest_types, loot_table) {
        this.name = name
        // Array of types
        this.quest_types = quest_types
        // Dictionary - loot : chance
        this.loot_table = loot_table
    }

    containsQuestType(type) {
        return quest_types.includes(type)
    }
}