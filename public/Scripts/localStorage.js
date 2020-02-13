
function clearStorage() {
    localStorage.clear();
    setDefaultStorage();
}

function setStorage(key,info) {
    localStorage.setItem(key, JSON.stringify(info));
}

function getStorage(key) {
    var item = localStorage.getItem(key);
    if(item == undefined){
        alert(key + ' was undefined in Local storage');
    }
    return JSON.parse(item);
}

function setDefaultStorage() {
    //Set Local storage maxRow to 20
    setStorage('maxRow', 20);
    //Set Local storage defaults for playerObj
    setStorage('playerObj', '');
    //Set Local storage Name & Color defaults for player
    setStorage('playerName', '');
    setStorage('playerColor', '');
    //Set Local storage  Name & Color defaults 
    setStorage('playerName2', '');
    setStorage('playerColor2', '');
    //Set Local storage defaults for player
    setStorage('playerBaseLoc', '');
    setStorage('playerBaseLoc2', '');
    //Set Local storage defaults for bases confirmed (placement)
    setStorage('confirmedValue', '0');
    //Set Local storage defaults for turn indicator
    setStorage('turnIndicator', 'Game Setup...');
    //Set Local storage defaults for visibleTiles player1 & player2
    setStorage('visibleTiles', '');
    //Set Local storage defaults for gameState player1 & player2
    setStorage('gameState', '');
    //Set Local storage defaults for alertMessage as used on AlertModal
    setStorage('alertMessage', '');
    //Set Local default storage for username
    setStorage('username', '');
    setStorage('opponent', '');
    setStorage('tempTroopArray1', '');
    setStorage('gameState', '');
    setStorage('gameState2', '');
;}

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


