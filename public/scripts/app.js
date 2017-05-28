
function createMatchElement(matchInfo) {
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

  var socket = io();

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

  loadChat();

  $('.inputMessage').keydown(function (event) {

    if (event.which === 13) {
      event.preventDefault();
      if (($(this).val().trim())) {
        console.log(!($(this).val().trim()));
        $.ajax({
          url: '/chat',
          method: 'POST',
          data: $(this).parent().serialize(),
          success: function() {
            console.log('enter key pressed')
            // var message = $('.inputMessage').val();
            // socket.emit('submit message', message);
          }
        })
      }
    }
  });

  // socket.on('connect', function() {

    socket.on('submit message', function (data) {
      $('.inputMessage').val('');
      $('.chat-box').append($('<p>').text(data));
      $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);

    });

  // })


});
