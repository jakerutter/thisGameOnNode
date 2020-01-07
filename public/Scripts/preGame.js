

// Keep track of our socket connection
var socket;
socket = io.connect('http://Localhost:8181');

function setup() {

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://Localhost:8181');
  // We make a named event called 'join' and write an
  // anonymous callback function
  socket.on('join', function(name) {
    console.log('New player named ' + name + ' has joined the game.');
    // socket.name = name; 
    socket.emit('get-users');
    });

  socket.on('usernames-taken', function(users) {
    var userList = [];
    for(var n=0; n<users.length; n++){
        userList.push(users[n].nickname);
    }
    setStorage('usernamesTaken', userList);
  });

  socket.on('all-users', function(users){
      createPlayerButtons(users);
    });

  //send and display chat messages
  socket.on('message-received', function(msg, sender){
    let message;
    let username = getStorage('username');
    if (username === sender){
        message = "<li style='Color:white;'>"+msg+"</li>";
    } else {
        message = "<li style='Color:black; background-Color:#eee;'>"+msg+"</li>";
    }

    $('#messages').append(message);
    window.scrollTo(0, 0);
  });

  //send and display in-game "mobile" messages
  socket.on('mobile-message-received', function(msg, Color){
    var Color = Color;
    var bg = Color == "yellow" ? "grey" : "white";
    var message = "<li style='Color:"+Color+"; background-Color:"+bg+";'>"+msg+"</li>";

    $('#mobileMessages').append(message);
    chatNotifications();
    //$('#mobileMessages').scrollTo(0, 0);
  });

    //challenge a player to a game
    socket.on('challenge', function(data) {
        document.getElementById('modalLargeHeader').innerHTML = 'You have been challenged by another player.';
        document.getElementById('modalSmallHeader').innerHTML = 'You can accept or deny the challenge.';
        document.getElementById('challengeForm').classList.remove('hidden');
    });

        //  This added a message to the chat interface showing the curent number of users.
    socket.on('broadcast',function(data) {
        console.log(data.description);
        // $('#messages').append($('<li>').text(data.description));
     });

     socket.on('check-challenge-response', function(name, challenged) {
        var username = getStorage('username');
        //save challenger to Local storage for the challenger and challenged parties
        if ((username === challenged) || (username === name)) {
            setStorage('challenger', name);
        }
        if (username === challenged) {
            //show challenge modal
            console.log('I, ' + challenged + ' have been challenged by ' + name);
            document.getElementById('chatWelcomeModal').classList.remove('hidden');
            document.getElementById('modalLargeHeader').innerHTML = 'Challenge Extended.';
            document.getElementById('modalSmallHeader').innerHTML = 'make a selection';
            document.getElementById('challengeHeader').innerHTML = 'You have been challenged to a game by ' + name;
            document.getElementById('challengeForm').classList.remove('hidden');
        }
     });

     //challenge accepted. send challenger into the private game
     socket.on('challenger-join-private', function(challenger, name) {
        var username = getStorage('username');
        if (username === challenger) {
            setStorage('opponent', name);
            socket.emit('join-private', username);
        } 
        else
        {
            //CYPRESS hide the accept challenge modal for the player that accepted challenge
            var modal = document.getElementById('chatWelcomeModal');
            if (! modal.classList.contains('hidden')){
                modal.classList.add('hidden');
            }
        }
    });

     socket.on('update-users-challenge-refused', function(name, challenger) {
        //clear challenger from Localstorage since the challenge was denied
        var challengerStored = getStorage('challenger');
        if (challengerStored != '') {
            setStorage('challenger', '');
        }
        let msg = name + ' was challenged by ' + challenger + ' but refused the opportunity.';
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, 0);
     });

     socket.on('update-users-challenge-accepted', function(name, challenger) {
        let msg = ' Challenge sent and accepted! ' + challenger + ' versus '+ name +'!';
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, 0);
     });

    socket.on('new-game-html', function(msg) {
        document.getElementById('chatroom').classList.add('hidden');
        // document.getElementById('welcomeModal').classList.remove('hidden');
        document.getElementById('defaultCanvas0').classList.add('hidden');
        welcomeModal();
    });

    socket.on('first-color-has-been-selected', function(name, chosenColor, privateUsers) {
        console.log('first Color ' + chosenColor +' has been selected by '+name+'. removing onclick events for nodes.');
        var username = getStorage('username');
        document.getElementById('welcomeModalTopH3').classList.add(chosenColor+'Text');
        document.getElementById('welcomeModalTopH3').innerHTML = name + ' has selected ' + chosenColor + ' as their Color.';
        $('#playerColorSelect option[value='+chosenColor+']').remove();
        
        setChosenColorInLocalStorage(name, chosenColor, privateUsers);
        if (username === name) {
            var message = 'You have chosen '+ chosenColor+'. Wait for your opponent to select their Color.';
            // TEST - testing not using alert modals
            //showAlertModal(message);
            document.getElementById('gameAlertsLarge').innerHTML = message;
            let moColor = chosenColor + "Text";
            $('#mo').addClass(moColor);
        }
    });

    socket.on('second-color-has-been-selected', function(name, chosenColor, privateUsers) {
        console.log('second Color ' +chosenColor +' has been selected by '+ name+'. showing alert modal.');
        var username = getStorage('username');
        setChosenColorInLocalStorage(name, chosenColor, privateUsers);
        //TEST - testing not using alert modals
        //hideAlertModal();  
        // set up mobile Chat stuff  
        $('#btnToggleChat').removeClass('hidden');

        if (username === name){
            let moColor = chosenColor + "Text";
            $('#mo').addClass(moColor);
        }
    });

    socket.on('first-base-has-been-selected', function(name, privateUsers, tiles) {
        var username = getStorage('username');
        if (name === username) {
            //TEST testing not using alert modal
            //showAlertModal(message);
            //removeClickEventsForNodes();
            document.getElementById('currentState').innerHTML = 'disabled';

            document.getElementById('gameAlertsLarge').innerHTML = 'Base Location submitted. Wait for other player.';
            renderVisibilityForBase(tiles);
        } else {
            let playerInGame = checkPrivateUsers(privateUsers);
            if (playerInGame === true) {
                setStorage('playerBaseLoc2', 'true');
            }
        }
    });

    socket.on('second-base-has-been-selected-fail', function(privateUsers) {

        document.getElementById('currentState').innerHTML = 'selectBase';
        //clear selected base, remove alert modal, and inform them that they need to try again
        //TEST - testing not using alert modals
        //hideAlertModal();

        let playerInGame = checkPrivateUsers(privateUsers);
        if (playerInGame === true) {
            document.getElementById('gameAlertsLarge').innerHTML = 'Your bases were too close. Choose again.';
            //reset all mazeholes to default background Color of ghostwhite
            var tiles = 'empty';
            renderVisibilityForBase(tiles);
        }
    });

    socket.on('second-base-has-been-selected-pass', function(name, privateUsers, tiles){
        username = getStorage('username');
        if (name === username) {
            renderVisibilityForBase(tiles);
            document.getElementById('currentState').innerHTML = 'disabled';
        }
        
        console.log('2 bases chosen and locations PASS validation.');
        // TEST - testing not using alert modals
        //hideAlertModal();
        document.getElementById('gameAlertsLarge').innerHTML = '';
        revealOpenTroopModalButton(privateUsers);
    });

    socket.on('update-visible-tiles', function(username, visibleTileArray){
    //console.log('updating client with most recent visible tiles');
    renderVisibleTilesForClient(username, visibleTileArray);
    });

    socket.on('render-enemy-units', function(username, makeKnown) {
        //render out enemy units and base as present in makeKnown
        drawEnemyUnitsToMap(username, makeKnown);
    });

    socket.on('set-starting-player', function(name, privateUsers) {
        setStorage('turnIndicator', username);
        var username = getStorage('username');
        if (name === username) {
        console.log('I am the starting player. My name is ' + username);
        //TEST - testing not using alert modals
        //hideAlertModal();
        }
        let playerInGame = checkPrivateUsers(privateUsers);
        if (playerInGame === true) {
            updateTurnIndicator(name);
        }
    });

    socket.on('set-current-player', function(name) {
        setStorage('turnIndicator', name);
        updateTurnIndicator(name);
    });

    //actually run particular client-side function for a specific user
    socket.on('run-function', function(username, functionToRun, arg1, arg2){
        console.log('running '+ functionToRun +' for user: '+ username);
        let thisUser = getStorage('username');
        if (username == thisUser){
            functionToRun(username, arg1, arg2);
        }
    });

    socket.on('update-client-post-attack', function(username, playerObj){
        //TODO determine best way to update tooltip displaying updated Health for attacked unit
        let thisUser = getStorage('username');
        if (username == thisUser){
            setStorage('playerObj', playerObj);
            // update date in troop display (right bar)
            placeTroopDisplayData();
        }
    });

    socket.on('update-tooltips-post-attack', function(username, MyUnitImage, EnemyUnitImage, id){
        //update tooltip data
        let thisUser = getStorage("username");
        if(username == thisUser){
            if(EnemyUnitImage != undefined){
                updateToolTipData(username, EnemyUnitImage, id);
            }     
        } else {
            if(MyUnitImage != undefined){
                updateToolTipData(username, MyUnitImage, id);
            }   
        }
    });

    socket.on('remove-unit-from-board-for-user', function(id, username){
        let user = getStorage('username');
        if (user === username){
          document.getElementById(id).innerHTML = "";  
        }
    });

    socket.on('remove-unit-from-board', function(id){
        document.getElementById(id).innerHTML = "";
    });


     //end of setup
}