function setStorageNamesAndColorsForPlayerDisplay() {
    var name1 = getStorage('username');
    var name2 = getStorage('opponent');
    var Color1 = getStorage('playerColor');
    var Color2 = getStorage('playerColor2');
    //Don't need compareNames any longer since it is handled earlier in the program -- leaving it for now
    var nameSuccess = compareNames(name1,name2);
    //Don't need compareColors any longer. It is handled earlier in the program -- leaving it for now
    var ColorSuccess = compareColors(Color1,Color2);

    if ((nameSuccess === true) && (ColorSuccess === true)){
        setStorage('nameDisplaysForPlayer', name1+' Vs '+name2);
        return true;
    }
    else {
        if (nameSuccess === true) {
            return ColorSuccess;
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

function compareColors(Color1,Color2) {
    if ((Color1 != '') && (Color2 != '')) { 
    if (Color1 == Color2) {
        playSound('validation');
        var ColorConflict = 'You have selected the same Color as the other player. Please select another Color.';
        return ColorConflict;
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
    var Color = getStorage('playerColor');
    document.getElementById('playerNameDisplay').classList.add(Color+'Text');
    document.getElementById('playerNameDisplay').innerHTML = 'Player: '+getStorage('username');
    //add highlight to the name label background if a dark Color was chosen
    if ((Color == 'green') || (Color == 'blue') || (Color == 'indigo')) {
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

function placeBaseDisplayData(signal, health) {
        var base = document.getElementById("playerBaseLoc").innerHTML;
        var coords = document.getElementById(base).dataset.coords;
        
        if (signal > 0) {
        document.getElementById("baseLocDisplay").innerHTML = "Your base is Located at "+coords;
        document.getElementById("baseHealthDisplay").innerHTML = "Base Health: "+health+ " / 200"; 
    } else {
        document.getElementById("baseLocDisplay").innerHTML = "Your base is Located at "+coords;
        document.getElementById("baseHealthDisplay").innerHTML = "Base Health: 200 / 200";
    }
}

function clearBaseDisplayData() {
    document.getElementById("baseLocDisplay").innerHTML = "";
    document.getElementById("baseHealthDisplay").innerHTML = "";
}
 
function placeTroopDisplayData() {
    var playerObj = getStorage("playerObj");

    if (playerObj == "") {
        alert('playerObj is empty in placeTroopDisplayData and troopDisplay will be erased.');
        document.getElementById("troopDisplay").innerHTML = "";
    } else {

        document.getElementById("troopDisplay").innerHTML = "";
        document.getElementById("troopDisplay").classList.remove("hidden");

        console.log('placeTroopDisplayData amd playerObj.troops has this many units ' + playerObj.troops.length);

        playerObj.troops.forEach(function(item, index) {
            var name = item.Name;
            var Color = getStorage('playerColor');
            var coords = convertIdToCoordinates(item.Loc);
            var title = ""+ name + ", " + item.HealthPoints +" / "+item.MaxHealth + " Health Points";

            document.getElementById("troopDisplay").innerHTML +=
            "<span class='col-1-1 bottomSpacer'><h3>" + name +
            "<img name="+name+" class='troopPic' id="+'1troopPic'+index+" src=Assets/"+name+Color+".png title="+title+"></img></h3>" +
            "<span class='col-1-2'><span> Health Points: "+ item.HealthPoints +" / " + item.MaxHealth+ "</span><br>"+
            "<span> Attack Damage: "+ item.AttackDamage + "</span><br>"+
            "<span> Attack Range: "+ item.AttackRange + "</span><br>"+
            "<span> Area of Attack: "+ item.AreaOfAttack + "</span></span>"+
            "<span class='col-1-2'><span id='"+index+"Loc'> Loc: "+ coords + "</span><br>"+
            "<span> Visibility: "+ item.Visibility + "</span><br>"+
            "<span> Movement Distance: "+ item.MovementDistance + "</span><br>"+
            "<span> Unique Move Range: "+ item.UniqueRange + "</span></span><br>"+
            "<span class='col-1-1 topSpacer'> Moves: "+ item.Moves + "</span></span>";
        })
    }
}

function updateTroopDisplayData() {
    var playerObj = getStorage("playerObj");
    console.log(JSON.stringify(playerObj, null, 4)); 

    if (playerObj == "" || playerObj == undefined) {
        document.getElementById("troopDisplay").innerHTML = "";
        alert('playerObj is empty in updateTroopDisplayData and troopDisplay will be erased.');
    } else {
        document.getElementById("troopDisplay").classList.remove("hidden");
        playerObj.troops.forEach(function(item, index) {
            var id = item.Loc;
            var coords = convertIdToCoordinates(id);
            document.getElementById(index+"Loc").innerHTML =
            "Loc: "+ coords;
        })
    }
}

function updateToolTipData(currentPlayer, unitImage, id){
    let myName = getStorage("username");
    // update tool tips for enemy units first
    if (currentPlayer != myName){
        let div = document.getElementById(id);
        if (div.classList.contains("visible")){
            div.innerHTML = unitImage;
        }
    }
    else{
        let div = document.getElementById(id);
        if (div.classList.contains("visible")){
            div.innerHTML = unitImage;
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
    console.log('inside renderVisibilityForBase tiles is '+ tiles);

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
    removeStylingFromOwnUnitLocsAndBase(id, goodTileArray);
    setStorage("tilesForMove", goodTileArray);
}

function removeStylingFromOwnUnitLocsAndBase(id, goodTileArray) {
    var playerObj = getStorage("playerObj");
    //first remove styling from the unit's current Loc
    //get the Locs of the units and remove those as well
    playerObj.troops.forEach(function(item, index) {
        if (item.Loc != "tbd") {
            document.getElementById(item.Loc).classList.remove("availableToMove");
            removeValueFromArray(goodTileArray, item.Loc);
        }
    })
    //remove the styling from the base
    let baseLoc = document.getElementById('playerBaseLoc').innerHTML;
    if (baseLoc == undefined) { alert('base.Loc is undefined localStorage line 405'); }

    document.getElementById(baseLoc).classList.remove("availableToMove");
    removeValueFromArray(goodTileArray, baseLoc);
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
        for (let i = 0; i < tileArray.length; i++) {
            document.getElementById(tileArray[i]).classList.remove("availableToMove");
        }
    } else {
        //check and clear each tile if tilesForMove did not have tiles to clear
        clearAllTilesForAction();
    }
    //clear this array to free up Local storage between each move
    setStorage("tilesForMove", "");
}

function clearAllTilesForAction(){
    for (let x=0; x<400; x++){
        document.getElementById(x).classList.remove("availableToMove");
    }
    setStorage("tilesForMove", "");
}

function verifyLocationForPlacement(id) {

    var item = document.getElementById("playerBaseLoc").innerHTML;
    item = Number(item);

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
    document.getElementById("gameAlertsSmall").innerHTML = "";
    // set this to false before game kicks off. it will be set True/False later as required
    setStorage("allCoolDowns", "false");
    var gameState = getStorage("gameState");
    var gameState2 = getStorage("gameState2");

    if ((gameState == "troopsPlaced") && (gameState2 == "troopsPlaced")) {

        removeClickEventsTroopPics();

    } else {
        //if one of the gameStates are not "troopsPlaced" show the one that is the alertModal to sync the game
        var message = "Great job! You are prepared to play. Paused for other player.";
        document.getElementById('gameAlertsLarge').innerHTML = message;
        removeClickEventsTroopPics();
        }
}

// Add the onclick events for each node
function addClickEventsForNodes(){
    for (let i=0; i<400; i++){
        document.getElementById(i).addEventListener('click', function(){
            functionSwitch(switchData, this.id);
        });
    }
}

// Remove the onclick event from each node
function removeClickEventsForNodes(){
    for (let i=0; i<400; i++){
        //document.getElementById(i).onclick = null;
        $("#"+i).removeAttr("onclick");
    }
}

// Remove the onclick event from each troop pic
function removeClickEventsTroopPics(){
    for(let i=0; i<3; i++){
        //document.getElementById("1troopPic"+i).onclick = null;
        $("#1troopPic"+i).removeAttr("onclick");
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
    clearAllTilesForAction();
    clearPlayerColorFromMap();
    clearUniqueEventHandlers(activeUnit);
    
    var activeUnit;
    var playerObj = getStorage("playerObj");
    var name = event.name;
    document.getElementById("gameAlertsLarge").innerHTML = "Active troop is "+ name+". See menu for options.";

    //select active unit from playerObj
    playerObj.troops.forEach(function(item) {
        if (item.Name == name) {
            activeUnit = item;
        }
    })
    
    document.getElementById("rightSideBar").classList.remove("hidden");

    if (activeUnit != undefined){
        addClickEventsToTurnOptions(activeUnit);
    } 
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
    var Loc = activeUnit.Loc;

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

    showAvailableTilesForAction(Loc, distance);

    if (event.id == "option3") {
        displayUniqueMoveTiles(activeUnit);
    } 

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
    sendTurnActionInfo(moveType, id);
    }
}

function sendTurnActionInfo(moveType, id) {
    var activeUnit = getStorage("activeTroop");
    var name = activeUnit.Name;
    var actionInfo;
    //send each moveType down its own path
    //handle move
    if (moveType == "option1") {
        //get new Loc/old Loc and their coord values
        var Loc = activeUnit.Loc;
        Loc = document.getElementById(Loc).dataset.coords;
        var oldLoc = getStorage("oldLoc");
        oldLoc = document.getElementById(oldLoc).dataset.coords;
        actionInfo = "You moved your "+name+" from "+oldLoc+" to "+Loc+".";
    }
    //handle attack
    else if (moveType == "option2") {
        let target = document.getElementById(id);
        
        if (target.innerHTML != ""){
            actionInfo = "You attacked the enemy with your "+name+" and inflicted "+activeUnit.AttackDamage+" damage.";
        } else {
            actionInfo = "You attacked an empty Loc dealing no damage.";
        }
    }
    //handle unique action
    else if (moveType == "option3") {
        var actionInfo = "You used "+activeUnit.UniqueName+"."
    }
    //apply the action info to small alert div
    showTurnInfo(actionInfo, "");
}

function handlePlayerMove(id) {
    var playerObj = getStorage("playerObj");
    var activeUnit = getStorage("activeTroop");
    if (playerObj == undefined || playerObj == "" || activeUnit == undefined || activeUnit == ""){
        alert('error in handlePlayerMove. either playerObj or activeUnit is undefined or empty string');
    }

    var validTile;
    var Loc = activeUnit.Loc;
    setStorage("oldLoc", Loc);

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
        var pic = document.getElementById(Loc).innerHTML;
        //clear image from current tile
        document.getElementById(Loc).innerHTML = "";
        //place image in new tile
        document.getElementById(validTile).innerHTML = pic;
        //update troopObj Loc
        activeUnit.Loc = parseInt(validTile);
        var unitName = activeUnit.Name;
        //save the new info for the activeUnit into the playerObj
        for (var i=0; i<playerObj.troops.length; i++) {
            if (playerObj.troops[i].Name == unitName) {
                playerObj.troops[i] = activeUnit;
            }
        }
        
       setStorage("playerObj", playerObj);
       //this is to save ActiveUnit after the changes have been made to Loc
        setStorage("activeTroop", activeUnit);
        
        removeUnitImageFromOpponent(username, Loc);
        updateTroopLocation(unitName, id);
        
        //get rid of availableMove styling
        clearAvailableTilesForAction();
        processTurn();
    }
}

function processTurn() {
    let username = getStorage('username');
    let playerObj = getStorage('playerObj');

    // get the turn info data and place it in gameAlertsSmall

    //clear gameAlertsSmall if it had retext and a message
    document.getElementById("gameAlertsSmall").classList.remove("redText");
    document.getElementById("gameAlertsSmall").innerHTML = "";

    let baseHealth = getBaseHealth();

    placeBaseDisplayData(1, baseHealth);
    placeTroopDisplayData();

    let otherPlayerAllUnitsOnCooldown = false;
    //TODO implement below function
    // var otherPlayerAllUnitsOnCooldown = checkOpponentUnitsForAllCooldowns();
    if (otherPlayerAllUnitsOnCooldown == false) {
        // set state to disabled so this user cannot perform any out-of-turn actions
        document.getElementById('currentState').innerHTML = "disabled";

        // updateTurnIndicator(opponent);
        signalTurnOver(username);
        setStorage("allCoolDowns", "false");
        resetCoolDowns();
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
        var Loc = otherPlayerObj.troops[z].Loc;
            if (id == Loc) {
                return true;
        }
    }
        if (id == base) {
            return true
    } else {
        return false;
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
    var unitsWithUniqueMoves = ["DepthCharge","Swarm","Scan","Pirate","Bombardier", "Blind"];
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

function updateAttackedBaseHealth(HealthAfterAttack) {
    //TODO consolidate the two versions of this into one
        triggerPlayerOneBaseHealth(HealthAfterAttack);
        triggerPlayerTwoBaseHealth(HealthAfterAttack);
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


function clearTileInnerHtml(Loc) {
    document.getElementById(Loc).innerHTML = "";
}

function signalGameVictory() {
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
    document.getElementById("btnGameCenter").classList.remove('hidden');
}

function signalGameDefeat() {
    //should trigger a consolation modal with embedded video and maybe some gamestats
    document.getElementById('gameAlertsSmall').innerHTML = '';
    document.getElementById('gameAlertsLarge').innerHTML = 'You are defeated!';

    hideModalOverlays();
    if (!document.getElementById('alertModal').classList.contains('hidden')){
        document.getElementById('alertModal').classList.add('hidden');
    }

    //playSound("defeat"); //<--- do not have a sound file for this yet
    document.getElementById('finishedModal').classList.remove('hidden');
    $('#finishedModal').modal();
    document.getElementById('finishedAlert').innerHTML = 'You are defeated.';
    document.getElementById('finishedAlertSmall').innerHTML = 'I suggest you read the Art of War then try again.';
    document.getElementById('defeatVideo').classList.remove('hidden');
    document.getElementById("btnGameCenter").classList.remove('hidden');
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

function getBaseHealth(){
    let playerObj = getStorage('playerObj');

    if(playerObj.base.HealthPoints == "" || playerObj.base.HealthPoints == undefined){
        alert('base health is undefined or empty string in getBaseHealth');
    }
    return playerObj.base.HealthPoints;
}