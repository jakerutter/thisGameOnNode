var window2;
//window2.callAlert();  example how to call window2 function

//canvas that is drawn on body.onload and sits in the background
function generateBackground() {
    //error here
    drawing();
    var command = "playIntro";
    // playSound(command);
}

function drawing() {
	var c = document.getElementById('firstCanvas');
    var ctx = c.getContext('2d');
	var xMax = c.width = window.screen.availWidth;
	var yMax = c.height = window.screen.availHeight;
    var rotateBy = 0;
    var hmTimes = Math.round(xMax + yMax);
    
    //uncomment this timer to make the background grow more densly starred
    // var id = setInterval(frame, 500);
    function frame(){
        if (rotateBy > 10){
            clearInterval(id);
        } else {
	        for(var i=0; i<=hmTimes; i++) {
	            var randomX = Math.floor((Math.random()*xMax)+1);
                var randomY = Math.floor((Math.random()*yMax)+1);
                var randomSize = Math.floor((Math.random()*2)+1);
                var randomOpacityOne = Math.floor((Math.random()*9)+1);
                var randomOpacityTwo = Math.floor((Math.random()*9)+1);
                var randomHue = Math.floor((Math.random()*360)+1);
                if(randomSize>1) {
                ctx.shadowBlur = Math.floor((Math.random()*15)+5);
                ctx.shadowColor = color(255,255,255);
                }
                ctx.fillStyle = color("hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")");
                ctx.fillRect(randomX, randomY, randomSize, randomSize);
            }
                ctx.save();
                ctx.restore();
                ctx.translate(c.width/50, c.height/50);
                ctx.rotate(rotateBy);
                rotateBy += .01;
        }
    }
    //remove this function call if you decide to turn the timer back on
    frame();    
    
}

function welcomeModal() {
    setStorage('numberOfPlayers', 2);
    document.getElementById('welcomeModal').classList.remove('hidden');
     
    setDefaultStorage();
 
    var chosenColor = document.getElementById('playerColorSelect');
    chosenColor.value = document.getElementById('playerColorSelection').innerHTML;
    var nameField = document.getElementById('playerName');
    nameField.value = document.getElementById('playerNameSelection').innerHTML;   
}

function showWelcomeModal() {
     document.getElementById('welcomeModal').classList.remove('hidden');
    $("#welcomeModal").modal();
}

function hideWelcomeModal() {
    document.getElementById('leftSideBarH3').classList.remove('hidden');
    var chosenColor = document.getElementById('playerColorSelection').innerHTML;
    claimSelectedColor(chosenColor);
    var playerName = getStorage('username');
    document.getElementById('playerNameSelection').innerHTML = playerName;
    setStorage("playerName", playerName);
    setStorage("playerColor", chosenColor);
    placeNameDisplayData();
    var stage = "intro";
    placeTurnIndicatorData(stage);
    $.modal.close();
    hideModalOverlays();
    //color the action buttons the player's color
    document.getElementById("option1").style.backgroundColor = chosenColor;
    document.getElementById("option2").style.backgroundColor = chosenColor;
    document.getElementById("option3").style.backgroundColor = chosenColor;
    document.getElementById("option4").style.backgroundColor = chosenColor;
    if ((document.getElementById('playerColorSelection').innerHTML == "") || (document.getElementById('playerNameSelection').innerHTML == "")){
        document.getElementById('welcomeAlert').innerHTML = "You must submit player info to continue.";
        welcomeModal();
    } else {
    var continueOn = setStorageNamesAndColorsForPlayerDisplay();
    if (continueOn == true) {
        startGame();
    }
        else {
            document.getElementById('welcomeAlert').classList.add('redText');
            document.getElementById('welcomeAlert').innerHTML = continueOn;
            welcomeModal();
        }
    }
}

function settingsModal(){
    var playerName = document.getElementById('playerName').value;
    document.getElementById('playerNameSelection').innerHTML = playerName;
    hideModalOverlays();
    document.getElementById('settingsModal').classList.remove('hidden');
    $("#settingsModal").modal();
}

