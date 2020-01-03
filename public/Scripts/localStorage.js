
function clearStorage() {
    localStorage.clear();
}

function setStorage(key,info) {
    localStorage.setItem(key, JSON.stringify(info));
}

function getStorage(key) {
    var item = localStorage.getItem(key);
    return JSON.parse(item);
}

function setDefaultStorage() {
    //Set local storage maxRow to 20
    setStorage('maxRow', 20);
    //Set local storage defaults for playerObj & playerObj2
    setStorage('playerObj', '');
    setStorage('playerObj2', '');
    //Set local storage Name & Color defaults for player1
    setStorage('playerName', '');
    setStorage('playerColor', '');
    //Set local storage  Name & Color defaults for player2
    setStorage('playerName2', '');
    setStorage('playerColor2', '');
    //Set local storage defaults for player1 & player2
    setStorage('playerBaseLocation', '');
    setStorage('playerBaseLocation2', '');
    //Set local storage defaults for bases confirmed (placement)
    setStorage('confirmedValue', '0');
    //Set local storage defaults for turn indicator
    setStorage('turnIndicator', 'Game Setup...');
    //Set local storage defaults for visibleTiles player1 & player2
    setStorage('visibleTiles', '');
    //Set local storage defaults for gameState player1 & player2
    setStorage('gameState', '');
    //Set local storage defaults for alertMessage as used on AlertModal
    setStorage('alertMessage', '');
}

function  setChosenColorInLocalStorage(name, chosenColor, privateUsers) {
    var username = getStorage('username');
    if (username == name) {
        setStorage('playerColor', chosenColor);
    } else {
        let playerName = checkPrivateUsers(privateUsers);
        if (playerName == true) {
        setStorage('playerColor2', chosenColor);
        }
    }
}

//Changing this from compareNamesAndColors to setStorageNamesAndColorsForPlayerDisplay because name and color validation happens earlier than it did in pre-node version
function setStorageNamesAndColorsForPlayerDisplay() {
    var name1 = getStorage('username');
    var name2 = getStorage('opponent');
    var color1 = getStorage('playerColor');
    var color2 = getStorage('playerColor2');
    //Don't need compareNames any longer since it is handled earlier in the program -- leaving it for now
    var nameSuccess = compareNames(name1,name2);
    //Don't need compareColors any longer. It is handled earlier in the program -- leaving it for now
    var colorSuccess = compareColors(color1,color2);

    if ((nameSuccess === true) && (colorSuccess === true)){
        setStorage('nameDisplaysForPlayer', name1+' Vs '+name2);
        return true;
    }
    else {
        if (nameSuccess === true) {
            return colorSuccess;
        }
        else {
            return nameSuccess;
        }
    }
}

function compareNames(name1,name2) {
    if ((name1 != '') && (name2 != '')) { 
    if (name1 == name2) {
        playSound('validation');
        var nameConflict = 'You have chosen the same name as the other player. Please enter another name.';
        return nameConflict;
    }
    else {
        return true;
        }
    }
    else {
        return true;
    }
}   

function compareColors(color1,color2) {
    if ((color1 != '') && (color2 != '')) { 
    if (color1 == color2) {
        playSound('validation');
        var colorConflict = 'You have selected the same color as the other player. Please select another color.';
        return colorConflict;
    }
    else {
        return true;
        }
    }
    else return true;
}

function isOnTopOfGrid(item) {
    var maxRow = getStorage('maxRow');
    if (item <= maxRow-1) {
        return true;
    } else {
        return false;
    }
}

function isOnLeftOfGrid(item) {
    var maxRow = getStorage('maxRow');
    if ((item == 0) || (item % maxRow == 0)) {
        return true;
    } else {
        return false;
    }
}

function isOnRightOfGrid(item) {
    var maxRow = getStorage('maxRow');
    if (item+1 % maxRow == 0) {
        return true;
    } else {
        return false;
    }
}

