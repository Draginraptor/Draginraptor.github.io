// All the data used in the roller at the top for easy access
// Egg data has one entry for each characteristic to roll,
// which each have their own set of chances for specific outcomes
// e.g. common egg twin chances have 10 in 'identical', 10 in 'non-identical' and 80 in 'no_twins'
// When rolled the chance values are totalled and then a random number is rolled between 1 and that total
// In this case it's 100 (i.e. 10/100 chance for identical etc)
const common_egg = {
	twins: { 'identical': 10, 'non_identical': 10, 'no_twins': 80 },
	markings: { 'common': 80, 'uncommon': 20 },
	mutations: { 'no': 90, 'yes': 8, 'Radiance': 1, 'Chimera': 1 },
	skill_breath: { 'no': 90, 'yes': 10 },
	trait: { 'common': 70, 'uncommon': 30 },
	temper: { 'Timid': 70, 'Aggressive': 30 },
	base: { 'Umber': 70, 'Haze': 15, 'Ivory': 5, 'Vanta': 10 },
	coat: { 'Common': 80, 'Feathered': 10, 'Plated': 10 },
	lineage: { 'yes': 90, 'no': 10 },
	act_species: { 'Stalker Wyvern': 1, 'Ravager Wyvern': 2, 'Warden Dragon': 3 },
	act_lineage: { 'yes': 95, 'no': 5 },
	uc_max: 1,
	r_max: 0	
}

const uncommon_egg = {
	twins: { 'identical': 15, 'non_identical': 20, 'no_twins': 65 },
	markings: { 'common': 70, 'uncommon': 30 },
	mutations: { 'no': 85, 'yes': 10, 'Radiance': 3, 'Chimera': 2 },
	skill_breath: { 'no': 80, 'yes': 20 },
	trait: { 'common': 60, 'uncommon': 40 },
	temper: { 'Timid': 60, 'Aggressive': 30, 'Calm': 10 },
	base: { 'Umber': 40, 'Haze': 30, 'Ivory': 15, 'Vanta': 15 },
	coat: { 'Common': 75, 'Feathered': 10, 'Plated': 15 },
	lineage: { 'yes': 85, 'no': 15 },
	act_species: { 'Stalker Wyvern': 1, 'Ravager Wyvern': 2, 'Warden Dragon': 3 },
	act_lineage: { 'yes': 90, 'no': 10 },
	uc_max: 2,
	r_max: 0	
}

const rare_egg = {
	twins: { 'identical': 20, 'non_identical': 20, 'no_twins': 60 },
	markings: { 'common': 65, 'uncommon': 25, 'rare': 10 },
	mutations: { 'no': 75, 'yes': 18, 'Radiance': 4, 'Chimera': 3 },
	skill_breath: { 'no': 70, 'yes': 30 },
	trait: { 'common': 55, 'uncommon': 35, 'rare': 10 },
	temper: { 'Timid': 50, 'Aggressive': 35, 'Calm': 10, 'Sinister': 5 },
	base: { 'Haze': 40, 'Ivory': 30, 'Vanta': 15, 'Golden': 10, 'Melanistic Umber': 2, 'Melanistic Haze': 1, 'Melanistic Ivory': 1, 'Melanistic Golden': 1 },
	coat: { 'Common': 60, 'Feathered': 20, 'Plated': 16, 'Angora': 3, 'Imperial': 1 },
	lineage: { 'yes': 75, 'no': 25 },
	act_species: { 'Stalker Wyvern': 1, 'Ravager Wyvern': 2, 'Warden Dragon': 3 },
	act_lineage: { 'yes': 80, 'no': 20 },
	uc_max: 2,
	r_max: 1	
}

const myst_egg = {
	twins: { 'identical': 25, 'non_identical': 20, 'no_twins': 55 },
	markings: { 'common': 55, 'uncommon': 30, 'rare': 10, 'vrare': 5 },
	mutations: { 'no': 70, 'yes': 20, 'Radiance': 7, 'Chimera': 3 },
	skill_breath: { 'no': 60, 'yes': 40 },
	trait: { 'common': 50, 'uncommon': 35, 'rare': 10, 'vrare': 5 },
	temper: { 'Timid': 40, 'Aggressive': 40, 'Calm': 10, 'Sinister': 10 },
	base: { 'Haze': 30, 'Ivory': 35, 'Vanta': 15, 'Golden': 10, 'Melanistic Umber': 3, 'Melanistic Haze': 3, 'Melanistic Ivory': 2, 'Melanistic Golden': 2 },
	coat: { 'Common': 50, 'Feathered': 25, 'Plated': 15, 'Angora': 7, 'Imperial': 3 },
	lineage: { 'yes': 70, 'no': 30 },
	act_species: { 'Stalker Wyvern': 1, 'Ravager Wyvern': 2, 'Warden Dragon': 3 },
	act_lineage: { 'yes': 75, 'no': 25 },
	uc_max: 2,
	r_max: 1
}

