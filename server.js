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
      io.emit('all-users', users);
    });
  
    // Send a message
    socket.on('send-message', function(data) {
      console.log("did you try to send a message? "+ data);
      socket.broadcast.emit('message-received', data);
      // io.emit('message-received', data);
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
      console.log(name + ' ACCEPTED challenge from ' + challenger);
      io.emit('challenger-join-private', challenger);
      io.emit('update-users-challenge-accepted', name, challenger);
      //remove both players from users list as i dont want them visible in the main chat room. may need to rethink this later.
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

    socket.on('color-selected', function(name, chosenColor) {
      console.log(name + " has chosen "+ chosenColor +" as their color.");
      io.emit('color-has-been-selected', name, chosenColor);
    });

  });
  