function isOnBottomOfGrid(item) {
    var maxRow = getStorage('maxRow');
    if ((item < maxRow*maxRow) && (item >= maxRow*maxRow-maxRow)) {
        return true;
    } else {
        return false;
    }
}

function checkForCorner(top,left,right,bottom) {
    if (top && left) {
        return 'topleft';
    } else if (top && right) {
        return 'topright';
    } else if (bottom && left) {
        return 'bottomleft';
    } else if (bottom && right) {
        return 'bottomright';
    }
    else {
         return false;
    }
}

function placeNameDisplayData() {
    var color = getStorage('playerColor');
    document.getElementById('playerNameDisplay').classList.add(color+'Text');
    document.getElementById('playerNameDisplay').innerHTML = 'Player: '+getStorage('username');
    //add highlight to the name label background if a dark color was chosen
    if ((color == 'green') || (color == 'blue') || (color == 'indigo')) {
        document.getElementById('playerNameDisplay').classList.add('highlight');
    }
}

function placeTurnIndicatorData(username) {
    var name = getStorage('username');
    if (username == 'intro') {
        document.getElementById('turnIndicator').innerHTML = 'Game Setup...'
    }
    else if (username == name) {
        document.getElementById('turnIndicator').innerHTML = 'Your Turn';
    } else {
        document.getElementById('turnIndicator').innerHTML = 'Their Turn';
    }
}

function placeBaseDisplayData(signal) {
        var playerObj = getStorage('playerObj');
        var base = document.getElementById("playerBaseLocation").innerHTML;
        var coords = document.getElementById(base).dataset.coords;
        document.getElementById("baseLocationDisplay").innerHTML = "Your base is located at "+coords;
        document.getElementById("baseHealthDisplay").innerHTML = "Base Health: 200 / 200";
        if (signal > 0) {
        document.getElementById("baseLocationDisplay").innerHTML = "Your base is located at "+coords;
        document.getElementById("baseHealthDisplay").innerHTML = "Base Health: "+playerObj.base.HealthPoints+ " / 200"; 
    }
}

function clearBaseDisplayData() {
    document.getElementById("baseLocationDisplay").innerHTML = "";
    document.getElementById("baseHealthDisplay").innerHTML = "";
}
 
function placeTroopDisplayData() {
    var playerObj = getStorage("playerObj");
    if (playerObj == "") {
        document.getElementById("troopDisplay").innerHTML = "";
    } else {
        document.getElementById("troopDisplay").classList.remove("hidden");
        for (var i=0; i<playerObj.troops.length; i++) {
            var name = playerObj.troops[i].Name;
            var color = playerObj.player.Color;
            var coords = convertIdToCoordinates(playerObj.troops[i].Location);
            var title = ""+ name + ", " + playerObj.troops[i].HealthPoints +" / "+playerObj.troops[i].MaxHealth + " Health Points";
            // document.getElementById("troopDisplay").innerHTML = "";
            document.getElementById("troopDisplay").innerHTML +=
            "<span class='col-1-1 bottomSpacer'><h3>" + name +
            "<img name="+name+" class='troopPic' id="+'1troopPic'+i+" src=Assets/"+name+color+".png title="+title+"></img></h3>" +
            "<span class='col-1-2'><span> Health Points: "+ playerObj.troops[i].HealthPoints +" / "+playerObj.troops[i].MaxHealth+ "</span><br>"+
            "<span> Attack Damage: "+ playerObj.troops[i].AttackDamage + "</span><br>"+
            "<span> Attack Range: "+ playerObj.troops[i].AttackRange + "</span><br>"+
            "<span> Area of Attack: "+ playerObj.troops[i].AreaOfAttack + "</span></span>"+
            "<span class='col-1-2'><span id='"+i+"location'> Location: "+ coords + "</span><br>"+
            "<span> Visibility: "+ playerObj.troops[i].Visibility + "</span><br>"+
            "<span> Movement Distance: "+ playerObj.troops[i].MovementDistance + "</span><br>"+
            "<span> Unique Move Range: "+ playerObj.troops[i].UniqueRange + "</span></span><br>"+
            "<span class='col-1-1 topSpacer'> Moves: "+ playerObj.troops[i].Moves + "</span></span>";
        }
    }
}

