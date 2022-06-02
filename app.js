// all the variables for the project.
const changeLevelHeadin = "You win! Start next level";
const levelHeading = `Level`;
const gameOverHeading = "Game Over Please press a key to try again";
const buttonColors = ["red", "blue", "green", "yellow"];
const button = $("div[type='button']");
const startingLevel = 1;
let level = startingLevel;
let gamePattern = [];
let validityCheckIndex = 0;
let gameStatus = false;



// this takes a function and runs after ms amount of time.
function sleep (func, ms) {
    return new Promise(resolve => setTimeout(() => {
        resolve(func())
    }, ms));
};


// it finds a new color from the buttonColors and insurt it into the gamePattern resulting a pattern for one round. 
const nextSequence = () => {
    const randomNumber = Math.round(Math.random() * 3);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
};


// takes a name of a file and plays it from the sounds folder if its there.
const btnSound = (divId) => {
    const audio = new Audio(`/sounds/${divId}.mp3`);
    audio.play();
};


// button animation while showing the pattern.
const btnAnimation = (divId) => {
    btnSound(divId);
    $(`#${divId}`).fadeOut().fadeIn();
};


const wrongAnswerAnimation = () => {
    const body = $("body");
    btnSound("wrong");
    // game-over css property applys to the body.
    body.addClass("game-over");
    // removes the game-over css after 100ms to give a sort of animation.
    setTimeout(() => {
        body.removeClass("game-over");
    }, 100);
};


const loadGamePattern = async () => {
    // pointer-events prevents any clicks from happenning.
    // it is necessary for the program so that the game pattern showcase runs smoothly without interference.  
    button.css("pointer-events", "none");
    // creates a pattern depanding on the lavel.
    for (let i = 0; i < level; i++) {
        nextSequence();
    }
    // shows the gamePattern chronologically.
    for (let pattern of gamePattern) {
        await sleep(() => btnAnimation(pattern), 1000);
    }
    gameStatus = true;
    // removes the css to get user inputs.
    button.css("pointer-events", "auto");
};


const setHeading = (text, level) => {
    // level is a optional argument it is to show the level of the game
    level = level || 0;
    const levelTitle = document.querySelector("#level-title");
    level === 0 ? levelTitle.innerHTML = text : levelTitle.innerHTML = `${text} ${level}`;
};


// creates animation with the pressed class css property.
const keyPressAnimation = (clickedBtn) => {
    clickedBtn.addClass("pressed");
    btnSound(clickedBtn.attr('id'));
    setTimeout(() => {
        clickedBtn.removeClass("pressed");
    }, 100);
};


// it resets the value that are common for the game over and completed level.
const resetGameValue = () => {
    gamePattern.length = 0;
    validityCheckIndex = 0;
    gameStatus = false;
};


const gameOver = () => {
    setHeading(gameOverHeading);
    wrongAnswerAnimation();
    resetGameValue();
    resetLevel();
};


const nextLevel = () => {
    setHeading(changeLevelHeadin);
    resetGameValue();
    increaseLevel();
};


const increaseLevel = () => level++;
const resetLevel = () => level = startingLevel;


button.click(function (e) {
    // clickedBtn catches the this event.
    const clickedBtn = $(this);

    keyPressAnimation(clickedBtn);

    
    if (gameStatus) {
        if (validityCheckIndex < gamePattern.length - 1) {
            // checks if the input matches the sequence.
            if (clickedBtn.attr('id') === gamePattern[validityCheckIndex]) {
                validityCheckIndex++;
            } else {
                gameOver();
            }
        // this is an exception case the if statement corrosponding to that passes to the else value if the starting level is 1.
        } else if (gamePattern.length === 1) {
            // as it contains only one pattern so it chacks the value if its true goes to the next level.
            if (clickedBtn.attr('id') === gamePattern[validityCheckIndex]) {
                nextLevel();
            } else {
                gameOver(); 
            }
        // if passes every check without entering into gameOver then moves to next round.
        } else {
            nextLevel();   
        }
    } else {
        // if the gameStatus is false means its time to make a new gamePattern.
        setHeading(levelHeading, level);
        loadGamePattern();
    }
    e.preventDefault();
});















