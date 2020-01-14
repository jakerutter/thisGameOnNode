//This page will hold the data and information regarding the various troop units

function populateTroopDetailModal(name){
    var time = "troopModal";
    //hide inGame button show preGame button
    document.getElementById("inGameTroopDetailButton").classList.add("hidden");
    document.getElementById("preGameTroopDetailButton").classList.remove("hidden");
    showTroopSelected();
    hideTroopModal(false);
    var color = document.getElementById('playerColorSelection').innerHTML;

    if ((name.id == "scout") || (name == "Scout")) {
        populateScout(name, color, time);
    }
    if ((name.id == "depthCharge") || (name == "DepthCharge")) {
        populateDepthCharge(name, color, time);
    }
    if ((name.id == "destroyer") || (name == "Destroyer")) {
        populateDestroyer(name, color, time);
    }
    if ((name.id == "swarm") || (name == "Swarm")) {
        populateSwarm(name, color, time);
    }
    if ((name.id == "scan") || (name == "Scan")) {
        populateScan(name, color, time);
    }
    if ((name.id == "ruskie") || (name == "Ruskie")) {
        populateRuskie(name, color, time);
    }
    if ((name.id == "gremlin") || (name == "Gremlin")) {
        populateGremlin(name, color, time);
    }
    if ((name.id == "pirate") || (name == "Pirate")) {
        populatePirate(name, color, time);
    }
    if ((name.id == "bombardier") || (name == "Bombardier")) {
        populateBombardier(name, color, time);
    }
    if ((name.id == "blind") || (name == "Blind")) {
        populateBlind(name, color, time);
    }
}

function populateTroopDetailModalInGame(name){
    var time = "inGame";
    //hide the return to troop selection modal, show the return to game button
    document.getElementById("inGameTroopDetailButton").classList.remove("hidden");
    document.getElementById("preGameTroopDetailButton").classList.add("hidden");

    var color = document.getElementById('playerColorSelection').innerHTML;

    name = name.toLowerCase();
    if (name == "scout") {
        populateScout(name, color, time);
    }
    if (name == "depthCharge") {
        populateDepthCharge(name, color, time);
    }
    if ((name.id == "destroyer") || (name == "destroyer")) {
        populateDestroyer(name, color, time);
    }
    if (name == "swarm") {
        populateSwarm(name, color, time);
    }
    if (name == "scan") {
        populateScan(name, color, time);
    }
    if (name == "ruskie") {
        populateRuskie(name, color, time);
    }
    if (name == "gremlin") {
        populateGremlin(name, color, time);
    }
    if (name == "pirate") {
        populatePirate(name, color, time);
    }
    if (name == "bombardier") {
        populateBombardier(name, color, time);
    }
}

