//this will check the entry screen so that the enter button can be pressed or 'enter' key used
function checkforEnterKeyPress(identifier,e) {
   
  if (e && e.keyCode === 13) {
      if (identifier === 'name'){
          savePlayerName();
          return false;
      } else if (identifier === 'chat') {
          sendChatMessage();
          return false;
      }
      //the key pressed was not enter, exit
      } else {
          return;
      }
}

// Initial chat feature
function sendChatMessage() {

  var username = getStorage('username');
  var chatmessage = $('#m').val();
  if (chatmessage.replace(' ', '') == '') {
    document.getElementById('noMessage').innerHTML = 'Type a message you\'d like to send.';
  } else {
     
    document.getElementById('noMessage').innerHTML = '';
    console.log(username +' is sending message: ' + chatmessage);
    var data = username+': '+ chatmessage;
    socket.emit('send-message', data, username);
  }
  
  $('#m').val('');
}

//this will check the entry screen so that the enter button can be pressed or 'enter' key used
function mobileCheckForEnterKeyPress(identifier,e) {
   
  if (e && e.keyCode === 13) {
    if (identifier === 'chat') {
      mobileSendChatMessage();
      return false;
    }
      //the key pressed was not enter, exit
  } else {
        return;
  }
}

// In game "mobile" chat feature
function mobileSendChatMessage() {
  var color = getStorage('playerColor');
  var username = getStorage('username');
  var chatmessage = $('#mo').val();

  if (chatmessage.replace(' ', '') == '') {
    return;
  } else {
     
    console.log(username +' is sending message: ' + chatmessage);
    var data = username+': '+ chatmessage;
    socket.emit('mobile-send-message', data, color);
  }
  
  $('#mo').val('');
}


function toggleChat(){
  $('#btnToggleChat').html('Chat');

  var btnChat = document.getElementById('btnToggleChat');
  if(btnChat.classList.contains('greenBackground')){
    btnChat.classList.remove('greenBackground');
    btnChat.classList.add('redBackground');

  }else{
    btnChat.classList.remove('redBackground');
    btnChat.classList.add('greenBackground');
  }

  var chatFeature = document.getElementById('mobileChat');
  if(chatFeature.classList.contains('load')){
    chatFeature.classList.add('unload');
    chatFeature.classList.remove('load');

    setTimeout(function(){
      chatFeature.classList.remove('mobileChat');
      chatFeature.classList.add('hidden');
    }, 500);

  } else {
    chatFeature.classList.remove('hidden');
    chatFeature.classList.add('load');
    chatFeature.classList.remove('unload');
    chatFeature.classList.add('mobileChat');
  }
}

function chatNotifications(){

  let noticeNum;

if (document.getElementById('btnToggleChat').classList.contains('greenBackground')){
    let btnInfo = $('#btnToggleChat').html();
    let btnInfoArray = btnInfo.split(" ");
    if (btnInfoArray.length > 1){
        noticeNum = Number(btnInfoArray[1]);
        noticeNum+=1;
    } else{
        noticeNum = 1;
    }
    
    $('#btnToggleChat').html('Chat ' + noticeNum);
  }
}