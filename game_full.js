let board = [];
let score = 0;
const gridSize = 4;
const TILE_2_PROBABILITY = 0.9;
const GAME_OVER_DELAY = 200;

function initGame() {
    board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
    score = 0;
    updateScore();
    addNewTile();
    addNewTile();
    renderBoard();
}

function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.row][randomCell.col] = Math.random() < TILE_2_PROBABILITY ? 2 : 4;
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            if (board[i][j] !== 0) {
                tile.textContent = board[i][j];
                tile.classList.add(`tile-${board[i][j]}`);
            }
            
            gameBoard.appendChild(tile);
        }
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function move(direction) {
    let moved = false;
    const newBoard = board.map(row => [...row]);
    
    if (direction === 'left' || direction === 'right') {
        for (let i = 0; i < gridSize; i++) {
            const row = direction === 'left' ? newBoard[i] : newBoard[i].reverse();
            const merged = mergeRow(row);
            if (direction === 'right') merged.reverse();
            
            if (JSON.stringify(newBoard[i]) !== JSON.stringify(merged)) {
                moved = true;
            }
            newBoard[i] = merged;
        }
    } else {
        for (let j = 0; j < gridSize; j++) {
            const column = [];
            for (let i = 0; i < gridSize; i++) {
                column.push(newBoard[i][j]);
            }
            
            const merged = direction === 'up' ? mergeRow(column) : mergeRow(column.reverse()).reverse();
            
            for (let i = 0; i < gridSize; i++) {
                if (newBoard[i][j] !== merged[i]) {
                    moved = true;
                }
                newBoard[i][j] = merged[i];
            }
        }
    }
    
    if (moved) {
        board = newBoard;
        addNewTile();
        renderBoard();
        updateScore();
        
        if (isGameOver()) {
            setTimeout(() => {
                alert('Game Over! Your score: ' + score);
            }, GAME_OVER_DELAY);
        }
    }
}

function mergeRow(row) {
    const filtered = row.filter(cell => cell !== 0);
    const merged = [];
    
    for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2);
            score += filtered[i] * 2;
            i++;
        } else {
            merged.push(filtered[i]);
        }
    }
    
    while (merged.length < gridSize) {
        merged.push(0);
    }
    
    return merged;
}

function isGameOver() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) return false;
            if (j < gridSize - 1 && board[i][j] === board[i][j + 1]) return false;
            if (i < gridSize - 1 && board[i][j] === board[i + 1][j]) return false;
        }
    }
    return true;
}

function newGame() {
    initGame();
}

document.getElementById('new-game-button').addEventListener('click', newGame);

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            move('up');
            break;
        case 'ArrowDown':
            e.preventDefault();
            move('down');
            break;
        case 'ArrowLeft':
            e.preventDefault();
            move('left');
            break;
        case 'ArrowRight':
            e.preventDefault();
            move('right');
            break;
    }
});

window.onload = initGame;