function populateScout(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Scout";
    var scoutStats = createScout();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ scoutStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + scoutStats.Visibility + "</li>" +
    "<li>Movement Distance: " + scoutStats.MovementDistance + "</li>" +
    "<li>Health Points: " + scoutStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + scoutStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + scoutStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + scoutStats.AttackDamage + "</li>" +
    "<li>Unique Range: " + scoutStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + scoutStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function populateDepthCharge(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Depth Charge";
    var depthChargeStats = createDepthCharge();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ depthChargeStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + depthChargeStats.Visibility + "</li>" +
    "<li>Movement Distance: " + depthChargeStats.MovementDistance + "</li>" +
    "<li>Health Points: " + depthChargeStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + depthChargeStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + depthChargeStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + depthChargeStats.AttackDamage + "</li>" +
    "<li>Unique Range: " + depthChargeStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + depthChargeStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function populateDestroyer(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Destroyer";
    var destroyerStats = createDestroyer();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ destroyerStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + destroyerStats.Visibility + "</li>" +
    "<li>Movement Distance: " + destroyerStats.MovementDistance + "</li>" +
    "<li>Health Points: " + destroyerStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + destroyerStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + destroyerStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + destroyerStats.AttackDamage + "</li>" +
    "<li>Unique Range: " + destroyerStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + destroyerStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function populateSwarm(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Swarm";
    var swarmStats = createSwarm();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ swarmStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + swarmStats.Visibility + "</li>" +
    "<li>Movement Distance: " + swarmStats.MovementDistance + "</li>" +
    "<li>Health Points: " + swarmStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + swarmStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + swarmStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + swarmStats.AttackDamage + "</li>"+
    "<li>Unique Range: " + swarmStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + swarmStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function populateScan(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Scan";
    var scanStats = createScan();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ scanStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + scanStats.Visibility + "</li>" +
    "<li>Movement Distance: " + scanStats.MovementDistance + "</li>" +
    "<li>Health Points: " + scanStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + scanStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + scanStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + scanStats.AttackDamage + "</li>" +
    "<li>Unique Range: " + scanStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + scanStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function populateRuskie(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Ruskie";
    var ruskieStats = createRuskie();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ ruskieStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + ruskieStats.Visibility + "</li>" +
    "<li>Movement Distance: " + ruskieStats.MovementDistance + "</li>" +
    "<li>Health Points: " + ruskieStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + ruskieStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + ruskieStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + ruskieStats.AttackDamage + "</li>" +
    "<li>Unique Range: " + ruskieStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + ruskieStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function populateGremlin(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Gremlin";
    var gremlinStats = createGremlin();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ gremlinStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + gremlinStats.Visibility + "</li>" +
    "<li>Movement Distance: " + gremlinStats.MovementDistance + "</li>" +
    "<li>Health Points: " + gremlinStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + gremlinStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + gremlinStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + gremlinStats.AttackDamage + "</li>" +
    "<li>Unique Range: " + gremlinStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + gremlinStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function getUnitPictureSrc(name, color){
    return "Assets/"+name+color+".png";
}
function populatePirate(name, color, time) {
    var name = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(name.id, color);

    document.getElementById('troopNameHeader').innerHTML = "Pirate";
    var pirateStats = createPirate();

    document.getElementById('troopPic').src = pictureSrc;
    document.getElementById('troopPic').style.height = '60px';
    document.getElementById('troopPic').style.width = '40px';
    document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ pirateStats.PerceivedValue +"</li>" +
    "<li>Visibility: " + pirateStats.Visibility + "</li>" +
    "<li>Movement Distance: " + pirateStats.MovementDistance + "</li>" +
    "<li>Health Points: " + pirateStats.HealthPoints + "</li>" +
    "<li>Area of Attack: " + pirateStats.AreaOfAttack + "</li>" +
    "<li>Attack Range: " + pirateStats.AttackRange + "</li>" +
    "<li>Attack Damage: " + pirateStats.AttackDamage + "</li>" +
    "<li>Unique Range: " + pirateStats.UniqueRange + "</li>";

    document.getElementById('troopMoveList').innerHTML = "Unique Move: " + pirateStats.Moves + "</li>";
    document.getElementById('troopDetailModal').classList.add('table');
    document.getElementById('troopDetailModal').classList.remove('hidden');
    $("#troopDetailModal").modal();
}

function populateBombardier(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "Bombardier";
    var bombardierStats = createBombardier();

        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px';
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ bombardierStats.PerceivedValue +"</li>" +
        "<li>Visibility: " + bombardierStats.Visibility + "</li>" +
        "<li>Movement Distance: " + bombardierStats.MovementDistance + "</li>" +
        "<li>Health Points: " + bombardierStats.HealthPoints + "</li>" +
        "<li>Area of Attack: " + bombardierStats.AreaOfAttack + "</li>" +
        "<li>Attack Range: " + bombardierStats.AttackRange + "</li>" +
        "<li>Attack Damage: " + bombardierStats.AttackDamage + "</li>" +
        "<li>Unique Range: " + bombardierStats.UniqueRange + "</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + bombardierStats.Moves + "</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
}

function populateBlind(name, color, time) {
    var picName = time === "inGame" ? name : name.id;
    var pictureSrc = getUnitPictureSrc(picName, color);

    document.getElementById('troopNameHeader').innerHTML = "blind";
    var blindStats = createBlind();

        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px';
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ blindStats.PerceivedValue +"</li>" +
        "<li>Visibility: " + blindStats.Visibility + "</li>" +
        "<li>Movement Distance: " + blindStats.MovementDistance + "</li>" +
        "<li>Health Points: " + blindStats.HealthPoints + "</li>" +
        "<li>Area of Attack: " + blindStats.AreaOfAttack + "</li>" +
        "<li>Attack Range: " + blindStats.AttackRange + "</li>" +
        "<li>Attack Damage: " + blindStats.AttackDamage + "</li>" +
        "<li>Unique Range: " + blindStats.UniqueRange + "</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + blindStats.Moves + "</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
}

//These determine which troops are selected and populates returns array of troopObj (called troopArray) for gameObject
function getTroopObjects(playerTroopSelection) {
    var troopArray = [];
    playerTroopSelection = playerTroopSelection.toString();
    var troopList = playerTroopSelection.split(",");

    for(let i=0; i<troopList.length; i++){
        var troopObj = createTroopObject(troopList[i]);
        troopArray.push(troopObj);
    }
    return troopArray;
}

function createTroopObject(name) {
    if (name == "scout") {
        var Scout = createScout();
        return Scout;
    }
    if (name == "depthCharge") {
        var DepthCharge = createDepthCharge();
        return DepthCharge;
    }
    if (name == "destroyer") {
        var Destroyer = createDestroyer();
        return Destroyer;
    }
    if (name == "swarm") {
        var Swarm = createSwarm();
        return Swarm;
    }
    if (name == "scan") {
        var Scan = createScan();
        return Scan;
    }
    if (name == "ruskie") {
        var Ruskie = createRuskie();
        return Ruskie;
    }
    if (name == "gremlin") {
        var Gremlin = createGremlin();
        return Gremlin;
    }
    if (name == "pirate") {
        var Pirate = createPirate();
        return Pirate;
    }
    if (name == "bombardier"){
        var Bombardier = createBombardier();
        return Bombardier;
    }
    if (name == "blind"){
        var Blind = createBlind();
        return Blind;
    }
}

function createScout() {
    var Scout = {
        Name: "Scout",
        Loc: "tbd",
        Visibility:  5,
        MovementDistance:  5,
        HealthPoints: 35,
        MaxHealth: 35,
        Moves: "No Special Moves",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 1,
        AttackDamage: 15,
        AttackRange: 2,
        UniqueRange: 0,
        UniqueAOA: 0,
        UniqueDamage: 0,
        UniqueStun: 0,
        PerceivedValue: 2
    };
    return Scout;
}

function createDepthCharge() {
    var DepthCharge = {
        Name: "DepthCharge",
        Loc: "tbd",
        Visibility:  1,
        MovementDistance:  1,
        HealthPoints: 60,
        MaxHealth: 60,
        Moves: "Stun: Reveals 3x3 square. Stuns units for 2 rounds.",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 0,
        AttackDamage: 0,
        AttackRange: 0,
        UniqueRange: 10,
        UniqueAOA: 1,
        UniqueDamage: 0,
        UniqueStun: 2,
        UniqueName: "DepthCharge",
        PerceivedValue: 2
    };
    return DepthCharge;
}

function createDestroyer() {
    var Destroyer = {
        Name: "Destroyer",
        Loc: "tbd",
        Visibility:  2,
        MovementDistance:  2,
        HealthPoints: 100,
        MaxHealth: 100,
        Moves: "No Special Moves",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 1,
        AttackDamage: 40,
        AttackRange: 2,
        UniqueRange: 0,
        UniqueAOA: 0,
        UniqueDamage: 0,
        UniqueStun: 0,
        PerceivedValue: 5
    };
    return Destroyer;
}

function createSwarm() {
    var Swarm = {
        Name: "Swarm",
        Loc: "tbd",
        Visibility:  2,
        MovementDistance:  2,
        HealthPoints: 128,
        MaxHealth: 128,
        Moves: "Swarm: 20 damage to any unit hit and reveals the tiles covered.",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 0,
        AttackDamage: 20,
        AttackRange: 1,
        UniqueRange: 1,
        UniqueAOA: 1,
        UniqueDamage: 20,
        UniqueStun: 0,
        UniqueName: "Swarm",
        PerceivedValue: 5
    };
    return Swarm;
}

function createScan() {
    var Scan = {
        Name: "Scan",
        Loc: "tbd",
        Visibility:  1,
        MovementDistance:  1,
        HealthPoints: 30,
        MaxHealth: 30,
        Moves: "Scan: reveals a 5x5 area up to 15 tiles away.",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 0,
        AttackDamage: 0,
        AttackRange: 0,
        UniqueRange: 15,
        UniqueAOA: 2,
        UniqueDamage: 0,
        UniqueStun: 0,
        UniqueName: "Scan",
        PerceivedValue: 3
    };
    return Scan;
}

function createRuskie() {
    var Ruskie = {
        Name: "Ruskie",
        Loc: "tbd",
        Visibility:  4,
        MovementDistance:  3,
        HealthPoints: 70,
        MaxHealth: 70,
        Moves: "No Special Moves.",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 1,
        AttackDamage: 25,
        AttackRange: 3,
        UniqueRange: 0,
        UniqueAOA: 0,
        UniqueDamage: 0,
        UniqueStun: 0,
        PerceivedValue: 3
    };
    return Ruskie;
}

function createGremlin() {
    var Gremlin = {
        Name: "Gremlin",
        Loc: "tbd",
        Visibility:  3,
        MovementDistance:  3,
        HealthPoints: 90,
        MaxHealth: 90,
        Moves: "No Special Moves",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 1,
        AttackDamage: 30,
        AttackRange: 3,
        UniqueRange: 0,
        UniqueAOA: 0,
        UniqueDamage: 0,
        UniqueStun: 0,
        PerceivedValue: 4
    };
    return Gremlin;
}

function createPirate() {
    var Pirate = {
        Name: "Pirate",
        Loc: "tbd",
        Visibility:  4,
        MovementDistance:  4,
        HealthPoints: 60,
        MaxHealth: 60,
        Moves: "Pilfer: send this unit to search an area. May return all sorts of useful goods!",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 1,
        AttackDamage: 20,
        AttackRange: 2,
        UniqueRange: 1,
        UniqueAOA: 1,
        UniqueDamage: 0,
        UniqueStun: 0,
        UniqueName: "Pilfer",
        PerceivedValue: 2
    };
    return Pirate;
}

function createBombardier() {
    var Bombardier = {
        Name: "Bombardier",
        Loc: "tbd",
        Visibility:  4,
        MovementDistance:  2,
        HealthPoints: 60,
        MaxHealth: 60,
        Moves: "Bomb: range attack up to 5 tiles away, attacks a 3x3 area for 25 damage.",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 1,
        AttackDamage: 25,
        AttackRange: 0,
        UniqueRange: 5,
        UniqueAOA: 2,
        UniqueDamage: 25,
        UniqueStun: 0,
        UniqueName: "Bomb",
        PerceivedValue: 4
    };
    return Bombardier;
}

function createBlind() {
    var Blind = {
        Name: "Blind",
        Loc: "tbd",
        Visibility:  3,
        MovementDistance:  3,
        HealthPoints: 40,
        MaxHealth: 40,
        Moves: "Blind: Remove all visible tiles from your opponent.",
        Cooldown: 0,
        StunDuration: 0,
        IsBlind: false,
        AreaOfAttack: 1,
        AttackDamage: 10,
        AttackRange: 3,
        UniqueRange: 20,
        UniqueAOA: 20,
        UniqueDamage: 0,
        UniqueStun: 0,
        UniqueName: "Blind",
        PerceivedValue: 2
    };
    return Blind;
}


//utility functions for troops below
function checkCoolDown() {
    var activeUnit = getStorage('activeTroop');
    var cooldown = parseInt(activeUnit.Cooldown);
    if (cooldown > 0) {
        document.getElementById("gameAlertsLarge").innerHTML = "That unit is on cooldown for "+ cooldown +" turn(s).";
        return 1;
    } else {
        document.getElementById("gameAlertsSmall").classList.remove("redText");
        return 0;
    }

}

function displayUniqueMoveTiles(activeUnit) {
    var name = activeUnit.Name;

    if (name == "DepthCharge") {
        showDepthChargeUnique(activeUnit);
    } else if (name == "Swarm") {
        showSwarmUnique(activeUnit);
    } else if (name == "Scan") {
        showScanUnique(activeUnit);
    } else if (name == "Pirate") {
        showPirateUnique(activeUnit);
    } else if (name == "Bombardier") {
        showBombardierUnique(activeUnit);
    }  else if (name == "Blind") {
        showBlindUnique(activeUnit);
    }
}

function showDepthChargeUnique(activeUnit) {
    var boundingArray = getStorage("tilesForMove");
    var coordArray = [];
    var xCoords = [];
    var yCoords = [];
    //convert all tiles within boundingArray to coords
    for (var w=0; w<boundingArray.length; w++) {
        var coords = convertIdToCoordinates(boundingArray[w]);
        var startCoords = coords.split(",");
        var xValue = Number(startCoords[0]);
        var yValue = Number(startCoords[1]);
        xCoords.push(xValue);
        yCoords.push(yValue);
        coordArray.push(coords);
        var thisDiv = document.getElementById(boundingArray[w]);
        //add mouseover function that applies the color for the unique move affected area
        $(thisDiv).on( "mouseover", function(event) {
            addColorDepthChargeUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray);
        });
    }
}

function addColorDepthChargeUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray) {
    var validUniqueTileArray = [];
    var color = getStorage("playerColor");
    var xCoords = returnArrayWithoutDuplicates(xCoords);
    var yCoords = returnArrayWithoutDuplicates(yCoords);
    var xCoordsMin = Math.min.apply(Math, xCoords);
    var xCoordsMax = Math.max.apply(Math, xCoords);
    var yCoordsMin = Math.min.apply(Math, yCoords);
    var yCoordsMax = Math.max.apply(Math, yCoords);
    var aoa = parseInt(activeUnit.UniqueAOA);
    var eventValuesForXY = document.getElementById(event.currentTarget.id).dataset.coords.split(",");
    var eventXValue = parseInt(eventValuesForXY[0]);
    var eventYValue = parseInt(eventValuesForXY[1]);

    for (var i=Math.max((eventXValue-aoa),xCoordsMin); i<Math.min((eventXValue+aoa+1),xCoordsMax+1); i++) {
        for (var j=Math.max((eventYValue-aoa),yCoordsMin); j<Math.min((eventYValue+aoa+1),yCoordsMax+1); j++) {
            var goodID = convertCoordsToId(i,j);
            validUniqueTileArray.push(goodID);
            document.getElementById(goodID).classList.add("availableForUnique"+color);
        }
    }
    var diff = $(boundingArray).not(validUniqueTileArray).get();

    for (v=0; v<diff.length; v++) {
        if (document.getElementById(diff[v]).classList.contains("availableForUnique"+color)) {
            document.getElementById(diff[v]).classList.remove("availableForUnique"+color);
        }
    }
}

function showScanUnique(activeUnit) {
    var boundingArray = getStorage("tilesForMove");
    var coordArray = [];
    var xCoords = [];
    var yCoords = [];
    //convert all tiles within boundingArray to coords
    for (var w=0; w<boundingArray.length; w++) {
        var coords = convertIdToCoordinates(boundingArray[w]);
        var startCoords = coords.split(",");
        var xValue = Number(startCoords[0]);
        var yValue = Number(startCoords[1]);
        xCoords.push(xValue);
        yCoords.push(yValue);
        coordArray.push(coords);
        var thisDiv = document.getElementById(boundingArray[w]);
       //using jquery's .on() to add eventlisteners so that I can later us .off() to turn them off
        $(thisDiv).on("mouseover", function(event) {
            addColorScanUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray);
        });

    }
}

function addColorScanUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray) {
    //apply and remove unique styling to tiles as mouse icon moves around
    var validUniqueTileArray = [];
    var color = getStorage("playerColor");
    var xCoords = returnArrayWithoutDuplicates(xCoords);
    var yCoords = returnArrayWithoutDuplicates(yCoords);
    var xCoordsMin = Math.min.apply(Math, xCoords);
    var xCoordsMax = Math.max.apply(Math, xCoords);
    var yCoordsMin = Math.min.apply(Math, yCoords);
    var yCoordsMax = Math.max.apply(Math, yCoords);
    var aoa = parseInt(activeUnit.UniqueAOA);
    var eventValuesForXY = document.getElementById(event.currentTarget.id).dataset.coords.split(",");
    var eventXValue = parseInt(eventValuesForXY[0]);
    var eventYValue = parseInt(eventValuesForXY[1]);
              for (var i=Math.max((eventXValue-aoa),xCoordsMin); i<Math.min((eventXValue+aoa+1),xCoordsMax+1); i++) {
                  for (var j=Math.max((eventYValue-aoa),yCoordsMin); j<Math.min((eventYValue+aoa+1),yCoordsMax+1); j++) {
                      var goodID = convertCoordsToId(i,j);
                      validUniqueTileArray.push(goodID);
                      document.getElementById(goodID).classList.add("availableForUnique"+color);
        }
    }

    var diff = $(boundingArray).not(validUniqueTileArray).get();
        for (v=0; v<diff.length; v++) {
                if (document.getElementById(diff[v]).classList.contains("availableForUnique"+color)) {
                    document.getElementById(diff[v]).classList.remove("availableForUnique"+color);
        }
    }
}

function showBombardierUnique(activeUnit) {
    var boundingArray = getStorage("tilesForMove");
    var coordArray = [];
    var xCoords = [];
    var yCoords = [];
    //convert all tiles within boundingArray to coords
    for (var w=0; w<boundingArray.length; w++) {
        var coords = convertIdToCoordinates(boundingArray[w]);
        var startCoords = coords.split(",");
        var xValue = Number(startCoords[0]);
        var yValue = Number(startCoords[1]);
        xCoords.push(xValue);
        yCoords.push(yValue);
        coordArray.push(coords);
        var thisDiv = document.getElementById(boundingArray[w]);
       //using jquery's .on() to add eventlisteners so that I can later us .off() to turn them off
        $(thisDiv).on( "mouseover", function(event) {
            addColorBombardierUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray);
        });
    }
}

function addColorBombardierUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray) {
    var validUniqueTileArray = [];
    var color = getStorage("playerColor");
    var xCoords = returnArrayWithoutDuplicates(xCoords);
    var yCoords = returnArrayWithoutDuplicates(yCoords);
    var xCoordsMin = Math.min.apply(Math, xCoords);
    var xCoordsMax = Math.max.apply(Math, xCoords);
    var yCoordsMin = Math.min.apply(Math, yCoords);
    var yCoordsMax = Math.max.apply(Math, yCoords);
    var aoa = parseInt(activeUnit.UniqueAOA);
    var eventValuesForXY = document.getElementById(event.currentTarget.id).dataset.coords.split(",");
    var eventXValue = parseInt(eventValuesForXY[0]);
    var eventYValue = parseInt(eventValuesForXY[1]);
              for (var i=Math.max((eventXValue-aoa),xCoordsMin); i<Math.min((eventXValue+aoa+1),xCoordsMax+1); i++) {
                  for (var j=Math.max((eventYValue-aoa),yCoordsMin); j<Math.min((eventYValue+aoa+1),yCoordsMax+1); j++) {
                      var goodID = convertCoordsToId(i,j);
                      validUniqueTileArray.push(goodID);
                      document.getElementById(goodID).classList.add("availableForUnique"+color);
        }
    }

    var diff = $(boundingArray).not(validUniqueTileArray).get();
        for (v=0; v<diff.length; v++) {
                if (document.getElementById(diff[v]).classList.contains("availableForUnique"+color)) {
                    document.getElementById(diff[v]).classList.remove("availableForUnique"+color);
        }
    }
}

function showPirateUnique(activeUnit) {
    //pirate's unique move is only a range of 1 and will be substantially different than others.
    //essentially its just a move to that tile (if empty) and a chance to find something.
    var boundingArray = getStorage("tilesForMove");
    var coordArray = [];
    var xCoords = [];
    var yCoords = [];
    //convert all tiles within boundingArray to coords
    for (var w=0; w<boundingArray.length; w++) {
        var coords = convertIdToCoordinates(boundingArray[w]);
        var startCoords = coords.split(",");
        var xValue = Number(startCoords[0]);
        var yValue = Number(startCoords[1]);
        xCoords.push(xValue);
        yCoords.push(yValue);
        coordArray.push(coords);
        var thisDiv = document.getElementById(boundingArray[w]);
       //using jquery's .on() to add eventlisteners so that I can later us .off() to turn them off
        $(thisDiv).on( "mouseover", function(event) {
            addColorPirateUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray);
        });
    }
}

function addColorPirateUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray) {
    var validUniqueTileArray = [];
    var color = getStorage("playerColor");
    var xCoords = returnArrayWithoutDuplicates(xCoords);
    var yCoords = returnArrayWithoutDuplicates(yCoords);
    var xCoordsMin = Math.min.apply(Math, xCoords);
    var xCoordsMax = Math.max.apply(Math, xCoords);
    var yCoordsMin = Math.min.apply(Math, yCoords);
    var yCoordsMax = Math.max.apply(Math, yCoords);
    var aoa = parseInt(activeUnit.UniqueAOA);
    var eventValuesForXY = document.getElementById(event.currentTarget.id).dataset.coords.split(",");
    var eventXValue = parseInt(eventValuesForXY[0]);
    var eventYValue = parseInt(eventValuesForXY[1]);
              for (var i=Math.max((eventXValue-aoa),xCoordsMin); i<Math.min((eventXValue+aoa+1),xCoordsMax+1); i++) {
                  for (var j=Math.max((eventYValue-aoa),yCoordsMin); j<Math.min((eventYValue+aoa+1),yCoordsMax+1); j++) {
                      var goodID = convertCoordsToId(i,j);
                      validUniqueTileArray.push(goodID);
                      document.getElementById(goodID).classList.add("availableForUnique"+color);
        }
    }

    var diff = $(boundingArray).not(validUniqueTileArray).get();
        for (v=0; v<diff.length; v++) {
                if (document.getElementById(diff[v]).classList.contains("availableForUnique"+color)) {
                    document.getElementById(diff[v]).classList.remove("availableForUnique"+color);
        }
    }
}


