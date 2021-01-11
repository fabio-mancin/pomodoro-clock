var pomodoro = 1500;
var pause = 300;
var counter = 0;
var clock;

function fancyTimeFormat(time)
{   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

$(document).ready(function() {
  $("#about").tooltip();
  clock = $("#clock").FlipClock(pomodoro, {
    autoStart: false,
    clockFace: "MinuteCounter",
    countdown: true,
    callbacks: {
      stop: function() {
        if (clock.time == 0) {
          clock = $("#clock").FlipClock(pause, {
            clockFace: "MinuteCounter",
            countdown: true
          });
        }
      }
    }
  });
});

$("#clock").click(function() {
  if (counter == 0) {
    clock.start();
    counter = 1;
  } else if (counter == 1) {
    clock.stop();
    counter = 2;
  } else if (counter == 2) {
    clock.start();
    counter = 1;
  }
});

$("#plusPom").mouseup(function() {
  pomodoro += 60;
  clock.setTime(pomodoro);
});

$("#minusPom").mouseup(function() {
  pomodoro -= 60;
  clock.setTime(pomodoro);
  if (pomodoro < 0) {
    alert("Countdown won't work with a negative time!");
  }
});

$("#plusPause").mouseup(function() {
  pause += 60;
  $("#pause").html("Pause:" + fancyTimeFormat(pause));
});

$("#minusPause").mouseup(function() {
  pause -= 60;
  $("#pause").html("Pause:" + fancyTimeFormat(pause));
  if (pause < 0) {
    alert("Countdown won't work with a negative time!");
  }
});