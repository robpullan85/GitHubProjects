$(document).ready(function()
{

  // initial arrays set
  let arrayClassName = [];
  let arrayIdName = [];
  let arraySelectorName = [];

  // initial variables set
  let matchCount = 0;
  let movesCount = 0;

  // click event to restart the game at the players choice.
    $('.restart').click(cardShuffle);

  // restarts game from the completed modal window.
    $('#restartGameCompleted').click(cardShuffle);

  // updates the number of moves the player has taken.
    $('#starsNumber').html(movesCount)

  // Shows the modal on page load.
    $('#beginModal').modal('show');

  // Opens the modal to being the game.
    $('#beginGame').click(setTimer);

    // Event function to await the user to select a card.
    $('.card').click(function()
    {

      if ($(this).hasClass('show open'))
      {
        $(this).removeClass('show open');
      }
      else
      {
          $(this).addClass('show open');
          var className = $(this).children().attr('class');
          var idName = $(this).children().attr('id');
          var selectorName = $(this);
          arrayClassName.push(className);
          arrayIdName.push(idName);
          arraySelectorName.push(selectorName);

        if (arrayClassName.length === 2)
        {
          // Calls the amount of moves taken.
          moveAmount();

          if (arrayClassName[0] === arrayClassName[1] && arrayIdName[0] !== arrayIdName[1])
          // Checks for card match
              cardMatch();
          else
          // If no card match the function below will reset the cards
              resetCards();
        }

      }
      // Checks the amount of card matches.
      gameCheck();
    });


      // Function to shuffles the cards
      function cardShuffle() {
          var arraydeckClass = $(".deck");
          var arraycardClass = arraydeckClass.children();
          while (arraycardClass.length) {
              arraydeckClass.append(arraycardClass.splice(Math.floor(Math.random() * arraycardClass.length), 1)[0]);
          }
          $('.card').removeClass('show open match');
          matchCount = 0;
          starMoveReset();
          stopTimer();
          resetTimer();
          setTimer()
      };

      // Function to reset the star and moves section back to default.
      function starMoveReset(){
        movesCount = 0;
        $('#starsNumber').html(movesCount)
        for (var i = 1; i < 4; i++)
          $('#star' + i).removeClass('fa fa-star-o').addClass('fa fa-star');
          }



      // This function will keep track of the amount moves taking place
      // and edits the stars depending on number of stars.
        function moveAmount()
        {

          movesCount += 1;
          $('#starsNumber').html(movesCount)
          if (movesCount > 24)
            $('#star2').removeClass('fa-star').addClass('fa-star-o');
          else if (movesCount > 12)
            $('#star3').removeClass('fa-star').addClass('fa-star-o');
          else
            return;
        };

      // This function will show a card match and empty the arrays.
      function cardMatch()
      {
      arraySelectorName[0].removeClass('show').addClass('match');
      arraySelectorName[1].removeClass('show').addClass('match');
      arrayIdName = [];
      arrayClassName = [];
      arraySelectorName = [];
      matchCount += 1;
      return matchCount;
      };

      // This function will reset the cards back to default using a time delay.
        function resetCards()
        {
          setTimeout(function() {
            arraySelectorName[0].removeClass('show open');
            arraySelectorName[1].removeClass('show open');
            arrayIdName = [];
            arrayClassName = [];
            arraySelectorName = [];
          }, 500);

        };

    // Checks if all the cards have been matched.
      function gameCheck()
      {
        var winWindows = $('#completedModal');
        setTimeout(function()
        {
          if (matchCount === 8)
          {
            stopTimer()
            completedModal();
          }
        }, 500);
      };

    // Displays the completed modal with statistics.
      function completedModal()
      {
        // time game finished
        var seconds = secondsLabel.innerHTML = pad(totalSeconds%60);
        var minutes = minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        $('#secondsFinished').html(seconds);
        $('#minutesFinished').html(minutes);

        // move total
        $('#completedModal').modal('show');

        // star rating
        $('#starsNumberModal').html(movesCount);
        if (movesCount > 24)
          $('#starRatingModal').html(1)
        else if (movesCount > 12)
          $('#starRatingModal').html(2)
        else
          $('#starRatingModal').html("Top")
      }


});     // End of document ready function
