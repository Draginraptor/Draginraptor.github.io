// Data

// dps is number of times a dragon gets to roll their raw/bleed, keyed as follows:
// [attack_no.]:[value to roll under or equal to get that extra attack]
const dps_chance = { 2: 5, 3: 3 };

// Keyed by: [num to roll]:[% deflected (written as float)]
const deflect_chance = { 1: 0.75, 2: 0.5, 3: 0.25, 4: 0.1, 5: 0.05, 6: 0.03, 7: 0.02, 8: 0.01, 9: 0.0, 10: 0.0 };

const classes = {
	'very_light': {
		phys_crit: 5, // out of 10
		min_raw: 15,
		max_raw: 30,
		max_bleed: 50, // min is always 1
		max_dps: 3,
		base_res: 30,
		mag_crit: 5
	},
	'light': {
		phys_crit: 3, // out of 10
		min_raw: 25,
		max_raw: 50,
		max_bleed: 40, // min is always 1
		max_dps: 3,
		base_res: 30,
		mag_crit: 3
	},
	'medium': {
		phys_crit: 4, // out of 10
		min_raw: 50,
		max_raw: 120,
		max_bleed: 30, // min is always 1
		max_dps: 2,
		base_res: 40,
		mag_crit: 4
	},
	'heavy': {
		phys_crit: 2, // out of 10
		min_raw: 50,
		max_raw: 135,
		max_bleed: 40, // min is always 1
		max_dps: 2,
		base_res: 35,
		mag_crit: 4
	},
	'very_heavy': {
		phys_crit: 1, // out of 10
		min_raw: 50,
		max_raw: 150,
		max_bleed: 20, // min is always 1
		max_dps: 2,
		base_res: 50,
		mag_crit: 2
	},
};

const breath_weaknesses = {
	'fire': 'water', // i.e. fire is weak to water
	'water': 'lightning',
	'wind': 'poison',
	'shadow': 'radiation',
	'poison': 'fire',
	'radiation': 'luster',
	'luster': 'shadow',
	'lightning': 'wind'
};

const breath_tier_dmgs = { 1: 10, 2: 20, 3: 30, 4: 40 };

const magic_classes = {
	'basic': {
		min_dmg: 15,
		max_dmg: 30
	},
	'low': {
		min_dmg: 20,
		max_dmg: 60
	},
	'high': {
		min_dmg: 35,
		max_dmg: 100
	}
}

const armor_sets = {
	'leather': {
		helm: 10,
		chest: 10,
		tail: 10,
		break_chance: 5,
		bleed_res: 0,
		magic_res: 0
	},
	'sturdy': {
		helm: 20,
		chest: 20,
		tail: 20,
		break_chance: 3,
		bleed_res: 0,
		magic_res: 0
	},
	'iron': {
		helm: 25,
		chest: 25,
		tail: 25,
		break_chance: 1,
		bleed_res: 0,
		magic_res: 0
	},
	'crystalline': {
		helm: 30,
		chest: 30,
		tail: 30,
		break_chance: 0,
		bleed_res: 0,
		magic_res: 0
	},
	'aether': {
		helm: 30,
		chest: 30,
		tail: 30,
		break_chance: 0,
		bleed_res:0,
		magic_res: 0
	},
}

// Inputs are retrieved in the setupDragons function

function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dragon_1;

var dragon_2;

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
	
	var first_dmg = calculateDamage(first, second);
	// TODO:
	// Add to results statement: 'first dealt x damage to second!'
	// Check if any of the 2nd dragon's armor breaks
	// If any armor breaks, add to results statement: 'second's ??? helm/chest/tail breaks!'
	// Add a statement like 'second has x health left!'
	// Check if second is K.O.-ed at this point
	// If so, end the fight and return the result
	// Otherwise, repeat steps done for first (calc dmg, check for break, print health)
}

