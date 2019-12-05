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

const base_pass = {
    "fledgling": 35,
    "primal": 45,
    "ancient": 55,
    "primordial": 65
}

const base_injury = {
    "fledgling": 40,
    "primal": 30,
    "ancient": 20,
    "primordial": 10
}

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
    "b1": new Quest("A Path Less Traveled", ["none"], 
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
    "b2": new Quest("Counting Sheep", ["none"], 
        {
            "100 x :thumb726629426:": 10, // 100 Crystals
            ":thumb718012647:": 1, // Diminished Coin
            ":thumb726897474:": 2, // Unfertilised Dragon Egg
            ":thumb742773107:": 4, // Cloth
            ":thumb741645024:": 2  // Leather
        }
    ),
    "b3": new Quest("A Festival of Honor", ["none"], 
        {
            ":thumb745829466:": 1, // Revival Feather
            ":thumb743377529:": 2, // Dragon Roll Sushi
            ":thumb743377537:": 5, // Beef Stew
            ":thumb743377689:": 6, // Tea
            ":thumb743377712:": 5  // Water
        }
    ),
    "b4": new Quest("New Discoveries", ["none"], 
        {
            "100 x :thumb726629426:": 10, // 100 Crystals
            ":thumb730043272:": 2, // Emerald
            ":thumb730076789:": 2, // Garnet
            ":thumb735244046:": 6, // Glass
            ":thumb743369403:": 5  // Magic Reversal Charm
        }
    ),
    "b5": new Quest("Tanning the Hide", ["none"], 
        {
            ":thumb741645024:": 5, // Leather
            ":thumb745255167:": 5, // Spotted Deer Pelt
            ":thumb745255155:": 5, // Red Deer Pelt
            ":thumb745255142:": 5, // Brown Deer Pelt
            ":thumb747886136:": 3, // Bison Pelt
            ":thumb740288125:": 5, // Fox Pelt
            ":thumb740288148:": 5, // Raccoon Pelt
            ":thumb740288113:": 5  // Wolf Pelt
        }
    ),
    "b6": new Quest("Show Me Your Bug Collection", ["none"], 
        {
            "diamond_insect": 2, // Needs a special case to roll one out of the six varieties, only a single variety can be dropped per quest
            ":thumb735459915:": 3, // Elder Beetle
            ":thumb740288268:": 5, // Bones
            ":thumb740288160:": 5, // Berries
            ":thumb740288139:": 3, // Metal
            ":thumb740288168:": 6, // Teeth
            ":thumb740287494:": 4, // Salt
            ":thumb730226090:": 6  // Large Animal Skull
        }
    ),
    "i1": new Quest("A Missing Friend", ["arcane", "elementalist", "enchantment"], 
        {
            ":thumb740287736:": 5, // Small Animal Claws
            ":thumb740287649:": 5, // Medium Animal Claws
            ":thumb738428726:": 1, // Dragon's Talon
            ":thumb740287701:": 6, // Large Animal Claws
            ":thumb753647391:": 3, // Large Animal Skull
            ":thumb730226090:": 5  // Skull
        }
    ),
    "i2": new Quest("Aiding The Injured", ["arcane", "healing"], 
        {
            ":thumb740287580:": 5, // Hemlock
            ":thumb740288335:": 5, // Honey
            ":thumb739746265:": 5, // Bandages
            ":thumb750121063:": 5, // Thread Spool
            ":thumb743377712:": 3  // Water
        }
    ),
    "i3": new Quest("Where's the Gold?", ["illusionist", "arcane"], 
        {
            "300 x :thumb726629426:": 5, // 300 Crystals
            ":thumb725107625:": 2, // Fire Tonic
            ":thumb724406005:": 3, // Ice Tonic
            ":thumb718012647:": 4, // Diminished Coin
            ":thumb718012663:": 2, // Weathered Coin
            ":thumb719445773:": 1  // Common Dragon Egg
        }
    ),
    "i4": new Quest("The Cutest Critter You Ever Did See", ["none"], 
        {
            ":thumb737893705:": 1, // Albino Otter
            ":thumb737893718:": 1, // River Otter
            ":thumb737893728:": 1, // Sea Otter
            ":thumb740288168:": 7, // Teeth
            ":thumb740287649:": 5, // Medium Animal Claws
            ":thumb737120468:": 5  // Prime Fish
        }
    ),
    "i5": new Quest("The Gardener's Knowledge", ["healing"], 
        {
            ":thumb740287580:": 5, // Hemlock
            ":thumb740288160:": 5, // Berries
            ":thumb740287494:": 5, // Salt
            ":thumb743377712:": 5, // Water
            ":thumb740295622:": 3, // Healing Salve
            ":thumb740295613:": 2  // Antidote
        }
    ),
    "i6": new Quest("Clockmaker's Friend", ["enchantment"], 
        {
            ":thumb741646043:": 1, // Dragon's Eye
            ":thumb741645034:": 4, // Strange Geode
            ":thumb740288139:": 6, // Metal
            ":thumb730076789:": 5, // Garnet
            ":thumb730043272:": 5, // Emerald
            ":thumb730226090:": 3, // Skull
            ":thumb735744797:": 5, // Small Feathers
            ":thumb735957948:": 2, // Large Feathers
            ":thumb736005672:": 1, // Aether Imbued Feathers
            ":thumb753647382:": 4  // Inkwell
        }
    ),
    "i7": new Quest("Hiding in Plain Sight", ["illusionist", "elementalist"], 
        {
            ":thumb743377695:": 2, // Dodge Potion
            ":thumb743377699:": 2, // Critical Hit Potion
            ":thumb743377705:": 2, // Aether Potion
            ":thumb743377715:": 2, // Strength Potion
            ":thumb743369403:": 1, // Magic Reversal Charm
            ":thumb745829466:": 2, // Revival Feather
            ":thumb718012647:": 2, // Diminished Coin
            ":thumb718012663:": 1, // Weathered Coin
            "300 x :thumb726629426:": 6 // 300 Crystals
        }
    ),
    "m1": new Quest("Lurking in the Waters", ["arcane", "healing"], 
        {
            ":thumb740287580:": 5, // Hemlock
            ":thumb740287876:": 3, // Deer Carcass
            ":thumb740287824:": 2, // Fox Carcass
            ":thumb739746265:": 6, // Bandages
            ":thumb737120468:": 4, // Prime Fish
            ":thumb752525748:": 1, // Jade Hummingbird
            ":thumb737893728:": 1, // Sea Otter
            ":thumb740295613:": 4, // Antidote
            ":thumb740295622:": 4  // Healing Salve
        }
    ),
    "m2": new Quest("Surveying the Aether", ["arcane", "illusionist"], 
        {
            ":thumb753647382:": 5, // Inkwell
            ":thumb749173192:": 3, // Blueprints
            ":thumb750965574:": 1, // Aether Draco Python
            ":thumb719445813:": 1, // Uncommon Dragon Egg
            ":thumb736005672:": 2, // Aether Imbued Feather
            ":thumb747886161:": 3, // Aether Imbued Bison Pelt
            ":thumb745255131:": 3, // Aether Imbued Deer Pelt
            ":thumb772029584:": 5, // Paper
            ":thumb773160338:": 1  // Aether Imbued Pages
        }
    ),
    "m3": new Quest("The Breath of a Dragon", ["elementalist", "enchantment"], 
        {
            ":thumb740294782:": 3, // Essence of Ice
            ":thumb740294768:": 3, // Essence of Shadow
            ":thumb740294756:": 3, // Essence of Radiation
            ":thumb740294739:": 3, // Essence of Lightning
            ":thumb740294733:": 3, // Essence of Fire
            ":thumb735244046:": 5, // Glass
            ":thumb740288139:": 5, // Metal
            "500 x :thumb726629426:": 5, // 500 Crystals
            ":thumb718012642:": 1  // Brilliant Coin
        }
    ),
    "m4": new Quest("A Serpent's Touch", ["healing" ,"elementalist"], 
        {
            ":thumb750965631:": 1, // Radiant Draco Boa
            ":thumb750965608:": 1, // Shimmering Draco Python
            ":thumb750965574:": 1, // Aether Draco Python
            "500 x :thumb726629426:": 7, // 500 Crystals
            ":thumb718012642:": 1, // Brilliant Coin
            ":thumb719445793:": 1, // Rare Dragon Egg
            ":thumb740288168:": 6, // Teeth
            ":thumb740287824:": 5, // Fox Carcass
            ":thumb735957948:": 5  // Large Feathers
        }
    ),
    "m5": new Quest("Tiny Griffins", ["enchantment"], 
        {
            ":thumb752525758:": 1, // Crimson Humming Griffin
            ":thumb752525748:": 1, // Jade Humming Griffin
            ":thumb745829466:": 2, // Revival Feather
            ":thumb735957948:": 6, // Large Feathers
            ":thumb735744797:": 5, // Small Feathers
            "500 x :thumb726629426:": 5, // 500 Crystals
            ":thumb718012647:": 1, // Diminished Coin
            ":thumb738530697:": 6, // Decent Meat
            ":thumb737120461:": 5  // Decent Fish
        }
    )
}

var quest;
var rank;
var temper; // -5% for timid, +5% for aggressive
var magic_level; // +5% for low, +10% for high (but what about basic?)
var magic_type;
// If there are items and familiars added in the future, add a new var for each?
var taming; // specifically domesticated taming; +5%
var has_bonded; // or same flight; overwrites has_other_dragon; +10%
var has_other_dragon; // +5%

// Updates inputs for next roll
function readInputs() {
    quest = document.getElementById("quest").value;
    rank = document.getElementById("rank").value;
    temper = document.getElementById("temper").value;
    magic_level = document.getElementById("magic_level").value;
    magic_type = document.getElementById("magic_type").value;
    taming = document.getElementById("taming").value;
    has_other_dragon = document.getElementById("other_dragon").value;
    has_bonded = document.getElementById("bonded").value;
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