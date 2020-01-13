//Chrome debug instructions
//$ nodemon --inspect server.js
//type into chrome: about:inspect
//select open dedicated dev tools for node
const fs = require('fs');

var express = require('express');
// Create the app
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Set up the server
var server = app.listen(8181, listen);
var users = [];
var gameObj = {};
var userObj = {};
var privateUsers = [];
// This call back just tells us that the server has started
function listen() {
  var port = server.address().port;
}

app.use(express.static('public'));

// WebSocket Portion
var io = require('socket.io')(server);
var clientCount = 0;
// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', function (socket) {

  // We are given a websocket object in our function
  server.getConnections(function(error, count){ 
    clientCount = count;
  });

  console.log(clientCount + ' number of clients connected. That is more than we had before.');
  io.sockets.emit('broadcast',{ description: clientCount + ' clients connected!'});
  io.sockets.emit('usernames-taken', users);

socket.on('disconnect', function() {
  clientCount -=1;
  console.log(clientCount + ' number of clients connected. Less than we had before.');
  io.emit('broadcast',{ description: clientCount + ' clients connected!'});
  users = users.filter(function(item) {
    return item.nickname !== socket.nickname;
  });
  io.emit('all-users', users);
});

// Join private room
socket.on('join-private', function(data) {
  socket.join('private');
  console.log(data + ' joined private');
  io.emit('all-users', users);
  //send both players that joined private to the game html page - or change the html rendered
  var newHtml = app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/', 'game1.html'));
    });
    io.in('private').emit('new-game-html', 'woo');
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
  console.log('this is data.nickname value inside of join on server side ' + data.name);
  socket.nickname = data.name;
  // users[socket.nickname] = socket; 
  userObj = {
    nickname: data.name,
    socketid: socket.id
  }
  users.push(userObj);
  console.log('a user joined!! -----> current users:');
  console.log(users);
  io.emit('usernames-taken', users);
  io.emit('all-users', users);
});

// Send a message
socket.on('send-message', function(data, sender) {
  console.log(data);
  io.emit('message-received', data, sender);
});

// Send a message
socket.on('mobile-send-message', function(data, Color) {
  console.log(data + " ...and color is "+ Color);
  io.emit('mobile-message-received', data, Color);
});
  
// Send a 'like' to the user of your choice
socket.on('send-like', function(data) {
  console.log(data);
  console.log(data.like);
  console.log(data.from);
  socket.broadcast.to(data.like).emit('user-liked', data);
});

socket.on('extend-challenge', function(name, challenged) {
  console.log(name + ' has challenged ' + challenged + ' to a game. Begin game protocols.');
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
  console.log('first player ' + name + ' has chosen '+ chosenColor +' as their color.');
  io.emit('first-color-has-been-selected', name, chosenColor, privateUsers);
  addColorToUserObj(name, chosenColor, gameObj);
});

socket.on('second-color-selected', function(name, chosenColor) {
  console.log('second player ' + name + ' has chosen '+ chosenColor +' as their color.');
  io.emit('second-color-has-been-selected', name, chosenColor, privateUsers);
  addColorToUserObj(name, chosenColor, gameObj);
});
  
socket.on('first-base-selected', function(loc, name, bx, by) {
  console.log(name + ' has selected this Location for their base '+ loc);
  console.log('1st NOT COMPARED / VERIFIED');
  addBaseLocationToUserObj(name, loc, bx, by, gameObj);
  
  var tiles = updateVisibilityForBase(loc);
  gameObj[name].visibleTiles = tiles;
  // console.log(tiles);
  io.emit('first-base-has-been-selected', name, privateUsers, tiles);
});

socket.on('second-base-selected', function(loc, name, bx, by) {
  console.log(name + ' has selected this Location for their base '+ loc);
  console.log('2nd NOT COMPARED / VERIFIED');
  
  addBaseLocationToUserObj(name, loc, bx, by, gameObj);
  var basesAccepted = compareBaseLocations(gameObj);

  if (basesAccepted) {
    //passed validation
    console.log('2 bases chosen. PASS');
    var tiles = updateVisibilityForBase(loc);
    gameObj[name].visibleTiles = tiles;
    io.emit('second-base-has-been-selected-pass', name, privateUsers, tiles);

  } else {
    //failed validation - clear visibleTiles and reset
    let opponentArray = privateUsers.filter(function(x) { return x !== username});
    let opponent = opponentArray[0];

    gameObj[opponent].visibleTiles = "";
    gameObj[name].visibleTiles = "";

    console.log('2 bases chosen. FAIL. RESET.');
    //clear the values for base placement
    gameObj['stage'] = 'TwoColorsSelected';
    addBaseLocationToUserObj(privateUsers[0], '','', '', gameObj);
    addBaseLocationToUserObj(privateUsers[1], '','', '', gameObj);
    
    io.emit('second-base-has-been-selected-fail', privateUsers);
  }
});