// Arrays of marking arrays in the format ['pheno', 'geno', 'pheno string position']
// Pheno string order: vr - r - ed - color - suffix (base would go between color and suffix)
// 3 marks per line
const c_marks = [
	['Blanket', 'nBl', 'suffix'], ['Boar', 'nBr', 'suffix'], ['Collar', 'nCl', 'suffix'],
	['Dunstripe', 'nDn', 'suffix'], ['Duo Tone', 'nDo', 'suffix'], ['Dusted', 'nDt', 'ed'],
	['Fading', 'nFd', 'suffix'], ['Flaxen', 'nFla', 'color'], ['Frog Eye', 'nFe', 'suffix'],
	['Greying', 'nGr', 'color'], ['Hood', 'nHd', 'suffix'], ['Leaf', 'nLf', 'suffix'],
	['Masked', 'nMa', 'ed'], ['Pangare', 'nPa', 'suffix'], ['Points', 'nPo', 'suffix'],
	['Python', 'nPy', 'suffix'], ['Ray', 'nRa', 'suffix'], ['Rimmed', 'nRi', 'ed'],
	['Ringed', 'nRn', 'ed'], ['Rose', 'nRos', 'color'],	['Sable', 'nSa', 'suffix'],
	['Scaled', 'nSc', 'ed'], ['Scorching', 'nSo', 'suffix'], ['Skink', 'nSk', 'suffix'],
	['Trailing', 'nTr', 'suffix'], ['Underbelly', 'nUn', 'suffix']
];
const uc_marks = [
	['Azure', 'nAz', 'color'], ['Banded', 'nBa', 'ed'], ['Bokeh', 'nBk', 'suffix'],
	['Border', 'nBo', 'suffix'], ['Cloud', 'nCd', 'suffix'], ['Copper', 'nCp', 'color'],
	['Crested', 'nCr', 'ed'], ['Crimson', 'nCri', 'color'], ['Dipped', 'nDi', 'ed'],
	['Dripping', 'nDr', 'suffix'], ['Inkwell', 'nIn', 'suffix'], ['Marbled', 'nMar', 'ed'],
	['Merle', 'nMr', 'suffix'], ['Metallic', 'nMe', 'suffix'], ['Mist', 'nMi', 'suffix'],
	['Pigeon', 'nPg', 'suffix'], ['Plasma', 'nPs', 'suffix'], ['Roan', 'nRo', 'suffix'],
	['Rosettes', 'nRs', 'suffix'], ['Shaped', 'nSp', 'ed'],	['Smoke', 'nSm', 'suffix'],
	['Somatic', 'nSt', 'suffix'], ['Tabby', 'nTa', 'suffix'], ['Tobiano', 'nTo', 'suffix'],
	['Toxin', 'nTx', 'suffix']
];
const r_marks = [
	['Appaloosa', 'nAp', 'r'], ['Blooded', 'nBd', 'r'], ['Eyes', 'nEy', 'r'],
	['Glass', 'nGl', 'r'], ['Jade', 'nJa', 'r'], ['Luminescent', 'nLu', 'r'],
	['Lustrous', 'nLs', 'r'], ['Painted', 'nPn', 'r'], ['Petal', 'nPl', 'r'],
	['Vignette', 'nVi', 'r']
];
const vr_marks = [
	['Aether Marked', 'nAm', 'vr'], ['Aurora', 'nAu', 'vr'], ['Gemstone', 'nGm', 'vr'],
	['Iridescent', 'nIr', 'vr'], ['Lepir', 'nLe', 'vr'], ['Lilac', 'nLi', 'vr'],
	['Prismatic', 'nPr', 'vr'], ['Rune', 'nRu', 'vr'], ['Shimmer', 'nSh', 'vr'],
	['Triquetra', 'nTri', 'vr']
];

