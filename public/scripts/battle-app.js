const currMatch = {};
let handSelection = null;

function buildBoardHtml() {
  for ( let row = 0; row < 4; row++){
    let newRow = $(`<div class="battle-row" data-row="${row}">`)
    $('#board').append(newRow);
    for ( let col = 0; col < 3; col++) {
      $(newRow).append($(`<div class="battle-col" data-row="${row}" data-col="${col}">`).append($('<div>').addClass('board-card')));
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

  let pows = [
    $('<div>').addClass('pow pow-front').append($('<div>').addClass('pow-text pow-front').text(card.frontPower)),
    $('<div>').addClass('pow pow-back').append($('<div>').addClass('pow-text pow-front').text(card.sidePower)),
    $('<div>').addClass('pow pow-right').append($('<div>').addClass('pow-text pow-front').text(card.sidePower)),
    $('<div>').addClass('pow pow-left').append($('<div>').addClass('pow-text pow-front').text(card.sidePower))
    ];
  result.append(pows);

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
  }
}

function renderBoardContents(board, userId) {
      for (let rowNum = 0; rowNum < board.length; rowNum++) {
        for (let colNum = 0; colNum < board[rowNum].length; colNum++) {
          if ( board[rowNum][colNum]) console.log('board[rowNum][colNum].ownerId !== userId', board[rowNum][colNum].ownerId, userId, board[rowNum][colNum].ownerId !== userId)
          if ( board[rowNum][colNum] && board[rowNum][colNum].ownerId !== userId) {
            board[rowNum][colNum].enemyCard = true;
          }
        }
      }
  for (let rowNum = 0; rowNum < board.length; rowNum++) {
      for (let colNum = 0; colNum < board[rowNum].length; colNum++) {
        let currPos = $('#board').find("[data-row='" + rowNum + "'][data-col='" + colNum +"']").find('.board-card').text('')
        if ( board[rowNum][colNum] ) {
          let cardElem = renderCardElement(board[rowNum][colNum]);
          currPos.append(cardElem);
        }
      }
    }
  }

function clearValidMoves() {
  $('#board').find('.board-card').removeClass('valid');
}

function isAllyAdjacent(row, col) {
  var isAdjacent = false;
  var board = currMatch.board;
  isAdjacent = board[row-1] && board[row-1][col] && !board[row-1][col].enemyCard ||
                board[row+1] && board[row+1][col] && !board[row+1][col].enemyCard ||
                board[row][col-1] && !board[row][col-1].enemyCard ||
                board[row][col+1] && !board[row][col+1].enemyCard;
  return isAdjacent;
}

function displayValidMoves(board) {
  clearValidMoves();
  for (let rowNum = 0; rowNum < board.length; rowNum++) {
    for (let colNum = 0; colNum < board[rowNum].length; colNum++) {
      var currSpot = board[rowNum][colNum];
      var isValid = false;
      if ( !currSpot && (rowNum > 1 || isAllyAdjacent(rowNum, colNum)) ) {
        $('#board').find("[data-row='" + rowNum + "'][data-col='" + colNum +"']").find('.board-card').addClass('valid');
      }
    }
  }
}

function hookListeners () {
  $('#hand').on('click', '.hand-card', function(event) {
    console.log('phase', currMatch.phase);
    if ( currMatch.phase ) {
      $('#hand').find('.hand-card').removeClass('selected');
      $(this).addClass('selected');
      handSelection = $(this).index();
      displayValidMoves(currMatch.board);
    }
  });

  $('#board').on('click', '.valid', function(event) {
    $.ajax({
    url: window.location.href + '/action',
    method: 'POST',
    data: {
        handSelection: handSelection,
        handCard: currMatch.userHand[handSelection],
        target: [ $(this).parent().data('row'), $(this).parent().data('col')]
      }
    })
    .done( (response) => {
      clearValidMoves();
      applyGameState(response.match);
    });
  });
}

function applyGameState(match) {
  console.log('applyGameState', match);

  if ( ! (JSON.stringify(currMatch.board) === JSON.stringify(match.board)) ) {
    currMatch.board = match.board;
    console.log('currMatch', currMatch);
    renderBoardContents(currMatch.board, match.userId);
  }

  if ( ! (JSON.stringify(currMatch.userHand) === JSON.stringify(match.userHand)) ) {
    currMatch.userHand = match.userHand;
    renderHand(currMatch.userHand);
  }

  currMatch.phase = match.phase;
}

function requestGameState() {
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
