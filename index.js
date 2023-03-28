import { cards, difficultyLevels } from './misc.js'

const newGame = document.getElementById('new-game');
const difDown = document.getElementById('difficulty-down');
const difUp = document.getElementById('difficulty-up');
const difficulty = document.getElementById('difficulty-level');
const light = document.getElementById('light-mode');
const sound = document.getElementById('sound-mode');
const board = document.getElementById('game');
const root = document.documentElement;

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

let openCards = 0;

function initializeBoard() {
    board.innerHTML = ''
    let size = difficultyLevel.tiles;
    let tilesArray = cards.slice(0, size * size).sort((a, b) => 0.5 - Math.random());
    console.log(tilesArray);
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        let tile = document.createElement('div');
        tile.className = 'card-hidden';
        tile.indexPosition = i;
        tile.addEventListener('click', () => {
            if (tile.className === 'card-hidden' && openCards < 2) {
                tile.classList.remove('card-hidden');
                tile.classList.add('card-open');
                tile.style.background = `center/contain no-repeat url('${tilesArray[tile.indexPosition].src}')`
                openCards++
            } else if (tile.className === 'card-hidden' && openCards == 2) {
                openCards = 0;
                let cardsOpen = document.querySelectorAll('.card-open');
                cardsOpen.forEach(card => {
                    card.classList.remove('card-open');
                    card.classList.add('card-hidden');
                    card.style.background = 'linear-gradient(120deg, var(--middle), var(--dark))'
                });
                tile.classList.remove('card-hidden');
                tile.classList.add('card-open');
                tile.style.background = `center/contain no-repeat url('${tilesArray[tile.indexPosition].src}')`
                openCards ++

                // tile.classList.remove('card-open');
                // tile.classList.add('card-hidden');
                // tile.style.background = 'linear-gradient(120deg, var(--middle), var(--dark))'
            }
        })
        board.appendChild(tile);
    }
}

initializeBoard()

