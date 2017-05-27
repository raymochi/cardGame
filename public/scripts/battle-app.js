function buildBoard() {
  for ( let row = 0; row < 4; row++){
    let newRow = $(`<div class="battle-row" data-row="${row}">`)
    $('#board').append(newRow);
    // console.log($(newRow) );
    for ( let col = 0; col < 3; col++) {
      $(newRow).append(`<div class="col-xs-4 col-md-4 battle-col" data-row="${row}" data-col="${col}"></div>`);
    }
  }
}

function addCardToHand(card) {
  $('#hand').append(`
    <div class="col-xs-2 col-md-2 hand-card" data-card-id="${card.id}">
      <div class="card">
        <img src="${card.image}" class="img-responsive">
      </div>
    </div>`);
}

function hookListeners () {
  $('#hand').on('click', '.card', function(event) {
    $('#hand').find('.card').removeClass('selected');
    $(this).addClass('selected');
  });
}

function requestGameState() {
  console.log('requesting state');
  $.ajax({
    url: window.location.href + '/match',
    method: 'GET',
  })
  .done( (match) => {
    console.log('in done, match:', match)
    for (let i = 0; i < match.userHand.length; i++) {
      addCardToHand({id: 1, image: "/images/blank.jpg"});
      console.log('added card to hand', i);
    }
  });
}

$( function() {

  buildBoard();
  console.log('built board')
  // for (let i = 0; i < match.userHand.length; i++) {
  //   addCardToHand({id: 1, image: "/images/1.jpg"});
  //   console.log('added card to hand', i);
  // }

  hookListeners();

  // console.log(match);
  requestGameState();

});