function showSwarmUnique(activeUnit) {
        var activeArray = [];
        var activeUnitXYValues = document.getElementById(activeUnit.Loc).dataset.coords.split(",");
        var activeUnitX = parseInt(activeUnitXYValues[0]);
        var activeUnitY = parseInt(activeUnitXYValues[1]);

    for (var w=0; w<400; w++) {
        //for each tile get their coords for comparing to swarm's current coords
        var coords = convertIdToCoordinates(w);
        var startCoords = coords.split(",");
        var xValue = Number(startCoords[0]);
        var yValue = Number(startCoords[1]);

    //for each of the cardinal tiles around swarm push it to activeArray
    //then add the styling that mark it eligible for unique move
    if ((yValue==activeUnitY) && (xValue==(activeUnitX+1))) {
        var tile = convertCoordsToId(xValue, yValue);
        activeArray.push(tile);
        document.getElementById(tile).classList.add("availableToMove");
    } else if ((yValue==activeUnitY) && (xValue==(activeUnitX-1))) {
        var tile = convertCoordsToId(xValue, yValue);
        activeArray.push(tile);
        document.getElementById(tile).classList.add("availableToMove");
    } else if ((xValue==activeUnitX) && (yValue==(activeUnitY-1))) {
        var tile = convertCoordsToId(xValue, yValue);
        activeArray.push(tile);
        document.getElementById(tile).classList.add("availableToMove");
    } else if ((xValue==activeUnitX) && (yValue==(activeUnitY+1))) {
        var tile = convertCoordsToId(xValue, yValue);
        activeArray.push(tile);
        document.getElementById(tile).classList.add("availableToMove");
        } else {
            //remove styling for all but the 4 cardnial directions
            var tile = convertCoordsToId(xValue, yValue);
            if (document.getElementById(tile).classList.contains("availableToMove")) {
                document.getElementById(tile).classList.remove("availableToMove");
            }
        }
    }
     //add mouseover function that applies the color for the unique move affected area
     for(var i=0; i<activeArray.length; i++) {
        var thisDiv = document.getElementById(activeArray[i]);
       //using jquery's .on() to add eventlisteners so that I can later us .off() to turn them off
        $(thisDiv).on( "mouseover", function(event) {
            addColorSwarmUniqueTiles(activeUnit);
        });
    }
}