function updateTroopDisplayData() {
    var playerObj = getStorage("playerObj");
    console.log(JSON.stringify(playerObj, null, 4)); 

    if (playerObj == "" || playerObj == undefined) {
        document.getElementById("troopDisplay").innerHTML = "";
    } else {
        document.getElementById("troopDisplay").classList.remove("hidden");
        for (var i=0; i<playerObj.troops.length; i++) {
            var name = playerObj.troops[i].Name;
            var color = playerObj.player.Color;
            var id = playerObj.troops[i].Location;
            var coords = convertIdToCoordinates(id);
            document.getElementById(i+"location").innerHTML =
            "Location: "+ coords;
        }
    }
}

function resetVisibiilityToNone(){
    //make all nodes gray
    for (var k=0; k<400; k++) {
        document.getElementById(k).classList.remove("visible");
        document.getElementById(k).classList.add("not-visible"); 
    }
}

function renderVisibilityForBase(tiles) {
    resetVisibiilityToNone();
    if (tiles != "empty") {
        for (var i=0; i<tiles.length; i++) {
            document.getElementById(tiles[i]).classList.add('visible');
        }
    }
    setStorage('visibleTiles', tiles);
}

function renderVisibleTilesForClient(username, tiles) {
    //console.log('inside renderVisibleTilesForClient! ' + username);
    //console.log(tiles);
    var thisPlayer = getStorage("playerName");
    if (username == thisPlayer){
        //grey out all tiles
        resetVisibiilityToNone();
    if (tiles != "empty") {
        //make white visible tiles
        for (var i=0; i<tiles.length; i++) {
            document.getElementById(tiles[i]).classList.add('visible');
        }
    }
    setStorage('visibleTiles', tiles);
    }
    
}

function returnArrayWithoutDuplicates(a) {
    return Array.from(new Set(a));
}

function convertCoordsToId(x,y) {
    var x = Number(x);
    var y = Number(y);
    var id;
    if (y == 0) {
        id = x;
    } else {
        id = (y*maxRow)+x;
    }
    return id;
}

function convertIdToCoordinates(id) {
    if (id == "tbd"){
        return "tbd";
    }
    var coords = document.getElementById(id).dataset.coords;
    return coords;
}

function showTroopSelected() {
    var tempTroopArray = [];
    tempTroopArray.length = 0;
    if (document.getElementById("scout").checked == true) {
        tempTroopArray.push("scout");
    }
    if (document.getElementById("depthCharge").checked == true) {
        tempTroopArray.push("depthCharge");
    }
    if (document.getElementById("destroyer").checked == true) {
        tempTroopArray.push("destroyer");
    }
    if (document.getElementById("swarm").checked == true) {
        tempTroopArray.push("swarm");
    }
    if (document.getElementById("scan").checked == true) {
        tempTroopArray.push("scan");
    }
    if (document.getElementById("ruskie").checked == true) {
        tempTroopArray.push("ruskie");
    }
    if (document.getElementById("gremlin").checked == true) {
        tempTroopArray.push("gremlin");
    }
    if (document.getElementById("pirate").checked == true) {
        tempTroopArray.push("pirate");
    }
    if (document.getElementById("bombardier").checked == true) {
        tempTroopArray.push("bombardier");
    }
    
    setStorage("tempTroopArray1", tempTroopArray);
    return tempTroopArray;
}

