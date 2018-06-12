
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
    setStorage("maxRow", 20);
    //Set local storage defaults for playerObj1 & playerObj2
    setStorage("playerObj1", "");
    setStorage("playerObj2", "");
    //Set local storage Name & Color defaults for player1
    setStorage("playerName1", "");
    setStorage("playerColor1", "");
    //Set local storage  Name & Color defaults for player2
    setStorage("playerName2", "");
    setStorage("playerColor2", "");
    //Set local storage defaults for player1 & player2
    setStorage("playerBaseLocation1", "");
    setStorage("playerBaseLocation2", "");
    //Set local storage defaults for bases confirmed (placement)
    setStorage("confirmedValue", "0");
    //Set local storage defaults for turn indicator
    setStorage("turnIndicator", "Game Setup...");
    //Set local storage defaults for visibleTiles player1 & player2
    setStorage("visibleTiles1", "");
    setStorage("visibleTiles2", "");
    //Set local storage defaults for gameState player1 & player2
    setStorage("gameState1", "");
    setStorage("gameState2", "");
    //Set local storage defaults for alertMessage as used on AlertModal
    setStorage("alertMessage", "");
}

function  setChosenColorInLocalStorage(name, chosenColor, privateUsers) {
    var username = getStorage("username");
    if (username == name) {
        setStorage("playerColor1", chosenColor);
    } else {
        let playerName = checkPrivateUsers(privateUsers);
        if (playerName == true) {
        setStorage("playerColor2", chosenColor);
        }
    }
}