function hideSettingsModal() {
    $.modal.close();
    hideModalOverlays();
    showWelcomeModal();
}

function hideModalOverlays() {
    var modalContainer = document.getElementById('simplemodal-container');
    var modalOverlay = document.getElementById('simplemodal-overlay');
    if ($(modalContainer).length){
        document.getElementById('simplemodal-container').classList.add('behind');
        document.getElementById('simplemodal-container').classList.add('hidden');
     }
     if ($(modalOverlay).length){
        document.getElementById('simplemodal-overlay').classList.add('behind');
        document.getElementById('simplemodal-overlay').classList.add('hidden');
     }
     if (!document.getElementById('welcomeModal').classList.contains('hidden')){
        document.getElementById('welcomeModal').classList.add('hidden');
    }
     if (!document.getElementById('settingsModal').classList.contains('hidden')){
         document.getElementById('settingsModal').classList.add('hidden');
     }
     if (!document.getElementById('troopModal').classList.contains('hidden')){
        document.getElementById('troopModal').classList.add('hidden');
    }
    if (!document.getElementById('troopDetailModal').classList.contains('hidden')){
        document.getElementById('troopDetailModal').classList.add('hidden');
    }
    if (!document.getElementById('numberOfPlayersModal').classList.contains('hidden')){
        document.getElementById('numberOfPlayersModal').classList.add('hidden');
    }
    if (!document.getElementById('finishedModal').classList.contains('hidden')){
        document.getElementById('finishedModal').classList.add('hidden');
    }
}

function playerColorPopulating(el){
    var playerColor = el.options[el.selectedIndex].value;
    document.getElementById('playerColorSelection').innerHTML = playerColor;
}

//Run the Program based on User Selected Size
function startGame() {
    $.modal.close();
   if (!document.getElementById('welcomeModal').classList.contains('hidden')) {
       document.getElementById('welcomeModal').classList.add('hidden');
   }
    var userChoice = 20;
    maxRow = Number(userChoice);
    maxColumn = Number(userChoice);
    setStorage("maxRow", maxRow);
    createDivs(maxRow);
}

//Creates the divs based on maxRow and maxColumn
function createDivs(maxRow) {
    document.getElementById('currentState').innerHTML = "selectBase";
    
    var switchData = document.getElementById('currentState').innerHTML;
    var wrapperDiv = document.getElementById("mazeWrapper");
    var rowDiv;
      for (var i=0; i < maxRow; i++) {
          var thisDiv = document.createElement("div");
      thisDiv.id = "mazeRow-" + i;
      thisDiv.className = "row";
        wrapperDiv.appendChild(thisDiv);
        for (var j=0; j < maxColumn; j++) {
          rowDiv = document.getElementById("mazeRow-" + i);
              var thisColumnDiv = document.createElement("div");
                thisColumnDiv.id = (i*maxRow)+j;               
                thisColumnDiv.className = "mazehole";
                rowDiv.appendChild(thisColumnDiv);
                //Adding in a html data-set to hold X,Y values for coordinate system
                var elemID = (thisColumnDiv.id).toString();
                var elem = document.getElementById(elemID);
                var att = document.createAttribute("data-coords");
                att.value = j+","+i;
                elem.setAttributeNode(att);
                thisColumnDiv.addEventListener("click", function(){
                    functionSwitch(switchData, this.id);
        });
      }
    }
    document.getElementById('gameAlertsSmall').innerHTML = "Click where you would like to place your home base.";
    // document.getElementById('compareBaseLocationsButton').classList.remove('hidden');
}

