const currMatch = {};
let handSelection;

function buildBoardHtml() {
  for ( let row = 0; row < 4; row++){
    let newRow = $(`<div class="battle-row" data-row="${row}">`)
    $('#board').append(newRow);
    for ( let col = 0; col < 3; col++) {
      $(newRow).append(`<div class="col-xs-4 col-md-4 battle-col" data-row="${row}" data-col="${col}"></div>`);
    }
  }
}

function addCardToHand(card) {
  let handCard = $(`<div class="hand-card " data-card-id="${card.id}">`).append(renderCardElement(card));
  $('#hand').append(handCard);
}

function renderCardElement(card) {
  let borderColor = '';
  if ( card.creatureType === 'Rock' ) {
    borderColor = 'red';
  } else if ( card.creatureType === 'Paper' ) {
    borderColor = 'blue';
  } else if ( card.creatureType === 'Scissors' ){
    borderColor = 'green';
  } else {
    borderColor = 'black';
  }
  let value;
  let result = $('<div>').addClass('card').css({'background-image': 'url(http://www.fillmurray.com/90/90)', 'border': '2px solid ' + borderColor});
  if ( card.enemyCard ) result.addClass('enemy-card');

  let valueElem = $('<div>').addClass('value-element').text(card.value);
  result.append(valueElem);

  return result;
  // return $(`<div class="card">
  //       <img src="/images/blank.jpg" class="img-responsive">
  //     </div>`);
}

function renderHand(hand) {
  $('#hand').text('');
  for (let i = 0; i < hand.length; i++) {
    addCardToHand(hand[i]);
    console.log('added card to hand', i);
  }
}

function renderBoardContents(board) {

}



function hookListeners () {
  $('#hand').on('click', '.hand-card', function(event) {
    $('#hand').find('.hand-card').removeClass('selected');
    $(this).addClass('selected');
  });
}

function applyGameState(match) {
  console.log('applyGameState', match);

  if ( ! (JSON.stringify(currMatch.board) === JSON.stringify(match.board)) ) {
    currMatch.board = match.board;
    renderBoardContents(currMatch.board);
  }

  if ( ! (JSON.stringify(currMatch.userHand) === JSON.stringify(match.userHand)) ) {
    currMatch.userHand = match.userHand;
    renderHand(currMatch.userHand);
  }
}

function requestGameState() {
  console.log('requesting state');
  $.ajax({
    url: window.location.href + '/match',
    method: 'GET',
  })
  .done( (match) => {
    applyGameState(match);
  });
}

$( function() {

  buildBoardHtml();
  console.log('built board')
  // for (let i = 0; i < match.userHand.length; i++) {
  //   addCardToHand({id: 1, image: "/images/1.jpg"});
  //   console.log('added card to hand', i);
  // }

  hookListeners();

  // console.log(match);
  requestGameState();

});
