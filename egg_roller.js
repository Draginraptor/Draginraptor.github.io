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

// Arrays of marking arrays in the format ['pheno', 'geno' ]
const c_marks = [
	['Blanket', 'nBl'], ['Boar', 'nBr'], ['Collar', 'nCl'], ['Dunstripe', 'nDn'], ['Duo Tone', 'nDo'],
	['Dusted', 'nDt'], ['Fading', 'nFd'], ['Flaxen', 'nFla'], ['Frog Eye', 'nFe'], ['Greying', 'nGr'],
	['Hood', 'nHd'], ['Leaf', 'nLf'], ['Masked', 'nMa'], ['Pangare', 'nPa'], ['Points', 'nPo'],
	['Python', 'nPy'], ['Ray', 'nRa'], ['Rimmed', 'nRi'], ['Ringed', 'nRn'], ['Rose', 'nRos'],
	['Sable', 'nSa'], ['Scaled', 'nSc'], ['Scorching', 'nSo'], ['Skink', 'nSk'], ['Trailing', 'nTr'],
	['Underbelly', 'nUn']
];
const uc_marks = [
	['Azure', 'nAz'], ['Banded', 'nBa'], ['Bokeh', 'nBk'], ['Border', 'nBo'], ['Cloud', 'nCd'],
	['Copper', 'nCp'], ['Crested', 'nCr'], ['Crimson', 'nCri'], ['Dipped', 'nDi'], ['Dripping', 'nDr'],
	['Inkwell', 'nIn'], ['Marbled', 'nMar'], ['Merle', 'nMr'], ['Metallic', 'nMe'], ['Mist', 'nMi'],
	['Pigeon', 'nPg'], ['Plasma', 'nPs'], ['Roan', 'nRo'], ['Rosettes', 'nRs'], ['Shaped', 'nSp'],
	['Smoke', 'nSm'], ['Somatic', 'nSt'], ['Tabby', 'nTa'], ['Tobiano', 'nTo'], ['Toxin', 'nTx']
];
const r_marks = [
	['Appaloosa', 'nAp'], ['Blooded', 'nBd'], ['Eyes', 'nEy'], ['Glass', 'nGl'], ['Jade', 'nJa'],
	['Luminescent', 'nLu'], ['Lustrous', 'nLs'], ['Painted', 'nPn'], ['Petal', 'nPl'], ['Vignette', 'nVi']
];
const vr_marks = [
	['Aether Marked', 'nAm'], ['Aurora', 'nAu'], ['Gemstone', 'nGm'], ['Iridescent', 'nIr'],
	['Lepir', 'nLe'], ['Lilac', 'nLi'], ['Prismatic', 'nPr'], ['Rune', 'nRu'], ['Shimmer', 'nSh'],
	['Triquetra', 'nTri']
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

// Used to broadly determine how marks are ordered by group
const ed_marks = [
	'Dusted', 'Masked', 'Rimmed', 'Ringed', 'Scaled', 'Banded', 'Crested', 'Dipped', 'Marbled', 'Shaped'
];

const color_marks = [
	'Greying', 'Rose', 'Azure', 'Copper', 'Crimson', 'Jade', 'Lilac'
];

const suffix_marks = [
	'Blanket', 'Boar', 'Collar', 'Dunstripe', 'Duo Tone', 'Fading', 'Flaxen', 'Frog Eye', 'Hood', 'Leaf', 'Pangare',
	'Points', 'Python', 'Ray', 'Sable', 'Scorching', 'Skink', 'Trailing', 'Underbelly', 'Bokeh', 'Border',
	'Cloud', 'Dripping', 'Inkwell', 'Merle', 'Metallic', 'Mist', 'Pigeon', 'Plasma', 'Roan', 'Rosettes',
	'Smoke', 'Somatic', 'Tabby', 'Tobiano', 'Toxin'
];

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
	if(hasLineage == 'yes'){ result += "This dragon will receive lineage."; }
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
		skill_breath: '???',
		num_uncommon: 0,
		num_rare: 0
	}
	
	dragon.temper = getRollResult(egg_table.temper)

	dragon.base = getRollResult(egg_table.base)

	dragon.coat = getRollResult(egg_table.coat)

	dragon.gender = rand(1, 2) == 1 ? 'Male' : 'Female'

	// Used to track if minimum 1 UC mark is achieved
	var hasUCOrBetterMark = false;

	dragon.main_marks = rollMarkings(egg_table)

	// Ensure that geno has at least one UC mark
	if(!hasUCOrBetterMark) {
		do {
			var mark_rarity = getRollResult(egg_table.markings);
		} while(mark_rarity == 'common') // ensure that UC or above is rolled

		var mark_rolled = ['error??!','???'];
		if(mark_rarity == 'uncommon') { mark_rolled = getRandArrayElement(uc_marks); }
		else if(mark_rarity == 'rare') { mark_rolled = getRandArrayElement(r_marks); }
		else if(mark_rarity == 'vrare') { mark_rolled = getRandArrayElement(vr_marks); }

		// Replace one prev mark at random
		dragon.main_marks[rand(0, dragon.main_marks.length-1)] = mark_rolled;
		hasUCOrBetterMark = true
		if (mark_rarity == 'uncommon') { dragon.num_uncommon += 1; }
		else if (mark_rarity == 'rare' || mark_rarity == 'vrare') { dragon.num_rare += 1; }
	}
	
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

	// Roll skills/breath
	dragon.skill_breath = getRollResult(egg_table.skill_breath);
	if (dragon.skill_breath == 'yes') {
		skill_breath_pool = skills.slice().concat(breaths.slice());
		dragon.skill_breath = getRandArrayElement(skill_breath_pool);
	}

	// Roll traits (eyes/horns/ears/tails)
	// Used to track if minimum 1 UC trait is achieved
	var hasUCOrBetterTrait = false;
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

	// Randomly reroll one of the traits
	// Indexed as follows: 0 = eyes, 1 = horns, 2 = ears, 3 = tails (if applicable)
	if(!hasUCOrBetterTrait) {
		// Select random trait to reroll
		var index = rand(0, dragon.traits.length - 1)
		var trait_pool;
		if (index == 0) { trait_pool = eyes; }
		else if (index == 1) { trait_pool = horns; }
		else if (index == 2) { trait_pool = ears; }
		else if (index == 3) { trait_pool = tails; }
		while(!hasUCOrBetterTrait) {
			dragon.traits[index] = rollTrait(trait_pool, species == 'Ravager Wyvern')
		}
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
				if(hasUCOrBetterMark) { dragon.num_uncommon += 1; }
				else { hasUCOrBetterMark = true; }
			}
			// R and VR always count towards max (they are not 'extras')
			else if (mark_rarity == 'rare' || mark_rarity == 'vrare') {
				dragon.num_rare += 1;
				hasUCOrBetterMark = true;
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
			if(hasUCOrBetterTrait) { dragon.num_uncommon += 1; }
			else { hasUCOrBetterTrait = true; }
		}
		else if (trait_rarity == 'rare' || trait_rarity == 'vrare') {
			dragon.num_rare += 1;
			hasUCOrBetterTrait = true;
		}
		return getRandArrayElement(traits_table)
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
	if(dragon.skill_breath){
		if(breaths.includes(dragon.skill_breath)) { dragon_string += `<b>Breath:</b> ${dragon.skill_breath}<br>` }
		if(skills.includes(dragon.skill_breath)){ dragon_string += `<i>Skill:</i> ${dragon.skill_breath}<br>` }
	}
	
	return dragon_string

	function formatMarks(marks) {
		var pheno = [];
		var geno = [];
		for (let i = 0; i < marks.length; i++){
			pheno.push(marks[i][0]);
			geno.push(marks[i][1]);
		}
		var independent_coat = dragon.base
		if(independent_coat.includes("Melanistic")) {
			pheno.push("Melanistic");
			independent_coat = independent_coat.replace("Melanistic ", "")
		}
		pheno.push(independent_coat)
		
		
		// Sort by grouping: vr - r - ed - mela - colors - coat - suffixes
		var vr_group = [];
		var r_group = [];
		var ed_group = [];
		var colors = [];
		var suffixes = [];
		
		for (let i = 0; i < pheno.length; i++) {
			if(vr_marks.includes(pheno[i])) { vr_group.push(pheno[i]); }
			else if(r_marks.includes(pheno[i])) { r_marks.push(pheno[i]); }
			else if(ed_marks.includes(pheno[i])) { ed_group.push(pheno[i]); }
			else if(color_marks.includes(pheno[i])) { colors.push(pheno[i]); }
			else if(suffix_marks.includes(pheno[i])) { suffixes.push(pheno[i]); }
		}

		// Then by rarity: c - uc, followed by alphabetical asc
		vr_marks.sort();
		r_marks.sort();
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
	
		var p = "";
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