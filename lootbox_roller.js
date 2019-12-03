var type = document.getElementById('chest');

function rand(min, max) {
    var min = min || 0,
        max = max || Number.MAX_SAFE_INTEGER;

    return Math.floor(Math.random() * (max - min + 1)) + min;}

function items(){
	var lootSize;
    var itemlist="";
    var loot_table;
    var fishing_loot = {
		":thumb737120461:": 5,
		":thumb737120468:": 5,
		":thumb740288139:": 5,
		":thumb740287494:": 5,
		"1,000x :thumb726629426:": 2,
		"Whale Bone": 2,
		"Basket": 2,
		":thumb759849707:": 2,
		":thumb742773107:": 6,
		":thumb748710559:": 1,
		"Soul Twine": 1,
		":thumb770775999:": 1
	}

	var foraging_loot = {
		":thumb735244046:": 5,
		":thumb772029592:": 5,
		":thumb735744797:": 5,
		":thumb735459915:": 2,
		":thumb736073464:": 2,
		":thumb740288268:": 6,
		":thumb742773107:": 5,
		":thumb740288139:": 5,
		":thumb741645024:": 5,
		":thumb735957948:": 2,
		":thumb730226090:": 3,
		"1,000x :thumb726629426:": 2,
		":thumb721662350:": 2,
		"Herbs": 6,
		":thumb730043272:": 1,
		":thumb730076789:": 1,
		"Ruby": 1,
		"Sapphire": 1,
		":thumb759849707:": 6,
		"Basket": 1,
		":thumb719065940:": 5,
		":thumb748710559:": 1,
		"Soul Twine": 1,
		":thumb770776012:": 1,
		":thumb749173192:": 1,
		":thumb757512912:": 2
	}

	var hunting_loot = {
		":thumb738530697:": 5,
		":thumb738530711:": 5,
		":thumb740288268:": 5,
		":thumb740288113:": 2,
		":thumb747886136:": 2,
		":thumb741645024:": 5,
		"1,000x :thumb726629426:": 2,
		":thumb719959474:": 1,
		":thumb740288139:": 3,
		":thumb759849707:": 3,
		"Deer Pelt": 5,
		":thumb759570674:": 5,
		":thumb721662350:": 3,
		":thumb757512912:": 2,
		":thumb742773107:": 6,
		":thumb719959487:": 1,
		":thumb749173192:": 1
	}

	var prem_loot = {
		":thumb800544749:": 5,// Cooler
		":thumb719959474:": 5, // Barrel
		":thumb800427385:": 5, // Basket
		":thumb793887487:": 3, // Soul Twine
		":thumb749173192:": 5, // Blueprints
		":thumb740294782:": 10, // Essence of Ice
		":thumb740294733:": 10, // Essence of Fire
		":thumb740294768:": 10, // Essence of Shadow
		":thumb740294756:": 10, // Essence of Rad
		":thumb740294739:": 10, // Essence of Light
		"1000 :thumb726629426:": 5, // x1000 Crystals
		":thumb718012647:": 5, // Diminished coin
		":thumb718012663:": 3, // Weathered Coin
		":thumb718012642:": 2, // Brilliant Coin
		":thumb718012655:": 1, // Pristine Coin
		"Market Background Voucher": 2, // Market Bg
		"Emporium Background Voucher": 1, // Emporium Bg
		":thumb724406005:": 3, // Ice Tonic
		":thumb725107625:": 3, // Fire tonic
		":thumb724785200:": 2, // Lightning Tonic
		":thumb725390953:": 2, // Shadow Tonic
		":thumb725559209:": 1, // Radiation Tonic
		":thumb719445773:": 2, // Common Egg
		":thumb719445813:": 1, // Uncommon Egg
		":thumb784959012:": 5, // Common Rad
		":thumb784959026:": 3, // Uncommon Rad
		":thumb770775999:": 10, // Fisher Skill Charm
		":thumb770776012:": 10, // Forager skill
		":thumb719959487:": 10, // Hunter Skill
		"Cracked Crystalline Armor": 1, // Cracked Crys
		"Cracked Leather Armor": 2, // Cracked Leather
		"Cracked Iron Armor": 2, // Cracked Iron
		":thumb752525758:": 2, //Crim HumGrif
		":thumb752525748:": 2, //Jade Humgriff
		":thumb750965631:": 1, //Rad Serpent
		":thumb750965608:": 1, //Shim Serpent
		":thumb737893728:": 1, //Sea Otter
		":thumb737893705:": 1, //Albino Otter
		":thumb737893718:": 2, //River Otter
		":thumb819546598:": 2, //Eternal Flame
		":thumb786863753:": 4, //Dragon's Instinct
		":thumb786863764:": 5, //Skill Charm
		":thumb772029592:": 5, //Geode
		":thumb750121063:": 5, //Thread Spool
		":thumb753647382:": 5, //Inkwell
		":thumb743377537:": 3, //Beef Stew
		":thumb743377529:": 2, //Dragon roll Sushi
		":thumb743369403:": 5, //Magic Reverse
		":thumb740288322:": 4, //Pearl Necklace
		":thumb724405996:": 1, // Aether Bag
		":thumb776585035:": 5, //Bottle of Umber
		":thumb793887476:": 5, //Bottleof Haze
		":thumb776585030:": 3, //bottle of Ivory
		":thumb775469639:": 1, //Bottle of Vanta
		":thumb736618795:": 2, //Fertility Potion
		":thumb741646032:": 2, //Dragon's Heart
		":thumb738428726:": 2, //Dragon's Talon
		"Aether Token": 2, //Aether Token
		":thumb740291304:": 4, //Goblet of Fire
		":thumb740291286:": 4, //Goblet of Ice
		":thumb740291313:": 3, //Goblet of Lightning
		":thumb740293173:": 3, //Goblet of Shadow
		":thumb740291296:": 1, //Goblet of Rad
		":thumb759851625:": 1, //Dragons Blood
		":thumb786863759:": 1, //Dragons Tears
		"x500 :thumb726629426:": 5, //500 Crystals
		"Cracked Everlasting Armor": 1, //Cracked Everlasting Armor
		":thumb737230512:": 1 //Gender Potion
	}

	var myst_loot = {
		":thumb773160338:": 1,
		"Aether Imbued Leather": 1,
		":thumb775469628:": 1,
		":thumb745255131:": 1,
		":thumb775469622:": 1,
		":thumb736005672:": 1,
		":thumb775469628:": 1,
		":thumb743472569:": 1,
		"500x :thumb726629426:": 7,
		"Common Radiance Bond": 2,
		"Uncommon Radiance Bond": 2,
		":thumb737230512:": 4,
		"Skill Charm": 1,
		"Dragon's Instinct": 3,
		":thumb736618795:": 3,
		":thumb776585035:": 1,
		":thumb741646043:": 1,
		"Aether Token": 1,
		":thumb721661409:": 1,
		":thumb776585030:": 3,
		":thumb738428726:": 3,
		":thumb775469639:": 1,
		":thumb738532613:": 7,
		":thumb738532628:": 8,
		":thumb721663178:": 5,
		":thumb747886115:": 5,
		":thumb719445773:": 1,
		":thumb718012647:": 1,
		":thumb718012663:": 1,
		":thumb718012642:": 1,
		":thumb725107625:": 1,
		":thumb724406005:": 1,
		":thumb725390953:": 1,
		":thumb724785200:": 1,
		":thumb725559209:": 1,
		":thumb730043272:": 6,
		":thumb730076789:": 5,
		"Ruby": 10,
		"Sapphire": 5,
		":thumb757512912:": 5,
		":thumb721662350:": 5,
		":thumb741645034:": 3,
		":thumb719445829:": 1,
		"Soul Twine": 6,
		":thumb740294733:": 2,
		":thumb740294782:": 2,
		":thumb740294768:": 1,
		":thumb740294739:": 1,
		":thumb740294756:": 1,
		":thumb759851625:": 1,
		":thumb770611039:": 1,
		"Bottle of Haze": 2,
		":thumb764976017:": 1,
		":thumb764975838:": 1,
		":thumb764975738:": 1,
		":thumb760612626:": 1,
		":thumb760612576:": 1,
		":thumb772903641:": 1
	}

	
	if (type.value == "fishing"){lootSize = rand(1,3);}
	else if (type.value == "foraging"){lootSize = rand(1,3);}
	else if (type.value == "hunting"){lootSize = rand(1,3);}
	else if (type.value == "prem"){lootSize = rand(2,5);}
	else if (type.value == "myst"){lootSize = rand(2,5);}
	else {itemlist += "error???!? time to panic";}
    
    function rollItems(){
        if (type.value == "fishing") { loot_table = fishing_loot; }
        else if (type.value == "foraging") { loot_table = foraging_loot; }
        else if (type.value == "hunting") { loot_table = hunting_loot; }
        else if (type.value == "prem") { loot_table = prem_loot; }
        else if (type.value == "myst") { loot_table = myst_loot; }
        try {
            loot_array = []
            loot_keys = Object.keys(loot_table)
            for (let k = 0; k < loot_keys.length; k++){
                var key = loot_keys[k]
                for (let i = 0; i < loot_table[key]; i++) {
                    loot_array.push(key);
                }
            }
            console.log(`Chest type: ${type.value}, Total chance range: ${loot_array.length}`);
            var rand_num = rand(0,loot_array.length-1);
            console.log(rand_num)
            itemlist += loot_array[rand_num];
        } catch (err) {
            itemlist += "error??!!";
        }
    }
	
	for (var m = 0; m < lootSize; m++) {
	    itemlist += "<br>";
		rollItems();
	}

	document.getElementById("result").innerHTML += "The chest opens to reveal: <br>" + itemlist + "<br><br><i>Items have been added to your hoard.</i>";
    //console.log("The chest opens to reveal: <br>" + itemlist + "<br><br><i>Items have been added to your hoard.</i>");
}

function roll() {
	document.getElementById("result").innerHTML = "";
	items(); 
}

function clearForms() {
	document.getElementById("result").innerHTML = "";
}

// JavaScript Document