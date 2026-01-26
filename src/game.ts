// Type definitions
type GameState = number[][];

// Initial game state
let gameState: GameState = [
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 0, 0],
    [0, 0, 0, 0]
];

// Format the game state for display
function formatGameState(state: GameState): string {
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
function parseGameState(): boolean {
    const textarea = document.getElementById('gameState') as HTMLTextAreaElement;
    const errorBox = document.getElementById('errorBox') as HTMLDivElement;
    
    if (!textarea || !errorBox) {
        return false;
    }
    
    try {
        const parsed = JSON.parse(textarea.value);
        
        // Validate it's an array
        if (!Array.isArray(parsed)) {
            throw new Error('Game state must be an array');
        }
        
        // Validate it's a 4x4 array
        if (parsed.length !== 4) {
            throw new Error('Game state must be a 4x4 array');
        }
        
        for (let i = 0; i < 4; i++) {
            if (!Array.isArray(parsed[i]) || parsed[i].length !== 4) {
                throw new Error('Game state must be a 4x4 array');
            }
            for (let j = 0; j < 4; j++) {
                if (typeof parsed[i][j] !== 'number') {
                    throw new Error('Game state must contain only numbers');
                }
            }
        }
        
        // Update gameState
        gameState = parsed;
        errorBox.textContent = ''; // Clear any previous errors
        return true;
    } catch (error) {
        if (error instanceof Error) {
            errorBox.textContent = 'Error: ' + error.message;
        } else {
            errorBox.textContent = 'Error: Unknown error occurred';
        }
        return false;
    }
}

// Update the display
function updateDisplay(): void {
    const textarea = document.getElementById('gameState') as HTMLTextAreaElement;
    if (textarea) {
        textarea.value = formatGameState(gameState);
    }
}

// Helper function to create a deep copy of the game state
function cloneState(state: GameState): GameState {
    return JSON.parse(JSON.stringify(state));
}

// Move tiles left
function moveLeft(): void {
    // Parse the current state from the textarea
    // If parsing fails, the error is displayed and previous state is used
    parseGameState();
    
    const newState = cloneState(gameState);
    
    for (let zeile = 0; zeile < 4; zeile++) {
        // Collect non-zero values in this row
        const values: number[] = [];
        for (let spalte = 0; spalte < 4; spalte++) {
            if (newState[zeile][spalte] !== 0) {
                values.push(newState[zeile][spalte]);
            }
        }
        
        // Merge adjacent equal values
        const merged: number[] = [];
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
document.addEventListener('DOMContentLoaded', function(): void {
    updateDisplay();
    
    // Add event listeners to buttons
    const upBtn = document.getElementById('upBtn') as HTMLButtonElement;
    const downBtn = document.getElementById('downBtn') as HTMLButtonElement;
    const leftBtn = document.getElementById('leftBtn') as HTMLButtonElement;
    const rightBtn = document.getElementById('rightBtn') as HTMLButtonElement;
    
    if (upBtn) upBtn.disabled = true;
    if (downBtn) downBtn.disabled = true;
    if (leftBtn) leftBtn.addEventListener('click', moveLeft);
    if (rightBtn) rightBtn.disabled = true;
});