function addColorSwarmUniqueTiles(activeUnit) {

    var eventValuesForXY = document.getElementById(event.currentTarget.id).dataset.coords.split(",");
    var eventXValue = parseInt(eventValuesForXY[0]);
    var eventYValue = parseInt(eventValuesForXY[1]);
    var position = determinePositionRelativeToSwarmUnit(activeUnit, eventXValue, eventYValue);
    returnTilesForSwarmUnique(position, activeUnit);
}

function determinePositionRelativeToSwarmUnit(activeUnit, eventXValue, eventYValue) {
    var position;
    var activeUnitXYValues = document.getElementById(activeUnit.Loc).dataset.coords.split(",");
    var activeUnitX = parseInt(activeUnitXYValues[0]);
    var activeUnitY = parseInt(activeUnitXYValues[1]);
    if ((eventYValue==activeUnitY) && (eventXValue==(activeUnitX+1))) {
        position = "right";
        var tile = convertCoordsToId(eventXValue, eventYValue);
        document.getElementById(tile).classList.add("availableToMove");
    } else if ((eventYValue==activeUnitY) && (eventXValue==(activeUnitX-1))) {
        position = "left";
        var tile = convertCoordsToId(eventXValue, eventYValue);
        document.getElementById(tile).classList.add("availableToMove");
    } else if ((eventXValue==activeUnitX) && (eventYValue==(activeUnitY-1))) {
        position = "top";
        var tile = convertCoordsToId(eventXValue, eventYValue);
        document.getElementById(tile).classList.add("availableToMove");
    } else if ((eventXValue==activeUnitX) && (eventYValue==(activeUnitY+1))) {
        position = "bottom";
        var tile = convertCoordsToId(eventXValue, eventYValue);
        document.getElementById(tile).classList.add("availableToMove");
    } else if ((eventXValue==(activeUnitX+1)) && (eventYValue==(activeUnitY+1))) {
        position = "topright";
    } else if ((eventXValue==(activeUnitX-1)) && (eventYValue==(activeUnitY+1))) {
        position = "topleft";
    } else if ((eventXValue==(activeUnitX+1)) && (eventYValue==(activeUnitY-1))) {
        position = "bottomright";
    } else if ((eventXValue==(activeUnitX-1)) && (eventYValue==(activeUnitY-1))) {
        position = "bottomleft";
    }
    return position;
}

