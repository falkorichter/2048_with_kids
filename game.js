// Initial game state
let gameState = [
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 0, 0],
    [0, 0, 0, 0]
];

// Format the game state for display
function formatGameState(state) {
    return JSON.stringify(state, null, '\t');
}

// Update the display
function updateDisplay() {
    const textarea = document.getElementById('gameState');
    textarea.value = formatGameState(gameState);
}

// Move tiles up
function moveUp() {
    const newState = JSON.parse(JSON.stringify(gameState)); // Deep copy
    
    for (let col = 0; col < 4; col++) {
        // Collect non-zero values in this column
        let values = [];
        for (let row = 0; row < 4; row++) {
            if (newState[row][col] !== 0) {
                values.push(newState[row][col]);
            }
        }
        
        // Merge adjacent equal values
        let merged = [];
        let i = 0;
        while (i < values.length) {
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                merged.push(values[i] * 2);
                i += 2;
            } else {
                merged.push(values[i]);
                i += 1;
            }
        }
        
        // Fill the column with merged values from top, rest with zeros
        for (let row = 0; row < 4; row++) {
            newState[row][col] = merged[row] || 0;
        }
    }
    
    gameState = newState;
    updateDisplay();
}

// Move tiles down
function moveDown() {
    const newState = JSON.parse(JSON.stringify(gameState)); // Deep copy
    
    for (let col = 0; col < 4; col++) {
        // Collect non-zero values in this column (from bottom)
        let values = [];
        for (let row = 3; row >= 0; row--) {
            if (newState[row][col] !== 0) {
                values.push(newState[row][col]);
            }
        }
        
        // Merge adjacent equal values
        let merged = [];
        let i = 0;
        while (i < values.length) {
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                merged.push(values[i] * 2);
                i += 2;
            } else {
                merged.push(values[i]);
                i += 1;
            }
        }
        
        // Fill the column with merged values from bottom, rest with zeros
        for (let row = 3; row >= 0; row--) {
            newState[row][col] = merged[3 - row] || 0;
        }
    }
    
    gameState = newState;
    updateDisplay();
}

// Move tiles left
function moveLeft() {
    const newState = JSON.parse(JSON.stringify(gameState)); // Deep copy
    
    for (let row = 0; row < 4; row++) {
        // Collect non-zero values in this row
        let values = [];
        for (let col = 0; col < 4; col++) {
            if (newState[row][col] !== 0) {
                values.push(newState[row][col]);
            }
        }
        
        // Merge adjacent equal values
        let merged = [];
        let i = 0;
        while (i < values.length) {
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                merged.push(values[i] * 2);
                i += 2;
            } else {
                merged.push(values[i]);
                i += 1;
            }
        }
        
        // Fill the row with merged values from left, rest with zeros
        for (let col = 0; col < 4; col++) {
            newState[row][col] = merged[col] || 0;
        }
    }
    
    gameState = newState;
    updateDisplay();
}

// Move tiles right
function moveRight() {
    const newState = JSON.parse(JSON.stringify(gameState)); // Deep copy
    
    for (let row = 0; row < 4; row++) {
        // Collect non-zero values in this row (from right)
        let values = [];
        for (let col = 3; col >= 0; col--) {
            if (newState[row][col] !== 0) {
                values.push(newState[row][col]);
            }
        }
        
        // Merge adjacent equal values
        let merged = [];
        let i = 0;
        while (i < values.length) {
            if (i + 1 < values.length && values[i] === values[i + 1]) {
                merged.push(values[i] * 2);
                i += 2;
            } else {
                merged.push(values[i]);
                i += 1;
            }
        }
        
        // Fill the row with merged values from right, rest with zeros
        for (let col = 3; col >= 0; col--) {
            newState[row][col] = merged[3 - col] || 0;
        }
    }
    
    gameState = newState;
    updateDisplay();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    
    // Add event listeners to buttons
    document.getElementById('upBtn').addEventListener('click', moveUp);
    document.getElementById('downBtn').addEventListener('click', moveDown);
    document.getElementById('leftBtn').addEventListener('click', moveLeft);
    document.getElementById('rightBtn').addEventListener('click', moveRight);
});
