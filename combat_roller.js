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
	'grand_sap': {
		phys_crit: 5, // out of 10
		min_raw: 50,
		max_raw: 135,
		max_bleed: 40, // min is always 1
		max_dps: 1,
		base_res: 40,
		mag_crit: 5
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

const breath_crit = 4; // blanket value for all

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
		bleed_res: 10,
		magic_res: 0
	},
	'aether': {
		helm: 30,
		chest: 30,
		tail: 30,
		break_chance: 0,
		bleed_res: 0,
		magic_res: 10
	},
}

// For raids
const breakable = {
	'head': 1,
	'tail': 2,
	'legs': 3,
	'none': 4
}

// Inputs are retrieved in the setupDragons function

function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dragon_1;

var dragon_2;

var detailed_breakdown = "";

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
	
	var results = dragon_1.link + " vs " + dragon_2.link + "<br>" + first.name + " goes first.<br>";
	var first_dmg = calculateDamage(first, second);
	var second_part_attacked = rollBreakable(second);
	// Print damage of first dragon
	if(second_part_attacked == 'none') { results += first.name + " deals <b>" + first_dmg + "</b> damage to " + second.name + "!<br>"; }
	else { results += first.name + " aims for " + second.name + "'s " + second_part_attacked + ", dealing <b>" + first_dmg + "</b> damage!<br>"; }
	// Check if any of the 2nd dragon's armor breaks, adding to the results if it did
	results += armorCheck(second);
	// Add a statement like 'second has x health left!
	second.health = (second.health - first_dmg) < 0 ? 0 : second.health - first_dmg;
	results += second.name + " has " + second.health + " health left.<br>";
	// Check if second is K.O.-ed at this point
	// If so, end the fight and return the result
	if(second.health == 0) {
		results += "<br>" + second.name + " was knocked out before they could attack, and the battle ends. " + first.name + " remains unharmed with " + first.health + " health left."
		return results;
	}
	results += "<br>";
	// Otherwise, repeat steps done for first (calc dmg, check for break, print health)
	var second_dmg = calculateDamage(second, first);
	var first_part_attacked = rollBreakable(first);
	// Print damage of second dragon
	if(first_part_attacked == 'none') { results += second.name + " deals <b>" + second_dmg + "</b> damage to " + first.name + "!<br>"; }
	else { results += second.name + " aims for " + first.name + "'s " + first_part_attacked + ", dealing <b>" + second_dmg + "</b> damage!<br>"; }
	// Check if any of the 1st dragon's armor breaks, adding to the results if it did
	results += armorCheck(first);
	// Add a statement like 'first has x health left!
	first.health = (first.health - second_dmg) < 0 ? 0 : first.health - second_dmg;
	results += first.name + " has " + first.health + " health left.<br>";
	// Check if first gets K.O.-ed
	if(first.health == 0) {
		results += "<br>" + first.name + " was knocked out, and the battle ends."
	}
	else {
		results += "<br>The battle ends.";
	}
	return results;
}

