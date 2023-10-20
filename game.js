
// alert("the game is starting");

let level = 0;
let started = false;

let gamePattern = [];

let userClickedpattern = [];

let buttonColors = ['red', 'blue', "green", 'yellow']

$(document).keypress(function(){
    if (!started)
    {
        $('#level-title').text("Level "+level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){

    let userChosenColor = $(this).attr("id");

    userClickedpattern.push(userChosenColor);

    animatePress(userChosenColor)
    playSound(userChosenColor);

    checkAnswer(userClickedpattern.length-1);

});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedpattern[currentLevel])
    {
        // console.log("success");

        if (gamePattern.length === userClickedpattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        // console.log("wrong");

        playSound("wrong");

        $('body').addClass('game-over');

        $('#level-title').text("Game Over, Press Any Key to Restart !");

        setTimeout(()=>{
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }
}

function nextSequence(){

    level++;
    userClickedpattern.length = 0;

    $('#level-title').text("Level "+level);

    let randomNumber =  Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor);

    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern.length = 0;
    userClickedpattern.length = 0;
    started = false;
}


function animatePress(currentColor){
    $('#'+currentColor).addClass("pressed")

    setTimeout(() =>{
        $('#'+currentColor).removeClass("pressed");
    }, 100)
}








// console.log(randomNumber)

// console.log(userClickedpattern)


