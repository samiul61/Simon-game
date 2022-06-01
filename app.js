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


function sleep (func, ms) {
    return new Promise(resolve => setTimeout(() => {
        resolve(func())
    }, ms));
};


const nextSequence = () => {
    const randomNumber = Math.round(Math.random() * 3);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
};


const btnSound = (divId) => {
    const audio = new Audio(`/sounds/${divId}.mp3`);
    audio.play();
};


const btnAnimation = (divId) => {
    btnSound(divId);
    $(`#${divId}`).fadeOut().fadeIn();
};


const wrongAnswerAnimation = () => {
    const body = $("body");
    btnSound("wrong");
    body.addClass("game-over");
    setTimeout(() => {
        body.removeClass("game-over");
    }, 100);
};


const loadGamePattern = async () => {
    button.css("pointer-events", "none");
    for (let i = 0; i < level; i++) {
        nextSequence();
    }

    for (let pattern of gamePattern) {
        await sleep(() => btnAnimation(pattern), 1000);
    }
    gameStatus = true;
    button.css("pointer-events", "auto");
};


const setHeading = (text, level) => {
    level = level || 0;
    const levelTitle = document.querySelector("#level-title");
    level === 0 ? levelTitle.innerHTML = text : levelTitle.innerHTML = `${text} ${level}`;
};


const keyPressAnimation = (clickedBtn) => {
    clickedBtn.addClass("pressed");
    btnSound(clickedBtn.attr('id'));
    setTimeout(() => {
        clickedBtn.removeClass("pressed");
    }, 100);
};


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
    const clickedBtn = $(this);
    keyPressAnimation(clickedBtn);
    if (gameStatus) {
        if (validityCheckIndex < gamePattern.length - 1 ) {
            if (clickedBtn.attr('id') === gamePattern[validityCheckIndex]) {
                validityCheckIndex++;
            } else {
                gameOver();
            }
        } else if (gamePattern.length === 1) {
            if (clickedBtn.attr('id') === gamePattern[validityCheckIndex]) {
                nextLevel();
            } else {
                gameOver(); 
            }
        } else {
            nextLevel();   
        }
    } else {
        setHeading(levelHeading, level);
        loadGamePattern();
    }
    e.preventDefault();
});















