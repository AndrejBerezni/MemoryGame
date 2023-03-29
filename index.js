import { cards, difficultyLevels } from './misc.js'

const newGame = document.getElementById('new-game');
const difDown = document.getElementById('difficulty-down');
const difUp = document.getElementById('difficulty-up');
const difficulty = document.getElementById('difficulty-level');
const light = document.getElementById('light-mode');
const sound = document.getElementById('sound-mode');
const board = document.getElementById('game');
const root = document.documentElement;
const timerDisplay = document.getElementById('timer');
const gameComplete = document.getElementById('game-complete');
const totalTime = document.getElementById('total-time');

let isGameInProgress = false;

//Toggle themes:

light.addEventListener('click', () => {
    root.classList.toggle('light');
    root.classList.toggle('dark');
    light.classList.toggle('fa-moon');
    light.classList.toggle('fa-sun');
});

//Change difficulty:
let difIndex = 0;
let difficultyLevel = difficultyLevels[difIndex];
difficulty.innerText = difficultyLevel.level;

difUp.addEventListener('click', () => {
    if (difIndex !== 2) {
        difIndex++;
        difficultyLevel = difficultyLevels[difIndex];
        difficulty.innerText = difficultyLevel.level;

    }
    if (!isGameInProgress) {
        initializeBoard();
    }
});
difDown.addEventListener('click', () => {
    if (difIndex !== 0) {
        difIndex--;
        difficultyLevel = difficultyLevels[difIndex];
        difficulty.innerText = difficultyLevel.level;

    }
    if (!isGameInProgress) {
        initializeBoard();
    }

});

//Initialize game board and handle card clicks:


function initializeBoard() {
    board.innerHTML = '';
    gameComplete.classList.add('score-hidden');
    clearInterval(timerInterval);
    timer.innerText = '00:00';
    let firstCardOpen = false;
    let secondCardOpen = false;
    let previousCardValue = 0;
    let solvedPairs = 0;
    let size = difficultyLevel.tiles;
    let tilesArray = cards.slice(0, size * size).sort((a, b) => 0.5 - Math.random());
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        let tile = document.createElement('div');
        tile.className = 'card-hidden';
        tile.indexPosition = i;
        tile.addEventListener('click', () => {
            if (tile.className === 'card-hidden') {
                if (!firstCardOpen) {
                    startTimer();
                    solvedPairs = 0;
                    isGameInProgress = true;
                    previousCardValue = tilesArray[tile.indexPosition].value;
                    tile.classList.remove('card-hidden');
                    tile.classList.add('card-open');
                    tile.style.background = `center/contain no-repeat url('${tilesArray[tile.indexPosition].src}')`;
                    firstCardOpen = true;
                } else if (firstCardOpen && !secondCardOpen) {
                    tile.classList.remove('card-hidden');
                    tile.classList.add('card-open');
                    tile.style.background = `center/contain no-repeat url('${tilesArray[tile.indexPosition].src}')`;
                    secondCardOpen = true;
                    if (previousCardValue === tilesArray[tile.indexPosition].value) {
                        let cardsOpen = document.querySelectorAll('.card-open');
                        cardsOpen.forEach(card => {
                            card.classList.remove('card-open');
                            card.classList.add('card-solved');
                            card.style.border = '3px solid gold';
                            card.style.borderRadius = '15%';
                        });
                        solvedPairs++
                        console.log(solvedPairs)
                        if (solvedPairs === size * size / 2) {
                            isGameInProgress = false;
                            totalTime.innerText = `Your time: ${timerDisplay.textContent}`
                            gameComplete.classList.remove('score-hidden');
                            clearInterval(timerInterval)
                            
                        }
                    }
                } else if (firstCardOpen && secondCardOpen) {
                    previousCardValue = tilesArray[tile.indexPosition].value;
                    let cardsOpen = document.querySelectorAll('.card-open');
                    cardsOpen.forEach(card => {
                        card.classList.remove('card-open');
                        card.classList.add('card-hidden');
                        card.style.background = 'linear-gradient(120deg, var(--middle), var(--dark))'
                    });
                    tile.classList.remove('card-hidden');
                    tile.classList.add('card-open');
                    tile.style.background = `center/contain no-repeat url('${tilesArray[tile.indexPosition].src}')`;
                    secondCardOpen = false;

                }
            }
        })
        board.appendChild(tile);
    }
};

//Setup timer:
let timerInterval;

function startTimer() {
    let timer = 0;
    timerInterval = setInterval(() => {       
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerDisplay.textContent = `${minutes}:${seconds}`;
        timer++;
    }, 1000);
}


// Game on

newGame.addEventListener('click', initializeBoard);

initializeBoard();