//This page will hold the data and information regarding the various troop units

function populateTroopDetailModal(name, player){
    var time = "troopModal";
    //hide inGame button show preGame button
    document.getElementById("inGameTroopDetailButton").classList.add("hidden");
    document.getElementById("preGameTroopDetailButton").classList.remove("hidden");
    showTroopSelected(player);
    hideTroopModal(false);
    if (player == 1) {
        var color = document.getElementById('playerColorSelection').innerHTML;
    } else {
        var color = document.getElementById('playerColorSelection2').innerHTML;
    }

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
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Scout";
    var scoutStats = createScout();

        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ scoutStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit: " + scoutStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + scoutStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + scoutStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + scoutStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + scoutStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + scoutStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + scoutStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + scoutStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
}

function populateDepthCharge(name, color, time) {
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Depth Charge";
    var depthChargeStats = createDepthCharge();
    
        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px';   
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ depthChargeStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + depthChargeStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + depthChargeStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + depthChargeStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + depthChargeStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + depthChargeStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + depthChargeStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + depthChargeStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + depthChargeStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
}

function populateDestroyer(name, color, time) { 
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Destroyer";
    var destroyerStats = createDestroyer();
       
        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ destroyerStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + destroyerStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + destroyerStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + destroyerStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + destroyerStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + destroyerStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + destroyerStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + destroyerStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + destroyerStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
}

function populateSwarm(name, color, time) { 
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Swarm";
    var swarmStats = createSwarm();
        
        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ swarmStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + swarmStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + swarmStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + swarmStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + swarmStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + swarmStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + swarmStats.AttackDamage + ".</li>"+
        "<li>Unique Range: " + swarmStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + swarmStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
} 

function populateScan(name, color, time) { 
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Scan";
    var scanStats = createScan();
    
        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ scanStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + scanStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + scanStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + scanStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + scanStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + scanStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + scanStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + scanStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + scanStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
} 

function populateRuskie(name, color, time) { 
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Ruskie";
    var ruskieStats = createRuskie();

        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ ruskieStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + ruskieStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + ruskieStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + ruskieStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + ruskieStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + ruskieStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + ruskieStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + ruskieStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + ruskieStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
} 

function populateGremlin(name, color, time) { 
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Gremlin";
    var gremlinStats = createGremlin();
    
        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ gremlinStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + gremlinStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + gremlinStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + gremlinStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + gremlinStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + gremlinStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + gremlinStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + gremlinStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + gremlinStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
} 

function populatePirate(name, color, time) { 
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Pirate";
    var pirateStats = createPirate();
        
        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ pirateStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + pirateStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + pirateStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + pirateStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + pirateStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + pirateStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + pirateStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + pirateStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + pirateStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
} 

function populateBombardier(name, color, time) { 
    if (time == "troopModal"){
        var pictureSrc = "Assets/"+name.id+color+".png"
    } else if (time == "inGame") {
        var pictureSrc = "Assets/"+name+color+".png"
    } else {
        alert("picture source provided to populate this modal was incorrect");
    }
    document.getElementById('troopNameHeader').innerHTML = "Bombardier";
    var bombardierStats = createBombardier();
    
        document.getElementById('troopPic').src = pictureSrc;
        document.getElementById('troopPic').style.height = '60px';
        document.getElementById('troopPic').style.width = '40px'; 
        document.getElementById("troopStatList").innerHTML = "<li>Perceived Value is "+ bombardierStats.PerceivedValue +"</li>" +
        "<li>Visibility (tiles arware of around unit): " + bombardierStats.Visibility + ".</li>" +
        "<li>Movement Distance (tiles moved per turn): " + bombardierStats.MovementDistance + ".</li>" +
        "<li>Health Points: " + bombardierStats.HealthPoints + ".</li>" + 
        "<li>Area of Attack (number of tiles attack effects): " + bombardierStats.AreaOfAttack + ".</li>" +
        "<li>Attack Range: " + bombardierStats.AttackRange + ".</li>" +
        "<li>Attack Damage: " + bombardierStats.AttackDamage + ".</li>" +
        "<li>Unique Range: " + bombardierStats.UniqueRange + ".</li>";

        document.getElementById('troopMoveList').innerHTML = "Unique Move: " + bombardierStats.Moves + ".</li>";
        document.getElementById('troopDetailModal').classList.add('table');
        document.getElementById('troopDetailModal').classList.remove('hidden');
        $("#troopDetailModal").modal();
} 

