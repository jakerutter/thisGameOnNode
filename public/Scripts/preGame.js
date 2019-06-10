
// Keep track of our socket connection
var socket;
socket = io.connect('http://localhost:8080');

function setup() {

  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:8080');
  // We make a named event called 'join' and write an
  // anonymous callback function
  socket.on('join', function(name) {
    console.log("New player named " + name + " has joined the game.");
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
  socket.on('message-received', function(msg){
        $('#messages').append($('<li>').text(msg));
        // window.scrollTo(0, document.body.scrollHeight);
        window.scrollTo(0, 0);
    });

    //challenge a player to a game
    socket.on('challenge', function(data) {
        document.getElementById('modalLargeHeader').innerHTML = "You have been challenged by another player.";
        document.getElementById('modalSmallHeader').innerHTML = "You can accept or deny the challenge.";
        document.getElementById('challengeForm').classList.remove('hidden');
    });

        //  This added a message to the chat interface showing the curent number of users.
    socket.on('broadcast',function(data) {
        console.log(data.description);
        // $('#messages').append($('<li>').text(data.description));
     });

     socket.on('check-challenge-response', function(name, challenged) {
        var username = getStorage('username');
        //save challenger to local storage for the challenger and challenged parties
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
            setStorage("opponent", name);
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
        //clear challenger from localstorage since the challenge was denied
        var challengerStored = getStorage('challenger');
        if (challengerStored != "") {
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
        console.log('first color' + chosenColor +' has been selected by '+name+'. showing alert modal.');
        var username = getStorage('username');
        document.getElementById('welcomeModalTopH3').classList.add(chosenColor+"Text");
        document.getElementById('welcomeModalTopH3').innerHTML = name + " has selected " + chosenColor + " as their color.";
        $("#playerColorSelect option[value="+chosenColor+"]").remove();
        
        setChosenColorInLocalStorage(name, chosenColor, privateUsers);
        if (username === name) {
            var message = "You have chosen "+ chosenColor+". Please wait for your opponent to select their color.";
            showAlertModal(message);
        }
    });

    socket.on('second-color-has-been-selected', function(name, chosenColor, privateUsers) {
        console.log('second color ' +chosenColor +' has been selected by '+ name+'. showing alert modal.');
        setChosenColorInLocalStorage(name, chosenColor, privateUsers);
        hideAlertModal();    
    });

    socket.on('first-base-has-been-selected', function(name, privateUsers, tiles) {
        var username = getStorage('username');
        if (name === username) {
            var message = "You placed your base. Please wait for your opponent to place their base."
            showAlertModal(message);
            document.getElementById('gameAlertsLarge').innerHTML = "Base location submitted. Please wait for other player.";
            renderVisibilityForBase(tiles);
        } else {
            let playerInGame = checkPrivateUsers(privateUsers);
            if (playerInGame === true) {
            setStorage('playerBaseLocation2', 'true');
            }
        }
    });

    socket.on('second-base-has-been-selected-fail', function(privateUsers) {
        var name = getStorage('username');
        var users = getStorage('users');
        //clear base location in local storage
        
        //clear selected base, remove alert modal, and inform them that they need to try again
        hideAlertModal();
        let playerInGame = checkPrivateUsers(privateUsers);
        if (playerInGame === true) {
            document.getElementById('gameAlertsLarge').innerHTML = "Your bases were too close. Choose again.";
            //reset all mazeholes to default background color of ghostwhite
            var tiles = "empty";
            renderVisibilityForBase(tiles);
        }
    });

    socket.on('second-base-has-been-selected-pass', function(name, privateUsers, tiles){
        username = getStorage('username');
        if (name === username) {
            renderVisibilityForBase(tiles);
        }
        
        console.log("2 bases chosen and locations PASS validation.");
        hideAlertModal();
        document.getElementById('gameAlertsLarge').innerHTML = "";
        revealOpenTroopModalButton(privateUsers);
        
    });

    socket.on('update-visible-tiles', function(username, visibleTileArray){
    console.log('updating client with most recent visible tiles');
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
        hideAlertModal();
        }
        let playerInGame = checkPrivateUsers(privateUsers);
        if (playerInGame === true) {
            updateTurnIndicator(name);
        }
    });



     //end of setup
}



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
    
    if (name === "") {
        document.getElementById('nameFail').innerHTML = 'That is not an acceptable name. Please enter a name.';
    } else if (isNameTaken === true) {
        document.getElementById('nameFail').innerHTML = 'That is taken by another user. Please enter a different name.';
    } else {
        setStorage('username', name);
        console.log('saving new username: ' + name);
        // Send the name and id to the socket (server)
        var clientSideUser = { "name": name, "userID": id };
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
        document.getElementById('welcomeForm').classList.add('hidden');
        document.getElementById('chatWelcomeModal').classList.add('hidden');
        document.getElementById('confirmSettings').classList.add('hidden');
    }
}

//this will check the entry screen so that the enter button can be pressed or 'enter' key used
function checkforEnterKeyPress(identifier,e) {
   
    if (e && e.keyCode == 13) {
        if (identifier == "name"){
            savePlayerName();
            return false;
        } else if (identifier == "chat") {
            sendChatMessage();
            return false;
        }
        //the key pressed was not enter, exit
        } else {
            return;
        }
}

// This one is for chat feature
function sendChatMessage() {

   var username = getStorage('username');
   var chatmessage = $('#m').val();
   if (chatmessage.replace(" ", "") == "") {
        document.getElementById('noMessage').innerHTML = "Please type a message you'd like to send.";
   } else {
       
        document.getElementById('noMessage').innerHTML = "";
        console.log(username +' is sending message: ' + chatmessage);
        var data = username+" said: "+ chatmessage;
        socket.emit('send-message', data);
    }
    $('#m').val('');
    
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

function setStorage(key,info) {
    localStorage.setItem(key, JSON.stringify(info));
}

function getStorage(key) {
    var item = localStorage.getItem(key);
    return JSON.parse(item);
}

//this is triggered when a player clicks to accept or refuse a challenge
function respondToChallenge(response, name, challenger) {
    //load up the name name and challenger name if they're not provided
    if (challenger == 'undefined' || challenger == ''){
        var challenger = getStorage('challenger');
    }
    if (name == 'undefined' || name == ''){
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
//a player selects a their color, send the selection to the server
function claimSelectedColor(chosenColor, name) {
    if (name == 'undefined' || name == ''){
        var name = getStorage('username');
    }
    //CYPRESS
    if (name != getStorage('username')){
        setStorage('playerColor2', chosenColor);
    }
    //End CYPRESS
    var otherPlayerColor = getStorage('playerColor2');
    if ((otherPlayerColor != "") && (otherPlayerColor != null)) {
        socket.emit('second-color-selected', name, chosenColor);
    } else {
        socket.emit('first-color-selected', name, chosenColor);
    }
}

function claimSelectedBase(location, username) {
    console.log(username + " has selected this location for their base "+ location);
    console.log("NOT COMPARED / VERIFIED");

    var baseDataCoords = document.getElementById(location).dataset.coords;
    var baseCoords = baseDataCoords.split(",");
    var bx = Number(baseCoords[0]);
    var by = Number(baseCoords[1]);

    var otherPlayerBase = getStorage('playerBaseLocation2');
    if ((otherPlayerBase == "") || (otherPlayerBase == null)) {
        socket.emit('first-base-selected', location, username, bx,by);
    } else {
        socket.emit('second-base-selected', location, username, bx,by);
    }
   
}

//This forces scroll to top on refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function createPlayerButtons(users) {

    var userArray = [];
    var username = getStorage("username");
    var userBanner = document.getElementById("currentUsers");
    userBanner.innerHTML = "";

    if (users != "") {
        for(var n=0; n<users.length; n++){
            // console.log(users[n].nickname);
            userArray.push(users[n].nickname);
            let button = document.createElement("button");
            button.id = users[n].nickname;
            button.innerHTML = users[n].nickname;

            // 2. Append buttons where I want them
            userBanner.appendChild(button);

            // 3. Add event handler for all buttons that do not have your name on them
            if (button.innerHTML !== username) {
            button.addEventListener("click", function() {
                var challenged = button.innerHTML;
                
                let msg = username + " clicked on " + challenged + ". They must be considering a challenge.";
                socket.emit('send-message', msg);
                $('#messages').append($('<li>').text(msg));
                if (confirm("Are you sure you want to challenge " + challenged + "?")) {
                    socket.emit('extend-challenge', username, challenged);
                } else {
                    let noChallengeMsg = username + " decided not to challenge " + challenged +" at this time.";
                    socket.emit('send-message', noChallengeMsg);
                    $('#messages').append($('<li>').text(username + " decided not to challenge at this time."));
                }
                });
            }}
            //saving this in local storage. will use this array to update buttons visible
            setStorage('users', userArray);
        } else {
           return;
        }
}

function renderVisibilityForBase(tiles){
    console.log('inside renderVisibilityForBase tiles is '+ tiles);
    if (tiles == "empty"){
        $(".mazehole").removeClass("not-visible");
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
        document.getElementById('currentState').innerHTML = "noCLick";
    }
}

function updateTroopLocation(name, node) {
    var username = getStorage('username');
    socket.emit('update-troop-location', username, name, node);
}

function drawEnemyUnitsToMap(username, makeKnown) {
    var name = getStorage('username');
    console.log('INSIDE drawEnemyUnitsToMap');
    console.log(JSON.stringify(makeKnown, null, 4));
    //need to clear the map and redraw this user and enemy user's units
    //account for Name, Location, Color, Health of units & base
    if (name === username) {
        for (var i=0; i<makeKnown.length; i++) {
            //handle base first
            if(makeKnown[i].name === 'enemy base'){
                document.getElementById(makeKnown[i].location).style.backgroundColor = makeKnown[i].color;
                document.getElementById(makeKnown[i].location).title = "Enemy Base "+ makeKnown[i].health+" / 200 health";   
            } 
            else {
                document.getElementById(makeKnown[i].location).innerText = "";
                var health = getTroopMaxHealth(makeKnown[i].name);
                var pictureID = "player1"+makeKnown[i].name;
                document.getElementById(makeKnown[i].location).innerHTML = "<img height='20px'; width='20px'; id=player1"+""+makeKnown[i].name+""+" src=/Assets/"+makeKnown[i].name+makeKnown[i].color+".png></img>";
                document.getElementById(makeKnown[i].location).title = "Enemy "+ makeKnown[i].name + ", "+health+" / "+health+" Health Points";
                // document.getElementById(pictureID).style.height = '100%';
                // document.getElementById(pictureID).style.width = '100%';
                
            }
        }
    }
}

function checkUnitsForAllCooldowns(otherPlayer) {
    //this function will need to check to see if all the other player's units are on cooldown
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