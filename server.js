const fs = require('fs');

var express = require('express');
// Create the app
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Set up the server
var server = app.listen( 8080, listen);
var users = [];
var gameObj = {};
var privateUsers = [];
// This call back just tells us that the server has started
function listen() {

  var port = server.address().port;
  // console.log('This Game listening at http://' + 'localhost' + ':' + port);
}

app.use(express.static('public'));

// WebSocket Portion
var io = require('socket.io')(server);
var clientCount = 0;
// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', function (socket) {

  // We are given a websocket object in our function
  var userID;
  clientCount +=1;
  console.log(clientCount + " number of clients connected. That is more than we had before.");
  io.sockets.emit('broadcast',{ description: clientCount + ' clients connected!'});
  io.sockets.emit('usernames-taken', users);

  socket.on('disconnect', function() {
    clientCount -=1;
    console.log(clientCount + " number of clients connected. Less than we had before.");
    io.emit('broadcast',{ description: clientCount + ' clients connected!'});
    users = users.filter(function(item) {
      return item.nickname !== socket.nickname;
    });
    io.emit('all-users', users);
  });

  // io.emit('user.add', socket.id);
    // Join private room
    socket.on('join-private', function(data) {
      socket.join('private');
      console.log(data + ' joined private');
      io.emit('all-users', users);
      //send both players that joined private to the game html page - or change the html rendered
      var newHtml = app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/', 'game1.html'));
        });
        io.in('private').emit('new-game-html', "woo");
    });
  
    socket.on('private-chat', function(data) {
      socket.broadcast.to('private').emit('show-message', data.message);
    });
  
    // Show all users when first logged on
    socket.on('get-users', function(data) {
      io.emit('all-users', users);
    });
  
    // When new socket joins
    socket.on('join', function(data) {
      console.log("this is data.nickname value inside of join on server side " + data.name);
      socket.nickname = data.name;
      // users[socket.nickname] = socket; 
      var userObj = {
        nickname: data.name,
        socketid: socket.id
      }
      users.push(userObj);
      console.log(users);
      io.emit('usernames-taken', users);
      io.emit('all-users', users);
    });
  
    // Send a message
    socket.on('send-message', function(data) {
      console.log(data);
      // socket.broadcast.emit('message-received', data);
      io.emit('message-received', data);
    });
  
    // Send a 'like' to the user of your choice
    socket.on('send-like', function(data) {
      console.log(data);
      console.log(data.like);
      console.log(data.from);
      socket.broadcast.to(data.like).emit('user-liked', data);
    });
  
    socket.on('extend-challenge', function(name, challenged) {
      console.log(name + " has challenged " + challenged + " to a game. Begin game protocols.");
      //send challenge to the player who has been challenged
      io.emit('check-challenge-response', name, challenged);
    });
  
    socket.on('challenge-accepted', function(name, challenger) {
      //This will create the default user objects and populate the gameObj
      createDefaultGameObject(name,challenger, gameObj);
      privateUsers.push(name);
      privateUsers.push(challenger);
      console.log(name + ' ACCEPTED challenge from ' + challenger);
      io.emit('challenger-join-private', challenger, name);
      io.emit('update-users-challenge-accepted', name, challenger);
      //remove both players from users list as i dont want them visible in the main chat room.
      users = users.filter(function(item) {
        return item.nickname !== name;
        });
      users = users.filter(function(item) {
        return item.nickname !== challenger;
        });
    });

    socket.on('challenge-refused', function(name, challenger) {
      console.log(name + ' REFUSED challenge from ' + challenger);
      io.emit('update-users-challenge-refused', name, challenger);
    });

    socket.on('first-color-selected', function(name, chosenColor) {
      console.log(name + " has chosen "+ chosenColor +" as their color.");
      io.emit('first-color-has-been-selected', name, chosenColor, privateUsers);
      addColorToUserObj(name, chosenColor, gameObj);
    });

    socket.on('second-color-selected', function(name, chosenColor) {
      console.log(name + " has chosen "+ chosenColor +" as their color.");
      io.emit('second-color-has-been-selected', name, chosenColor, privateUsers);
      addColorToUserObj(name, chosenColor, gameObj);
    });
  
    socket.on('first-base-selected', function(location, name, bx, by) {
      console.log(name + " has selected this location for their base "+ location);
      console.log("1st NOT COMPARED / VERIFIED");
      addBaseLocationToUserObj(name, location, bx, by, gameObj);
      io.emit('first-base-has-been-selected', name, privateUsers);
    });

    socket.on('second-base-selected', function(location, name, bx, by) {
      console.log(name + " has selected this location for their base "+ location);
      console.log("2nd NOT COMPARED / VERIFIED");
      addBaseLocationToUserObj(name, location, bx, by, gameObj);
      
      var basesAccepted = compareBaseLocations(gameObj);
      if (basesAccepted) {
        //passed validation
        console.log("2 bases chosen. PASS");
        console.log(privateUsers + " <----------- private users");
    
        io.emit('second-base-has-been-selected-pass', privateUsers);
      } else {
        //failed validation
        console.log("2 bases chosen. FAIL. RESET.");
        //clear the values for base placement
        addBaseLocationToUserObj(privateUsers[0], "","", "", gameObj);
        addBaseLocationToUserObj(privateUsers[1], "","", "", gameObj);
        gameObj['stage'] = "TwoColorsSelected";
        io.emit('second-base-has-been-selected-fail', privateUsers);
      }
    });

    socket.on('add-troops-to-gameObj', function(name, troopArray){
      addTroopsToGameObject(name, troopArray, gameObj);
    });

    socket.on('update-troop-location', function(username, name, node){ 
      //name is name of the troop
      serverUpdateTroopLocation(username, name, node, gameObj);
    });

    socket.on('update-visible-tiles', function(username, visibleTileArray){
      //call function to update gameObj with most recent visible tiles for player
      serverUpdateVisibleTiles(username, visibleTileArray, gameObj);
    });


    //end of socket.on section
  });
  


  //Server-Side Functions
  function compareBaseLocations(gameObj) {
    //get user names from PrivateUsers array
    var p1 = privateUsers[0];
    var p2 = privateUsers[1];
    //get base coordinates from gameObj 
    var b1x = gameObj[p1].base["xCoord"];
    var b1y = gameObj[p1].base["yCoord"];
    var b2x = gameObj[p2].base["xCoord"];
    var b2y = gameObj[p2].base["yCoord"];
    //establish buffer
    var maxRow = 20;
    var buffer = maxRow/5;
    //determine differences
    var xdiff = getXDifference(b1x,b2x);
    var ydiff = getYDifference(b1y,b2y);
    console.log("xDiff = "+ xdiff+ " & yDiff = "+ ydiff);
         if ((xdiff >= buffer) || (ydiff >= buffer)) {
          //return true if the bases pass location validation and the game should commence
          return true;
         } else {
          //return false if the bases fail validation and the users need to reselect their bases
          return false;
         }
}

  function getXDifference(b1x,b2x) {
    var larger = Math.max(b1x,b2x);
    var smaller = Math.min(b1x,b2x);
    var difference = Number(larger - smaller);
    return difference;
}