function returnTilesForSwarmUnique(position, activeUnit) {
    clearPlayerColorFromMap();
    var color = getStorage("playerColor");
    //I like the idea of showing this unique move in steps as they move away from swarm but I'll add that as a feature request
    var activeUnitXYValues = document.getElementById(activeUnit.Loc).dataset.coords.split(",");
    var activeUnitX = parseInt(activeUnitXYValues[0]);
    var activeUnitY = parseInt(activeUnitXYValues[1]);
    var validUniqueTileArray = [];
    var inRange = [];

    for (var i=0; i<400; i++) {
       var tile = convertIdToCoordinates(i);
       inRange.push(tile);
    }
    if (position == "right") {
        //displays swarm to the right of the unit
        for (var k=0; k<inRange.length; k++) {
            for (var x=(activeUnitX+1); x<(activeUnitX+8); x++) {

                var changeX = (x - activeUnitX);
                var changeY = (changeX > 0) ? (changeX+1) : changeX;
                for (var y=(activeUnitY-changeX); y<(activeUnitY+changeY); y++) {
                    let item = x+","+y;
                    if (inRange[k] == (item)) {

                        validUniqueTileArray.push(item);
                    }
                }
            }
        }
    } else if (position == "left") {
             //displays swarm to the left of the unit
            for (var k=0; k<inRange.length; k++) {
                for (var x=(activeUnitX-7); x<(activeUnitX); x++) {

                    var changeX = (activeUnitX - x);
                    var changeY = (changeX > 0) ? (changeX+1) : changeX;
                    for (var y=(activeUnitY-changeX); y<(activeUnitY+changeY); y++) {
                        let item = x+","+y;
                        if (inRange[k] == (item)) {

                            validUniqueTileArray.push(item);
                        }
                    }
                }
            }
    } else if (position == "top") {
                //displays swarm to the top of the unit
            for (var k=0; k<inRange.length; k++) {
                for (var y=(activeUnitY-7); y<(activeUnitY); y++) {

                    var changeY = (activeUnitY - y);
                    var changeX = (changeY > 0) ? (changeY+1) : changeY;
                    for (var x=(activeUnitX-changeY); x<(activeUnitX+changeX); x++) {
                        let item = x+","+y;
                        if (inRange[k] == (item)) {

                            validUniqueTileArray.push(item);
                        }
                    }
                }
            }
    } else if (position == "bottom") {
            // displays swarm to the bottom of the unit
        for (var k=0; k<inRange.length; k++) {
            for (var y=(activeUnitY); y<(activeUnitY+8); y++) {

                var changeY = (y - activeUnitY);
                var changeX = (changeY > 0) ? (changeY+1) : changeY;
                for (var x=(activeUnitX-changeY); x<(activeUnitX+changeX); x++) {
                    let item = x+","+y;
                    if (inRange[k] == (item)) {

                        validUniqueTileArray.push(item);
                    }
                }
            }
        }
    }

    //take the results and add the unique styling
    for (var v=0; v<validUniqueTileArray.length; v++) {
        var coordXY = validUniqueTileArray[v].split(",");
        var x = coordXY[0];
        var y = coordXY[1];
        var id = convertCoordsToId(x,y);
        document.getElementById(id).classList.add("availableForUnique"+color);
    }
    setStorage("validUniqueTileArray", validUniqueTileArray);
}

