
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

$(() => {

  var socket = io();

  $('.inputMessage').on('submit', function (event) {
      console.log(!($(this).val().trim()));
      event.preventDefault();
      if ($(this).val().trim()) {
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
  });

  // socket.on('connect', function() {

    socket.on('submit message', function (data) {
      console.log('client message', data);
      $('.chat-box').append($("<p>").text(data));
    });

  // })


});