// Function to load all the data on both dragons into a dictionary for ease of access when rolling
function setupDragons() {
	// Reset dragons
	dragon_1 = {
		name: '???',
		link: '???',
		health: 0,
		stats: {},  // filled with the stats of the corresponding class
		breaths: {}, // array of up to 2 objs
		magic: {}, // should have 2 children: min and max (damage)
		armor: {
			helm: '???',
			chest: '???',
			tail: '???',
			total_rating: 0,
			bleed_res: 0,
			magic_res: 0
		},
		useBreakable: false,
		broken: [] // array of strings of alr broken parts
	}
	
	dragon_2 = {
		name: '???',
		link: '???',
		health: 0,
		stats: {}, // filled with the stats of the corresponding class
		breaths: {}, // array of up to 2 objs
		magic: {}, // should have 2 children: min and max (damage)
		armor: {
			helm: '???',
			chest: '???',
			tail: '???',
			total_rating: 0,
			bleed_res: 0,
			magic_res: 0
		},
		useBreakable: false,
		broken: [] // array of strings of alr broken parts
	}

	// Setup dragon_1
	var import_link_1 = document.getElementById('1_link').value;
	var name_1 = document.getElementById('1_name').value;
	if(import_link_1 !== null && import_link_1.match(/^ *$/) === null) {
		dragon_1.name = getDragonName(import_link_1);
		dragon_1.link = getDragonLink(import_link_1);
	}
	else {
		dragon_1.name = name_1;
		dragon_1.link = name_1;
	}
	dragon_1.health = parseInt(document.getElementById('1_health').value);
	Object.assign(dragon_1.stats, classes[document.getElementById('1_class').value]);
	var breath_1_1 = document.getElementById('1_breath_type_1').value;
	if(breath_1_1 != 'NA') {
		dragon_1.breaths[breath_1_1] = {};
		dragon_1.breaths[breath_1_1].tier = parseInt(document.getElementById('1_breath_tier_1').value);
		dragon_1.breaths[breath_1_1].max_dmg = breath_tier_dmgs[parseInt(document.getElementById('1_breath_tier_1').value)];
	}
	var breath_2_1 = document.getElementById('1_breath_type_2').value;
	if(breath_2_1 != 'NA') {
		dragon_1.breaths[breath_2_1] = {};
		dragon_1.breaths[breath_2_1].tier = parseInt(document.getElementById('1_breath_tier_2').value);
		dragon_1.breaths[breath_2_1].max_dmg = breath_tier_dmgs[parseInt(document.getElementById('1_breath_tier_2').value)];
	}
	Object.assign(dragon_1.magic, magic_classes[document.getElementById('1_magic').value]);
	// Dragon 1 Helm
	dragon_1.armor.helm = document.getElementById('1_helm').value;
	if(dragon_1.armor.helm != 'NA') {
		var helm_type_1 = armor_sets[dragon_1.armor.helm];
		dragon_1.armor.total_rating += helm_type_1.helm;
		dragon_1.armor.bleed_res += helm_type_1.bleed_res;
		dragon_1.armor.magic_res += helm_type_1.magic_res;
	}
	// Dragon 1 Chest
	dragon_1.armor.chest = document.getElementById('1_chest').value;
	if(dragon_1.armor.chest != 'NA') {
		var chest_type_1 = armor_sets[dragon_1.armor.chest];
		dragon_1.armor.total_rating += chest_type_1.chest;
		dragon_1.armor.bleed_res += chest_type_1.bleed_res;
		dragon_1.armor.magic_res += chest_type_1.magic_res;
	}
	// Dragon 1 Tail
	dragon_1.armor.tail = document.getElementById('1_tail').value;
	if(dragon_1.armor.tail != 'NA') {
		var tail_type_1 = armor_sets[dragon_1.armor.tail];
		dragon_1.armor.total_rating += tail_type_1.tail;
		dragon_1.armor.bleed_res += tail_type_1.bleed_res;
		dragon_1.armor.magic_res += tail_type_1.magic_res;
	}
	dragon_1.useBreakable = document.getElementById('1_use_breakable').checked;
	if(document.getElementById('1_head_part').checked) { dragon_1.broken.push('head'); }
	if(document.getElementById('1_tail_part').checked) { dragon_1.broken.push('tail'); }
	if(document.getElementById('1_legs_part').checked) { dragon_1.broken.push('legs'); }

	// Setup dragon_2
	var import_link_2 = document.getElementById('2_link').value;
	var name_2 = document.getElementById('2_name').value;
	if(import_link_2 !== null && import_link_2.match(/^ *$/) === null) {
		dragon_2.name = getDragonName(import_link_2);
		dragon_2.link = getDragonLink(import_link_2);
	}
	else {
		dragon_2.name = name_2;
		dragon_2.link = name_2;
	}
	dragon_2.health = parseInt(document.getElementById('2_health').value);
	Object.assign(dragon_2.stats, classes[document.getElementById('2_class').value]);
	var breath_1_2 = document.getElementById('2_breath_type_1').value;
	if(breath_1_2 != 'NA') {
		dragon_2.breaths[breath_1_2] = {};
		dragon_2.breaths[breath_1_2].tier = parseInt(document.getElementById('2_breath_tier_1').value);
		dragon_2.breaths[breath_1_2].max_dmg = breath_tier_dmgs[parseInt(document.getElementById('2_breath_tier_1').value)];
	}
	var breath_2_2 = document.getElementById('2_breath_type_2').value;
	if(breath_2_2 != 'NA') {
		dragon_2.breaths[breath_2_2] = {};
		dragon_2.breaths[breath_2_2].tier = parseInt(document.getElementById('2_breath_tier_2').value);
		dragon_2.breaths[breath_2_2].max_dmg = breath_tier_dmgs[parseInt(document.getElementById('2_breath_tier_2').value)];
	}
	Object.assign(dragon_2.magic, magic_classes[document.getElementById('2_magic').value]);
	// Dragon 2 Helm
	dragon_2.armor.helm = document.getElementById('2_helm').value;
	if(dragon_2.armor.helm != 'NA') {
		var helm_type_2 = armor_sets[dragon_2.armor.helm];
		dragon_2.armor.total_rating += helm_type_2.helm;
		dragon_2.armor.bleed_res += helm_type_2.bleed_res;
		dragon_2.armor.magic_res += helm_type_2.magic_res;
		}
	// Dragon 2 Chest
	dragon_2.armor.chest = document.getElementById('2_chest').value;
	if(dragon_2.armor.chest != 'NA') {
		var chest_type_2 = armor_sets[dragon_2.armor.chest];
		dragon_2.armor.total_rating += chest_type_2.chest;
		dragon_2.armor.bleed_res += chest_type_2.bleed_res;
		dragon_2.armor.magic_res += chest_type_2.magic_res;
	}
	// Dragon 2 Tail
	dragon_2.armor.tail = document.getElementById('2_tail').value;
	if(dragon_2.armor.tail != 'NA') {
		var tail_type_2 = armor_sets[dragon_2.armor.tail];
		dragon_2.armor.total_rating += tail_type_2.tail;
		dragon_2.armor.bleed_res += tail_type_2.bleed_res;
		dragon_2.armor.magic_res += tail_type_2.magic_res;
	}
	dragon_2.useBreakable = document.getElementById('2_use_breakable').checked;
	if(document.getElementById('2_head_part').checked) { dragon_2.broken.push('head'); }
	if(document.getElementById('2_tail_part').checked) { dragon_2.broken.push('tail'); }
	if(document.getElementById('2_legs_part').checked) { dragon_2.broken.push('legs'); }
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
	detailed_breakdown += attacker.name + " goes for " + dps + " attack(s)!<br>"
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
		detailed_breakdown += "> Attack #" + (r+1) + "<br>";
		var raw_round = 0;
		var bleed_round = 0;
		var roll_raw_crit = rand(1, 10);
		if(roll_raw_crit <= attacker.stats.phys_crit) {
			detailed_breakdown += "* " + attacker.name + " crits their Raw attack this round.<br>"
			raw_round = attacker.stats.max_raw;
		}
		else {
			raw_round = rand(attacker.stats.min_raw, attacker.stats.max_raw);
		}
		var roll_bleed_crit = rand(1, 10);
		if(roll_bleed_crit <= attacker.stats.phys_crit) {
			detailed_breakdown += "* " + attacker.name + " crits their Bleed attack this round.<br>"
			bleed_round = attacker.stats.max_bleed;
		}
		else {
			bleed_round = rand(1, attacker.stats.max_bleed);
		}
		raw_dmg += raw_round;
		bleed_dmg += bleed_round;
		detailed_breakdown += "-> Raw Damage: " + raw_round + "<br>";
		detailed_breakdown += "-> Bleed Damage: " + bleed_round + "<br>";
		detailed_breakdown += "<br>";
	}
	detailed_breakdown += "Total Raw Damage: " + raw_dmg + "<br>";
	detailed_breakdown += "Total Bleed Damage: " + bleed_dmg + "<br>";
	detailed_breakdown += "<br>";
	// Modify the raw_dmg by accounting for random deflect chance, and defender's flat res
	var roll_deflect = rand(1, 10);
	raw_dmg *= (1 - deflect_chance[roll_deflect]);
	raw_dmg = Math.trunc(raw_dmg);
	detailed_breakdown += defender.name + " was able to deflect <b>" + (deflect_chance[roll_deflect]*100) + "%</b> of the Raw damage, reducing it to <b>" + raw_dmg + "</b>.<br>";
	raw_dmg -= defender.stats.base_res;
	detailed_breakdown += defender.name + "'s natural resistance of <b>" + defender.stats.base_res + "</b> helped to reduce the Raw damage to <b>" + raw_dmg + "</b>.<br>";
	// Do armor check if armor is equipped, reduce raw_dmg as necessary
	var roll_armor_deflect = 0;
	if(defender.armor.total_rating > 0) {
		roll_armor_deflect = rand(defender.armor.total_rating/2, defender.armor.total_rating);
		raw_dmg -= roll_armor_deflect;
		raw_dmg = Math.trunc(raw_dmg);
	}
	detailed_breakdown += "Finally, their armor (or lack thereof) means that <b>" + roll_armor_deflect + "</b> is reduced from Raw damage to give <b>" + raw_dmg + "</b>.<br>";
	// Raw damage cannot be less than 0
	if(raw_dmg < 0) { raw_dmg = 0; }
	detailed_breakdown += "(If the Raw damage has dropped below 0, it will be corrected to be equal to 0.)<br><br>"

	// Deduct bleed_res from armor
	bleed_dmg -= defender.armor.bleed_res;
	// Bleed damage cannot be less than 0
	if(bleed_dmg < 0) { bleed_dmg = 0; }
	detailed_breakdown += defender.name + "'s armor offers <b>" + defender.armor.bleed_res + "</b> points of Bleed resistance, and so Bleed damage is <b>" + bleed_dmg + "</b>.<br>";

	// Roll magic dmg, if present
	var magic_dmg = 0;
	if(Object.keys(attacker.magic).length > 0) {
		var roll_magic_crit = rand(1, 10);
		if(roll_magic_crit <= attacker.stats.mag_crit) {
			detailed_breakdown += attacker.name + " is able to land a critical Magic attack! ";
			magic_dmg = attacker.magic.max_dmg;
		}
		else {
			magic_dmg = rand(attacker.magic.min_dmg, attacker.magic.max_dmg);
		}
		detailed_breakdown += attacker.name + " harnesses their magic to attack for <b>" + magic_dmg + "</b> Magic damage.<br>";
		// Deduct magic_res from armor
		magic_dmg -= defender.armor.magic_res;
		// Bleed damage cannot be less than 0
		if(magic_dmg < 0) { magic_dmg = 0; }
		detailed_breakdown += defender.name + "'s armor offers <b>" + defender.armor.magic_res + "</b> points of Magic resistance, and so Magic damage is <b>" + magic_dmg + "</b>.<br>";
	}

	// Roll breath dmg, if a breath exists
	var breath_dmg = 0;
	// Breaths: tier 1 = 10, tier 2 = 20...
	// Strong breaths do double damage
	// Same min_dmg for all (0)
	// Select breath based on max_dmg (x2 if strong); this will always select the breath with greater max
	if(Object.keys(attacker.breaths).length > 0) {
		// var used_breath = '';
		// just find the greatest possible max_dmg available from the breaths the dragon has
		var chosen_breath = '?? error';
		var highest_max_dmg = 0; 
		Object.keys(attacker.breaths).forEach(att => {
			// Check for weaknesses
			// Check if the defender has any breaths, if not, skip to setting the breath
			if(Object.keys(defender.breaths).length > 0) {
				// Check if any of the defender's breaths are weak to this breath
				Object.keys(defender.breaths).forEach(def => {
					if(breath_weaknesses[def] == att) {
						// If defender breath is weak, double the attacker's breath max_dmg
						attacker.breaths[att].max_dmg *= 2;
					}
				});
			}
			if(attacker.breaths[att].max_dmg > highest_max_dmg) {
				chosen_breath = capitaliseFirstLetter(att);
				highest_max_dmg = attacker.breaths[att].max_dmg; 
			}
			// !! wait this is unnecessary if the user doesn't need to know WHAT breath is used
			// Determine if breath is stronger than the one in the used_breath var
			// If empty or if stronger, assign current breath
			// If equal max_dmg, roll 50/50 on which to use
			// (this method shouldn't be a problem as there can only be up to 2 breaths anyway)
			// if(used_breath == '' || attacker.breaths[used_breath].max_dmg < attacker.breaths[att].max_dmg) { used_breath = att; }
			// else if (attacker.breaths[used_breath].max_dmg == attacker.breaths[att].max_dmg) { used_breath = (rand(1,2) == 1 ? used_breath : att); }
		});
		var roll_breath_crit = rand(1, 10);
		// breath_crit is a blanket value set at top of file
		if(roll_breath_crit <= breath_crit) {
			detailed_breakdown += attacker.name + " is able to land a critical Breath attack! ";
			breath_dmg = highest_max_dmg;
		}
		else {
			breath_dmg = rand(0, highest_max_dmg);
		}
		detailed_breakdown += attacker.name + " breathes " + chosen_breath + " to deal <b>" + breath_dmg + "</b> Breath damage.<br>";
	}
	var total_dmg = raw_dmg + bleed_dmg + magic_dmg + breath_dmg;
	detailed_breakdown += "Summary of " + attacker.name + "'s Turn:<br>DPS: " + dps + "<br>Raw: " + raw_dmg + "<br>Bleed: " + bleed_dmg + "<br>Magic: " + magic_dmg + "<br>Breath: " + breath_dmg + "<br><b>Total:</b> " + total_dmg + "<br><br>";
	return total_dmg
}

