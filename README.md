https://github.com/mevdschee/2048.c/blob/main/2048.c inspired by that one
part of https://github.com/ligurio/awesome-ttygames?tab=readme-ov-file

# 2048 Learning Exercise for Kids

This is an interactive learning tool where kids can learn JavaScript by implementing the logic for the 2048 game!

## How It Works

The game board is represented as a 4x4 matrix (array of arrays). Each function you write takes this matrix as input and returns a new modified matrix.

## Getting Started

1. Open `index.html` in your web browser
2. You'll see the game state on the left and control buttons with code editors on the right
3. Write your code in the text boxes next to each button
4. Click the buttons to test your code!
5. Your code is automatically saved in your browser

## Sample Implementations

Below are working implementations for all the functions. You can copy these into the code boxes to see how the game works, then modify them to learn!

### moveLeft(matrix)

```javascript
// Move all tiles left and merge adjacent equal values
const newMatrix = JSON.parse(JSON.stringify(matrix)); // Clone matrix

for (let row = 0; row < 4; row++) {
    // Collect non-zero values in this row
    let values = [];
    for (let col = 0; col < 4; col++) {
        if (newMatrix[row][col] !== 0) {
            values.push(newMatrix[row][col]);
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
        newMatrix[row][col] = merged[col] || 0;
    }
}

return newMatrix;
```

### moveRight(matrix)

```javascript
// Move all tiles right and merge adjacent equal values
const newMatrix = JSON.parse(JSON.stringify(matrix)); // Clone matrix

for (let row = 0; row < 4; row++) {
    // Collect non-zero values in this row
    let values = [];
    for (let col = 0; col < 4; col++) {
        if (newMatrix[row][col] !== 0) {
            values.push(newMatrix[row][col]);
        }
    }
    
    // Merge adjacent equal values (from right)
    let merged = [];
    let i = values.length - 1;
    while (i >= 0) {
        if (i - 1 >= 0 && values[i] === values[i - 1]) {
            merged.unshift(values[i] * 2);
            i -= 2;
        } else {
            merged.unshift(values[i]);
            i -= 1;
        }
    }
    
    // Fill the row with zeros on left, merged values on right
    for (let col = 0; col < 4; col++) {
        newMatrix[row][col] = merged[col - (4 - merged.length)] || 0;
    }
}

return newMatrix;
```

### moveUp(matrix)

```javascript
// Move all tiles up and merge adjacent equal values
const newMatrix = JSON.parse(JSON.stringify(matrix)); // Clone matrix

for (let col = 0; col < 4; col++) {
    // Collect non-zero values in this column
    let values = [];
    for (let row = 0; row < 4; row++) {
        if (newMatrix[row][col] !== 0) {
            values.push(newMatrix[row][col]);
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
        newMatrix[row][col] = merged[row] || 0;
    }
}

return newMatrix;
```

### moveDown(matrix)

```javascript
// Move all tiles down and merge adjacent equal values
const newMatrix = JSON.parse(JSON.stringify(matrix)); // Clone matrix

for (let col = 0; col < 4; col++) {
    // Collect non-zero values in this column
    let values = [];
    for (let row = 0; row < 4; row++) {
        if (newMatrix[row][col] !== 0) {
            values.push(newMatrix[row][col]);
        }
    }
    
    // Merge adjacent equal values (from bottom)
    let merged = [];
    let i = values.length - 1;
    while (i >= 0) {
        if (i - 1 >= 0 && values[i] === values[i - 1]) {
            merged.unshift(values[i] * 2);
            i -= 2;
        } else {
            merged.unshift(values[i]);
            i -= 1;
        }
    }
    
    // Fill the column with zeros on top, merged values on bottom
    for (let row = 0; row < 4; row++) {
        newMatrix[row][col] = merged[row - (4 - merged.length)] || 0;
    }
}

return newMatrix;
```

### spawnTile(matrix)

```javascript
// Spawn a new tile (2 or 4) in a random empty cell
const newMatrix = JSON.parse(JSON.stringify(matrix)); // Clone matrix

// Find all empty cells
let emptyCells = [];
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
        if (newMatrix[row][col] === 0) {
            emptyCells.push({ row: row, col: col });
        }
    }
}

// If there are empty cells, spawn a new tile
if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    // 90% chance of 2, 10% chance of 4
    newMatrix[cell.row][cell.col] = Math.random() < 0.9 ? 2 : 4;
}

return newMatrix;
```

### isGameOver(matrix)

```javascript
// Check if the game is over (no more moves possible)

// Check if there are any empty cells
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
        if (matrix[row][col] === 0) {
            return false; // Empty cell found, game not over
        }
    }
}

// Check if any adjacent cells can be merged (horizontally)
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
        if (matrix[row][col] === matrix[row][col + 1]) {
            return false; // Adjacent equal cells found, game not over
        }
    }
}

// Check if any adjacent cells can be merged (vertically)
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
        if (matrix[row][col] === matrix[row + 1][col]) {
            return false; // Adjacent equal cells found, game not over
        }
    }
}

return true; // No moves left, game is over
```

## Learning Tips

1. **Start Simple**: Begin with the `moveLeft` implementation, then try to adapt it for other directions
2. **Understand the Matrix**: The matrix is `matrix[row][col]` where row is 0-3 from top to bottom, col is 0-3 from left to right
3. **Clone Before Modifying**: Always create a copy of the matrix before modifying it (use `JSON.parse(JSON.stringify(matrix))`)
4. **Test Often**: Click the buttons frequently to see if your code works
5. **Use Console**: You can use `console.log()` in your code to debug
6. **Save Your Work**: Use the Export button to save your code, and Import to load it later

## Sharing Your Code

Use the **Export Code** button to generate a markdown file with all your implementations. You can share this with friends or save it for later!

## Original Game Logic (German)

```
[
	[0,0,0,0],
	[0,0,0,2],
	[0,2,0,0],
	[0,0,0,0]
]
+
[up]
```
equals

```
[
	[0,2,0,2],
	[0,0,0,0],
	[0,2,0,0],
	[0,0,0,0]
]
+
[left]
```

1. Schritt: schiebe alles nach links, was nicht null ist.

```
[
	[2,2,0,0],
	[0,0,0,0],
	[2,2,4,0],
	[0,0,0,0]
]
```
2. Pro Zeile
	* wenn der Nachbar gleich der aktuellen Zahl, `aktuelle Zahl = 2* aktuelle Zahl` Addiere die beiden Nachbarn zusammen und schreibe es **links** hin.
	* Ein ergebniss, nicht weiter addieren, aber es können 2 paare pro reihe addiert werdne

	
Pro Zeile (für von **"nach links"**:
 * erstelle eine neue leere Zeile `[]`
 * gehe durch die aktuelle zeile von links nach rechts `[0,2,0,2]` und füge immer alles hinzu was nich null ist

```
new_line = []
for i in [0,2,0,2]
	if i != 0
		new_line.push(i)
  
```	

###was ist push/clear/insert?
push bedeutet "an das Ende hinzufügen"

```
empty = []					// leere Liste mit dem Namen empty
empty.push(2) 				// [2]
empty.push(3)				// [2, 3]
empty.insert(5,0)			// [5, 2, 3]
empty.clear()				// []

```


	