//call run-function to run a particular client-side function for a specific user
function runFunction(username, functionToRun, arg1, arg2){
    console.log('about to call run-function: '+ functionToRun +' for '+ username);
    socket.emit('cross-server-control', username, functionToRun, arg1, arg2);
}

//validate then save player name
function savePlayerName() {
    var name = document.getElementById('playerName').value;
    var namesTaken = getStorage('usernamesTaken');
    //check name against namesTaken
    var isNameTaken;
    for (var i=0; i<namesTaken.length; i++) {
        if (name === namesTaken[i]) {
            isNameTaken = true; } 
        else {
            isNameTaken = false;
        }
    }
    //set id value for this user to emit to the server
    id = Math.floor(Date.now() * Math.random());
    
    if (name == "" || name == " " || name == undefined || name == null) {
        document.getElementById('nameFail').innerHTML = 'That is not an acceptable name. Enter a name.';
    } else if (isNameTaken === true) {
        document.getElementById('nameFail').innerHTML = 'That is taken by another user. Enter a different name.';
    } else {
        setStorage('username', name);
        console.log('saving new username: ' + name);
        // Send the name and id to the socket (server)
        var clientSideUser = { 'name': name, 'userID': id };
        // setStorage('userInfo', {name, id});
        socket.emit('join', clientSideUser);
        //name has been sent to server. hide modal/show chat room
        $.modal.close();
        hideModalOverlays();
        //revealing elements and hiding others
        document.getElementById('nameFail').innerHTML = '';
        document.getElementById('chatFeature').classList.remove('hidden');
        document.getElementById('banner').classList.remove('hidden');
        document.getElementById('currentUsers').classList.remove('hidden');
        document.getElementById('nameForm').classList.add('hidden');
        document.getElementById('chatWelcomeModal').classList.add('hidden');
        document.getElementById('confirmSettings').classList.add('hidden');
    }
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
     if (!document.getElementById('chatWelcomeModal').classList.contains('hidden')){
        document.getElementById('chatWelcomeModal').classList.add('hidden');
    }
}

