https://github.com/mevdschee/2048.c/blob/main/2048.c inspired by that one
part of https://github.com/ligurio/awesome-ttygames?tab=readme-ov-file

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


	