function showBlindUnique(activeUnit){
    var boundingArray = getStorage("tilesForMove");
    var coordArray = [];
    var xCoords = [];
    var yCoords = [];
    //convert all tiles within boundingArray to coords
    for (var w=0; w<boundingArray.length; w++) {
        var coords = convertIdToCoordinates(boundingArray[w]);
        var startCoords = coords.split(",");
        var xValue = Number(startCoords[0]);
        var yValue = Number(startCoords[1]);
        xCoords.push(xValue);
        yCoords.push(yValue);
        coordArray.push(coords);
        var thisDiv = document.getElementById(boundingArray[w]);
        //add mouseover function that applies the color for the unique move affected area
        $(thisDiv).on("mouseover", function(event) {
            addColorBlindUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray);
        });
    }
}

function addColorBlindUniqueTiles(activeUnit, boundingArray, xCoords, yCoords, coordArray){
    var validUniqueTileArray = [];
    var color = getStorage("playerColor");
    var xCoords = returnArrayWithoutDuplicates(xCoords);
    var yCoords = returnArrayWithoutDuplicates(yCoords);
    var xCoordsMin = Math.min.apply(Math, xCoords);
    var xCoordsMax = Math.max.apply(Math, xCoords);
    var yCoordsMin = Math.min.apply(Math, yCoords);
    var yCoordsMax = Math.max.apply(Math, yCoords);
    var aoa = parseInt(activeUnit.UniqueAOA);
    var eventValuesForXY = document.getElementById(event.currentTarget.id).dataset.coords.split(",");
    var eventXValue = parseInt(eventValuesForXY[0]);
    var eventYValue = parseInt(eventValuesForXY[1]);
              for (var i=Math.max((eventXValue-aoa),xCoordsMin); i<Math.min((eventXValue+aoa+1),xCoordsMax+1); i++) {
                  for (var j=Math.max((eventYValue-aoa),yCoordsMin); j<Math.min((eventYValue+aoa+1),yCoordsMax+1); j++) {
                      var goodID = convertCoordsToId(i,j);
                      validUniqueTileArray.push(goodID);
                      document.getElementById(goodID).classList.add("availableForUnique"+color);
        }
    }

    var diff = $(boundingArray).not(validUniqueTileArray).get();
        for (v=0; v<diff.length; v++) {
                if (document.getElementById(diff[v]).classList.contains("availableForUnique"+color)) {
                    document.getElementById(diff[v]).classList.remove("availableForUnique"+color);
        }
    }
}