function showAvailableTilesForAction(id, distance) {
    var coords = document.getElementById(id).dataset.coords;
    var distance = parseInt(distance);
    let  goodTileArray = [];
    var startCoords = coords.split(",");
    var startx = Number(startCoords[0]);
    var starty = Number(startCoords[1]);
     //this gets all tiles within appropriate range and styles them as available
     for (var i=Math.max((startx-distance),0); i<Math.min((startx+distance+1),maxRow); i++) {
        for (var j=Math.max((starty-distance),0); j<Math.min((starty+distance+1),maxRow); j++) {
            var goodID = convertCoordsToId(i,j);
            goodTileArray.push(goodID);
            document.getElementById(goodID).classList.add("availableToMove");
            }
        }
        returnArrayWithoutDuplicates(goodTileArray);
        //remove the styling that indicates units are available from move from tiles with units or bases
        removeStylingFromOwnUnitLocationsAndBase(id, goodTileArray);
        setStorage("tilesForMove", goodTileArray);
}

function removeStylingFromOwnUnitLocationsAndBase(id, goodTileArray) {
    var playerObj = getStorage("playerObj");
    //first remove styling from the unit's current location
    //get the locations of the units and remove those as well
    for (var x=0; x<playerObj.troops.length; x++) {
        if (playerObj.troops[x].Location != "tbd") {
        document.getElementById(playerObj.troops[x].Location).classList.remove("availableToMove");
        removeValueFromArray(goodTileArray, playerObj.troops[x].Location);
        }
    }
    //remove the styling from the base
    document.getElementById(playerObj.base.Location).classList.remove("availableToMove");
    removeValueFromArray(goodTileArray, playerObj.base.Location);
}

function removeValueFromArray(array, value) {
    var array = array;
    var search_term = value;
    
    for (var i=array.length-1; i>=0; i--) {
        if (array[i] == search_term) {
            array.splice(i, 1);
            // break;       //<-- Uncomment  if only the first term has to be removed
        }
    }
    return array;
}

function clearAvailableTilesForAction() {
    var tileArray = getStorage("tilesForMove");
    if (tileArray != null && tileArray != undefined) {
        for (var i = 0; i < tileArray.length; i++) {
            document.getElementById(tileArray[i]).classList.remove("availableToMove");
        }
    }
    //clear this array to free up local storage between each move
    setStorage("tilesForMove", "");
}

function verifyLocationForPlacement(id) {
    //this function needs tested thoroughly
  
    var playerLoc = getStorage("playerObj");
    var item = Number(playerLoc.base.Location);
    var top = isOnTopOfGrid(item);
    var left = isOnLeftOfGrid(item);
    var right = isOnRightOfGrid(item);
    var bottom = isOnBottomOfGrid(item);

    var cornerCheck = checkForCorner(top,left,right,bottom);

    if (cornerCheck == "topleft") {
       if ((id == 1) || (id == maxRow) || (id == maxRow+1)) {
           return true;
       } else {
           return false;
       }
    } else if (cornerCheck == "topright") {
        if ((id == item-1) || (id == item+maxRow) || (id == item+maxRow-1)) {
            return true;
        } else {
            return false;
        }
    } else if (cornerCheck == "bottomright") {
        if ((id == item-1) || (id == item-maxRow) || (id == item-maxRow-1)) {
            return true;
        } else {
            return false;
        }
    } else if (cornerCheck == "bottomleft") {
        if ((id == item+1) || (id == item-maxRow) || (id == item-maxRow+1)) {
            return true;
        } else {
            return false;
        }
    } else if (cornerCheck == "top") {
        if ((id == item+1) || (id == item-1) || (id == item+maxRow)) {
            return true;
        } else {
            return false;
        }
    } else if (cornerCheck == "left") {
        if ((id == item+1) || (id == item-maxRow) || (id == item+maxRow)) {
            return true;
        } else {
            return false;
        }
    } else if (cornerCheck == "bottom") {
        if ((id == item-1) || (id == item+1) || (item == item-maxRow)) {
            return true;
        } else {
            return false;
        }
    } else if (cornerCheck == "right") {
        if ((id == item-1) || (id == item-maxRow) || (id == item+maxRow)) {
            return true;
        } else {
            return false;
        }
    } else {
        if ((id == (item+1)) || (id == (item-1)) || (id == (item+maxRow)) || (id == (item-maxRow)) || 
            (id == (item+maxRow-1)) || (id == (item+maxRow+1)) || (id == (item-maxRow-1)) || (id == (item-maxRow+1))) {
            return true;
        } else {
            return false;
        }
    }
}