//These determine which troops are selected and populates returns array of troopObj (called troopArray) for gameObject
function getTroopObjects(playerTroopSelection) {
    var troopArray = [];
    playerTroopSelection = playerTroopSelection.toString();
    var troopList = playerTroopSelection.split(",");
    
    for(i=0; i<troopList.length; i++){
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
}

function createScout() {
    var Scout = {
        Name: "Scout",
        Location: "tbd",
        Visibility:  5,
        MovementDistance:  5,	
        HealthPoints: 35,
        MaxHealth: 35,
        Moves: "No Special Moves",
        Cooldown: 0,
        AreaOfAttack: 1,
        AttackDamage: 15,
        AttackRange: 2,
        UniqueRange: 0,
        UniqueAOA: 0,
        PerceivedValue: 2
    };
    return Scout;
}

function createDepthCharge() {
    var DepthCharge = {
        Name: "DepthCharge",
        Location: "tbd",
        Visibility:  1,
        MovementDistance:  1,	
        HealthPoints: 15,
        MaxHealth: 15,
        Moves: "Stun: searches a 3x3 area and returns info about any units within. Also stuns those units for 1 round.",
        Cooldown: 0,
        AreaOfAttack: 0,
        AttackDamage: 0,
        AttackRange: 0,
        UniqueRange: 10,
        UniqueAOA: 1,
        UniqueName: "DepthCharge",
        PerceivedValue: 2
    };
    return DepthCharge;
}

function createDestroyer() { 
    var Destroyer = {
        Name: "Destroyer",
        Location: "tbd",
        Visibility:  2,
        MovementDistance:  2,	
        HealthPoints: 100,
        MaxHealth: 100,
        Moves: "No Special Moves",
        Cooldown: 0,
        AreaOfAttack: 1,
        AttackDamage: 40,
        AttackRange: 2,
        UniqueRange: 0,
        UniqueAOA: 0,
        PerceivedValue: 5
    };
    return Destroyer;
}

function createSwarm() { 
    var Swarm = {
        Name: "Swarm",
        Location: "tbd",
        Visibility:  2,
        MovementDistance:  2,	
        HealthPoints: 128,
        MaxHealth: 128,
        Moves: "Swarm: splits itself (and its health) each move in order to fan out and search. Does 20 damage to any unit hit and reveals the tiles covered.",
        Cooldown: 0,
        AreaOfAttack: 0,
        AttackDamage: 20,
        AttackRange: 1,
        UniqueRange: 1,
        UniqueAOA: 1,
        UniqueName: "Swarm",
        PerceivedValue: 5
    };
    return Swarm;
}

function createScan() { 
    var Scan = {
        Name: "Scan",
        Location: "tbd",
        Visibility:  1,
        MovementDistance:  1,	
        HealthPoints: 15,
        MaxHealth: 15,
        Moves: "Scan: reveals a 5x5 area up to 15 tiles away from your base.",
        Cooldown: 0,
        AreaOfAttack: 0,
        AttackDamage: 0,
        AttackRange: 0,
        UniqueRange: 15,
        UniqueAOA: 2,
        UniqueName: "Scan",
        PerceivedValue: 3
    };
    return Scan;
}

function createRuskie() { 
    var Ruskie = {
        Name: "Ruskie",
        Location: "tbd",
        Visibility:  4,
        MovementDistance:  3,	
        HealthPoints: 70,
        MaxHealth: 70,
        Moves: "No Special Moves.",
        Cooldown: 0,
        AreaOfAttack: 1,
        AttackDamage: 25,
        AttackRange: 3,
        UniqueRange: 0,
        UniqueAOA: 0,
        PerceivedValue: 3
    };
    return Ruskie;
}

function createGremlin() { 
    var Gremlin = {
        Name: "Gremlin",
        Location: "tbd",
        Visibility:  3,
        MovementDistance:  3,	
        HealthPoints: 90,
        MaxHealth: 90,
        Moves: "No Special Moves",
        Cooldown: 0,
        AreaOfAttack: 1,
        AttackDamage: 30,
        AttackRange: 3,
        UniqueRange: 0,
        UniqueAOA: 0,
        PerceivedValue: 4
    };
    return Gremlin;
}

function createPirate() { 
    var Pirate = {
        Name: "Pirate",
        Location: "tbd",
        Visibility:  4,
        MovementDistance:  4,	
        HealthPoints: 60,
        MaxHealth: 60,
        Moves: "Pilfer: send this unit to search an area. May return all sorts of useful goods!",
        Cooldown: 0,
        AreaOfAttack: 1,
        AttackDamage: 20,
        AttackRange: 2,
        UniqueRange: 1,
        UniqueAOA: 1,
        UniqueName: "Pilfer",
        PerceivedValue: 2
    };
    return Pirate;
}

function createBombardier() { 
    var Bombardier = {
        Name: "Bombardier",
        Location: "tbd",
        Visibility:  4,
        MovementDistance:  2,	
        HealthPoints: 60,
        MaxHealth: 60,
        Moves: "Bomb: range attack up to 5 tiles away, attacks a 3x3 area.",
        Cooldown: 0,
        AreaOfAttack: 1,
        AttackDamage: 25,
        AttackRange: 0,
        UniqueRange: 5,
        UniqueAOA: 2,
        UniqueName: "Bomb",
        PerceivedValue: 4
    };
    return Bombardier;
}

//utility functions for troops below
function checkCoolDown(activeUnit) {
    var cooldown = parseInt(activeUnit.Cooldown);
    if (cooldown > 0) {
        document.getElementById("gameAlertsLarge").innerHTML = "That unit is on cooldown for "+ cooldown +" turn(s).";
        return 1;
    } else {
        document.getElementById("gameAlertsSmall").classList.remove("redText");
        return 0;
    }

}

function displayUniqueMoveTiles(activeUnit, player) {
    var name = activeUnit.Name;
    
    if (name == "DepthCharge") {
        showDepthChargeUnique(activeUnit, player);
    } else if (name == "Swarm") {
        showSwarmUnique(activeUnit, player);
    } else if (name == "Scan") {
        showScanUnique(activeUnit, player);
    } else if (name == "Pirate") {
        showPirateUnique(activeUnit, player);
    } else if (name == "Bombardier") {
        showBombardierUnique(activeUnit, player);
    }
}

function showDepthChargeUnique(activeUnit, player) {
    var playerObj = getStorage("playerObj");
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
        // thisDiv.addEventListener("mouseover", function (event) {
        //     addColorDepthChargeUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray);
        // })
        $(thisDiv).on( "mouseover", function(event) {
            addColorDepthChargeUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray);
        });
    }
}

function addColorDepthChargeUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray) {
    var validUniqueTileArray = [];
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
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

function showScanUnique(activeUnit, player) {
    //takes bounding array and applies mousover event to all tiles within
    var playerObj = getStorage("playerObj");
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
            addColorScanUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray);
        });
        
    }
}

function addColorScanUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray) {
    //apply and remove unique styling to tiles as mouse icon moves around
    var validUniqueTileArray = [];
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
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

function showBombardierUnique(activeUnit, player) {
    var playerObj = getStorage("playerObj");
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
            addColorBombardierUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray);
        });
    }
}

function addColorBombardierUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray) {
    var validUniqueTileArray = [];
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
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

function showPirateUnique(activeUnit, player) {
    //pirate's unique move is only a range of 1 and will be substantially different than others.
    //essentially its just a move to that tile (if empty) and a chance to find something.
    var playerObj = getStorage("playerObj");
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
            addColorPirateUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray);
        });
    }
}

function addColorPirateUniqueTiles(activeUnit, player, boundingArray, xCoords, yCoords, coordArray) {
    var validUniqueTileArray = [];
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
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

function showSwarmUnique(activeUnit, player) {
    //Swarm's move will appear quite different than the others
    prepareUniqueForSwarm(activeUnit, player);
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
    var boundingArray = getStorage("tilesForMove");
    var coordArray = [];
    var xCoords = [];
    var yCoords = [];
}

function prepareUniqueForSwarm(activeUnit, player) {
        var activeArray = [];
        var activeUnitXYValues = document.getElementById(activeUnit.Location).dataset.coords.split(",");
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
            addColorSwarmUniqueTiles(activeUnit, player);
        });
    }
}

function addColorSwarmUniqueTiles(activeUnit, player) {
    
    var playerObj = getStorage("playerObj");
    var eventValuesForXY = document.getElementById(event.currentTarget.id).dataset.coords.split(",");
    var eventXValue = parseInt(eventValuesForXY[0]);
    var eventYValue = parseInt(eventValuesForXY[1]);
    var position = determinePositionRelativeToSwarmUnit(activeUnit, eventXValue, eventYValue);
    returnTilesForSwarmUnique(position, activeUnit, player);
}

