class Knight {
    constructor() {
        this.board = [8, 8];  // Board size (8x8)
        this.moves = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
    }

    isValidMove(x, y) {
        return x >= 0 && x < this.board[0] && y >= 0 && y < this.board[1];
    }

    knightMoves(start, end) {
        const [sx, sy] = start;
        const [ex, ey] = end;

        if (sx === ex && sy === ey) return [[sx, sy]];

        let queue = [[sx, sy, 0, [[sx, sy]]]];  // Queue holds [x, y, moves, path]
        let visited = new Set(); //to prevent revisiting
        visited.add(`${sx},${sy}`);  

        while (queue.length > 0) {
            let [x, y, moves, path] = queue.shift();  // Get current position and move count

            // Explore all possible moves from the current position
            for (let [dx, dy] of this.moves) {
                let newX = x + dx, newY = y + dy;

                // Check if we reached the end position
                if (newX === ex && newY === ey) {
                    return [...path, [newX, newY]];  
                }

                // Continue only if the new position is valid and hasn't been visited
                if (this.isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
                    queue.push([newX, newY, moves + 1, [...path, [newX, newY]]]);  // Push with incremented move count
                    visited.add(`${newX},${newY}`);  // Mark new position as visited
                }
            }
        }

        return "No path found!";
    }
}

let knight = new Knight();
let start = [3, 3];  
let end = [4, 3];   
let result = knight.knightMoves(start, end);

console.log(`You made it in ${result.length - 1} moves!`);  
console.log("Here's your path:", result);