function progressToFirstMoveOrPause() {
    // set this to false before game kicks off. it will be set True/False later as required
    setStorage("allCoolDowns", "false");

    var username = getStorage("username");
    var gameState = getStorage("gameState");
    var gameState2 = getStorage("gameState2");
    //CHANGE NEXT LINE AND USE CALCULATED STARTING PLAYER
    var activePlayer = getStorage("turnIndicator");
    if ((gameState == "troopsPlaced") && (gameState2 == "troopsPlaced")) {
        //hide alertModal once both players are ready to play if it was used to sync
        triggerHideAlertModal(player);
        //process ActivePlayer Turn, show other player alertModal
        if (activePlayer === username) {    
            triggerAlertModalForPlayerTwo();
        } else if (activePlayer == "player2") {
            triggerAlertModalForPlayerOne();
        }
    } else {
        //if one of the gameStates are not "troopsPlaced" show the one that is the alertModal to sync the game
        var message = "Great job! You are prepared to play. Paused for other player.";
        showAlertModal(message);
        }
}

function addClickEventsTroopPics() {

    if (document.getElementById("1troopPic0") !== null) {
            document.getElementById("1troopPic0").onclick = function() { 
            setActiveUnit(this);
        }
    }
        if (document.getElementById("1troopPic1") !== null) {
            document.getElementById("1troopPic1").onclick = function() { 
            setActiveUnit(this);
        }
    }
        if (document.getElementById("1troopPic2") !== null) {
            document.getElementById("1troopPic2").onclick = function() { 
            setActiveUnit(this);

            }
    }
}

function setActiveUnit(event) {
    clearAvailableTilesForAction();
    clearPlayerColorFromMap();
    clearUniqueEventHandlers(activeUnit);
    
    var playerObj = getStorage("playerObj");
    var name = event.name;
    document.getElementById("gameAlertsLarge").innerHTML = "Active troop is "+ name+". See menu for options.";

    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name == name) {
           
            var activeUnit = playerObj.troops[i];
        }
    }
    
    document.getElementById("rightSideBar").classList.remove("hidden");
    addClickEventsToTurnOptions(activeUnit)
}

function addClickEventsToTurnOptions(activeUnit) {
        //allows clicking the 1,2,3 buttons to prepare 3 types of actions
        document.getElementById("option1").onclick = function() { 
            prepareGameAction(activeUnit, this);
         }
         document.getElementById("option2").onclick = function() { 
            prepareGameAction(activeUnit, this);
         }
         document.getElementById("option3").onclick = function() { 
            prepareGameAction(activeUnit, this);
         }
         document.getElementById("option4").onclick = function() { 
            prepareGameAction(activeUnit, this);
         }
         //this part allows 1,2,3 to also prepare the 3 types of actions
         document.addEventListener('keypress', (event) => {
            const keyName = event.key;
            if (keyName == 1) {
                var sender = {id: "option1"};
                prepareGameAction(activeUnit, sender);
            } else if (keyName == 2) {
                var sender = {id: "option2"};
                prepareGameAction(activeUnit, sender);
            } else if (keyName == 3) {
                var sender = {id: "option3"};
                prepareGameAction(activeUnit, sender);
            } else if (keyName == 4) {
                var sender = {id: "option4"};
                prepareGameAction(activeUnit, sender);
            }
        });
}

