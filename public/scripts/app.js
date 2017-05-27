
function createMatchElement(matchInfo) {
  let match = $('<article>').addClass('match-box');

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
  $.ajax({
    method: 'GET',
    url: '/'
  }).done((users) => {
    for(user of users) {
      $('<div>').text(user.username).appendTo($('body'));
    }
  });

  $('#play-btn').on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/battle'
    }).done(() => {
      console.log('going to match');
      })
  });
});