// a player clicks to accept or refuse a challenge
function respondToChallenge(response, name, challenger) {
    //load up the name name and challenger name if they're not provided
    if (challenger == undefined){
        var challenger = getStorage('challenger');
    }
    if (name == undefined){
        var name = getStorage('username');  
    }
    
    //accepted challenge
    if (response === 'accept') {
        // let msg = 'Challenge sent and accepted! '+ challenger + ' versus '+name+"!";
        // $('#messages').append($('<li>').text(msg));
        // window.scrollTo(0, document.body.scrollHeight);
        socket.emit('challenge-accepted', name, challenger);
        socket.emit('join-private', name);
        document.getElementById('chatWelcomeModal').classList.add('hidden');
    } else {
        //refused challenge
        socket.emit('challenge-refused', name, challenger);
        document.getElementById('chatWelcomeModal').classList.add('hidden');
    }
}

// player selects a their Color, send the selection to the server
function claimSelectedColor(chosenColor, name) {
    if (name == undefined){
        var name = getStorage('username');
    }
    //CYPRESS
    if (name != getStorage('username')){
        setStorage('playerColor2', chosenColor);
    }
    //End CYPRESS
    var otherPlayerColor = getStorage('playerColor2');
    if ((otherPlayerColor == '') || (otherPlayerColor == undefined)) {
        socket.emit('first-color-selected', name, chosenColor);
    } else {
        socket.emit('second-color-selected', name, chosenColor);
    }
}