function getYDifference(b1y,b2y) {
    var larger = Math.max(b1y,b2y);
    var smaller = Math.min(b1y,b2y);
    var difference = Number(larger - smaller);
    return difference;
}

function createDefaultGameObject(name, challenger, gameObj) {
    //creating a "stage" and a "turn" object so that these things can be monitored and updated as needed
    gameObj['stage'] = "pregame";
    gameObj['turn'] = "pregame";
    //Take the names of the two users and create a default user object for each of them
    let firstname = name;
    let secondname = challenger;
    name = createDefaultUserObject(name);
    challenger = createDefaultUserObject(challenger);
    //adding the 2 player objects to the gameObj object
    gameObj[firstname] = name;
    gameObj[secondname] = challenger;
    //comment out this line to hide gameObj being written to console
    console.log(JSON.stringify(gameObj, null, 4));   
    
    return gameObj;
}

function createDefaultUserObject(user) {
    user = {"name": user};
    user.color = "";
    user.visibleTiles = [];
    user.base = {"health": 200, "loc":"", "xCoord":"", "yCoord":"", "xyCoord":""};
    user.troops = {};
    //Uncomment this to see the default user object generated when a challenge is accepted
    // console.log(JSON.stringify(user, null, 4));         --uncomment to see gameObj
    return user;
}

