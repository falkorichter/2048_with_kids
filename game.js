// Initial game state
let gameState = [
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 2, 0, 0],
    [0, 0, 0, 0]
];

// Default implementations (no-ops that return original matrix)
const defaultCode = {
    up: `// Default: returns original matrix (no-op)
return matrix;`,
    down: `// Default: returns original matrix (no-op)
return matrix;`,
    left: `// Default: returns original matrix (no-op)
return matrix;`,
    right: `// Default: returns original matrix (no-op)
return matrix;`,
    spawn: `// Default: returns original matrix (no-op)
return matrix;`,
    gameOver: `// Default: always returns false
return false;`
};

// Local storage keys
const STORAGE_KEYS = {
    up: 'code_moveUp',
    down: 'code_moveDown',
    left: 'code_moveLeft',
    right: 'code_moveRight',
    spawn: 'code_spawn',
    gameOver: 'code_gameOver'
};

// Element IDs for code input fields
const ELEMENT_IDS = {
    up: 'upCode',
    down: 'downCode',
    left: 'leftCode',
    right: 'rightCode',
    spawn: 'spawnCode',
    gameOver: 'gameOverCode'
};

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

// Auto-format code on blur
function formatCode(code) {
    // Simple formatting: trim and ensure proper spacing
    return code.trim();
}

// Save code to local storage
function saveCode(key, code) {
    localStorage.setItem(STORAGE_KEYS[key], code);
}

// Load code from local storage
function loadCode(key) {
    return localStorage.getItem(STORAGE_KEYS[key]) || defaultCode[key];
}