function armorCheck(defender) {
	// Check if all pieces are the same set and not NA, if so, max 1 piece can be broken
	// Otherwise, each piece is rolled separately
	var broken = "";
	if(defender.armor.helm != 'NA' && defender.armor.helm == defender.armor.chest && defender.armor.chest == defender.armor.tail) {
		var roll_set = rand(1, 10);
		if(roll_set < armor_sets[defender.armor.helm].break_chance) {
			// Select one piece to be broken; 1 =  helm, 2 = chest, 3 = tail
			var roll_broken_piece = rand(1, 3);
			var broken_piece = roll_broken_piece == 1 ? ' Helm' : roll_broken_piece == 2 ? ' Chest Plate' : ' Tail Guard';
			broken += capitaliseFirstLetter(defender.armor.helm) + broken_piece + "<br>";
		}
	}
	else {
		// Check helm
		if(defender.armor.helm != 'NA') {
			var roll_helm = rand(1, 10);
			if(roll_helm < armor_sets[defender.armor.helm].break_chance) {
				broken += capitaliseFirstLetter(defender.armor.helm) + " Helm<br>";
			}
		}
		// Check chest
		if(defender.armor.chest != 'NA') {
			var roll_chest = rand(1, 10);
			if(roll_chest < armor_sets[defender.armor.chest].break_chance) {
				broken += capitaliseFirstLetter(defender.armor.chest) + " Chest<br>";
			}
		}
		// Check tail
		if(defender.armor.tail != 'NA') {
			var roll_tail = rand(1, 10);
			if(roll_tail < armor_sets[defender.armor.tail].break_chance) {
				broken += capitaliseFirstLetter(defender.armor.tail) + " Tail<br>";
			}
		}
	}
	if(broken != "") { broken = "Some of " + defender.name + "'s armor was broken in the attack:<br>" + broken; }
	return broken;
}