function functionSwitch(switchData, id) {
    //will be called anytime a mazehole is clicked. Switchdata will determine what the state of the game is when called
    //via currentState.innerhtml and will then call the required function. This will allow the click event to persist
    //throughout gameplay yet perform as many different events as required throughout the game.
    var username = getStorage('username');
    var state = document.getElementById('currentState').innerHTML;
    if (state != 0){
        var switchData = state;
    }
    var id = id;

        if (switchData == "selectBase") {
            placePlayerBase(id);
            claimSelectedBase(id, username);
        }
        else if (switchData == "baseConfirmed") { 
            checkPlayerUnitLocation(1,id);
        }
        else if (switchData == "troopsPlaced") {
            progressToFirstMoveOrPause();
        }
        else if (switchData == "gameTime") {
            performGameAction(username, id);
        }
        else if (switchData == "noClick") {
            return;
        }
}

function placePlayerBase(id) {
    var name = getStorage('username');
    var playerColor = document.getElementById('playerColorSelection').innerHTML;
    var homeBase = document.getElementById(id);
    var playerBaseCheck = document.getElementById('playerBaseLocation').innerHTML;
    if (playerBaseCheck == ""){
        document.getElementById('playerBaseLocation').innerHTML = id;
        homeBase.style.backgroundColor = playerColor;
        document.getElementById(id).title = "Base, 200 / 200 Health Points";
        setStorage("playerBaseLocation", id); 
    } else {
        var oldBase = document.getElementById('playerBaseLocation').innerHTML;
        document.getElementById(oldBase).classList.add("not-visible");
        document.getElementById(oldBase).style.backgroundColor = "";
        document.getElementById('playerBaseLocation').innerHTML = id;
        document.getElementById(oldBase).title = "";
        homeBase.style.backgroundColor = playerColor;
        setStorage("playerBaseLocation", id);
        }
        
    document.getElementById('gameAlertsSmall').innerHTML = "";
}

//this is where they will select the units that they have to start the game with
function troopModal() {
    // document.getElementById('currentState').innerHTML = "baseConfirmed";
    // setStorage("state", "baseConfirmed");
    document.getElementById('troopModal').classList.add('table');
    document.getElementById('troopModal').classList.remove('hidden');
    $("#troopModal").modal();
    var playerbj = getStorage('playerObj');
    console.log(JSON.stringify(playerObj, null, 4));
    placeBaseDisplayData(0);
    var tempTroopArray = getStorage("tempTroopArray1");
    if ((tempTroopArray != null) && (tempTroopArray.length > 0)) {
    for (var i=0; i<tempTroopArray.length; i++) {
        var tname = tempTroopArray[i];
        document.getElementById(tname).checked = true;
        }
    }
    var troops = [];
}

//check the troops selection and checkboxes to verify that the correct selections have been made
function checkTroopSelection() {
    troops = $('input:checkbox:checked.checkboxes').map(function () {
        return this.value;
    }).get();
    if (troops.length == 3) {
        playerTroopSelection.innerHTML = troops;
        hideTroopModal(true);
        //set current state to "baseConfirmed" back from "noClick" so users can place their units
        document.getElementById('currentState').innerHTML = "baseConfirmed";
        setStorage("state", "baseConfirmed");
    }
     if (troops.length == 0) {
        troopModalAlert.innerHTML = "You must make a selection before proceeding.";      
    }
     if ((troops.length > 0) &&(troops.length < 3)) {
        troopModalAlert.innerHTML = "Select 3 troops before continuing.";
    }
    if (troops.length > 3) {
        troopModalAlert.innerHTML = "You may only select 3 units."
    }
}

function hideTroopModal(bool) {
        var name = getStorage('username');
        document.getElementById('openTroopModalButton').classList.add('hidden');
        $.modal.close();
        document.getElementById('troopModal').classList.remove('table');
        hideModalOverlays();
        if (bool == true){
            gameAlertsSmall.innerHTML = "";
            gameAlertsLarge.innerHTML = "";
            let playerTroopSelection = document.getElementById('playerTroopSelection').innerHTML;
            let troopsChosen = getTroopObjects(playerTroopSelection);
            addPlayerTroopsToGameObject(name, troopsChosen);
            var playerObj = createRequirementsForPlayerObject();
            placeTroopDisplayData();
            placePlayerUnits(playerObj);
        }     
}

