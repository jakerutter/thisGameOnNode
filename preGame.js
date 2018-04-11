
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
        setStorage('challenger', name);
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

     socket.on('challenger-join-private', function(challenger) {
      
        var name = getStorage('username');
        if (name === challenger) {
            socket.emit('join-private', name);
        }
     });

     socket.on('update-users-challenge-refused', function(name, challenger) {
        let msg = name + ' was challenged by ' + challenger + ' but refused the opportunity.';
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
     });

     socket.on('update-users-challenge-accepted', function(name, challenger) {
        let msg = ' Challenge sent and accepted! ' + challenger + ' versus '+ name +'!';
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
        removePlayerButtons(name, challenger);
     });

    socket.on('new-game-html', function(msg) {
        document.getElementById('chatroom').classList.add('hidden');
        document.getElementById('welcomeModal').classList.remove('hidden');
        document.getElementById('defaultCanvas0').classList.add('hidden');
    });

    socket.on('color-has-been-selected', function(name, chosenColor) {
        document.getElementById('welcomeModalTopH3').classList.add(chosenColor+"Text");
        document.getElementById('welcomeModalTopH3').innerHTML = name + " has selected " + chosenColor + " as their color.";
        $("#playerColorSelect option[value="+chosenColor+"]").remove();
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
            // return false;
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
   if (chatmessage == "") {
        document.getElementById('noMessage').innerHTML = "Please type a message you'd like to send.";
   } else {
       
        document.getElementById('noMessage').innerHTML = "";
        console.log(username +' is sending message: ' + chatmessage);
        var data = username+" said: "+ chatmessage;
        socket.emit('send-message', data);
        $('#m').val('');
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

function setFocusToNameBox() {
    document.getElementById('playerName').focus();
}

function setStorage(key,info) {
    localStorage.setItem(key, JSON.stringify(info));
}

function getStorage(key) {
    var item = localStorage.getItem(key);
    return JSON.parse(item);
}

function respondToChallenge(response) {
    var challenger = getStorage('challenger');
    var name = getStorage('username');
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

function claimSelectedColor(chosenColor) {
    var name = getStorage('username');
    socket.emit('color-selected', name, chosenColor);
}

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
            console.log(users[n].nickname);
            userArray.push(users[n].nickname);
            let button = document.createElement("button");
            button.innerHTML = users[n].nickname;

            // 2. Append buttons where I want them
            userBanner.appendChild(button);

            // 3. Add event handler for all buttons that do not have your name on them
            if (button.innerHTML !== username) {
            button.addEventListener("click", function() {
                var challenged = button.innerHTML;
                
                let msg = "this person " + username + " clicked on " + challenged;
                $('#messages').append($('<li>').text(msg));
                if (confirm("Are you sure you want to challenge " + challenged + "?")) {
                    socket.emit('extend-challenge', username, challenged);
                } else {
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

function removePlayerButtons(name, challenger) {
    var playerButtons = getElementById('currentUsers')
}