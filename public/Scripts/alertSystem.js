//Contains all functions needed to display and alter the alert modal

function showTurnInfo(message, color) {

    if (color != "" || color != undefined) {
        document.getElementById('gameAlertsSmall').innerHTML = message;
    } else {
        let textColor = color + "Text";
        document.getElementById('gameAlertsSmall').classList.add(textColor);
        document.getElementById('gameAlertsSmall').innerHTML = message;
    }
}

function hideAlertModal() {
    //unhide or make available the next action
    $.modal.close();
    document.getElementById("alertModal").classList.add("hidden"); 
}

function addActionInfoToAlertModal(actionInfo) {
    var turnDidNotSwitch = getStorage("allCoolDowns");
   if (turnDidNotSwitch == "false") {
        document.getElementById("currentAlertSmall").innerHTML = actionInfo;
    } else if (turnDidNotSwitch == "true") {
       //the turn did not switch -- inform the waiting player that their turn has been passed
       var actionInfo = "All of your units were on cooldown and your turn has been passed.";
       informPlayerAllUnitsOnCooldownCausedTurnToPass(actionInfo);
    } else {
            //should not get here. Error has occurred
            console.log("addActionInfoToAlertModal (in AlertSystem.js) has incorrect turnDidNotSwitch value. Please troubleshoot.");
   }
}