function hideTroopDetailModal() {
    $.modal.close();
    document.getElementById('troopDetailModal').classList.remove('table');
    hideModalOverlays();
    troopModal();
}

// function playSound(command) {
//     if (command == "playIntro") {
//         document.getElementById('spaceIntro').play();
//     }
//     else if (command == "validation") {
//         document.getElementById("wrongBuzz").play();
//     }
//     else if (command == "attack") {
//         document.getElementById("spaceShot").play();
//     }
//     else if (command == "move") {
//         document.getElementById("moveSound").play();
//     }
//     else if (command == "scan") {
//         document.getElementById("scanSound").play();
//     }
//     else if (command == "swarm") {
//         document.getElementById("swarmSound").play();
//     }
//     else if (command == "depthCharge") {
//         document.getElementById("depthChargeSound").play();
//     }
//     else if (command == "bomb") {
//         document.getElementById("bombSound").play();
//     }
    
// }

//the constructor for what the main game object will look like.
function playerObject(player,troops,base) {
    //may need to make the sub components of gameObject before putting them in.
    this.player = player;
    this.troops = troops;
    this.base = base;
}

//will be called when gameObject should be created.gathers the required data to create gameObject.
function createRequirementsForPlayerObject(){
    var playerName = document.getElementById('playerNameSelection').innerHTML;
    var playerColor = document.getElementById('playerColorSelection').innerHTML;
    var player = {
        Name : playerName,
        Color : playerColor
    };

    var playerBaseLocation = document.getElementById('playerBaseLocation').innerHTML;
    var currentState = document.getElementById('currentState').innerHTML;
    var playerTroopSelection = document.getElementById('playerTroopSelection').innerHTML;

    var troopArray = getTroopObjects(playerTroopSelection);
    var homeBaseObject = getHomeBaseObjects(1);

    var playerObj = new playerObject(player,troopArray,homeBaseObject);
    document.getElementById('playerObj').innerHTML = playerObj;
    setStorage("playerObj", playerObj);
    return playerObj;
}

function placePlayerUnits(playerObj) {
    //this function handles the initial placement of units at game
    var id = getStorage('playerBaseLocation');
    var distance = 1;
    var player = 1;
    showAvailableTilesForAction(id, distance, player);  
    document.getElementById('gameAlertsSmall').innerHTML = "You will place your units in tiles adjacent to your base.";
    document.getElementById('gameAlertsLarge').innerHTML = "Click to place " + playerObj.troops[0].Name;
    setStorage("troopsToPlace1", 0);
    setStorage("playerObj", playerObj);
}

function checkPlayerUnitLocation(player, id) {
    var troopsToPlace = getStorage("troopsToPlace1");
    var locationCheck = verifyLocationForPlacement(id);
    if ((locationCheck == true) && (troopsToPlace >= 3)) {
        document.getElementById('currentState').innerHTML = "troopsPlaced";
        //clear gameAlertSmall message
        document.getElementById("gameAlertsSmall").innerHTML = "";
    } else if ((locationCheck == true) && (troopsToPlace < 3)) {
        if (document.getElementById(Number(id)).innerHTML == "") {

        var playerObj = getStorage("playerObj");
        var name = playerObj.troops[troopsToPlace].Name;
        var color = playerObj.player.Color;
        var node = Number(id);
        playerObj.troops[troopsToPlace].Location = node;
        var health = getTroopMaxHealth(name);
        var pictureID = "player1"+name;
        document.getElementById(node).innerHTML = "<img id=player1"+""+name+""+" src=Assets/"+name+color+".png></img>";
        document.getElementById(node).title = name + ", "+health+" / "+health+" Health Points";
        document.getElementById(pictureID).style.height = '100%';
        document.getElementById(pictureID).style.width = '100%';
        //send troop location to server
        updateTroopLocation(name, node);
        setStorage("playerObj", playerObj);
        
        //Following two lines need defined in node version --
        // makeVisibleOtherPlayersUnits(1);
        // makeVisibleOtherPlayersUnits(2);
        //Testing this: placing troop data again once unitLocation is updated:
        updateTroopDisplayData(); 
        var troopsToPlace = getStorage("troopsToPlace1");
        troopsToPlace += 1;
        if (troopsToPlace < playerObj.troops.length) {
        document.getElementById('gameAlertsLarge').innerHTML = "Click to place " + playerObj.troops[troopsToPlace].Name;
        } else {
            clearAvailableTilesForAction();
            setStorage("gameState1", "troopsPlaced");
            document.getElementById('gameAlertsLarge').innerHTML = "All units placed.";
            progressToFirstMoveOrPause();
        }
        setStorage("troopsToPlace1", troopsToPlace);
        } else { 
            document.getElementById('gameAlertsSmall').innerHTML = "That tile is already occupied. Choose another.";
        }
    } else if (troopsToPlace <= 2) {
        document.getElementById('gameAlertsSmall').classList.add("redText");
        document.getElementById('gameAlertsSmall').innerHTML = "You must place your units in tiles adjacent to your base.";
    }
}

