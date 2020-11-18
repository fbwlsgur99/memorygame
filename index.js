var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$("h1").click(function(){

if (!started) {


  $("level-title").text("level "+ level);
  nextSequence();
  started = true;

}});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
  }
  else {

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $("h1").text("Game over SooDyoon, Press Click Me to Restart")

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    startOver();
  }

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);


  var randomNumber = Math.ceil(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function (){$('#' + currentColour).removeClass("pressed");
}, 100);

}
