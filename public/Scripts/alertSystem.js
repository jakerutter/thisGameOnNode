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


