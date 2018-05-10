//Contains all functions needed to display and alter the alert modal

function showAlertModal(message) {
    document.getElementById("alertModal").classList.remove("hidden");
    $("#alertModal").modal();
    if (message == "") {
        message = "Alert message needs established";
    }
    document.getElementById('currentAlert').innerHTML = message;
}

function hideAlertModal() {
    $.modal.close();
    document.getElementById("alertModal").classList.add("hidden");
    //unhide or make available the next action
}

function switchActivePlayer(player) {
    var numberOfPlayers = getStorage("numberOfPlayers");
    if (numberOfPlayers == 2) {
    // var activePlayer = getStorage("turnIndicator");
    // var activePlayer = player;
    setStorage("alertMessage", "Please wait for your turn.");
    if (player == 1) {
        triggerAlertModalForPlayerOne();

    } else if (player == 2) {
        triggerAlertModalForPlayerTwo();

    } else {
        alert("Warning function alertModalForNotActivePlayer does not have valid activePlayer");
    }
    updateTurnIndicator();
    } else {
        //for single player modes
        //Computer could process it's turn right here.
    }
}

function addActionInfoToAlertModal(actionInfo, player) {
    var otherPlayer = (player == 1 ? 2 : 1);
    var turnDidNotSwitch = getStorage("allCoolDowns");
   if (turnDidNotSwitch == "false") {
        document.getElementById("currentAlertSmall").innerHTML = actionInfo;
    } else if (turnDidNotSwitch == "true") {
       //the turn did not switch -- inform the waiting player that their turn has been passed
       var actionInfo = "All of your units were on cooldown and your turn has been passed.";
       informPlayerAllUnitsOnCooldownCausedTurnToPass(player, actionInfo);
    }
        else {
            //should not get here. Error has occurred
            console.log("addActionInfoToAlertModal has incorrect turnDidNotSwitch value. Please troubleshoot.");
   }
}