const mutations = ['Whiskers', 'Spined', 'Barbed', 'Fanged', 'Spiked', 'Frilled', 'Raptor', 'Tusked',
	'Feather Extensions', 'Webbed', 'Fluffed', 'Cherubian', 'Multi-Eyed', 'Sakura', 'Eel', 'Viper',
	'Icarus', 'Blazer', 'Elemental', 'Albino', 'Anery', 'Leucism', 'Abundism', 'Lunar', 'Vented', 'Prisms',
	'Aether Mane', 'Growth'
];
const rav_only_mutes = ['Maned', 'Eagle', 'Fisher', 'Finned', 'Triclops', 'Crocodile', 'Warlord', 'Vulture'];

const rad_opts = [
	['Flaxen', 'Fla'], ['Greying', 'Gr'], ['Rose', 'Ros'], ['Azure', 'Az'], ['Copper', 'Cp'],
	['Crimson', 'Cri'], ['Jade', 'Ja'], ['Lilac', 'Li'], ['Prismatic', 'Pr']
]

const skills = ['Friendly Giant', 'Hoarder', 'Adept', 'Steadfast', 'Swift Feet', 'Aether Walker',
	'Inner Fire', 'Haunting Roar', 'Healing Aura'];
const breaths = ['Fire', 'Ice', 'Shadow', 'Lightning', 'Radiation']

// Store trait arrays according to the rarity - ensure that the way rarity is write is the same as
// is written in the egg
const eyes = {
	common: ['Round Eyes', 'Slit Eyes'],
	uncommon: ['Pale Eyes', 'Pupiless Eyes'],
	rare: ['Glowing Eyes', 'Goat Eyes', 'Cuttlefish Eyes'],
	vrare: ['Omen Eyes', 'Solar Eyes', 'Eclipse Eyes']
}
const horns = {
	common: ['Hornless', 'Slender Horns', 'Nub Horns', 'Bull Horns', 'Rhino Horns', 'Ram Horns', 'Segmented Horns', 'Parasaur Horns'],
	uncommon: ['Ibex Horns', 'Ridge Horns', 'Devil Horns', 'Curled Horns', 'Crested Horns', 'Twisted Horns'],
	rare: ['Crowned Horns', 'Quilin Horns', 'Stag Horns', 'Royal Horns', 'Ascended Horns'],
	vrare: ['Eland Horns', 'Unicorn Horns', 'Fallow Horns', 'Beastly Horns', 'Aether Horns']
}
const ears = {
	common: ['Earless', 'Fox Ears', 'Hyena Ears', 'Wild Ears'],
	uncommon: ['Dragon Ears', 'Feathered Ears', 'Fluffy Ears', 'Drop Fold Ears'],
	rare: ['Tapir Ears', 'Clipped Ears', 'Button Ears', 'Silky Ears']
}
const tails = {
	common: ['Slender Tail', 'Plume Tail', 'Stub Tail', 'Curled Tail'],
	uncommon: ['Lemur Tail', 'Whip Tail', 'Split Tail', 'Wild Tail', 'Fan Tail'],
	rare: ['Peacock Tail', 'Kitsune Tail', 'Drape Tail', 'Plated Tail', 'Dragon Tail']
}

const coat_genos = {
	Umber: 'Uu/hh/oo/vv',
	Haze: 'uu/Hh/oo/vv',
	Ivory: 'uu/hh/Oo/vv',
	Vanta: 'uu/hh/oo/Vv',
	Golden: 'Uu/hh/Oo/vv',
	Melanistic_Umber: 'Uu/hh/oo/Vv',
	Melanistic_Haze: 'uu/Hh/oo/Vv',
	Melanistic_Ivory: 'uu/hh/Oo/Vv',
	Melanistic_Golden: 'Uu/hh/Oo/Vv',
}

// Inputs
var rarity_select = document.getElementById('rarity')
var species_select = document.getElementById('species')
var activity_check = document.getElementById('activity')

function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;

    return Math.floor(Math.random() * (max - min + 1)) + min;}

// Global variables for easy access
var type;
var species; // will be overidden if 'isActivity' is true
var isActivity;
var uc_max;
var r_max;
var hasLineage = '???';
var isTwin = false;