function updateTurnIndicator(username) {
    document.getElementById("currentState").innerHTML = "gameTime";
    placeTurnIndicatorData(username);
    addClickEventsTroopPics();
    document.getElementById("gameAlertsLarge").innerHTML = "Click on the picture [right menu] of the unit you'd like to activate.";
}

function hideinGameTroopDetailModal() {
    $.modal.close();
    document.getElementById('troopDetailModal').classList.remove('table');
    hideModalOverlays();
}


function updateActivePlayerTroopDisplayData(player) {
    var playerObj = getStorage("playerObj"+player);
    if (playerObj == "") {
        document.getElementById("troopDisplay").innerHTML = "";
    } else {
        document.getElementById("troopDisplay").innerHTML = "";
        for (var i=0; i<playerObj.troops.length; i++) {
            var name = playerObj.troops[i].Name;
            var color = playerObj.player.Color;
            var id = playerObj.troops[i].Location;
            var coords = convertIdToCoordinates(id);
        document.getElementById("troopDisplay").innerHTML +=
        "<span class='col-1-1 bottomSpacer'><h3>" + name +
        "<img name="+name+" class='troopPic' id="+player+'troopPic'+i+" title="+name+': '+playerObj.troops[i].HealthPoints+' health'+" src=Assets/"+name+color+".png></img></h3>" +
        "<span class='col-1-2'><span> Health Points: "+ playerObj.troops[i].HealthPoints + " / "+playerObj.troops[i].MaxHealth +"</span><br>"+
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

function clearSingleTileInnerHtml(loc) {
    document.getElementById(loc).innerHTML = "";
}

function informPlayerAllUnitsOnCooldownCausedTurnToPass(activeInfo) {

        document.getElementById("currentAlertSmall").innerHTML = activeInfo;
}

function signalGameLoss(player) {
    var players = getStorage('usernames');
    var otherPlayer = players.filter(function(x) { return x !== player});
    otherPlayer = otherPlayer[0];
    hideModalOverlays();
    if (!document.getElementById('alertModal').classList.contains('hidden')){
        document.getElementById('alertModal').classList.add('hidden');
    }
    //should trigger a consolation modal with embedded video and maybe some gamestats
    document.getElementById("gameAlertsSmall").innerHTML = "";
    document.getElementById("gameAlertsLarge").innerHTML = "You are defeated!";
    // document.getElementById("defeatVideo").classList.remove("hidden");
    // playSound("defeat");
    document.getElementById("finishedModal").classList.remove("hidden");
    $("#finishedModal").modal();
    document.getElementById("finishedAlert").innerHTML = "You are defeated.";
    document.getElementById("finishedAlertSmall").innerHTML = "I suggest you read the Art of War then try again.";
    document.getElementById("defeatVideo").classList.remove("hidden");
}

function convertPlayerToNumber(player) {
    let name = getStorage('username');
    var playerValue = (player === name ? 1 : 2);
    return playerValue;
}