function determinePositionRelativeToSwarmUnit(activeUnit, eventXValue, eventYValue) {
    var position;
    var activeUnitXYValues = document.getElementById(activeUnit.Location).dataset.coords.split(",");
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

function returnTilesForSwarmUnique(position, activeUnit, player) {
    clearPlayerColorFromMap(player);
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
    //I like the idea of showing this unique move in steps as they move away from swarm but I'll add that as a feature request
    var activeUnitXYValues = document.getElementById(activeUnit.Location).dataset.coords.split(",");
    var activeUnitX = parseInt(activeUnitXYValues[0]);
    var activeUnitY = parseInt(activeUnitXYValues[1]);
    var validUniqueTileArray = [];
    var loc = parseInt(activeUnit.Location);
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
           
function clearPlayerColorFromMap() {
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
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
function routeUniqueMoveForActiveUnit(player, id) {
    var activeUnit = getStorage("activeTroop");
    var name = activeUnit.Name;
    if (name == "DepthCharge") {
        DepthChargeUniqueMove(player, id);
    } else if (name == "Swarm") {
        SwarmUniqueMove(player, id);
    } else if (name == "Scan") {
        ScanUniqueMove(player, id);
    } else if (name == "Pirate") {
        PirateUniqueMove(player, id);
    } else if (name == "Bombardier") {
        BombardierUniqueMove(player, id);
    }
}

function ScanUniqueMove(player, id) {
    var activeUnit = getStorage("activeTroop");
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
    var visibleArray = getStorage("visibleTiles");
    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            visibleArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(visibleArray);
    setStorage("visibleTiles", visibleArray);
    //play scan sound
    playSound("scan");
    activeUnit.Cooldown += 1;
    var name = activeUnit.Name;
    //save the new info for the activeUnit into the playerObj
    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name == name) {
            playerObj.troops[i] = activeUnit;
        }
    }
    setStorage("playerObj", playerObj);
    clearAvailableTilesForAction(player);
    clearPlayerColorFromMap(player);
    clearUniqueEventHandlers(player, activeUnit);
    updateVisibility(player);
    processTurn(player);
}

function SwarmUniqueMove(player, id) {
    var activeUnit = getStorage("activeTroop");
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
    var visibleArray = getStorage("visibleTiles");
    var damagedArray = [];
    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            visibleArray.push(i);
            damagedArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(visibleArray);
    //stun the units within the selected area
    applySwarmDamage(player, damagedArray);
    //play swarm sound
    playSound("swarm");
    setStorage("visibleTiles", visibleArray);
    activeUnit.Cooldown = +1;
    var name = activeUnit.Name;
    //save the new info for the activeUnit into the playerObj
    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name == name) {
            playerObj.troops[i] = activeUnit;
        }
    }
    setStorage("playerObj", playerObj);
    clearAvailableTilesForAction(player);
    clearPlayerColorFromMap(player);
    clearUniqueEventHandlers(player, activeUnit);
    updateVisibility(player);
    processTurn(player);
}

function applySwarmDamage(player, damagedArray) {
    var player = convertPlayerToNumber(player);
    var otherPlayer = (player == 1 ? 2 : 1);
    var otherPlayerObj = getStorage("playerObj"+otherPlayer);

    for (var i=0; i<damagedArray.length; i++) {
        for (var k=0; k<otherPlayerObj.troops.length; k++) {
            if (damagedArray[i] == otherPlayerObj.troops[k].Location) {
                var targetedEnemy = otherPlayerObj.troops[k];
                var health = parseInt(otherPlayerObj.troops[k].HealthPoints);
                health -= 20;
                otherPlayerObj.troops[k].HealthPoints = health;
                if (health <= 0) {
                    determineWhichUnitKilled(otherPlayerObj, targetedEnemy, player);
                    clearTileInnerHtml(targetedEnemy.Location, player);
                }
            }
        }
          //if the attack hit the enemy base
          if (damagedArray[i] == otherPlayerObj.base.Location) {
            var targetedEnemy = otherPlayerObj.base;
            var baseHealth = parseInt(otherPlayerObj.base.HealthPoints);
            baseHealth -= 20;
            otherPlayerObj.base.HealthPoints = baseHealth;
            updateAttackedBaseHealth(otherPlayer, baseHealth);
            if (baseHealth <= 0) {
                determineWhichUnitKilled(otherPlayerObj, targetedEnemy, player);
                clearTileInnerHtml(targetedEnemy.Location, player);
            }
        }
    }
    setStorage("playerObj"+otherPlayer, otherPlayerObj);
}