function rollEgg(){
	// Overwrite with current values before rolling
	type = rarity_select.value;
	species = species_select.value;
	isActivity = activity_check.checked;
	var egg_table;
	if (type == "common") { egg_table = common_egg; }
	else if (type == "uncommon") { egg_table = uncommon_egg; }
	else if (type == "rare") { egg_table = rare_egg; }
	else if (type == "myst") { egg_table = myst_egg; }
	hasLineage = getRollResult(egg_table.lineage)

	if (isActivity) {
		// Override the values with the activity variant
		species = getRollResult(egg_table.act_species);
		hasLineage = getRollResult(egg_table.act_lineage);
	}
	uc_max = egg_table.uc_max;
	r_max = egg_table.r_max;
	
	var dragon_one = rollDragon(egg_table);
	var result = ""
	result += formatDragon(dragon_one, 1);

	isTwin = getRollResult(egg_table.twins);
	
	if(isTwin != 'no_twins') {
		result += "<br>"
		var dragon_two;
		dragon_two = rollDragon(egg_table);
		if(isTwin == 'identical'){
			dragon_two.base = dragon_one.base
			dragon_two.main_marks = dragon_one.main_marks.slice();
		}
		result += formatDragon(dragon_two, 2)
	}

	result += "<br>"
	if(isTwin != 'no_twins'){ result += "These dragons will receive lineage."; }
	else if(hasLineage == 'yes') { result += "This dragon will receive lineage."}
	else { result += "This dragon is first generation."; }

	document.getElementById("result").innerHTML = result;
}

function rollDragon(egg_table) {
	// Object that will be returned at the end of function
	var dragon = {
		main_marks: [],
		chim_marks: [],
		traits: [],
		gender: '???',
		temper: '???',
		build: '???',
		base: '???',
		chim_coat: '???',
		radiance_geno: '',
		mutation: '???',
		skill: '???',
		breath: '???',
		num_uncommon: 0,
		num_rare: 0
	}
	
	dragon.temper = getRollResult(egg_table.temper)

	dragon.base = getRollResult(egg_table.base)

	dragon.coat = getRollResult(egg_table.coat)

	dragon.gender = rand(1, 2) == 1 ? 'Male' : 'Female'

	// Used to track if minimum 1 UC mark is achieved
	var hasUCMark = false;

	dragon.main_marks = rollMarkings(egg_table)
	
	// Determine mutations
	dragon.mutation = getRollResult(egg_table.mutations)
	if(dragon.mutation == 'yes') {
		var mute_pool = mutations.slice();
		// If Ravager, add rav_only_mutes to the pool
		if (species == 'Ravager Wyvern') { mute_pool.concat(rav_only_mutes.slice()); }
		dragon.mutation = getRandArrayElement(mute_pool);
	} else if(dragon.mutation == 'Radiance') {
		var rad = getRandArrayElement(rad_opts);
		dragon.mutation = 'Radiant ' + rad[0];
		dragon.radiance_geno = 'nRad-' + rad[1];
	} else if (dragon.mutation == 'Chimera') {
		dragon.chim_marks = rollMarkings(egg_table)
		dragon.chim_coat = getRollResult(egg_table.base)
	}

	// Roll skill
	dragon.skill = getRollResult(egg_table.skill_breath);
	if (dragon.skill == 'yes') {
		dragon.skill = getRandArrayElement(skills);
	}

	// Roll breath
	dragon.breath = getRollResult(egg_table.skill_breath);
	if (dragon.breath == 'yes') {
		dragon.breath = getRandArrayElement(breaths);
	}

	// Roll traits (eyes/horns/ears/tails)
	// Used to track if minimum 1 UC trait is achieved
	var hasUCTrait = false;
	// Eyes
	dragon.traits.push(rollTrait(eyes))
	// Horns
	dragon.traits.push(rollTrait(horns))
	if (species == 'Ravager Wyvern') {
		// Ears
		dragon.traits.push(rollTrait(ears, true))
		// Tail
		dragon.traits.push(rollTrait(tails, true))
	}

	// Ensure that geno has at least one UC mark
	if(!hasUCMark) {
		uc_mark = getRandArrayElement(uc_marks);
		// Replace one common mark at random
		var rand_index;
		do {
			rand_index = rand(0, dragon.main_marks.length-1);
		} while(!c_marks.includes(dragon.main_marks[rand_index]))
		dragon.main_marks[rand_index] = uc_mark;
		hasUCMark = true;
	}

	// Randomly reroll one of the traits
	// Indexed as follows: 0 = eyes, 1 = horns, 2 = ears, 3 = tails (if applicable)
	if(!hasUCTrait) {
		// Select random trait to reroll
		var index = rand(0, dragon.traits.length - 1)
		var trait_pool;
		// Replace random common trait
		do {
			if (index == 0) { trait_pool = eyes; }
			else if (index == 1) { trait_pool = horns; }
			else if (index == 2) { trait_pool = ears; }
			else if (index == 3) { trait_pool = tails; }
		} while(!trait_pool['common'].includes(dragon.traits[index]))
		dragon.traits[index] = getRandArrayElement(trait_pool['uncommon'])
		hasUCTrait = true;
	}
	
	function rollMarkings(egg_table) {
		var num_markings = rand(4, 6);
		var marks = [];
		for(let i = 0; i < num_markings; i++) {
			// Roll rarity - if exceeds max UC or max R, will reroll until it does not
			do {
				var mark_rarity = getRollResult(egg_table.markings);
			} while (hasReachedMaxUCOrR(mark_rarity))
			
			var mark_rolled = ['error??!','???'];
			// Roll actual mark - if repeated, reroll
			do {
				if(mark_rarity == 'common') { mark_rolled = getRandArrayElement(c_marks); }
				else if(mark_rarity == 'uncommon') { mark_rolled = getRandArrayElement(uc_marks); }
				else if(mark_rarity == 'rare') { mark_rolled = getRandArrayElement(r_marks); }
				else if(mark_rarity == 'vrare') { mark_rolled = getRandArrayElement(vr_marks); }
			} while (marks.includes(mark_rolled))
			
			// Update counters and bools, if necessary
			// If it's the first time UC is rolled, do not count towards max *extra*
			if (mark_rarity == 'uncommon') {
				dragon.num_uncommon += 1;
				hasUCMark = true;
			}
			// R and VR always count towards max (they are not 'extras')
			else if (mark_rarity == 'rare' || mark_rarity == 'vrare') {
				dragon.num_rare += 1;
			}
			marks.push(mark_rolled)
		}
		return marks;
	}

	// isRavOnly is a parameter that defaults to false, and does not always need to be specified
	function rollTrait(traits_table, isRavOnly=false) {
		var trait_rarity = '???'
		// Reroll rarity if the dragon alr has the max UC or R, OR vrare is rolled but its a rav only trait
		do { trait_rarity = getRollResult(egg_table.trait); }
		while (hasReachedMaxUCOrR(trait_rarity) || (isRavOnly && trait_rarity == 'vrare'));
		if(trait_rarity == 'uncommon') {
			dragon.num_uncommon += 1;
			hasUCTrait = true;
		}
		else if (trait_rarity == 'rare' || trait_rarity == 'vrare') {
			dragon.num_rare += 1;
		}
		return getRandArrayElement(traits_table[trait_rarity])
	}

	function hasReachedMaxUCOrR(rarity) {
		return ((rarity == 'uncommon' && dragon.num_uncommon >= uc_max) || 
		(rarity == 'rare' || rarity == 'vrare') && dragon.num_rare >= r_max)
	}

	return dragon;
}