socket.on('add-troops-to-gameObj', function(name, troopArray){
  addTroopsToGameObject(name, troopArray, gameObj);
});

socket.on('update-troop-loc', function(username, unitName, node){ 

  var visibleTileArray = serverUpdateTroopLocation(username, unitName, node, gameObj);
  serverUpdateVisibleTiles(username, visibleTileArray, gameObj);
});

//use this function to call a client side function for the other player
socket.on('cross-server-control', function(name, functionToRun, arg1, arg2){
  console.log('in server.js, supposed to call '+ functionToRun + ' for user: ' +name);
  // controlOtherClientThroughServer(name, functionToRun, userObj);
  var socketid = userObj[socketid];
  socket.broadcast.to(socketid).emit('run-function', username, functionToRun, arg1, arg2);
});

socket.on('signal-turn-over', function(username){
  console.log(username +'\'s turn is coming to an end.');
  let currentPlayerArray = privateUsers.filter(function(x) { return x !== username});
  let currentPlayer = currentPlayerArray[0];
  console.log('it should now be ' + currentPlayer +'\'s turn');
  io.emit('set-current-player', currentPlayer);
  
});

socket.on('send-attack-to-server', function(username, unitName, id){
  console.log(username + ' has attacked location ' + id + ' with ' + unitName);
  let opponentArray = privateUsers.filter(function(x) { return x !== username});
  let opponent = opponentArray[0];

  let unitPresent = isUnitAtLocation(opponent, id);
  console.log('unit is found to attack?' + unitPresent);
  //unit not at Location. pass turn to other player
  if(unitPresent){
    let troopObj = attackEnemyUnit(username, opponent, unitName, id);
    io.emit('update-client-post-attack', opponent, troopObj);
  }

  let gameOver = checkForGameOver();

  if (!gameOver){
    console.log('attack over, calling set-current-player to '+ opponent);
    io.emit('set-current-player', opponent);
  } else {
    // TODO - game is over, trigger win/lose
  }
});

socket.on('remove-moved-unit', function(id, username){
  let opponentArray = privateUsers.filter(function(x) { return x !== username});
  let opponent = opponentArray[0];
  io.emit('remove-unit-from-board-for-user', id, opponent);
});


socket.on('send-swarm-to-server', function(username, damagedArray){
  let opponentArray = privateUsers.filter(function(x) { return x !== username});
  let opponent = opponentArray[0];

  let visibleArray = gameObj[username].visibleTiles;
  visibleArray = visibleArray.concat(damagedArray);
  visibleArray = returnArrayWithoutDuplicates(visibleArray);

  serverUpdateVisibleTiles(username, visibleArray, gameObj);

  let playerObj = applySwarmDamage(opponent, damagedArray);
  io.emit('update-client-post-attack', opponent, playerObj);
});



socket.on('send-scan-to-sever', function(username, scanArray, id){
  //TODO test this
  let opponentArray = privateUsers.filter(function(x) { return x !== username});
  let opponent = opponentArray[0];

  let visibleArray = gameObj[username].visibleTiles;
  visibleArray = visibleArray.concat(scanArray);
  visibleArray = returnArrayWithoutDuplicates(visibleArray);

  serverUpdateVisibleTiles(username, visibleArray, gameObj);

  let playerObj = gameObj[opponent];
  io.emit('update-client-post-attack', opponent, playerObj);
});


socket.on('send-depthCharge-to-server', function(username, stunnedArray, id){
   //TODO test this
   let opponentArray = privateUsers.filter(function(x) { return x !== username});
   let opponent = opponentArray[0];
 
   let visibleArray = gameObj[username].visibleTiles;
   visibleArray = visibleArray.concat(stunnedArray);
   visibleArray = returnArrayWithoutDuplicates(visibleArray);
 
   serverUpdateVisibleTiles(username, visibleArray, gameObj);
 
   let playerObj = applyDepthChargeStun(opponent, stunnedArray);

   io.emit('update-client-post-attack', opponent, playerObj);
});