function claimSelectedBase(loc, username) {
    console.log(username + ' has selected this location for their base '+ loc);
    console.log('NOT COMPARED / VERIFIED');

    var baseDataCoords = document.getElementById(loc).dataset.coords;
    var baseCoords = baseDataCoords.split(',');
    var bx = Number(baseCoords[0]);
    var by = Number(baseCoords[1]);

    var otherPlayerBase = getStorage('playerBaseLoc2');
    if ((otherPlayerBase == '') || (otherPlayerBase == null)  || (otherPlayerBase == undefined)) {
        socket.emit('first-base-selected', loc, username, bx,by);
    } else {
        socket.emit('second-base-selected', loc, username, bx,by);
    }
}

//This forces scroll to top on refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function createPlayerButtons(users) {

    var userArray = [];
    var username = getStorage('username');
    var userBanner = document.getElementById('currentUsers');
    userBanner.innerHTML = '';

    if (users != '') {
        for(var n=0; n<users.length; n++){
            // console.log(users[n].nickname);
            userArray.push(users[n].nickname);
            let button = document.createElement('button');
            button.id = users[n].nickname;
            button.innerHTML = users[n].nickname;

            // 2. Append buttons where I want them
            userBanner.appendChild(button);

            // 3. Add event handler for all buttons that do not have your name on them
            if (button.innerHTML !== username) {
                button.addEventListener('click', function() {
                var challenged = button.innerHTML;
                
                let msg = username + ' clicked on ' + challenged + '. They must be considering a challenge.';
                socket.emit('send-message', msg, username);

                if (confirm('Are you sure you want to challenge ' + challenged + '?')) {
                    socket.emit('extend-challenge', username, challenged);

                } else {

                    let noChallengeMsg = username + ' decided not to challenge ' + challenged +' at this time.';
                    socket.emit('send-message', noChallengeMsg, username);
                    
                }
                });
            }
        }
            //saving this in Local storage. will use this array to update buttons visible
            setStorage('users', userArray);
        } else {
           return;
        }
}

function addPlayerTroopsToGameObject(name, troopArray) {
    console.log('adding troops to game obj... ');
    console.log(troopArray);
    socket.emit('add-troops-to-gameObj', name, troopArray);
}

function revealOpenTroopModalButton() {
    //check somewhere to determine if the players are in the game
    var name = getStorage('username');
    let playerNames = getStorage('users');
    if (playerNames.includes(name) == true) {
        document.getElementById('openTroopModalButton').classList.remove('hidden');
        document.getElementById('currentState').innerHTML = 'disabled';
    }
}

function updateTroopLocation(unitName, node) {
    var username = getStorage('username');
    socket.emit('update-troop-loc', username, unitName, node);
}

function drawEnemyUnitsToMap(username, makeKnown) {
    var name = getStorage('username');
    console.log('drawEnemyUnitsToMap for '+ username + ' the objects to be drawn are in the following object: ');
    console.log(JSON.stringify(makeKnown, null, 4));
    //need to clear the map and redraw this user and enemy user's units
    //account for Name, Location, Color, Health of units & base
    if (name === username) {
        for (var i=0; i<makeKnown.length; i++) {
            //handle base first
            if(makeKnown[i].Name === 'enemy base'){
                document.getElementById(makeKnown[i].Loc).style.backgroundColor = makeKnown[i].Color;
                document.getElementById(makeKnown[i].Loc).title = 'Enemy Base '+ makeKnown[i].Health+' / 200 Health';   
            } 
            else {
                document.getElementById(makeKnown[i].Loc).innerText = '';
                var title = "Enemy "+ makeKnown[i].Name + ", "+makeKnown[i].Health+" / "+makeKnown[i].MaxHealth+" Health Points";
                document.getElementById(makeKnown[i].Loc).innerHTML = "<img height='20px'; width='20px'; id=player1"+""+makeKnown[i].Name+""+" src=/Assets/"+makeKnown[i].Name+makeKnown[i].Color+".png title='"+title+"'></img>";
                
            }
        }
    }
}

function checkOpponentUnitsForAllCooldowns() {
    //this function will need to check to see if all the other player's units are on cooldown
    var opponent = getStorage('opponent');
    var allOnCooldown = false;
    
    socket.emit('check-', loc, username, bx,by);
}

function signalTurnOver(username){
    socket.emit('signal-turn-over', username);
}

function sendAttackToServer(username, unitName, id){
    socket.emit('send-attack-to-server', username, unitName, id);
}

function removeUnitImageFromOpponent(username, id){
    //remove the old image from the other player's map
    socket.emit('remove-moved-unit', id, username);
}