function formatDragon(dragon, num) {
	var formattedMain = formatMarks(dragon.main_marks);
	var phenotype = formattedMain[0]
	var genotype = formattedMain[1]
	var addedMutation = ""
	if(dragon.mutation == 'Chimera') {
		var formattedChim = formatMarks(dragon.chim_marks);
		phenotype += ` || ${formattedChim[0]}`
		genotype += ` || ${formattedChim[1]}`
	} else if(!dragon.mutation.includes("Radiant") && dragon.mutation != 'no') {
		addedMutation = ` | ${dragon.mutation}`
	}

	var dragon_string = ""

	dragon_string += `${num}: ${dragon.gender} ${dragon.temper} ${species} | Healthy<br>`
	dragon_string += `T: ${dragon.coat} Coat, ${dragon.traits.join(", ")}${addedMutation}<br>`
	dragon_string += `G: ${genotype}<br>`
	dragon_string += `P: ${phenotype}<br>`
	if(dragon.skill != 'no'){
		dragon_string += `<i>Skill:</i> ${dragon.skill}<br>`
	}
	if(dragon.breath != 'no') {
		dragon_string += `<b>Breath:</b> ${dragon.breath}<br>`
	}
	
	return dragon_string

	function formatMarks(marks) {
		var p = "";

		// Sort by grouping: vr - r - ed - mela - colors - coat - suffixes
		var vr_group = [];
		var r_group = [];
		var ed_group = [];
		var colors = [];
		var suffixes = [];
		for (let i = 0; i < marks.length; i++) {
			mark = marks[i]
			if(mark[2] == 'vr') { vr_group.push(marks[i][0]); }
			else if(mark[2] == 'r') { r_group.push(marks[i][0]); }
			else if(mark[2] == 'ed') { ed_group.push(marks[i][0]); }
			else if(mark[2] == 'color') { colors.push(marks[i][0]); }
			else if(mark[2] == 'suffix') { suffixes.push(marks[i][0]); }
		}
		console.log(vr_group)

		// Then by rarity: c - uc, followed by alphabetical asc
		vr_group.sort();
		r_group.sort();
		ed_group.sort(function(a,b) {
			if(getMarkRarity(a) < getMarkRarity(b)) { return -1; }
			if(getMarkRarity(a) > getMarkRarity(b)) { return 1; }
			return a.toString().localeCompare(b.toString());
		});
		colors.sort(function(a,b) {
			if(getMarkRarity(a) < getMarkRarity(b)) { return -1; }
			if(getMarkRarity(a) > getMarkRarity(b)) { return 1; }
			return a.toString().localeCompare(b.toString());
		});
		suffixes.sort(function(a,b) {
			if(getMarkRarity(a) < getMarkRarity(b)) { return -1; }
			if(getMarkRarity(a) > getMarkRarity(b)) { return 1; }
			return a.toString().localeCompare(b.toString());
		});
	
		// Add vr, if applicable
		if(vr_group.length > 0) {
			p += vr_group.join(", ");
		}
		// Add r, if applicable
		if(r_group.length > 0) {
			// If p is not an empty string, add a separator
			if(p) { p += ", "; }
			p += r_group.join(", ");
		}
		// Add ed_group...
		if(ed_group.length > 0) {
			if(p) { p += ", "; }
			p += ed_group.join(", ");
		}
		// Add mela...
		var independent_coat = dragon.base
		if (independent_coat.includes("Melanistic")) {
			if(p) { p += ", "; }
			p += "Melanistic";
			independent_coat = independent_coat.replace("Melanistic ", "");
		}
		// Add colors...
		if(colors.length > 0) {
			if(p.includes("Melanistic")) { p += " "; }
			else if(p) { p += ", "}
			p += colors.join(", ");
		}
		// Add base
		if(p) { p += " "; }
		p += independent_coat
		if(suffixes.length > 0){
			p += " with ";
			if(suffixes.length == 1) {
				p += suffixes[0];
			} else if(dragon.radiance_geno) {
				p += suffixes.join(", ");
				p += " and " + dragon.mutation;
			} else {
				var last_suffix = suffixes.splice(-1);
				p += suffixes.join(", ");
				p += " and " + last_suffix;
			}
		}
		
		var geno = [];
		for (let i = 0; i < marks.length; i++){
			geno.push(marks[i][1]);
		}
		
		var g = coat_genos[dragon.base.replace(" ", "_")] + "+";

		geno.sort(function(a,b){
			if(getMarkRarity(a) < getMarkRarity(b)) { return -1; }
			if(getMarkRarity(a) > getMarkRarity(b)) { return 1; }
			return a.toString().localeCompare(b.toString());
		});

		if(dragon.radiance_geno) {
			geno.push(dragon.radiance_geno);
		}

		g += geno.join("/");

		return [p, g]
	}
}