function rollBreakable(dragon) {
	// Duplicate breakable dict
	if(!dragon.useBreakable) { return 'none'; }
	var temp = {};
	Object.assign(temp, breakable);
	dragon.broken.forEach(part => {
		temp['none'] += temp[part];
		delete temp[part];
	});
	var table_keys = Object.keys(temp);
	var total_chance = 0;
	for(let i = 0; i < table_keys.length; i++) { total_chance += temp[table_keys[i]]; }
	var rand_num = rand(1, total_chance);
	for(let i = 0; i < table_keys.length; i++) {
		if(rand_num <= temp[table_keys[i]]) { return table_keys[i]; }
		else { rand_num -= temp[table_keys[i]]; }
	}
	return "error!!?"
}

function roll() {
	detailed_breakdown = "";
	document.getElementById("result").innerHTML = fight();
	document.getElementById("detailed_breakdown").innerHTML = detailed_breakdown;
	document.getElementById("dragon_details").innerHTML = printDragonDetails(dragon_1) + "<br><br>" + printDragonDetails(dragon_2);
}

function clearForms() {
	document.getElementById("result").innerHTML = "";
}

function getDragonLink(import_link) {
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

function getDragonName(import_link) {
    var x = import_link.split('/');
	var y = x[5].split('-');
    return y[0];
}

function printDragonDetails(dragon) {
	var dragon_string = dragon.link + " details:<br>";
	dragon_string += "Name: " + dragon.name + "<br>";
	dragon_string += "Health: " + dragon.health + "<br>";
	dragon_string += "<br>";
	dragon_string += "Class Stats: " + "<br>";
	dragon_string += "> Physical Crit: " + dragon.stats.phys_crit + "<br>";
	dragon_string += "> Min/Max Raw Damage: " + dragon.stats.min_raw + "/" + dragon.stats.max_raw + "<br>";
	dragon_string += "> Min/Max Bleed: 0/" + dragon.stats.max_bleed + "<br>";
	dragon_string += "> Max DPS: " + dragon.stats.max_dps + "<br>";
	dragon_string += "> Base Resistance: " + dragon.stats.base_res + "<br>";
	dragon_string += "> Magic Crit: " + dragon.stats.mag_crit + "<br>";
	dragon_string += "Min/Max Magic: " + (Object.keys(dragon.magic).length <= 0 ? "0/0" : dragon.magic.min_dmg + "/" + dragon.magic.max_dmg) + "<br>";
	dragon_string += "<br>";
	dragon_string += "Breath Crit: 4 (Blanket Value for all dragons)<br>";
	dragon_string += "Breaths: " + (Object.keys(dragon.breaths).length <= 0 ? "None" : "") + "<br>";
	Object.keys(dragon.breaths).forEach(breath => {
		dragon_string += "> " + capitaliseFirstLetter(breath) + "<br>";
		dragon_string += "-> Tier " + dragon.breaths[breath].tier + "<br>", 
		dragon_string += "-> Strong against " + capitaliseFirstLetter(breath_weaknesses[breath]) + "<br>",
		dragon_string += "-> Min/Max Damage: 0/" + dragon.breaths[breath].max_dmg + "<br>"
	});
	dragon_string += "<br>";
	dragon_string += "Armor: " + "<br>";
	dragon_string += "> " + capitaliseFirstLetter(dragon.armor.helm) + " Helm <br>";
	dragon_string += "> " + capitaliseFirstLetter(dragon.armor.chest) + " Chest Plate <br>";
	dragon_string += "> " + capitaliseFirstLetter(dragon.armor.tail) + " Tail Guard <br>";
	dragon_string += "> Total Armor Rating: " + dragon.armor.total_rating + "<br>";
	dragon_string += "> Bleed Resistance: " + dragon.armor.bleed_res + "<br>";
	dragon_string += "> Magic Resistance: " + dragon.armor.magic_res + "<br>";
	return dragon_string;
}

function capitaliseFirstLetter(input) {
	var first = input[0]
	return input.replace(first, first.toUpperCase());
}

// JavaScript Document
