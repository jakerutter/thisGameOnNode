
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

  

  socket.on('all-users', function(users){
      console.log("this is users[0].nickname value inside of join on client side " + users[0].nickname);
      var userBanner = document.getElementById("currentUsers");
      userBanner.innerHTML = "";

      if (users != "") {
        for(var n=0; n<users.length; n++){
            console.log(users[n].nickname);
            let button = document.createElement("button");
            button.innerHTML = users[n].nickname;

            // 2. Append buttons where I want them
            userBanner.appendChild(button);

            // 3. Add event handler
            button.addEventListener("click", function() {
                var challenged = button.innerHTML;
                var name = getStorage("username");
                let msg = "this person " + name + " clicked on " + challenged
                $('#messages').append($('<li>').text(msg));
                if (confirm("Are you sure you want to challenge " + challenged + "?")) {
                    socket.emit('extend-challenge', name, challenged);
                } else {
                    $('#messages').append($('<li>').text(name + " decided not to challenge at this time."));
                }
                });
            }
        } else {
            alert("fell into the nebulous void of all-users client side");
        }
    });

  //send and display chat messages
  socket.on('message-received', function(msg){
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });

    //challenge a player to a game
    socket.on('challenge', function(data) {
        document.getElementById('modalLargeHeader').innerHTML = "You have been challenged by another player.";
        document.getElementById('modalSmallHeader').innerHTML = "You can accept or deny the challenge.";
        document.getElementById('challengeForm').classList.remove('hidden');
    });
    //      This added a message to the chat interface showing the curent number of users.
    // socket.on('broadcast',function(data) {
    //     console.log(data.description);
    //     $('#messages').append($('<li>').text(data.description));
    //  });
}



function savePlayerName() {
    var name = document.getElementById('playerName').value;
    //set id value for this user to emit to the server
    id = Math.floor(Date.now() * Math.random());
    
    if (name === "") {
        document.getElementById('nameFail').innerHTML = 'That is not an acceptable name. Please enter a name.';
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
        document.getElementById('chatFeature').classList.remove('hidden');
        document.getElementById('banner').classList.remove('hidden');
        document.getElementById('currentUsers').classList.remove('hidden');
        document.getElementById('welcomeForm').classList.add('hidden');
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
        socket.emit('send-message', username+" said: "+chatmessage);
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
     if (!document.getElementById('welcomeModal').classList.contains('hidden')){
        document.getElementById('welcomeModal').classList.add('hidden');
    }
}

function sendChallenge(data) {
    //this function will get the names / id's of the challenger and the challenged player

    //will console.log that a challenge has been extended between the two

    //and will trigger the challengeModal for the person being challenged to respond
}

function respondToChallenge(data) {
    var responseData = [data, socket.id, name];
    //this needs finished
    socket.emit('challengeResponse', responseData);
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