function getMarkRarity(mark){
	// Nested ternary operators that go through each array of marks to assign a ranking value
	return (hasMark(c_marks, mark) ? 1 :
		hasMark(uc_marks, mark) ? 2 :
		hasMark(r_marks, mark) ? 3 :
		hasMark(vr_marks, mark) ? 4 : -1
	)
}

function hasMark(marks_list, mark){
	for (let i = 0; i < marks_list.length; i++) {
		if(marks_list[i][0] == mark || marks_list[i][1] == mark) { return true; }
	}
	return false;
}

function roll() {
	document.getElementById("result").innerHTML = "";
	rollEgg();
}

function clearForms() {
	document.getElementById("result").innerHTML = "";
}

// Roll a result from a provided object of values
function getRollResult(roll_table) {
	table_keys = Object.keys(roll_table);
	total_chance = 0;
	for(let i = 0; i < table_keys.length; i++) { total_chance += roll_table[table_keys[i]]; }
	var rand_num = rand(1, total_chance);
	for(let i = 0; i < table_keys.length; i++) {
		if(rand_num <= roll_table[table_keys[i]]) { return table_keys[i]; }
		else { rand_num -= roll_table[table_keys[i]]; }
	}
	return "error!!?"
}

function getRandArrayElement(array) {
	return array[rand(0, array.length - 1)]
}

// JavaScript Document