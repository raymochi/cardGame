let currMatch = {};
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

function renderScores(player1Score, player2Score){
  console.log('rendering scores');
  $('.player-1-score').text('Player 1: ' + player1Score);
  $('.player-2-score').text('Player 2: ' + player2Score);
}

function renderTurn(turn) {
  console.log('render turn');
  $('.turn-counter').text('Turn: ' + turn);
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
  let result = $('<div>').addClass('card').css({'background-image': `url(/images/card${card.id}.png)`, 'border': '2px solid ' + borderColor});
  if ( card.enemyCard ) result.addClass('enemy-card');

  console.log(card.type);
  if ( card.cardType === "creature") {
    let pows = [
      $('<div>').addClass('pow pow-front').append($('<div>').addClass('pow-text pow-front').text(card.frontPower)),
      $('<div>').addClass('pow pow-back').append($('<div>').addClass('pow-text pow-back').text(card.sidePower)),
      $('<div>').addClass('pow pow-right').append($('<div>').addClass('pow-text pow-right').text(card.sidePower)),
      $('<div>').addClass('pow pow-left').append($('<div>').addClass('pow-text pow-left').text(card.sidePower))
      ];
    result.append(pows);
    let valueElem = $('<div>').addClass('value-element').text(card.value);
    result.append(valueElem);
  }

  return result;
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
      let currPos = $('#board').find("[data-row='" + rowNum + "'][data-col='" + colNum +"']").find('.board-card').text('')
      if ( board[rowNum][colNum] ) {
        if ( board[rowNum][colNum].ownerId !== userId) {
          board[rowNum][colNum].enemyCard = true;
        }
        let cardElem = renderCardElement(board[rowNum][colNum]);
        currPos.append(cardElem);
      }

    }
  }
  for (let rowNum = 0; rowNum < board.length; rowNum++) {
    for (let colNum = 0; colNum < board[rowNum].length; colNum++) {


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

function displayValidMoves(board, card) {
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
  if (Number(card.id) === 12) {
    $('[data-row="3"]').find('.board-card').removeClass('valid');
  }
}

function hookListeners () {
  $('#hand').on('click', '.hand-card', function(event) {
    console.log('phase', currMatch.phase);
    if ( currMatch.phase ) {
      $('#hand').find('.hand-card').removeClass('selected');
      $(this).addClass('selected');
      handSelection = $(this).index();
      console.log
      displayValidMoves(currMatch.board, currMatch.userHand[handSelection]);
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
      // applyGameState(response.match);
    });
  });
}

function applyGameState(match) {
  console.log('applyGameState', match);
  renderBoardContents(currMatch.board, match.userId);

  renderHand(currMatch.userHand);

  renderScores(match.user1Score, match.user2Score);
  renderTurn(match.turn);

  currMatch.phase = match.phase;
}

function requestUserId(socket) {
  $.ajax({
    url:'/battle/userId',
    method: 'GET',
  })
  .done( function(userId) {
    socket.emit('userId', userId);
  })
  .done( function() {
    requestGameState();
  })
}

function requestGameState() {
  $.ajax({
    url: window.location.href + '/match',
    method: 'GET',
  })
  .done( (match) => {
    // applyGameState(match);
  });
}

$( function() {

  var socket = io();
  buildBoardHtml();
  console.log('built board')
  // for (let i = 0; i < match.userHand.length; i++) {
  //   addCardToHand({id: 1, image: "/images/1.jpg"});
  //   console.log('added card to hand', i);
  // }

  hookListeners();

  requestUserId(socket);

  // console.log(match);


  // $(window).on('click', function() {
  //   socket.emit('action');
  // })

  socket.on('gameState', function (response) {
    console.log('gameState received: \n', response.match);
    currMatch = response.match;
    applyGameState(currMatch);
  })

});