function prepareGameAction(activeUnit, event) {
    clearAvailableTilesForAction();
    clearPlayerColorFromMap();
    //TODO -this next function may need improved
    clearUniqueEventHandlers();
    var alertLoc = "gameAlertsSmall";
    var loc = activeUnit.Location;

    if (event.id == "option1") {
        var distance = activeUnit.MovementDistance;
        document.getElementById(alertLoc).innerHTML = "Click the tile you want to move to.";
    } 
    else if (event.id == "option2") {
        var distance = activeUnit.AttackRange;
        document.getElementById(alertLoc).innerHTML = "Click the tile you want to attack.";
    }
    else if (event.id == "option3") {
        var distance = activeUnit.UniqueRange;
        document.getElementById(alertLoc).innerHTML = "Click on the area you want to use the unique move on.";  
    }
    else if (event.id == "option4") {
        populateTroopDetailModalInGame(activeUnit.Name);
    }

    // clear tiles
    clearAvailableTilesForAction();
    
    if (event.id == "option3") {
        displayUniqueMoveTiles(activeUnit);
    } else {
        showAvailableTilesForAction(loc, distance);
    }
    // document.getElementById("currentState").innerHTML = "gameTime";
    // setStorage("gameState", "gameTime");
    setStorage("activeTroop", activeUnit);
    setStorage("moveType", event.id);
}

function performGameAction(id) {
    var moveType = getStorage("moveType");
    var cooldown = checkCoolDown();
    if (cooldown == 0) {
    //will control all things needed to move a unit/progress player turn
        if (moveType == "option1") {
            handlePlayerMove(id);
        }
        //will control all things needed to attack/progress player turn
        else if (moveType == "option2") {
            handlePlayerAttack(id);
        }
        //will control all things needed to use unique move and progress player turn
        else if (moveType == "option3") {
            //if cooldown is 0, function for loading unique move. (put in TroopData)
            handleUniqueMove(id);
        }
    sendTurnActionInfo(moveType);
    }
}

function sendTurnActionInfo(moveType) {
    var activeUnit = getStorage("activeTroop");
    var name = activeUnit.Name;
    var actionInfo;
    //send each moveType down its own path
    //handle move
    if (moveType == "option1") {
        //get new location/old location and their coord values
        var loc = activeUnit.Location;
        loc = document.getElementById(loc).dataset.coords;
        var oldLoc = getStorage("oldLoc");
        oldLoc = document.getElementById(oldLoc).dataset.coords;
        actionInfo = "You moved your "+name+" from "+oldLoc+" to "+loc+".";
    }
    //handle attack
    else if (moveType == "option2") {
        var targetedEnemy = getStorage("targetedEnemy");
        
        if (targetedEnemy != undefined){
            actionInfo = "You attacked the enemy "+targetedEnemy.Name+" with your "+name+" and inflicted "+activeUnit.AttackDamage+" damage. The enemy has "+targetedEnemy.HealthPoints+" health remaining.";
        } else {
            actionInfo = "You attacked an empty location dealing no damage.";
        }
    }
    //handle unique action
    else if (moveType == "option3") {
        var actionInfo = "You used "+activeUnit.UniqueName+"."
    }
    //apply the action info to alert modal
    addActionInfoToAlertModal(actionInfo);
}

function handlePlayerMove(id) {
    var playerObj = getStorage("playerObj");
    var activeUnit = getStorage("activeTroop");
    if (playerObj == undefined || playerObj == "" || activeUnit == undefined || activeUnit == ""){
        alert('error in handlePlayerMove. either playerObj or activeUnit is undefined or empty string');
    }

    var validTile;
    var loc = activeUnit.Location;
    setStorage("oldLoc", loc);

    var inRange = getStorage("tilesForMove");
    //first check that "id" tile is included in the array of available tiles
    if (inRange == null || inRange == undefined || inRange == "") {
        alert('error in handlePlayerMove. inRange is null or undefined or empty string');
    } else {

        var oneValid = false;

        if(inRange.includes(id)){
            validTile = id;
            oneValid = true;
        }

        if (oneValid == false) {
            document.getElementById("gameAlertsSmall").classList.add("redText");
            document.getElementById("gameAlertsSmall").innerHTML = "You can only move to one of the styled tiles.";
            return false;
        }
    }
        // verify the targeted tile is not occupied
    if (document.getElementById(validTile).innerHTML != "") {
        document.getElementById("gameAlertsSmall").classList.add("redText");
        document.getElementById("gameAlertsLarge").innerHTML = "Tile is taken. Cannot move to an occupied tile.";
    } else {
        //play move sound
        playSound("move");
        //get image from current tile
        var pic = document.getElementById(loc).innerHTML;
        //clear image from current tile
        document.getElementById(loc).innerHTML = "";
        //place image in new tile
        document.getElementById(validTile).innerHTML = pic;
        //update troopObj location
        activeUnit.Location = parseInt(validTile);
        var unitName = activeUnit.Name;
        //save the new info for the activeUnit into the playerObj
        for (var i=0; i<playerObj.troops.length; i++) {
            if (playerObj.troops[i].Name == unitName) {
                playerObj.troops[i] = activeUnit;
            }
        }
        
       setStorage("playerObj", playerObj);
       //this is to save ActiveUnit after the changes have been made to location
        setStorage("activeTroop", activeUnit);
        
        removeUnitImageFromOpponent(username, loc);
        updateTroopLocation(unitName, id);
        
        //get rid of availableMove styling
        clearAvailableTilesForAction();
        processTurn();
    }
}

