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
        // Dictionary - loot : chance, rolled with getRollResult()
        this.loot_table = loot_table
    }

    containsQuestType(type) {
        return quest_types.includes(type)
    }
}

// Dict of quests accessed with input taken from the html
const quests = {
    "b1": new Quest("A Path Less Traveled", ["non-magic"], 
        {
            ":thumb719065940:": 5, // Milk
            ":thumb740288322:": 2, // Pearl Necklace
            ":thumb743377545:": 3, // Cooking Pot
            ":thumb743377689:": 5, // Tea
            ":thumb743377537:": 5, // Beef Stew
            ":thumb738530711:": 3, // Premium Meat
            ":thumb753647382:": 2  // Inkwell
        }
    ),
}

var quest;
var rank;
var temper;
var magic;
var extras; // Includes items, familiars, taming
var has_other_dragon;
var has_bonded; // or same flight; overwrites has_other_dragon

// Updates inputs for next roll
function readInputs() {

}

function rollQuest() {
    // 1. Add together total pass chance
    // 2. Check for quest pass/fail
    //    - If fail, rollSide()
    //    - If pass, rollLoot()
    // 3. rollInjury()
}

function rollSide() {

}

function rollLoot(){
    // Roll amount of loot, then roll a loot for each
}

function rollInjury() {
    // Get injury chance based on rank and temper (possibly from extras as well
    // Roll injury
}

function roll() {
    readInputs()
}

// Roll a result from a provided object of values
function getRollResult(roll_table) {
	table_keys = Object.keys(roll_table);
	total_chance = 0;
	for(let i = 0; i < table_keys.length; i++) { total_chance += roll_table[table_keys[i]]; }
    var rand_num = rand(1, total_chance);
    // Starts from the first entry
    // If rand_num is less than or equal to the chance, return the corresponding loot
    // Else, deduct the chance from rand_num
    // Supposed to be similar to: if (rand_num > a && rand_num < b) { return loot; }
	for(let i = 0; i < table_keys.length; i++) {
		if(rand_num <= roll_table[table_keys[i]]) { return table_keys[i]; }
		else { rand_num -= roll_table[table_keys[i]]; }
	}
	return "error!!?"
}