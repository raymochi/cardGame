//Client side js for index template

var loginStatus = false;
var userID = "";
var userName = "";
var typingPeople = [];
var typingTimer;

function createMatchElement(matchInfo, user1Info, user2Info) {
  var match = $('<article>').addClass('match-box');

  // match.append(
  //   $('<header>').append(
  //     $('<img>').attr('src', `/images/user${matchInfo.user1}.jpg`),
  //     $('<h1>').text(matchInfo.user1),
  //     )
  // )
}

function renderMatches(allMatches) {

}

function renderChat(logs) {
  for (let log of logs) {
    $('.chat-box').append($('<p>').text(log));
  }
  $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);

}

$(() => {

  function toggleLogin(status) {
    if (status) {
      $('#register-btn').fadeOut('fast');
      $('#login-btn').fadeOut('fast');
      $('#play-btn').fadeIn('slow');
      $('#logout-btn').fadeIn('slow');
      $('#settings-btn').fadeIn('slow');
      $('.inputMessage').fadeIn();
    }
    else {
      $('.inputMessage').fadeOut('fast');
      $('#logout-btn').fadeOut('fast');
      $('#play-btn').fadeOut('fast');
      $('#settings-btn').fadeOut('fast');
      $('#register-btn').fadeIn('slow');
      $('#login-btn').fadeIn('slow');
    }
  }

  function loadChat() {
    $.ajax({
      url: '/chat',
      success: (data) => {
        renderChat(data);
      },
      failure: () => {
        console.error('loding failed');
      }
    });
  }

  $.get('/renderlogin').done(function (data) {
    if (data) {
      userID = data.id;
      userName = data.username;
      loginStatus = true;
    }
    $('#settings-btn').text(userName.toUpperCase());
    toggleLogin(loginStatus);
  });

  var socket = io();
  loadChat();

  $('.inputMessage').on('input', function (event) {
    socket.emit('typing', userName);
    if ($(this).val() === "") {
      socket.emit('stop', userName);
    }
  });

  $('.inputMessage').keydown(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      if (($(this).val().trim())) {
        socket.emit('stop', userName);
        console.log(!($(this).val().trim()));
        $.ajax({
          url: '/chat',
          method: 'POST',
          data: $(this).parent().serialize(),
          success: function() {
            console.log('enter key pressed')
          }
        })
      }
    }
  });

  $('#logout-btn').on('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: '/logout',
        method: 'POST',
        success: () => {
          console.log('logout successs');
          loginStatus = false;
          toggleLogin(loginStatus);
          // location.reload();    //reloads page after successful logout
        },
        failure: () => {
          console.error("failed");
        }
      });
  });

  socket.on('submit message', function (data) {
    $('.inputMessage').val('');
    $('.chat-box').append($('<p>').text(data));
    $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);

  });

  socket.on('stop', function (data) {
    typingPeople.splice(typingPeople.indexOf(data), 1);
    console.log("removing");
    if (typingPeople.length === 0) {
      $('#typing-flash').css('display', 'none');
    }
    console.log(typingPeople, typingPeople.length)
    $('#typing-flash').text(`${typingPeople} is typing`);
  });

  socket.on('typing', function (data) {
    if (typingPeople.indexOf(data) === -1) {
      console.log(data)
      typingPeople.push(data);
    }
    $('#typing-flash').text(`${typingPeople} is typing`);
    $('#typing-flash').slideDown();
  });

});