// Function to load all the data on both dragons into a dictionary for ease of access when rolling
function setupDragons() {
	// Reset dragons
	dragon_1 = {
		link: '???',
		health: 0,
		stats: {}, // filled with the stats of the corresponding class
		breath_types: [], // array of up to 2 strings, order: breath_1 then breath_2
		breath_tiers: [], // array of up to 2 ints, order: breath_1 then breath_2
		magic: {}, // should have 2 children: min and max (damage)
		armor: {
			helm: '???',
			chest: '???',
			tail: '???',
			total_rating: 0,
			bleed_res: 0,
			magic_res: 0
		}
	}
	
	dragon_2 = {
		link: '???',
		health: 0,
		stats: {}, // filled with the stats of the corresponding class
		breath_types: [], // array of up to 2 strings, order: breath_1 then breath_2
		breath_tiers: [], // array of up to 2 ints, order: breath_1 then breath_2
		magic: {}, // should have 2 children: min and max (damage)
		armor: {
			helm: '???',
			chest: '???',
			tail: '???',
			total_rating: 0,
			bleed_res: 0,
			magic_res: 0
		}
	}

	// Setup dragon_1
	dragon_1.link = document.getElementById('1_link').value;
	dragon_1.health = parseInt(document.getElementById('1_health').value);
	Object.assign(dragon_1.stats, classes[document.getElementById('1_class').value]);
	if(document.getElementById('1_breath_type_1').value != 'none') {
		dragon_1.breath_types.push(document.getElementById('1_breath_type_1').value);
		dragon_1.breath_tiers.push(document.getElementById('1_breath_tier_1').value);
	}
	if(document.getElementById('1_breath_type_2').value != 'none') {
		dragon_1.breath_types.push(document.getElementById('1_breath_type_2').value);
		dragon_1.breath_tiers.push(document.getElementById('1_breath_tier_2').value);
	}
	Object.assign(dragon_1.magic, magic_classes[document.getElementById('1_magic').value]);
	// Dragon 1 Helm
	dragon_1.armor.helm = document.getElementById('1_helm').value;
	if(dragon_1.armor.helm != 'none') {
		var helm_type_1 = armor_sets[dragon_1.armor.helm];
		dragon_1.armor.total_rating += helm_type_1.helm;
		dragon_1.armor.bleed_res += helm_type_1.bleed_res;
		dragon_1.armor.magic_res += helm_type_1.magic_res;
	}
	// Dragon 1 Chest
	dragon_1.armor.chest = document.getElementById('1_chest').value;
	if(dragon_1.armor.chest != 'none') {
		var chest_type_1 = armor_sets[dragon_1.armor.chest];
		dragon_1.armor.total_rating += chest_type_1.chest;
		dragon_1.armor.bleed_res += chest_type_1.bleed_res;
		dragon_1.armor.magic_res += chest_type_1.magic_res;
	}
	// Dragon 1 Tail
	dragon_1.armor.tail = document.getElementById('1_tail').value;
	if(dragon_1.armor.tail != 'none') {
		var tail_type_1 = armor_sets[dragon_1.armor.tail];
		dragon_1.armor.total_rating += tail_type_1.tail;
		dragon_1.armor.bleed_res += tail_type_1.bleed_res;
		dragon_1.armor.magic_res += tail_type_1.magic_res;
	}

	// Setup dragon_2
	dragon_2.link = document.getElementById('2_link').value;
	dragon_2.health = parseInt(document.getElementById('2_health').value);
	Object.assign(dragon_2.stats, classes[document.getElementById('2_class').value]);
	if(document.getElementById('2_breath_type_1').value != 'none') {
		dragon_2.breath_types.push(document.getElementById('2_breath_type_1').value);
		dragon_2.breath_tiers.push(document.getElementById('2_breath_tier_1').value);
	}
	if(document.getElementById('2_breath_type_2').value != 'none') {
		dragon_2.breath_types.push(document.getElementById('2_breath_type_2').value);
		dragon_2.breath_tiers.push(document.getElementById('2_breath_tier_2').value);
	}
	Object.assign(dragon_2.magic, magic_classes[document.getElementById('2_magic').value]);
	// Dragon 2 Helm
	dragon_2.armor.helm = document.getElementById('2_helm').value;
	if(dragon_2.armor.helm != 'none') {
		var helm_type_2 = armor_sets[dragon_2.armor.helm];
		dragon_2.armor.total_rating += helm_type_2.helm;
		dragon_2.armor.bleed_res += helm_type_2.bleed_res;
		dragon_2.armor.magic_res += helm_type_2.magic_res;
		}
	// Dragon 2 Chest
	dragon_2.armor.chest = document.getElementById('2_chest').value;
	if(dragon_2.armor.chest != 'none') {
		var chest_type_2 = armor_sets[dragon_2.armor.chest];
		dragon_2.armor.total_rating += chest_type_2.chest;
		dragon_2.armor.bleed_res += chest_type_2.bleed_res;
		dragon_2.armor.magic_res += chest_type_2.magic_res;
	}
	// Dragon 2 Tail
	dragon_2.armor.tail = document.getElementById('2_tail').value;
	if(dragon_2.armor.tail != 'none') {
		var tail_type_2 = armor_sets[dragon_2.armor.tail];
		dragon_2.armor.total_rating += tail_type_2.tail;
		dragon_2.armor.bleed_res += tail_type_2.bleed_res;
		dragon_2.armor.magic_res += tail_type_2.magic_res;
	}

	console.log(dragon_1);
	console.log(dragon_2);
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
	var roll_deflect = rand(1, 10);
	raw_dmg *= (1 - deflect_chance[roll_deflect]);
	raw_dmg -= defender.stats.base_res;

	// Do armor check, reduce raw_dmg as necessary
	var roll_armor_deflect = rand(defender.armor.total_rating/2, defender.armor.total_rating);
	raw_dmg -= roll_armor_deflect;

	// Roll magic dmg, if present
	var magic_dmg = 0;
	if(attacker.magic.length > 0) {
		var roll_magic_crit = rand(1, 10);
		if(roll_magic_crit <= attacker.stats.mag_crit) {
			magic_dmg = attacker.magic.max_dmg;
		}
		else {
			magic_dmg = rand(attacker.magic.min_dmg, attacker.magic.max_dmg);
		}
	}

	// Roll breath dmg, if a breath exists
	if(attacker.breath_types.length > 0) {
		// array of bool; follows the order of breath_types to store if the breath in that position has any advantage
		var breath_advantage = []; 
		if(defender.breath_types.length > 0) {
			// Check for weaknesses
			attacker.breath_types.forEach(element => {
				// Check if 
			});
		}
		else {

		}
	}
	
	// return raw_dmg + bleed_dmg + magic_dmg + breath_dmg;
}

function roll() {
	document.getElementById("result").innerHTML = "";
	fight(); 
}

function clearForms() {
	document.getElementById("result").innerHTML = "";
}

function getDragonName(import_link) {
    var x = import_link.split('/');
	var y = x[5].split('-');
    var name = "";
    // Regular expression matching digit only strings to stop at the dragon id
    var num_only = new RegExp("^\\d+$");
    var char_num = new RegExp("[a-zA-Z]{1}\\d");
    for(let i = 0; i < y.length; i++) {
        name += y[i];
        // If id parsed, stop
        if(num_only.test(y[i]) || char_num.test(y[i])) {
            break;
        }
        name += " ";
    }
    return "<a href='" + import_link + "'>" + name + "</a>";
}

// JavaScript Document
