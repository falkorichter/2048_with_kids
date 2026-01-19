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
