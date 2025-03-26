const sudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Create the 9x9 grid dynamically
function createGrid() {
    const tableBody = document.querySelector('#sudoku-grid tbody');
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            if (sudokuGrid[i][j] !== 0) {
                cell.textContent = sudokuGrid[i][j];
                cell.style.backgroundColor = '#f0f0f0'; // Pre-filled cells
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '1';
                input.max = '9';
                input.setAttribute('maxlength', '1');
                cell.appendChild(input);
            }
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

// Check if the Sudoku solution is valid
function checkSolution() {
    const cells = document.querySelectorAll('#sudoku-grid td input');
    let isValid = true;

    // Check each cell's value
    cells.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = parseInt(input.value);

        if (value < 1 || value > 9 || !isValidValue(row, col, value)) {
            input.style.backgroundColor = '#ffcccc'; // Highlight invalid input
            isValid = false;
        } else {
            input.style.backgroundColor = '#fff'; // Reset color if valid
        }
    });

    if (isValid) {
        alert('Solution is valid!');
    } else {
        alert('Some values are incorrect. Please check your solution.');
    }
}

// Check if the value is valid in the given row, column, and subgrid
function isValidValue(row, col, value) {
    // Check the row
    for (let i = 0; i < 9; i++) {
        if (sudokuGrid[row][i] === value) return false;
    }

    // Check the column
    for (let i = 0; i < 9; i++) {
        if (sudokuGrid[i][col] === value) return false;
    }

    // Check the 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (sudokuGrid[i][j] === value) return false;
        }
    }

    return true;
}

// Initialize the game
createGrid();
