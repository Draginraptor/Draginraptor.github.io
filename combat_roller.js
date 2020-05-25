// Data
// dps is number of times a dragon gets to roll their raw/bleed, keyed as follows:
// [attack_no.]:[value to roll under or equal to get that extra attack]
const dps_chance = { 2: 5, 3: 3 };

// Keyed by: [num to roll]:[% deflected (written as float)]
const deflect_chance = { 1: 0.75, 2: 0.5, 3: 0.25, 4: 0.1, 5: 0.05, 6: 0.03, 7: 0.02, 8: 0.01, 9: 0, 10: 0 };

const classes = {
	'very_light': {
		phys_crit: 5, // out of 10
		min_raw: 15,
		max_raw: 30,
		max_bleed: 50, // min is always 1
		max_dps: 3,
		base_res: 30,
		mag_crit: 5
	}
};

// Inputs are retrieved in the setupDragons function

function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dragon_1 = {
	stats: {}, // filled with the stats of the corresponding class
	breath: [], // array of up to 2 strings
	magic: {}, // should have 2 children: min and max (damage)
	armor: 0 // total armor rating
}

var dragon_2 = {
	stats: {}, // filled with the stats of the corresponding class
	breath: [], // array of up to 2 strings
	magic: {}, // should have 2 children: min and max (damage)
	armor: 0 // total armor rating
}

function fight() {
	// Assign the needed data to the dragon vars
	setupDragons();
	// Roll to determine who goes first
	var first;
	var second;
	if(rand(1, 2) == 1) {
		var first = dragon_1;
		var second = dragon_2;
	}
	else {
		var first = dragon_2;
		var second = dragon_1;
	}
}

// Function to load all the data on both dragons into a dictionary for ease of access when rolling
function setupDragons() {
	
}

function calculateDamage(attacker, defender) {
	var dps = 1;
	// Roll DPS (number of times attacker will roll raw+bleed dmg)
	for(let i = 1; i < attacker.stats.max_dps; i++) {
		var roll_dps = rand(1, 10);
		if(roll_dps <= dps_chance[i+1]) {
			dps++;
		}
		else {
			break; // Stop the loop entirely
		}
	}
	// Create 2 vars: one for raw and one for bleed
	var raw_dmg = 0;
	var bleed_dmg = 0;
	// For each DPS (use a loop!):
	//   1. Roll for raw crit
	//     - On crit, add max_raw to raw_dmg
	//     - Else, add rand betw min_raw and max_raw
	//   2. Roll for bleed crit
	//     - On crit, add max_bleed to bleed_dmg
	//     - Else, add rand betw 1 and max_bleed
	for(let r = 0; r < dps; r++) {
		var roll_raw_crit = rand(1, 10);
		if(roll_raw_crit <= attacker.stats.phys_crit) {
			raw_dmg += attacker.stats.max_raw;
		}
		else {
			raw_dmg += rand(attacker.stats.min_raw, attacker.stats.max_raw);
		}
		var roll_bleed_crit = rand(1, 10);
		if(roll_bleed_crit <= attacker.stats.phys_crit) {
			bleed_dmg += attacker.stats.max_bleed;
		}
		else {
			bleed_dmg += rand(1, attacker.stats.max_bleed);
		}
	}
	// Modify the raw_dmg by accounting for defender's flat res, and random deflect chance

	return final_dmg;
}

function roll() {
	document.getElementById("result").innerHTML = "";
	fight(); 
}

function clearForms() {
	document.getElementById("result").innerHTML = "";
}

// JavaScript Document
