# 2048 with Kids

A simple 2048 game implemented in TypeScript.

## Inspiration
- https://github.com/mevdschee/2048.c/blob/main/2048.c inspired by that one
- part of https://github.com/ligurio/awesome-ttygames?tab=readme-ov-file

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

### Development

To automatically rebuild on file changes:
```bash
npm run watch
```

### Running the Game

Open `index.html` in a web browser. You can use a simple HTTP server:

```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000/index.html`

## TypeScript Migration

This project was migrated from JavaScript to TypeScript. The key changes include:

- **Type Definitions**: Added type annotations for game state (`GameState` and `Row` types)
- **Strict Type Checking**: Enabled strict mode in TypeScript for better type safety
- **Build Process**: TypeScript files in `src/` are compiled to JavaScript in `dist/`
- **Configuration**: 
  - `tsconfig.json`: TypeScript compiler configuration
  - `package.json`: Project dependencies and build scripts

### Project Structure

```
.
├── src/
│   └── game.ts        # TypeScript source code
├── dist/
│   └── game.js        # Compiled JavaScript (generated)
├── index.html         # HTML page
├── style.css          # Styles
├── tsconfig.json      # TypeScript configuration
└── package.json       # Node.js dependencies
```

## Game Logic

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

1. Schritt: schiebe alles nach links

```
[
	[2,2,0,0],
	[0,0,0,0],
	[0,2,0,0],
	[0,0,0,0]
]
```
2. Pro Zeile
	* wenn der Nachbar gleich der aktuellen Zahl, aktuelle Zahl = `2* aktuelle Zahl` 
	* wenn wir addieren nicht weiter addieren,

	
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


	