function processTurn() {
    //clear gameAlertsSmall if it had retext and a message
    document.getElementById("gameAlertsSmall").classList.remove("redText");
    document.getElementById("gameAlertsSmall").innerHTML = "";

    placeBaseDisplayData(1);
    updateTroopDisplayData();
    resetCoolDowns();
   
    //var enemyUnitsAllKilled = areEnemyUnitsAllKilled();
    let enemyUnitsAllKilled = false;
    if (enemyUnitsAllKilled === true) {
        signalGameOver(player);
    }

    let otherPlayerAllUnitsOnCooldown = false;
    // var otherPlayerAllUnitsOnCooldown = checkOpponentUnitsForAllCooldowns();
    if (otherPlayerAllUnitsOnCooldown == false) {
        let username = getStorage('username');
        // updateTurnIndicator(opponent);
        signalTurnOver(username);
        setStorage("allCoolDowns", "false");
    } else {
        setStorage("allCoolDowns", "true");
        //all of the otherPlayer's units are on cooldown. Just -=1 each cooldown and current player goes again
        resetCoolDowns();
    }
}

function handlePlayerAttack(id) {
    //get variables needed
    let username = getStorage('username');
    let activeUnit = getStorage("activeTroop");

    //returns true if id (clicked tile) has appropriate styling that indicates it is in range
    var inRange = clientSideCheckAttackRange(id);
    if (!inRange) {
        document.getElementById("gameAlertsLarge").innerHTML = "That is beyond your attack range.";
        return false;
    } else {
        sendAttackToServer(username, activeUnit.Name, id);
        //play attack sound
        playSound("attack");
        clearAvailableTilesForAction();
        processTurn();
    }
}

function checkAttackRange(id) {
    if (document.getElementById(id).classList.contains("availableToMove")) {
        return true;
    } else {
        return false;
    }
}

function clientSideCheckAttackRange(id){
    let currentRange = getStorage('tilesForMove');
    if (currentRange.includes(id)){
        return true;
    }
    return false;
}

function checkTileForEnemyUnit(base, id, otherPlayerObj) {
    for (var z=0; z<otherPlayerObj.troops.length; z++) {
        var loc = otherPlayerObj.troops[z].Location;
            if (id == loc) {
                return true;
        }
    }
        if (id == base) {
            return true
    } else {
        return false;
    }
}

function getTargetedUnit(otherPlayerObj, id) {
    var targetedEnemy = "";
    for (var n=0; n<otherPlayerObj.troops.length; n++) {
        if (otherPlayerObj.troops[n].Location == id) {
             targetedEnemy = otherPlayerObj.troops[n];
            return targetedEnemy;
        }
    }  if (targetedEnemy == "") {
            targetedEnemy = otherPlayerObj.base;
            return targetedEnemy;
    }  
}