//add selected color to user object
function addColorToUserObj(name, chosenColor, gameObj) {
  gameObj[name].color = chosenColor;
  let stage = gameObj['stage'];
  //update stage to track game setup
  if (stage == "pregame") {
    gameObj['stage'] = "OneColorSelected";
  } else if (stage == "OneColorSelected") {
    gameObj['stage'] = "TwoColorsSelected";
  } else {
    console.log("addColorToUserObj fell into an unexpected state.");
  }

  //Uncomment this to see the gameObj after a player's chosen color is added
  console.log(JSON.stringify(gameObj, null, 4));
  return gameObj;
}

//add the selected location data to the user object
function addBaseLocationToUserObj(name, location, bx, by, gameObj) {

  gameObj[name].base["loc"] = location;
  gameObj[name].base["xCoord"] = bx;
  gameObj[name].base["yCoord"] = by;
  gameObj[name].base["xyCoord"] = bx.toString() +","+ by.toString();
  //update stage to track progress in game setup
  let stage = gameObj['stage'];
  
  if (stage == "TwoColorsSelected") {
    gameObj['stage'] = "OneLocationSelected";
  } else if (stage == "OneLocationSelected") {
    gameObj['stage'] = "TwoLocationsSelected";
  } else {
    console.log("addBaseLocationToUserObj fell into an unexpected state.");
  }
  //Uncomment this to see the gameObj after a player's location is added
  console.log(JSON.stringify(gameObj, null, 4));

  return gameObj;
}

//this function will iterate over all properties in an object and reveal the property name and value
function showProps(obj, objName) {
  var result = '';
  for (var i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      result += objName + '.' + i + ' = ' + obj[i] + '\n';
    }
  }
  console.log(result);
}

//this function will remove items from gameObj when the key & id are provided
function deleteFromGameObj(key, id, gameObj) {
  delete gameObj[key][id];
  return gameObj;
}

function addTroopsToGameObject(username, troopArray, gameObj) {
  //converting troopArray to an object of troop Objects
  for (var i=0; i<troopArray.length; i++){
    let troopName = troopArray[i].Name;
    gameObj[username].troops[troopName] = troopArray[i];
  }
  console.log('troops added to gameObj for '+username);
  console.log(JSON.stringify(gameObj, null, 4));
  return gameObj;
}

function serverUpdateTroopLocation(username, name, node, gameObj) {
  //name is the name of the troop being updated
    gameObj[username].troops[name].Location = node;
    // console.log(JSON.stringify(gameObj, null, 4));     --uncomment to see gameObj
    console.log(username + " moved their "+ name + " to "+ node);
    return gameObj;
}

function serverUpdateVisibleTiles(username, visibleTileArray, gameObj) {
  //server update the visible tiles for a specific player
  gameObj[username].visibleTiles = visibleTileArray;
  makeVisibleOtherPlayersUnits(username, gameObj);
  // console.log(JSON.stringify(gameObj, null, 4));    --uncomment to see gameObj
  // console.log(visibleTileArray);                    --uncomment to see visibleTiles
  return gameObj;
}

function makeVisibleOtherPlayersUnits(username, gameObj) {

  // this will add to the map the other player's units & base
  let visibleTileArray = gameObj[username].visibleTiles;
  var makeKnown = [];
  
      for (var k=0; k<visibleTileArray.length; k++) {
          for (var i=0; i<otherPlayerObj.troops.length; i++) {
              if (otherPlayerObj.troops[i].Location == visibleTileArray[k]) {
                  
              //add the desired details into a visibleItem which will be placed in makeKnown array
              //then returned and rendered on client side
              let visibleItem = {};
              visibleItem.location = gameObj[otherPlayer].troops[i].Location;
              visibleItem.name = gameObj[otherPlayer].troops[i].troopName;
              visibleItem.color = gameObj[otherPlayer].color;
              visibleItem.health = gameObj[otherPlayer].health;
              makeKnown.push(visibleItem);
              }
             
          }
          //if visible this will show the other players base
          if (otherPlayerObj.base.Location == visibleTileArray[k]) {
            let visibleItem = {};
            visibleItem.location = gameObj[otherPlayer].troops[i].Location;
            visibleItem.name = 'enemy base';
            visibleItem.color = gameObj[otherPlayer].color;
            visibleItem.health = gameObj[otherPlayer].base.health;
            makeKnown.push(visibleItem);
              } 
          }
      
      //send the data to the client to render
      if (makeKnown.length > 0) {
          io.emit('rende-enemy-units', username, makeKnown);
          }

}
