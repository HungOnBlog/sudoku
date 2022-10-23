import { ISudokuBoardGenerator } from '../interfaces/board-generator.interface';

export class SudokuBoardGenerator implements ISudokuBoardGenerator {
  NUMBERS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  board: number[][] = [];

  constructor() {
    this.board = Array.from(Array(9), () => new Array(9).fill(0));
  }

  /**
   * Generate a sudoku board using Diagonal Sudoku Algorithm (see: https://www.geeksforgeeks.org/sudoku-backtracking-7/)
   * @param board
   * @param numberOfHints
   * @returns
   */
  generate(board: number[][], numberOfHints: number): number[][] {
    this.board = board;
    this.fillDiagonal();
    this.fillRemaining(0, 3, this.board.length);
    return this.removeNumbers(numberOfHints);
  }

  /**
   * Fill the remaining cells
   * @param x
   * @param y
   * @param boardSize
   * @returns
   */
  private fillRemaining(x: number, y: number, boardSize: number): boolean {
    if (y >= boardSize && x < boardSize - 1) {
      x++;
      y = 0;
    }
    if (x >= boardSize && y >= boardSize) {
      return true;
    }

    if (x < 3) {
      if (y < 3) y = 3;
    } else if (x < boardSize - 3) {
      if (y === Math.floor(x / 3) * 3) y += 3;
    } else {
      if (y === boardSize - 3) {
        x++;
        y = 0;
        if (x >= boardSize) return true;
      }
    }

    for (let num = 1; num <= boardSize; num++) {
      if (this.canPlace(num, x, y)) {
        this.board[x][y] = num;
        if (this.fillRemaining(x, y + 1, boardSize)) return true;
        this.board[x][y] = 0;
      }
    }
    return false;
  }

  /**
   * Check if can place a number in a cell
   *
   * - Check if the number is not already placed in current row,
   *
   * - Check if the number is not already placed in current column,
   *
   * - Check if the number is not already placed in current 3x3 box
   * @param num
   * @param x
   * @param y
   * @returns
   */
  private canPlace(num: number, x: number, y: number): boolean {
    return (
      !this.usedInRow(num, x) &&
      !this.usedInCol(num, y) &&
      !this.usedInBox(num, x - (x % 3), y - (y % 3))
    );
  }

  /**
   * Check if the number is not already placed in current row
   *
   * @param num
   * @param x
   * @returns
   */
  private usedInRow(num: number, x: number): boolean {
    return this.board[x].includes(num);
  }

  /**
   * Check if the number is not already placed in current column
   *
   * @param num
   * @param y
   * @returns
   */
  private usedInCol(num: number, y: number): boolean {
    return this.board.some((row) => row[y] === num);
  }

  /**
   * Check if the number is not already placed in current 3x3 box
   *
   * @param num
   * @param x
   * @param y
   * @returns
   */
  private usedInBox(num: number, x: number, y: number): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[x + i][y + j] === num) return true;
      }
    }
    return false;
  }

  /**
   * Remove numbers from the board to create a puzzle
   *
   * @param hint
   * @returns
   */
  private removeNumbers(hint: number): number[][] {
    let count = hint;
    while (count !== 0) {
      const x = Math.floor(Math.random() * 9);
      const y = Math.floor(Math.random() * 9);
      if (this.board[x][y] !== 0) {
        count--;
        this.board[x][y] = 0;
      }
    }
    return this.board;
  }

  /**
   * Fill diagonal boxes
   */
  private fillDiagonal(): void {
    for (let i = 0; i < 9; i += 3) {
      this.fillBox(i, i);
    }
  }

  /**
   * Fill a box with random numbers
   * @param x
   * @param y
   */
  private fillBox(x: number, y: number): void {
    let num = this.randomPickNumber();
    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        while (!this.canPlace(num, i, j)) {
          num = this.randomPickNumber();
        }
        this.board[i][j] = num;
      }
    }
  }

  /**
   * Randomly pick a number from 1 to 9
   *
   * @returns
   */
  private randomPickNumber(): number {
    return this.NUMBERS[Math.floor(Math.random() * this.NUMBERS.length)];
  }
}