function applyDamageForAttack(damage, targetedEnemy, otherPlayer) {
    var healthAfterAttack = (parseInt(targetedEnemy.HealthPoints) - damage);
    if (targetedEnemy.Name == "Base") {
        updateAttackedBaseHealth(otherPlayer, healthAfterAttack);
    }
    if (healthAfterAttack > 0) {
        targetedEnemy.HealthPoints = healthAfterAttack;
        return healthAfterAttack;
    } else {
        //the attack killed the unit. the attacking unit will take its tile
        return 0;
    }
}

function handleUniqueMove(id) {
    var activeUnit = getStorage("activeTroop");
    //ensure active unit has a unique move
    var check = checkActiveUnitForUniqueMove(activeUnit);
    //send unit to its specific unique move function
    if (check == true) {
        routeUniqueMoveForActiveUnit(id);
    }
}

function checkActiveUnitForUniqueMove(activeUnit) {
    var check = false;
    var unitsWithUniqueMoves = ["DepthCharge","Swarm","Scan","Pirate","Bombardier"];
    //check to see if active unit is one with a unique move
    for(var x=0; x<unitsWithUniqueMoves.length; x++) {
        if (unitsWithUniqueMoves[x] == activeUnit.Name) {
            return true;
        } 
    }
    //alert user that the active unit does not have a unique move
    document.getElementById("gameAlertsLarge").innerHTML = "That unit does not have a unique move.";
    return false;
    
}

function updateAttackedBaseHealth(healthAfterAttack) {
    //TODO consolidate the two versions of this into one
        triggerPlayerOneBaseHealth(healthAfterAttack);
        triggerPlayerTwoBaseHealth(healthAfterAttack);
}

//this needs to be moved server side
function resetCoolDowns() {
    var activeUnit = getStorage("activeTroop");
    var name = activeUnit.Name;
    var playerObj = getStorage("playerObj");
    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name != name) {
            var cooldown = parseInt(playerObj.troops[i].Cooldown);
            if (cooldown >= 1) {
            cooldown -= 1;
            playerObj.troops[i].Cooldown = cooldown;
            }
        }
    }
    setStorage("playerObj", playerObj);
}

// function areEnemyUnitsAllKilled(otherPlayer) {
//     var otherPlayerObj = getStorage("playerObj"+otherPlayer);
//     if (otherPlayerObj.troops[0] == "") {
//         return true;
//     }
//     if (otherPlayerObj.troops[0] == null) {
//         return true;
//     }
//     if (otherPlayerObj.troops[0] == 'undefined'){
//         return true;
//     }
//     //else there are units in the otherPlayerObj
//     return false;
// }

function clearTileInnerHtml(loc) {
    document.getElementById(loc).innerHTML = "";
}

function signalGameOver(player) {
    //should trigger a conrats modal with embedded video and maybe some gamestats
    document.getElementById("gameAlertsSmall").innerHTML = "";
    document.getElementById("gameAlertsLarge").innerHTML = "You have known victory!";
    
    hideModalOverlays();
    if (!document.getElementById('alertModal').classList.contains('hidden')){
        document.getElementById('alertModal').classList.add('hidden');
    }
    document.getElementById("finishedModal").classList.remove("hidden");
    $("#finishedModal").modal();
    document.getElementById("finishedAlert").innerHTML = "You are VICTORIOUS!";
    document.getElementById("finishedAlertSmall").innerHTML = "I send you a kaffis of mustard seed, that you may taste and acknowledge the bitterness of my victory. - Alexander da Great";
    document.getElementById("victoryVideo").classList.remove("hidden");
    //TODO --alert the loser of their defeat (replacing following lines)
    if (player == 1) {
        window2.signalGameLoss(player);
    } else if (player == 2) {
        window1.signalGameLoss(player);
    } 
}

function checkPrivateUsers(privateUsers) {
    let username = getStorage('username');
    if (privateUsers.includes(username) == false) {
        //players are not in privateUsers - are not in game
        return false;
    } else {
        //true, players are in privateUsers - are in game
        return true;
    }
}