function DepthChargeUniqueMove(player, id) {
    var activeUnit = getStorage("activeTroop");
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
    var visibleArray = getStorage("visibleTiles");
    var stunnedArray = [];
    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            visibleArray.push(i);
            stunnedArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(visibleArray);
    //stun the units within the selected area
    applyDepthChargeStun(player, stunnedArray);
    //play depthCharge sound
    playSound("depthCharge");
    setStorage("visibleTiles", visibleArray);
    activeUnit.Cooldown +=1;
    var name = activeUnit.Name;
    //save the new info for the activeUnit into the playerObj
    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name == name) {
            playerObj.troops[i] = activeUnit;
        }
    }
    setStorage("playerObj", playerObj);
    clearAvailableTilesForAction(player);
    clearPlayerColorFromMap(player);
    clearUniqueEventHandlers(player, activeUnit);
    updateVisibility(player);
    processTurn(player);
}

function applyDepthChargeStun(player, stunnedArray) {
    var player = convertPlayerToNumber(player);
    var otherPlayer = (player == 1 ? 2 : 1);
    var otherPlayerObj = getStorage("playerObj"+otherPlayer);

    for (var i=0; i<stunnedArray.length; i++) {
        for (var k=0; k<otherPlayerObj.troops.length; k++) {
            if (stunnedArray[i] == otherPlayerObj.troops[k].Location) {
                var cooldown = parseInt(otherPlayerObj.troops[k].Cooldown);
                cooldown += 1;
                otherPlayerObj.troops[k].Cooldown = cooldown;
            }
        }
    }
    setStorage("playerObj"+otherPlayer, otherPlayerObj);
}

function BombardierUniqueMove(player, id) {
    var activeUnit = getStorage("activeTroop");
    var playerObj = getStorage("playerObj");
    var color = playerObj.player.Color;
    var visibleArray = getStorage("visibleTiles");
    var damagedArray = [];
    //first going to try simply checking for the unique styling class to know which tiles to include
    for (var i=0; i<400; i++) {
        if ((document.getElementById(i)).classList.contains("availableForUnique"+color)) {
            visibleArray.push(i);
            damagedArray.push(i);
        }
    }
    returnArrayWithoutDuplicates(visibleArray);
    //stun the units within the selected area
    applyBombardierDamage(player, damagedArray);
    //play bombardier sound
    playSound("bomb");
    setStorage("visibleTiles", visibleArray);
    activeUnit.Cooldown = 1;
    var name = activeUnit.Name;
    //save the new info for the activeUnit into the playerObj
    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name == name) {
            playerObj.troops[i] = activeUnit;
        }
    }
    setStorage("playerObj", playerObj);
    clearAvailableTilesForAction(player);
    clearPlayerColorFromMap(player);
    clearUniqueEventHandlers(player, activeUnit);
    updateVisibility(player);
    processTurn(player);
}

function applyBombardierDamage(player, damagedArray) {
    var player = convertPlayerToNumber(player);
    var otherPlayer = (player == 1 ? 2 : 1);
    var otherPlayerObj = getStorage("playerObj"+otherPlayer);

    for (var i=0; i<damagedArray.length; i++) {
        for (var k=0; k<otherPlayerObj.troops.length; k++) {
            if (damagedArray[i] == otherPlayerObj.troops[k].Location) {
                var targetedEnemy = otherPlayerObj.troops[k];
                var health = parseInt(otherPlayerObj.troops[k].HealthPoints);
                health -= 25;
                otherPlayerObj.troops[k].HealthPoints = health;
                if (health <= 0) {
                    determineWhichUnitKilled(otherPlayerObj, targetedEnemy, player);
                    clearTileInnerHtml(targetedEnemy.Location, player);
                }
            }
        }
        //if the attack hit the enemy base
        if (damagedArray[i] == otherPlayerObj.base.Location) {
            var targetedEnemy = otherPlayerObj.base;
            var baseHealth = parseInt(otherPlayerObj.base.HealthPoints);
            baseHealth -= 25;
            otherPlayerObj.base.HealthPoints = baseHealth;
            updateAttackedBaseHealth(otherPlayer, baseHealth);
            if (baseHealth <= 0) {
                determineWhichUnitKilled(otherPlayerObj, targetedEnemy, player);
                clearTileInnerHtml(targetedEnemy.Location, player);
            }
        }
    }
    setStorage("playerObj"+otherPlayer, otherPlayerObj);
}

function getTroopMaxHealth(name) {
    if (name == "DepthCharge") {
        return "15";
    } else if (name == "Swarm") {
        return "128";
    } else if (name == "Scan") {
        return "15";
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