//Changing this from compareNamesAndColors to setStorageNamesAndColorsForPlayerDisplay because name and color validation happens earlier than it did in pre-node version
function setStorageNamesAndColorsForPlayerDisplay() {
    var name1 = getStorage("username");
    var name2 = getStorage("opponent");
    var color1 = getStorage("playerColor1");
    var color2 = getStorage("playerColor2");
    //Don't need compareNames any longer since it is handled earlier in the program -- leaving it for now
    var nameSuccess = compareNames(name1,name2);
    //Don't need compareColors any longer. It is handled earlier in the program -- leaving it for now
    var colorSuccess = compareColors(color1,color2);

    if ((nameSuccess === true) && (colorSuccess === true)){
        setStorage("nameDisplaysForPlayer1", name1+" Vs "+name2);
        setStorage("nameDisplaysForPlayer2", name2+" Vs "+name1);
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
    if ((name1 != "") && (name2 != "")) { 
    if (name1 == name2) {
        playSound("validation");
        var nameConflict = "You have chosen the same name as the other player. Please enter another name.";
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
    if ((color1 != "") && (color2 != "")) { 
    if (color1 == color2) {
        playSound("validation");
        var colorConflict = "You have selected the same color as the other player. Please select another color.";
        return colorConflict;
    }
    else {
        return true;
        }
    }
    else return true;
}

function isOnTopOfGrid(item) {
    var maxRow = getStorage("maxRow");
    if (item <= maxRow-1) {
        return true;
    } else {
        return false;
    }
}

function isOnLeftOfGrid(item) {
    var maxRow = getStorage("maxRow");
    if ((item == 0) || (item % maxRow == 0)) {
        return true;
    } else {
        return false;
    }
}

function isOnRightOfGrid(item) {
    var maxRow = getStorage("maxRow");
    if (item+1 % maxRow == 0) {
        return true;
    } else {
        return false;
    }
}

function isOnBottomOfGrid(item) {
    var maxRow = getStorage("maxRow");
    if ((item < maxRow*maxRow) && (item >= maxRow*maxRow-maxRow)) {
        return true;
    } else {
        return false;
    }
}

function checkForCorner(top,left,right,bottom) {
    if (top && left) {
        return "topleft";
    } else if (top && right) {
        return "topright";
    } else if (bottom && left) {
        return "bottomleft";
    } else if (bottom && right) {
        return "bottomright";
    }
    else {
         return false;
    }
}

function placeNameDisplayData(player) {
    var color = getStorage("playerColor"+player);
    document.getElementById('playerNameDisplay').classList.add(color+"Text");
    document.getElementById('playerNameDisplay').innerHTML = "Player: "+getStorage("playerName1");
    //add highlight to the name label background if a dark color was chosen
    if ((color == "green") || (color == "blue") || (color == "indigo")) {
        document.getElementById('playerNameDisplay').classList.add('highlight');
    }
}

function placeTurnIndicatorData() {
    var name = getStorage("username");
    var playerTurn = getStorage("turnIndicator");
    if (playerTurn == ("Game Setup...")) {
        document.getElementById("turnIndicator").innerHTML = playerTurn;
        return;
    }
    else if (playerTurn == name) {
            document.getElementById("turnIndicator").innerHTML = "Your Turn";
        } else {
            document.getElementById("turnIndicator").innerHTML = "Their Turn";
        }
}

function placeBaseDisplayData(player, playerObj) {
        if (player == 1) {
            var base = document.getElementById("playerBaseLocation1").innerHTML;
        } else {
            var base = document.getElementById("playerBaseLocation2").innerHTML;
        }
        var coords = document.getElementById(base).dataset.coords;
        document.getElementById("baseLocationDisplay").innerHTML = "Your base is located at "+coords;
        document.getElementById("baseHealthDisplay").innerHTML = "Base Health: 200 / 200";
        if (playerObj != null) {
        document.getElementById("baseLocationDisplay").innerHTML = "Your base is located at "+coords;
        document.getElementById("baseHealthDisplay").innerHTML = "Base Health: "+playerObj.base.HealthPoints+ " / 200"; 
    }
}

function clearBaseDisplayData() {
    document.getElementById("baseLocationDisplay").innerHTML = "";
    document.getElementById("baseHealthDisplay").innerHTML = "";
}
 
function placeTroopDisplayData(player) {
    var playerObj = getStorage("playerObj"+player);
    if (playerObj == "") {
        document.getElementById("troopDisplay").innerHTML = "";
    } else {
        document.getElementById("troopDisplay").classList.remove("hidden");
        for (var i=0; i<playerObj.troops.length; i++) {
            var name = playerObj.troops[i].Name;
            var color = playerObj.player.Color;
            var coords = convertIdToCoordinates(playerObj.troops[i].Location);
            // document.getElementById("troopDisplay").innerHTML = "";
            document.getElementById("troopDisplay").innerHTML +=
            "<span class='col-1-1 bottomSpacer'><h3>" + name +
            "<img name="+name+" class='troopPic' id="+player+'troopPic'+i+" src=Assets/"+name+color+".png></img></h3>" +
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

function updateTroopDisplayData(player) {
    var playerObj = getStorage("playerObj"+player);
    if (playerObj == "") {
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
    // if (player == 1) {
    //     triggerPlayerTwoTroopDisplayData();
    // } else {
    //     triggerPlayerOneTroopDisplayData();
    // }
}

function updateVisibility(player) {
    var player = convertPlayerToNumber(player);
    // resetVisibiilityToNone();
    resetVisibilityForBase(player);
    resetVisibilityForTroops(player);
    // makeVisibleOtherPlayersUnits(player);
    // makeVisibleOtherPlayersUnits(otherPlayer);
}

function resetVisibiilityToNone(){
    var maxRow = parseInt(getStorage("maxRow"));
    //make all nodes gray
    for (var k=0; k<(maxRow*maxRow); k++) {
        document.getElementById(k).classList.remove("visible");
        document.getElementById(k).classList.add("not-visible"); 
    }
}

function resetVisibilityForBase(player) {
    if (player === 2) { return; }
    resetVisibiilityToNone();
    var base = getStorage("playerBaseLocation"+player);
    //ensure base isn't empty
    if (base != "") {
    let tiles = [];
    var coords = document.getElementById(base).dataset.coords;
    var baseCoords = coords.split(",");
    var b1x = Number(baseCoords[0]);
    var b1y = Number(baseCoords[1]);
     //this grabs all tiles within 2 of the base and makes them visible
     for (var i=Math.max((b1x-2),0); i<Math.min((b1x+3),maxRow); i++) {
        for (var j=Math.max((b1y-2),0); j<Math.min((b1y+3),maxRow); j++) {
            var id = convertCoordsToId(i,j);
            tiles.push(id);
            document.getElementById(id).classList.remove("not-visible");
            document.getElementById(id).classList.add("visible");
            }
        }
        setStorage('visibleTiles1', tiles);
    }
}

function resetVisibilityForTroops(player) {
    var username = getStorage('username');
    var visibleArray = getStorage("visibleTiles"+player);
    if (visibleArray == "") {
        var visibleTileArray = [];
    } else {
        var visibleTileArray = visibleArray;
    }
    var playerObj = getStorage("playerObj"+player);
    
    if ((playerObj != "") && (playerObj != null)){
        for (var c=0; c<playerObj.troops.length; c++){
            if (playerObj.troops[c].Location != "tbd") {
                var troopLocation = playerObj.troops[c].Location;
                var visibility = playerObj.troops[c].Visibility;
                var troopCoords = document.getElementById(troopLocation).dataset.coords;
                var tCoordsArray = troopCoords.split(",");
                var tx = Number(tCoordsArray[0]);
                var ty = Number(tCoordsArray[1]);
                for (var m=Math.max((tx-visibility),0); m<Math.min((tx+visibility+1),maxRow); m++) {
                    for (var n=Math.max((ty-visibility),0); n<Math.min((ty+visibility+1),maxRow); n++) {
                        var id = convertCoordsToId(m,n);
                        document.getElementById(id).classList.remove("not-visible");
                        document.getElementById(id).classList.add("visible");
                        visibleTileArray.push(id);
                    }   
                }
            }
        }
        visibleTileArray = returnArrayWithoutDuplicates(visibleTileArray);
        for (var k=0; k<visibleTileArray.length; k++) {
            if (document.getElementById(visibleTileArray[k]).classList.contains("not-visible")) {
                document.getElementById(visibleTileArray[k]).classList.remove("not-visible");
                document.getElementById(visibleTileArray[k]).classList.add("visible");
            }
        }
        setStorage("visibleTiles"+player, visibleTileArray);
        saveVisibletilesToServer(username, visibleTileArray);
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

function showTroopSelected(player) {
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
    if (player == 1){
        setStorage("tempTroopArray1", tempTroopArray);
    } else {
        setStorage("tempTroopArray2", tempTroopArray);
    }
    
    return tempTroopArray;
}

function showAvailableTilesForAction(id, distance, player) {
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
        removeStylingFromOwnUnitLocationsAndBase(id, player, goodTileArray);
        setStorage("tilesForMove"+player, goodTileArray);
}

function removeStylingFromOwnUnitLocationsAndBase(id, player, goodTileArray) {
    var playerObj = getStorage("playerObj"+player);
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

function clearAvailableTilesForAction(player) {
    var tileArray = getStorage("tilesForMove"+player);
    if (tileArray != null) {
        for (var i = 0; i < tileArray.length; i++) {
            document.getElementById(tileArray[i]).classList.remove("availableToMove");
        }
    }
    //clear this array to free up local storage between each move
    setStorage("tilesForMove"+player, "");
}

function verifyLocationForPlacement(player, id) {
    //this function needs tested thoroughly
    if (player != 1) {
        var playerLoc = getStorage("playerObj2");
    } else {
        var playerLoc = getStorage("playerObj1");
    }
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

function progressToFirstMoveOrPause(player) {
    var numberOfPlayers = getStorage("numberOfPlayers");
    if (numberOfPlayers == 2) {
    setStorage("turnIndicator", "player1");
    var playerObj1 = getStorage("playerObj1");
    var playerObj2 = getStorage("playerObj2");
    var gameState1 = getStorage("gameState1");
    var gameState2 = getStorage("gameState2");
    var activePlayer = getStorage("turnIndicator");
    if ((gameState1 == "troopsPlaced") && (gameState2 == "troopsPlaced")) {
        //hide alertModal once both players are ready to play if it was used to sync
        triggerHideAlertModal(player);
        //process ActivePlayer Turn, show other player alertModal
        if (activePlayer == "player1") {    
            triggerAlertModalForPlayerTwo();
        } else if (activePlayer == "player2") {
            triggerAlertModalForPlayerOne();
        }
    } else {
        //if one of the gameStates are not "troopsPlaced" show the one that is the alertModal to sync the game
        setStorage("alertMessage", "Great job! You are prepared to play. Paused for other player.")
        showAlertModal(player);
        }
    } else {
        document.getElementById("gameAlertsLarge1").innerHTML = "Click the picture of the unit you'd like to activate.";
        addClickEventsTroopPics(1);
    } 
}

function addClickEventsTroopPics(player) {
    if (player == 1) {
        if (document.getElementById("1troopPic0") !== null) {
            document.getElementById("1troopPic0").onclick = function() { 
                setActiveUnit(player, this);
            }
         }
         if (document.getElementById("1troopPic1") !== null) {
            document.getElementById("1troopPic1").onclick = function() { 
                setActiveUnit(player, this);
            }
         }
         if (document.getElementById("1troopPic2") !== null) {
            document.getElementById("1troopPic2").onclick = function() { 
                setActiveUnit(player, this);
            }
         }
    } else {
        if (document.getElementById("2troopPic0") !== null) {
            document.getElementById("2troopPic0").onclick = function() { 
                setActiveUnit(player, this);
            }
         }
         if (document.getElementById("2troopPic1") !== null) {
            document.getElementById("2troopPic1").onclick = function() { 
                setActiveUnit(player, this);
            }
         }
         if (document.getElementById("2troopPic2") !== null) {
            document.getElementById("2troopPic2").onclick = function() { 
                setActiveUnit(player, this);
            }
         }
    }
}

function setActiveUnit(player, event) {
    clearAvailableTilesForAction(player);
    clearPlayerColorFromMap(player);
    clearUniqueEventHandlers(player, activeUnit);
    
    var playerObj = getStorage("playerObj"+player);
    var activePhoto = event.id;
    var name = event.name;
    var activeTroop = ("player"+player+event.name);
    document.getElementById("gameAlertsLarge"+player).innerHTML = "Active troop is "+ name+". See menu for options.";

    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name == name) {
           
            var activeUnit = playerObj.troops[i];
        }
    }
    
    document.getElementById("rightSideBar").classList.remove("hidden");
    addClickEventsToTurnOptions(player, activeUnit)
    
}

function addClickEventsToTurnOptions(player, activeUnit) {
        //allows clicking the 1,2,3 buttons to prepare 3 types of actions
        document.getElementById("option1").onclick = function() { 
            prepareGameAction(player, activeUnit, this);
         }
         document.getElementById("option2").onclick = function() { 
            prepareGameAction(player, activeUnit, this);
         }
         document.getElementById("option3").onclick = function() { 
            prepareGameAction(player, activeUnit, this);
         }
         document.getElementById("option4").onclick = function() { 
            prepareGameAction(player, activeUnit, this);
         }
         //this part allows 1,2,3 to also prepare the 3 types of actions
         document.addEventListener('keypress', (event) => {
            const keyName = event.key;
            if (keyName == 1) {
                var sender = {id: "option1"};
                prepareGameAction(player, activeUnit, sender);
            } else if (keyName == 2) {
                var sender = {id: "option2"};
                prepareGameAction(player, activeUnit, sender);
            } else if (keyName == 3) {
                var sender = {id: "option3"};
                prepareGameAction(player, activeUnit, sender);
            } else if (keyName == 4) {
                var sender = {id: "option4"};
                prepareGameAction(player, activeUnit, sender);
            }
        });
}

function prepareGameAction(player, activeUnit, event) {
    clearAvailableTilesForAction(player);
    clearPlayerColorFromMap(player);
    clearUniqueEventHandlers(player, activeUnit);
    var alertLoc = "gameAlertsSmall"+player;
    var coords = document.getElementById(activeUnit.Location).dataset.coords;
    var loc = activeUnit.Location;
    if (player == 1) {
        var playerObj = getStorage("playerObj1");
    } else {
        var playerObj = getStorage("playerObj2");
    }

    if (event.id == "option1") {
        var distance = activeUnit.MovementDistance;
        document.getElementById(alertLoc).innerHTML = "Click the tile you want to move to.";
    } 
    else if (event.id == "option2") {
        var distance = activeUnit.AttackRange;
        document.getElementById(alertLoc).innerHTML = "Click the tile you want to attack. If you click an"+
        " empty tile you are in effect passing your turn.";
    }
    else if (event.id == "option3") {
        var distance = activeUnit.UniqueRange;
        document.getElementById(alertLoc).innerHTML = "Click on the area you want to use the unique move on.";  
    }
    else if (event.id == "option4") {
        populateTroopDetailModalInGame(activeUnit.Name, player);
    }
    clearAvailableTilesForAction(player);
    showAvailableTilesForAction(loc, distance, player);
    if (event.id == "option3") {
        displayUniqueMoveTiles(activeUnit, player);
    }
    document.getElementById("currentState").innerHTML = "gameTime";
    setStorage("gameState"+player, "gameTime");
    setStorage("activeTroop", activeUnit);
    setStorage("moveType", event.id);
}

function performGameAction(player, id) {
    var moveType = getStorage("moveType");
    var activeUnit = getStorage("activeTroop");
    var cooldown = checkCoolDown(activeUnit, player);
    if (cooldown == 0) {
    //will control all things needed to move a unit/progress player turn
    if (moveType == "option1") {
        handlePlayerMove(player, id);
    }
    //will control all things needed to attack/progress player turn
    else if (moveType == "option2") {
        handlePlayerAttack(player, id);
    }
    //will control all things needed to use unique move and progress player turn
    else if (moveType == "option3") {
        //if cooldown is 0, function for loading unique move. (put in TroopData)
        handleUniqueMove(player, id);
        }
    sendTurnActionInfo(moveType, player);
    }
}

function sendTurnActionInfo(moveType, player) {
    var player = convertPlayerToNumber(player);
    var activeUnit = getStorage("activeTroop");
    var name = activeUnit.Name;
    var otherPlayer = (player == 1 ? 2 : 1);
    //send each moveType down its own path
        //handle move
    if (moveType == "option1") {
        //get new location/old location and their coord values
        var loc = activeUnit.Location;
        loc = document.getElementById(loc).dataset.coords;
        var oldLoc = getStorage("oldLoc");
        oldLoc = document.getElementById(oldLoc).dataset.coords;
        var actionInfo = "You moved your "+name+" from "+oldLoc+" to "+loc+".";
    }
        //handle attack
    else if (moveType == "option2") {
        var targetedEnemy = getStorage("targetedEnemy");
        var actionInfo = "You attacked the enemy "+targetedEnemy.Name+" with your "+name+" and inflicted "+activeUnit.AttackDamage+" damage. The enemy has "+targetedEnemy.HealthPoints+" health remaining.";
    }
        //handle unique action
    else if (moveType == "option3") {
        var actionInfo = "You used "+activeUnit.UniqueName+"."
    }
        //apply the action info to alert modal
        addActionInfoToAlertModal(actionInfo, player);

}

function handlePlayerMove(player, id) {
    var playerObj = getStorage("playerObj"+player);
    var activeUnit = getStorage("activeTroop");
    if (activeUnit != null) {
        var loc = activeUnit.Location;
        setStorage("oldLoc", loc);
    }
    var inRange = getStorage("tilesForMove"+player);
    //first check that "id" tile is included in the array of available tiles
    if (inRange != null) {
        var oneValid = false;
    for (var i=0; i<inRange.length; i++) {
        if (id == inRange[i]) {
            var validTile = id;
            oneValid = true;
            }
        }
            if (oneValid == false) {
                document.getElementById("gameAlertsSmall"+player).classList.add("redText");
                document.getElementById("gameAlertsSmall"+player).innerHTML = "You can only move to one of the styled tiles.";
                return false;
            }
        }
        // verify the targeted tile is not occupied
    if (document.getElementById(validTile).innerHTML != "") {
        document.getElementById("gameAlertsSmall"+player).classList.add("redText");
        document.getElementById("gameAlertsLarge"+player).innerHTML = "That tile is taken. You cannot move to a taken tile.";
    } else {
        //check cooldown
        // var cooldown = checkCoolDown(activeUnit, player);
        // if (cooldown == 0) {
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
        var name = activeUnit.Name;
        //save the new info for the activeUnit into the playerObj
        for (var i=0; i<playerObj.troops.length; i++) {
            if (playerObj.troops[i].Name == name) {
                playerObj.troops[i] = activeUnit;
            }
        }
        //clear gameAlertsSmall if it had retext and a message
        document.getElementById("gameAlertsSmall"+player).classList.remove("redText");
        document.getElementById("gameAlertsSmall"+player).innerHTML = "";
       setStorage("playerObj"+player, playerObj);
       //this is to save ActiveUnit after the changes have been made to location
        setStorage("activeTroop", activeUnit);
        //get rid of availableMove styling
        clearAvailableTilesForAction(player);
        processTurn(player);
        // } 
    }
}

function processTurn(player) {
    var player = convertPlayerToNumber(player);
    var playerObj = getStorage("playerObj"+player);
    document.getElementById("gameAlertsSmall"+player).classList.remove("redText");
    document.getElementById("gameAlertsSmall"+player).innerHTML = "";
    var otherPlayer = (player == 1 ? 2 : 1);
    placeTurnIndicatorData(player);
    placeBaseDisplayData(player, playerObj);
    updateTroopDisplayData(player);
    resetVisibilityForTroops(player);
    //one of these for each player, will fetch the most up to date player info
    makeVisibleOtherPlayersUnits(player);
    makeVisibleOtherPlayersUnits(otherPlayer);
    resetCoolDowns(player);
    //this needs tested
    var enemyUnitsAllKilled = areEnemyUnitsAllKilled(otherPlayer);
    if (enemyUnitsAllKilled == true) {
        signalGameOver(player);
    }
    var otherPlayerAllUnitsOnCooldown = checkUnitsForAllCooldowns(otherPlayer);
    if (otherPlayerAllUnitsOnCooldown == false) {
    switchActivePlayer(player);
    setStorage("allCoolDowns", "false");
    } else {
        setStorage("allCoolDowns", "true");
        //all of the otherPlayer's units are on cooldown. Just -=1 each cooldown and current player goes again
        resetCoolDowns(otherPlayer);
    }
}

function getOtherPlayerTroopImages(username, makeKnown) {
    
}

function handlePlayerAttack(player, id) {
    var player = convertPlayerToNumber(player);
    //get variables needed
    var otherPlayer = (player == 1 ? 2 : 1);
    var playerObj = getStorage("playerObj" + player);
    var otherPlayerObj = getStorage("playerObj" + otherPlayer);
    var otherBase = otherPlayerObj.base.Location;
    var activeUnit = getStorage("activeTroop");
    var targetFound = false;
        //returns true if id (clicked tile) has appropriate styling that indicates it is in range
        var inRange = checkAttackRange(id);
        if (inRange !== true) {
            document.getElementById("gameAlertsLarge"+player).innerHTML = "That is beyond your attack range.";
            return false;
        } else {
        //returns true if clicked tile has enemy unit or base
        var check = checkTileForEnemyUnit(otherBase, id, otherPlayerObj);
        if (check == true){
            //take the damage amount from activeTroop and subtract that from the unit's health or baseHealth
            var damage = parseInt(activeUnit.AttackDamage);
            var targetedEnemy = getTargetedUnit(otherPlayerObj, id);
            var healthRemaining = applyDamageForAttack(damage, targetedEnemy, otherPlayer);
            var loc = targetedEnemy.Location;
            //play attack sound
            playSound("attack");
            targetedEnemy.HealthPoints = healthRemaining;
            setStorage("targetedEnemy", targetedEnemy);
                if (healthRemaining == 0) {
                    //if unit dies, attacker will move to that tile -- remove unit image 
                    var oldInnerHtml = document.getElementById(activeUnit.Location).innerHTML;
                    document.getElementById(loc).innerHTML = oldInnerHtml;
                    document.getElementById(activeUnit.Location).innerHTML = "";
                    activeUnit.Location = loc;
                    var name = activeUnit.Name;
                    //if activeUnit is a troop save the new info into the playerObj
                    var saved = false;
                    for (var i=0; i<playerObj.troops.length; i++) {
                        if (playerObj.troops[i].Name == name) {
                           
                            playerObj.troops[i] = activeUnit;
                            saved = true;
                        }
                    }

                    // this will remove unit from playerObj
                    determineWhichUnitKilled(otherPlayerObj, targetedEnemy, player); 
                }
            //save both playerObjects after
            setStorage("playerObj"+player, playerObj);
            setStorage("playerObj"+otherPlayer, otherPlayerObj);
        } else {
            //attacked an empty tile -- turn passes
        }
    clearAvailableTilesForAction(player);
    processTurn(player);
    }
}

function checkAttackRange(id) {
    if (document.getElementById(id).classList.contains("availableToMove")) {
        return true;
    } else {
        return false;
    }
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

function determineWhichUnitKilled(otherPlayerObj, targetedEnemy, player) {
    var player = convertPlayerToNumber(player);
    var otherPlayer = (player == 1 ? 2 : 1);
    if (targetedEnemy.Name == "Base") {
        //this will trigger a win for attacking player
        signalGameOver(player);
    } else {
        //remove this value from makeKnown array so the innerHTML doesn't get cleared in makeVisibleOtherPlayersUnits()
        var location = targetedEnemy.Location;
        var makeKnown = getStorage("makeKnown"+player);
        var indexOfTarget = makeKnown.indexOf(location);
        makeKnown.splice(indexOfTarget, 1);
        setStorage("makeKnown"+player, makeKnown);
        //this finds and removes the killed unit from the playerObj
        for (var n=0; n<otherPlayerObj.troops.length; n++) {
            if (otherPlayerObj.troops[n].Name == targetedEnemy.Name) {
                (otherPlayerObj.troops).splice(n,1);
            }   
        }
        setStorage("playerObj"+otherPlayer, otherPlayerObj);
    }
}

function handleUniqueMove(player, id) {
    //get needed variables
    var playerObj = getStorage("playerObj"+player);
    var activeUnit = getStorage("activeTroop");
    //ensure active unit has a unique move
    var check = checkActiveUnitForUniqueMove(activeUnit, player);
    //send unit to its specific unique move function
    if (check == true) {
        routeUniqueMoveForActiveUnit(player, id);
    }
}

function checkActiveUnitForUniqueMove(activeUnit, player) {
    var check = false;
    var unitsWithUniqueMoves = ["DepthCharge","Swarm","Scan","Pirate","Bombardier"];
    //check to see if active unit is one with a unique move
    for(var x=0; x<unitsWithUniqueMoves.length; x++) {
        if (unitsWithUniqueMoves[x] == activeUnit.Name) {
            check = true;
        } 
    }
    if (check == true) 
        { return check; } else {
            //alert user that the active unit does not have a unique move
            document.getElementById("gameAlertsLarge"+player).innerHTML = "That unit does not have a unique move.";
            return false;
    }
}

function updateAttackedBaseHealth(otherPlayer, healthAfterAttack) {
    if (otherPlayer == 1) {
        triggerPlayerOneBaseHealth(healthAfterAttack);
    } else if (otherPlayer == 2) {
        triggerPlayerTwoBaseHealth(healthAfterAttack);
    }
}

function checkUnitsForAllCooldowns(otherPlayer) {
    var otherPlayerObj = getStorage("playerObj"+otherPlayer);
    var allOnCooldown = true;
    for (var i=0; i<otherPlayerObj.troops.length; i++) {
        if (otherPlayerObj.troops[i].Cooldown == 0) {
            allOnCooldown = false;
        }
        if (allOnCooldown == false) {
            return false;
        }
    }
     
    return true;
}

function resetCoolDowns(player) {
    var activeUnit = getStorage("activeTroop");
    var name = activeUnit.Name;
    var playerObj = getStorage("playerObj"+player);
    for (var i=0; i<playerObj.troops.length; i++) {
        if (playerObj.troops[i].Name != name) {
            var cooldown = parseInt(playerObj.troops[i].Cooldown);
            if (cooldown >= 1) {
            cooldown -= 1;
            playerObj.troops[i].Cooldown = cooldown;
            }
        }
    }
    setStorage("playerObj"+player, playerObj);
}

function areEnemyUnitsAllKilled(otherPlayer) {
    var otherPlayerObj = getStorage("playerObj"+otherPlayer);
    if (otherPlayerObj.troops[0] == "") {
        return true;
    }
    if (otherPlayerObj.troops[0] == null) {
        return true;
    }
    if (otherPlayerObj.troops[0] == 'undefined'){
        return true;
    }
    //else there are units in the otherPlayerObj
    return false;
}

function clearTileInnerHtml(loc, player) {
    document.getElementById(loc).innerHTML = "";
    if (player == 1) {
        window2.clearSingleTileInnerHtml(loc);
    } else if (player ==2) {
        window1.clearSingleTileInnerHtml(loc);
    }
}

function signalGameOver(player) {
    //should trigger a conrats modal with embedded video and maybe some gamestats
    document.getElementById("gameAlertsSmall"+player).innerHTML = "";
    document.getElementById("gameAlertsLarge"+player).innerHTML = "You have known victory!";
    
    hideModalOverlays();
    if (!document.getElementById('alertModal').classList.contains('hidden')){
        document.getElementById('alertModal').classList.add('hidden');
    }
    document.getElementById("finishedModal").classList.remove("hidden");
    $("#finishedModal").modal();
    document.getElementById("finishedAlert").innerHTML = "You are VICTORIOUS!";
    document.getElementById("finishedAlertSmall").innerHTML = "I send you a kaffis of mustard seed, that you may taste and acknowledge the bitterness of my victory. - Alexander da Great";
    document.getElementById("victoryVideo").classList.remove("hidden");
    //alert the loser of their defeat
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