function clearPlayerColorFromMap() {
    var color = getStorage("playerColor");

    for (var i=0; i<400; i++) {
        var tile = document.getElementById(i);
        if (tile.classList.contains("availableForUnique"+color)) {
            tile.classList.remove("availableForUnique"+color);
        }
    }
}

function clearUniqueEventHandlers() {
    //all eventListeners within body using .on() will be triggered off
    $('body').find("*").each(function() {
        $(this).off("mouseover");
    });
}

//do unique moves
function routeUniqueMoveForActiveUnit(id) {
    var activeUnit = getStorage("activeTroop");
    var name = activeUnit.Name;
    if (name == "DepthCharge") {
        DepthChargeUniqueMove(id);
    } else if (name == "Swarm") {
        SwarmUniqueMove(id);
    } else if (name == "Scan") {
        ScanUniqueMove(id);
    } else if (name == "Pirate") {
        PirateUniqueMove(id);
    } else if (name == "Bombardier") {
        BombardierUniqueMove(id);
    } else if (name == "Blind") {
        BlindUniqueMove(id);
    }
}

function ScanUniqueMove(id) {
    var username = getStorage("username");
    var color = getStorage("playerColor");
    var visibleArray = [];

    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            visibleArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(visibleArray);
    
    sendScanToServer(username, visibleArray, id);

    //play scan sound
    playSound("scan");

    clearAvailableTilesForAction();
    clearPlayerColorFromMap();
    clearUniqueEventHandlers();

    processTurn();
}

function SwarmUniqueMove(id) {
    var username = getStorage("username");
    var color = getStorage("playerColor");
    var damagedArray = [];

    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            damagedArray.push(i);
        }
    }

    returnArrayWithoutDuplicates(damagedArray);

    //server will damage units, update visibility, and put swarm on cooldown
    sendSwarmToServer(username, damagedArray, id);

    //play swarm sound
    playSound("swarm");

    clearAvailableTilesForAction();
    clearPlayerColorFromMap();
    clearUniqueEventHandlers();

    processTurn();
}


function DepthChargeUniqueMove(id) {
    var username = getStorage("username");
    var color = getStorage("playerColor");
    var stunnedArray = [];

    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            stunnedArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(stunnedArray);

    sendDepthChargeToServer(username, stunnedArray, id);

    //play depthCharge sound
    playSound("depthCharge");

    clearAvailableTilesForAction();
    clearPlayerColorFromMap();
    clearUniqueEventHandlers();

    processTurn();
}

function BombardierUniqueMove(id) {
    var username = getStorage("username");
    var color = getStorage("playerColor");
    var damagedArray = [];

    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            damagedArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(visibleArray);

    sendBombardierToServer(username, damagedArray, id);

    //play bombardier sound
    playSound("bomb");

    clearAvailableTilesForAction();
    clearPlayerColorFromMap();
    clearUniqueEventHandlers();

    processTurn();
}

function BlindUniqueMove(id){
    var username = getStorage("username");
    var color = getStorage("playerColor");
    var blindArray = [];

    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            blindArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(blindArray);

    sendBlindToServer(username, blindArray, id);

    //TODO - get sound for blind

    //play bombardier sound
    //playSound("blind");

    clearAvailableTilesForAction();
    clearPlayerColorFromMap();
    clearUniqueEventHandlers();

    processTurn();
}


function getTroopMaxHealth(name) {
    if (name == "DepthCharge") {
        return "60";
    } else if (name == "Swarm") {
        return "128";
    } else if (name == "Scan") {
        return "30";
    } else if (name == "Pirate") {
        return "60";
    } else if (name == "Bombardier") {
        return "60";
    } else if (name == "Destroyer") {
        return "100";
    } else if (name == "Ruskie") {
        return "70";
    } else if (name == "Gremlin") {
        return "90";
    } else if (name == "Scout") {
        return "35";
    }
}
