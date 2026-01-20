// Initial game state
let gameState = [
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 0, 0],
    [0, 0, 0, 0]
];

// Format the game state for display
function formatGameState(state) {
    let result = '[\n';
    for (let i = 0; i < state.length; i++) {
        result += '    [';
        for (let j = 0; j < state[i].length; j++) {
            const num = state[i][j].toString();
            result += num.padStart(3, ' ');
            if (j < state[i].length - 1) {
                result += ',';
            }
        }
        result += ']';
        if (i < state.length - 1) {
            result += ',';
        }
        result += '\n';
    }
    result += ']';
    return result;
}

// Parse the game state from the textarea
function parseGameState() {
    const textarea = document.getElementById('gameState');
    const errorBox = document.getElementById('errorBox');
    
    try {
        const parsed = JSON.parse(textarea.value);
        
        // Validate it's an array
        if (!Array.isArray(parsed)) {
            throw new Error('Game state must be an array');
        }
        
        // Update gameState
        gameState = parsed;
        errorBox.textContent = ''; // Clear any previous errors
        return true;
    } catch (error) {
        errorBox.textContent = 'Error: ' + error.message;
        return false;
    }
}

// Update the display
function updateDisplay() {
    const textarea = document.getElementById('gameState');
    textarea.value = formatGameState(gameState);
}

// Helper function to create a deep copy of the game state
function cloneState(state) {
    return JSON.parse(JSON.stringify(state));
}

// Move tiles left
function moveLeft() {
    // Parse the current state from the textarea
    parseGameState();
    
    const newState = cloneState(gameState);
    
    for (let zeile = 0; zeile < 4; zeile++) {
        // Collect non-zero values in this row
        let values = [];
        for (let spalte = 0; spalte < 4; spalte++) {
            if (newState[zeile][spalte] !== 0) {
                values.push(newState[zeile][spalte]);
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
        for (let spalte = 0; spalte < 4; spalte++) {
            newState[zeile][spalte] = merged[spalte] || 0;
        }
    }
    
    gameState = newState;
    updateDisplay();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    
    // Add event listeners to buttons
    document.getElementById('upBtn').disabled = true;
    document.getElementById('downBtn').disabled = true;
    document.getElementById('leftBtn').addEventListener('click', moveLeft);
    document.getElementById('rightBtn').disabled = true;
});