// Execute user code safely
function executeUserCode(functionName, code, matrix) {
    try {
        // Create a function from the user's code
        const userFunction = new Function('matrix', code);
        
        // Execute the function with a clone of the matrix
        const result = userFunction(cloneState(matrix));
        
        // Validate the result
        if (!Array.isArray(result)) {
            throw new Error('Function must return an array (matrix)');
        }
        
        return { success: true, result: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Execute user code for game over check
function executeGameOverCode(code, matrix) {
    try {
        // Create a function from the user's code
        const userFunction = new Function('matrix', code);
        
        // Execute the function with a clone of the matrix
        const result = userFunction(cloneState(matrix));
        
        return { success: true, result: result };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Move functions
function moveUp() {
    parseGameState();
    const code = document.getElementById('upCode').value;
    const result = executeUserCode('moveUp', code, gameState);
    
    if (result.success) {
        gameState = result.result;
        updateDisplay();
    } else {
        const errorBox = document.getElementById('errorBox');
        errorBox.textContent = 'Error in moveUp: ' + result.error;
    }
}

function moveDown() {
    parseGameState();
    const code = document.getElementById('downCode').value;
    const result = executeUserCode('moveDown', code, gameState);
    
    if (result.success) {
        gameState = result.result;
        updateDisplay();
    } else {
        const errorBox = document.getElementById('errorBox');
        errorBox.textContent = 'Error in moveDown: ' + result.error;
    }
}

function moveLeft() {
    parseGameState();
    const code = document.getElementById('leftCode').value;
    const result = executeUserCode('moveLeft', code, gameState);
    
    if (result.success) {
        gameState = result.result;
        updateDisplay();
    } else {
        const errorBox = document.getElementById('errorBox');
        errorBox.textContent = 'Error in moveLeft: ' + result.error;
    }
}

function moveRight() {
    parseGameState();
    const code = document.getElementById('rightCode').value;
    const result = executeUserCode('moveRight', code, gameState);
    
    if (result.success) {
        gameState = result.result;
        updateDisplay();
    } else {
        const errorBox = document.getElementById('errorBox');
        errorBox.textContent = 'Error in moveRight: ' + result.error;
    }
}

function spawnTile() {
    parseGameState();
    const code = document.getElementById('spawnCode').value;
    const result = executeUserCode('spawnTile', code, gameState);
    
    if (result.success) {
        gameState = result.result;
        updateDisplay();
    } else {
        const errorBox = document.getElementById('errorBox');
        errorBox.textContent = 'Error in spawnTile: ' + result.error;
    }
}

function checkGameOver() {
    parseGameState();
    const code = document.getElementById('gameOverCode').value;
    const result = executeGameOverCode(code, gameState);
    const resultBox = document.getElementById('gameOverResult');
    
    if (result.success) {
        resultBox.className = 'result-box success';
        resultBox.textContent = 'Game Over: ' + (result.result ? 'YES ❌' : 'NO ✓');
    } else {
        resultBox.className = 'result-box error';
        resultBox.textContent = 'Error: ' + result.error;
    }
}

// Export code to markdown
function exportCode() {
    const markdown = `# 2048 Learning Code Export

## moveUp(matrix)
\`\`\`javascript
${document.getElementById('upCode').value}
\`\`\`

## moveDown(matrix)
\`\`\`javascript
${document.getElementById('downCode').value}
\`\`\`

## moveLeft(matrix)
\`\`\`javascript
${document.getElementById('leftCode').value}
\`\`\`

## moveRight(matrix)
\`\`\`javascript
${document.getElementById('rightCode').value}
\`\`\`

## spawnTile(matrix)
\`\`\`javascript
${document.getElementById('spawnCode').value}
\`\`\`

## isGameOver(matrix)
\`\`\`javascript
${document.getElementById('gameOverCode').value}
\`\`\`
`;
    
    const textarea = document.getElementById('importExportArea');
    textarea.value = markdown;
    textarea.select();
}

// Import code from markdown
function importCode() {
    const markdown = document.getElementById('importExportArea').value;
    
    // Parse markdown code blocks
    const patterns = {
        up: /## moveUp\(matrix\)\s*```javascript\s*([\s\S]*?)```/,
        down: /## moveDown\(matrix\)\s*```javascript\s*([\s\S]*?)```/,
        left: /## moveLeft\(matrix\)\s*```javascript\s*([\s\S]*?)```/,
        right: /## moveRight\(matrix\)\s*```javascript\s*([\s\S]*?)```/,
        spawn: /## spawnTile\(matrix\)\s*```javascript\s*([\s\S]*?)```/,
        gameOver: /## isGameOver\(matrix\)\s*```javascript\s*([\s\S]*?)```/
    };
    
    for (const [key, pattern] of Object.entries(patterns)) {
        const match = markdown.match(pattern);
        if (match && match[1]) {
            const code = match[1].trim();
            document.getElementById(ELEMENT_IDS[key]).value = code;
            saveCode(key, code);
        }
    }
    
    alert('Code imported successfully!');
}

// Setup code input auto-save and formatting
function setupCodeInput(elementId, storageKey) {
    const element = document.getElementById(elementId);
    
    // Load saved code
    element.value = loadCode(storageKey);
    
    // Auto-save on input
    element.addEventListener('input', () => {
        saveCode(storageKey, element.value);
    });
    
    // Auto-format on blur
    element.addEventListener('blur', () => {
        element.value = formatCode(element.value);
        saveCode(storageKey, element.value);
    });
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    
    // Setup code inputs with auto-save and formatting
    for (const key in ELEMENT_IDS) {
        setupCodeInput(ELEMENT_IDS[key], key);
    }
    
    // Add event listeners to buttons
    document.getElementById('upBtn').addEventListener('click', moveUp);
    document.getElementById('downBtn').addEventListener('click', moveDown);
    document.getElementById('leftBtn').addEventListener('click', moveLeft);
    document.getElementById('rightBtn').addEventListener('click', moveRight);
    document.getElementById('spawnBtn').addEventListener('click', spawnTile);
    document.getElementById('checkGameOverBtn').addEventListener('click', checkGameOver);
    
    // Add event listeners to export/import buttons
    document.getElementById('exportBtn').addEventListener('click', exportCode);
    document.getElementById('importBtn').addEventListener('click', importCode);
});