socket.on('send-bombardier-to-server', function(username, damagedArray, id){
  //TODO test this
  let opponentArray = privateUsers.filter(function(x) { return x !== username});
  let opponent = opponentArray[0];

  let visibleArray = gameObj[username].visibleTiles;
  visibleArray = visibleArray.concat(damagedArray);
  visibleArray = returnArrayWithoutDuplicates(visibleArray);

  serverUpdateVisibleTiles(username, visibleArray, gameObj);

  let playerObj = applyBombardierDamage(opponent, damagedArray); 

  io.emit('update-client-post-attack', opponent, playerObj);
});


  socket.on('send-blind-to-server', function(username, blindArray, id){
    //TODO test this
    let opponentArray = privateUsers.filter(function(x) { return x !== username});
    let opponent = opponentArray[0];
    let visibleArray = applyBlind(opponent, blindArray); 

    serverUpdateVisibleTiles(opponent, visibleArray, gameObj);
  });



    //end of socket.on section
  });
  

  //Server-Side Functions

//this function is supposed to target a specific socket client and run a given function
function controlOtherClientThroughServer(username, functionToRun, userObj){
  var socketid = userObj[socketid];
  socket.broadcast.to(socketid).emit('run-function', username, functionToRun);
}

function compareBaseLocations(gameObj) {
    //get user names from privateUsers array
    var p1 = privateUsers[0];
    var p2 = privateUsers[1];
    //get base coordinates from gameObj 
    var b1x = gameObj[p1].base['xCoord'];
    var b1y = gameObj[p1].base['yCoord'];
    var b2x = gameObj[p2].base['xCoord'];
    var b2y = gameObj[p2].base['yCoord'];
    //establish buffer
    var maxRow = 20;
    var buffer = maxRow/5;
    //determine differences
    var xdiff = getXDifference(b1x,b2x);
    var ydiff = getYDifference(b1y,b2y);
    console.log('xDiff = '+ xdiff+ '        yDiff = '+ ydiff);
         if ((xdiff >= buffer) || (ydiff >= buffer)) {
          //return true if the bases pass Location validation and the game should commence
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
    gameObj['stage'] = 'pregame';
    gameObj['turn'] = 'pregame';
    //Take the names of the two users and create a default user object for each of them
    let firstname = name;
    let secondname = challenger;
    name = createDefaultUserObject(name);
    challenger = createDefaultUserObject(challenger);
    //adding the 2 player objects to the gameObj object
    gameObj[firstname] = name;
    gameObj[secondname] = challenger;
    //uncomment this line to see gameObj at initial creation
    //console.log(JSON.stringify(gameObj, null, 4));   
    
    return gameObj;
}

function createDefaultUserObject(user) {
  user = {'Name': user};
  user.troopsPlaced = 0;
  user.PV = 0;
  user.Color = '';
  user.visibleTiles = [];
  user.base = {'Health': 200, 'Loc':'', 'xCoord':'', 'yCoord':'', 'xyCoord':''};
  user.troops = [];
  //Uncomment this to see the default user object generated when a challenge is accepted
  // console.log(JSON.stringify(user, null, 4));         --uncomment to see gameObj
  return user;
}

//add selected Color to user object
function addColorToUserObj(name, chosenColor, gameObj) {
  gameObj[name].Color = chosenColor;
  let stage = gameObj['stage'];
  //update stage to track game setup
  if (stage == 'pregame') {
    gameObj['stage'] = 'OneColorSelected';
  } else if (stage == 'OneColorSelected') {
    gameObj['stage'] = 'TwoColorsSelected';
  } else {
    console.log('addColorToUserObj fell into an unexpected state.');
  }

  //Uncomment this to see the gameObj after a player's chosen Color is added
  //console.log(JSON.stringify(gameObj, null, 4));
  return gameObj;
}

//add the selected Location data to the user object
function addBaseLocationToUserObj(name, loc, bx, by, gameObj) {

  gameObj[name].base['Loc'] = loc;
  gameObj[name].base['xCoord'] = bx;
  gameObj[name].base['yCoord'] = by;
  gameObj[name].base['xyCoord'] = bx.toString() +','+ by.toString();
  //update stage to track progress in game setup
  let stage = gameObj['stage'];
  console.log('stage is ' + stage);
  if (stage == 'OneColorSelected' || stage == 'TwoColorsSelected') {
    gameObj['stage'] = 'OneLocationSelected';
  } else if (stage == 'OneLocationSelected') {
    gameObj['stage'] = 'TwoLocationsSelected';
  } else {
    console.log('addBaseLocationToUserObj fell into an unexpected state.');
  }
  //Uncomment this to see the gameObj after a player's Location is added
  //console.log(JSON.stringify(gameObj, null, 4));
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
function deleteFromGameObj(key, id) {
  delete gameObj[key][id];
  return gameObj;
}

function addTroopsToGameObject(username, troopArray, gameObj) {
  //converting troopArray to an object of troop Objects
  for (let i=0; i<troopArray.length; i++){
    gameObj[username].troops.push(troopArray[i]);
  }
  console.log('troops added to gameObj for '+username);
  //console.log(JSON.stringify(gameObj, null, 4));

  return gameObj;
}

function serverUpdateTroopLocation(username, name, node, gameObj) {
  //name is the name of the troop being updated
  for(let i=0; i<gameObj[username].troops.length; i++){
    if(gameObj[username].troops[i].Name == name){
      gameObj[username].troops[i].Loc = node;
    }
  }

  // console.log(JSON.stringify(gameObj, null, 4));     --uncomment to see gameObj
  console.log(username + ' moved their '+ name + ' to '+ node);
  var visibleTileArray = updateVisibilityForTroops(username);
  io.emit('update-visible-tiles', username, visibleTileArray);
  
  //check the current game state (stage) and update accordingly when all units for a player are placed
  let stage = gameObj['stage'];
  let numberOfTroopsPlaced = gameObj[username].troopsPlaced + 1;
  gameObj[username].troopsPlaced = numberOfTroopsPlaced;
  console.log(username +' troopsPlaced = '+ numberOfTroopsPlaced);

  if (numberOfTroopsPlaced === 3) {
    if (stage === 'TwoLocationsSelected') {
      gameObj['stage'] = 'UnitsPlacedForOnePlayer';
      console.log('game state updated to '+ gameObj['stage']);
    }
    else if (stage === 'UnitsPlacedForOnePlayer') {
      gameObj['stage'] = 'UnitsPlacedForTwoPlayers';
      console.log('game state updated to '+ gameObj['stage']);
      serverTriggerGameStart(gameObj);
    } 
    else {
      alert('there is an error in serverUpdateTroopLocation. please troubleshoot');
    }
  }
    
  return visibleTileArray;
}

function updateVisibilityForBase(Location) {
 
  let tiles = [];
  var baseCoords = convertIdToCoordinates(Location);
  var b1x = Number(baseCoords[0]);
  var b1y = Number(baseCoords[1]);
   //this grabs all tiles within 2 of the base and makes them visible
   for (var i=Math.max((b1x-2),0); i<Math.min((b1x+3),20); i++) {
      for (var j=Math.max((b1y-2),0); j<Math.min((b1y+3),20); j++) {
          var id = convertCoordsToId(i,j);
          tiles.push(id);
          }
      }
      return tiles;
}

//Update the visible tiles for the troop placed or moved
function updateVisibilityForTroops(username) {
  var visibleArray = gameObj[username].visibleTiles;
  var otherPlayer = privateUsers.filter(function(x) { return x !== username});
  otherPlayer = otherPlayer[0];
  if (visibleArray == "") {
      var visibleTileArray = [];
  } else {
      var visibleTileArray = visibleArray;
  }

  for (let i=0; i<gameObj[username].troops.length; i++) {

      var troopLocation = gameObj[username].troops[i].Loc;

      if (troopLocation != "tbd") {
        //console.log('inside updateVisibilityForTroops inside troopLocation != "tbd"');
        var visibility = gameObj[username].troops[i].Visibility;
        //console.log('visibility is ');
        //console.log(visibility);
        var tCoordsArray = convertIdToCoordinates(troopLocation);
        var tx = Number(tCoordsArray[0]);
        var ty = Number(tCoordsArray[1]);
        for (var m=Math.max((tx-visibility),0); m<Math.min((tx+visibility+1),20); m++) {
            for (var n=Math.max((ty-visibility),0); n<Math.min((ty+visibility+1),20); n++) {
                var id = convertCoordsToId(m,n);
                
                visibleTileArray.push(id);
        }   
      }
    }
  }

  visibleTileArray = returnArrayWithoutDuplicates(visibleTileArray);
  
  return visibleTileArray;
}

function serverUpdateVisibleTiles(username, visibleTileArray, gameObj) {

  var otherPlayer = privateUsers.filter(function(x) { return x !== username});
  otherPlayer = otherPlayer[0];

  //server update the visible tiles for a specific player
  gameObj[username].visibleTiles = visibleTileArray;
  io.emit('update-visible-tiles', username, visibleTileArray);

  makeVisibleOtherPlayersUnits(username, gameObj, privateUsers);
  makeVisibleOtherPlayersUnits(otherPlayer, gameObj, privateUsers);

  return gameObj;
}

function makeVisibleOtherPlayersUnits(username, gameObj, privateUsers) {

  // this will add to the map the other player's units & base
  var otherPlayer = privateUsers.filter(function(x) { return x !== username});
  otherPlayer = otherPlayer[0];
  let visibleTileArray = gameObj[username].visibleTiles;
  var makeKnown = [];
 
  for (var k=0; k<visibleTileArray.length; k++) {
    for (let i=0; i<gameObj[otherPlayer].troops.length; i++) {

        var troopLocation = gameObj[otherPlayer].troops[i].Loc;

        if (troopLocation == visibleTileArray[k]) {
          console.log('EUREKA we have a match! -- '+gameObj[otherPlayer].troops[i].Name+' spotted!!');  
          //add the desired details into a visibleItem which will be placed in makeKnown array
          //then returned and rendered on client side
          let visibleItem = {};
          visibleItem.Loc = troopLocation;
          visibleItem.Name = gameObj[otherPlayer].troops[i].Name;
          visibleItem.Color = gameObj[otherPlayer].Color;
          visibleItem.Health = gameObj[otherPlayer].troops[i].HealthPoints;
          visibleItem.MaxHealth = gameObj[otherPlayer].troops[i].MaxHealth;
          console.log(JSON.stringify(visibleItem, null, 4));
          makeKnown.push(visibleItem);
        }         
    }
    //if visible this will show the other players base
    if (visibleTileArray[k] == (gameObj[otherPlayer].base.Loc)) {
      console.log('BASE LOCATED!');
      let visibleItem = {};
      visibleItem.Loc = gameObj[otherPlayer].base.Loc;
      visibleItem.Name = 'enemy base';
      visibleItem.Color = gameObj[otherPlayer].Color;
      visibleItem.Health = gameObj[otherPlayer].base.Health;
      visibleItem.MaxHealth = gameObj[otherPlayer].base.MaxHealth;
      makeKnown.push(visibleItem);
    } 
  }

    //send the data to the client to render
    if (makeKnown.length > 0) {
      io.emit('render-enemy-units', username, makeKnown);
    }
}

function serverTriggerGameStart(gameObj) {
  //first determine which player will go first
  calculateStartingPlayer(gameObj, privateUsers);

  return gameObj;
}

function calculateStartingPlayer(gameObj, privateUsers) {
  for (var i=0; i<privateUsers.length; i++) {
    var username = privateUsers[i];
  //get the PV sum for each player. Player with least PV will go first.
  //in case of tie, random number will decide.
    var PV = Number(gameObj[username].PV);
    for(var value in gameObj[username].troops) {

      PV = PV + Number(gameObj[username].troops[value].PerceivedValue);
    }
    //assign new value
    gameObj[username].PV = PV;
    console.log('PV calculated as ' + PV + ' for ' + username);
  }
    var player1 = privateUsers[0];
    var player2 = privateUsers[1];
    var startingPlayer;
    //compare the calculated PV for both players
    if (gameObj[player1].PV > gameObj[player2].PV) {
        startingPlayer = gameObj[player2].Name;
    } else if (gameObj[player2].PV > gameObj[player1].PV) {
        startingPlayer = gameObj[player1].Name;
    } else {
      //pick a random player to start because their PV is the same
      startingPlayer = seekRandomPlayerToStart(privateUsers);

    }
      console.log('logging inside calculateStartingPlayer.... starting player is ' + startingPlayer);
      setStartingPlayer(startingPlayer, privateUsers);

  return gameObj;
}

function seekRandomPlayerToStart(privateUsers) {
  var playerName;
  var randomX = Math.floor(Math.random());
  if (randomX <= .5) {
    playerName = privateUsers[0];
  } else {
    playerName = privateUsers[1];
  }
  return playerName;
}

function setStartingPlayer(startingPlayer, privateUsers) {
  //send starting player name to 
  io.emit('set-starting-player', startingPlayer, privateUsers);
  console.log('set starting player ' + startingPlayer);
}

function convertCoordsToId(x,y) {
  var x = Number(x);
  var y = Number(y);
  var id;
  if (y == 0) {
      id = x;
  } else {
      id = (y*20)+x;
  }
  return id;
}

function convertIdToCoordinates(id) {
  if (id == 'tbd'){
      return 'tbd';
  }
    var x,y;
    y = Math.floor(id/20);
    x = id % 20;
    var coords = [];
    coords.push(x);
    coords.push(y);
  return coords;
}

function returnArrayWithoutDuplicates(a) {
  return Array.from(new Set(a));
}

function isUnitAtLocation(username, id){
  let unitFound = false;
  let troopObj = gameObj[username].troops;
  let baseObj = gameObj[username].base;
  Object.keys(troopObj).forEach(function(key) {
    if (troopObj[key].Loc == id) {
      unitFound = true;
    }
    console.log(key, troopObj[key]);
  });

  if(baseObj.Loc == id){
    unitFound = true;
  }
  return unitFound;
}

function attackEnemyUnit(username, opponent, unitName, id){
  var troopHealthPostAttack;
  let troopObj = gameObj[opponent].troops;
  let attackingUnit = gameObj[username].troops.filter(function (item) {
    return item.Name == unitName;
  });
  attackingUnit = attackingUnit[0];

  for (let i=troopObj.length-1; i>=0; i--) {
    if (troopObj[i].Loc == id) {
      troopObj[i].HealthPoints -= attackingUnit.AttackDamage;
      troopHealthPostAttack = troopObj[i].HealthPoints;
      
      // delete killed unit
      if (troopHealthPostAttack <= 0) {
        console.log('removing '+ troopObj[i].Name + ' from gameObj. It\s been killed.');
        io.emit('remove-unit-from-board', id);
        delete troopObj[i];
      }

      console.log(troopObj[i].HealthPoints + ' is hp and ' + attackingUnit.AttackDamage + ' is attack dmg');
    }
  }
    // subtract Health frome base if base is hit
  if(gameObj[opponent].base.Loc == id){
    gameObj[opponent].base.HealthPoints -= gameObj[username].troops[unitName].AttackDamage;
    updateBaseTooltip(opponent);
  }
  // TODO if base is killed end game

  if (troopHealthPostAttack > 0){
      var MyUnitImage = updateFriendlyUnitImgAndTooltip(opponent, id);
      var EnemyUnitImage = updateEnemyUnitImgAndTooltip(opponent, id);
      io.emit('update-tooltips-post-attack', username, MyUnitImage, EnemyUnitImage, id);
  }  
  return gameObj[opponent];
}

function updateBaseTooltip(opponent){
  let baseHealth = gameObj[opponent].base.HealthPoints;
  let loc = gameObj[opponent].base.Loc;
  io.emit('update-base-title', opponent, baseHealth, loc);
}

function updateFriendlyUnitImgAndTooltip(opponent, id){
  var unitImage;

  gameObj[opponent].troops.forEach(function(item) {
    if (item.Loc == id) {
      let title = item.Name + ", "+item.HealthPoints+" / "+item.MaxHealth+" Health Points";
      unitImage = "<img style='height: 100%; width: 100%;' id='player1"+item.Name+"' src='/Assets/"+item.Name+gameObj[opponent].Color+".png' title='"+title+"'></img>";
    }
  })
  return unitImage;
}

function updateEnemyUnitImgAndTooltip(opponent, id){
  var unitImage;

  gameObj[opponent].troops.forEach(function(item) {
    if (item.Loc == id) {
      let title = "Enemy "+item.Name + ", "+item.HealthPoints+" / "+item.MaxHealth+" Health Points";
      unitImage = "<img style='height: 100%; width: 100%;' id='player1"+item.Name+"' src='/Assets/"+item.Name+gameObj[opponent].Color+".png' title='"+title+"'></img>";
    }
  })
  return unitImage;
}

// TODO complete this function
// - check gameObj to see if either base is dead or either player has 0 units left
function  checkForGameOver(){
  return false;
}

// UNIQUE MOVES
function applySwarmDamage(userToDamage, damagedArray) {
  var playerObj = gameObj[userToDamage];

  for (let i=0; i<damagedArray.length; i++) {

      playerObj.troops.forEach(function(item, index) {

        //console.log(item.Loc + ' is the Loc of ' + item.Name);
        if (damagedArray[i] == item.Loc) {
            var health = parseInt(item.HealthPoints);
            health -= item.UniqueDamage;
            playerObj.troops[index].HealthPoints = health;

            if (health <= 0) {
              // unit is dead, remove it from game
              console.log('removing '+ item.Name + ' from gameObj. It\s been killed.');
              io.emit('remove-unit-from-board', item.Loc);
              delete playerObj.troops[index];

            } else {
              let id = damagedArray[i];
              var MyUnitImage = updateFriendlyUnitImgAndTooltip(userToDamage, id);
              var EnemyUnitImage = updateEnemyUnitImgAndTooltip(userToDamage, id);
              io.emit('update-tooltips-post-attack', userToDamage, MyUnitImage, EnemyUnitImage, id);
            }
        }

        //if the attack hit the enemy base
        if (damagedArray[i] == playerObj.base.Loc) {
          var baseHealth = parseInt(playerObj.base.HealthPoints);
          baseHealth -= item.UniqueDamage;
          playerObj.base.HealthPoints = baseHealth;
          updateBaseTooltip(userToDamage);

          if (baseHealth <= 0) {
              //TODO trigger game over!
          }
        }
    })
  }
  gameObj[userToDamage] = playerObj;
  return playerObj;
}

function applyDepthChargeStun(userToDamage, stunnedArray) {
  var playerObj = gameObj[userToDamage];

  for (let i=0; i<stunnedArray.length; i++) {

      playerObj.troops.forEach(function(item, index) {
          if (stunnedArray[i] == item.Loc) {
              var cooldown = parseInt(item.Cooldown);
              //TODO confirm this is the desired value (2)
              cooldown += 2;
              item.Cooldown = cooldown;
          }
      })
  }
}

function applyBombardierDamage(userToDamage, damagedArray) {
  var playerObj = gameObj[userToDamage];

  for (let i=0; i<damagedArray.length; i++) {

      playerObj.troops.forEach(function(item, index) {
          if (damagedArray[i] == item.Loc) {
              var health = parseInt(item.HealthPoints);
              health -= 25;
              playerObj.troops[index].HealthPoints = health;

              if (health <= 0) {
                // unit is dead, remove it from game
                console.log('removing '+ item.Name + ' from gameObj. It\s been killed.');
                io.emit('remove-unit-from-board', item.Loc);
                delete playerObj.troops[index];

              } else {
                let id = damagedArray[i];
                var MyUnitImage = updateFriendlyUnitImgAndTooltip(userToDamage, id);
                var EnemyUnitImage = updateEnemyUnitImgAndTooltip(userToDamage, id);
                io.emit('update-tooltips-post-attack', userToDamage, MyUnitImage, EnemyUnitImage, id);
              }
          }
      })

      //if the attack hit the enemy base
      if (damagedArray[i] == playerObj.base.Loc) {
          var baseHealth = parseInt(playerObj.base.HealthPoints);
          baseHealth -= 25;
          playerObj.base.HealthPoints = baseHealth;

          if (baseHealth <= 0) {
            //TODO trigger game over
          } else {
            updateBaseTooltip(userToDamage);
          }
      }
  }
}

function applyBlind(opponent){
  // begin by wiping visibility
  gameObj[opponent].visibleTiles = "";
 
  let unitLocations = [];
  let playerObj = gameObj[opponent].troops;

  playerObj.forEach(function(item, index){
    let loc = item.Loc;
    unitLocations.push(loc);
  });

  let baseLoc = gameObj[opponent].base.Loc;
  unitLocations.push(baseLoc);

  gameObj[opponent].visibleTiles = unitLocations;

  return unitLocations;
}