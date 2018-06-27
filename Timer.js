// function to assist the setTime function, stops the timer
// receiving 3 digit numbers
function pad(val) {
  valString = val + "";
  if(valString.length < 2)
  {
     return "0" + valString;
  }
  else
  {
     return valString;
  }
}

// function to keep the timer ticking, depends on the pad function
totalSeconds = 0;
function setTime(minutesLabel, secondsLabel) {
    totalSeconds++;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
  }

// function to start the timer
function setTimer() {
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    time = setInterval(function() { setTime(minutesLabel, secondsLabel)}, 1000);
}

// function to stop timer at the current position
function stopTimer() {
  clearInterval(time);
}

// function to reset timer back to 00:00
function resetTimer(){
  totalSeconds = 0;
  minutesLabel = document.getElementById("minutes");
  secondsLabel = document.getElementById("seconds");
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00";
}
