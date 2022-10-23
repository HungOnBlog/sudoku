import { I2048Drawer } from '../interfaces/drawer.interface';
import { IGame } from '../interfaces/game.interface';

export class Game2048 implements IGame {
  board: number[][] = []; // Board size is 4x4
  score: number = 0;
  movement: boolean = false;
  rows: number = 4;
  cols: number = 4;
  numberOfMoves: number = 0;

  constructor(private readonly drawer: I2048Drawer) {}

  /**
   * Generate a new board
   * @returns
   */
  private generateEmptyBoard(): number[][] {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }

  /**
   * Random generate 2 or 4
   */
  private generateRandomNumber(): number {
    return Math.random() < 0.5 ? 2 : 4;
  }

  /**
   * Random generate a new number on the board
   * @param numbersNeededToAdd
   */
  private addRandomNumber(numbersNeededToAdd: number = 1): void {
    let counter = 0;
    while (counter < numbersNeededToAdd) {
      const randomRow = Math.floor(Math.random() * 4);
      const randomCol = Math.floor(Math.random() * 4);
      if (this.board[randomRow][randomCol] === 0) {
        this.board[randomRow][randomCol] = this.generateRandomNumber();
        counter++;
      }
    }
  }

  /**
   * Initialize the game with 2 numbers
   */
  private initialize(): void {
    this.board = this.generateEmptyBoard();
    this.addRandomNumber(2);
  }

  /**
   * Move the board left
   */
  private moveLeft() {
    this.movement = false;
    let scoreToAdd = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c] !== 0) {
          let col = c;
          while (col > 0) {
            if (this.board[r][col - 1] === 0) {
              this.board[r][col - 1] = this.board[r][col];
              this.board[r][col] = 0;
              this.movement = true;
              col--;
            } else if (this.board[r][col - 1] === this.board[r][col]) {
              this.board[r][col - 1] *= 2;
              this.board[r][col] = 0;
              this.movement = true;
              scoreToAdd += this.board[r][col - 1];
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    if (this.movement) {
      this.numberOfMoves++;
    }

    this.score += scoreToAdd;
  }

  /**
   * Move to the right
   */
  private moveRight() {
    this.movement = false;
    let scoreToAdd = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = this.cols - 1; c >= 0; c--) {
        if (this.board[r][c] !== 0) {
          let col = c;
          while (col < this.cols - 1) {
            if (this.board[r][col + 1] === 0) {
              this.board[r][col + 1] = this.board[r][col];
              this.board[r][col] = 0;
              this.movement = true;
              col++;
            } else if (this.board[r][col + 1] === this.board[r][col]) {
              this.board[r][col + 1] *= 2;
              this.board[r][col] = 0;
              this.movement = true;
              scoreToAdd += this.board[r][col + 1];
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    if (this.movement) {
      this.numberOfMoves++;
    }

    this.score += scoreToAdd;
  }

  /**
   * Move the board up
   */
  private moveUp() {
    this.movement = false;
    let scoreToAdd = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c] !== 0) {
          let row = r;
          while (row > 0) {
            if (this.board[row - 1][c] === 0) {
              this.board[row - 1][c] = this.board[row][c];
              this.board[row][c] = 0;
              this.movement = true;
              row--;
            } else if (this.board[row - 1][c] === this.board[row][c]) {
              this.board[row - 1][c] *= 2;
              this.board[row][c] = 0;
              this.movement = true;
              scoreToAdd += this.board[row - 1][c];
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    if (this.movement) {
      this.numberOfMoves++;
    }

    this.score += scoreToAdd;
  }

  /**
   * Move the board down
   */
  private moveDown() {
    this.movement = false;
    let scoreToAdd = 0;
    for (let r = this.rows - 1; r >= 0; r--) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c] !== 0) {
          let row = r;
          while (row < this.rows - 1) {
            if (this.board[row + 1][c] === 0) {
              this.board[row + 1][c] = this.board[row][c];
              this.board[row][c] = 0;
              this.movement = true;
              row++;
            } else if (this.board[row + 1][c] === this.board[row][c]) {
              this.board[row + 1][c] *= 2;
              this.board[row][c] = 0;
              this.movement = true;
              scoreToAdd += this.board[row + 1][c];
              break;
            } else {
              break;
            }
          }
        }
      }
    }

    if (this.movement) {
      this.numberOfMoves++;
    }

    this.score += scoreToAdd;
  }

  /**
   * Check for game over
   *
   * - Check if the board is full
   *
   * - Check if there are any possible moves
   */
  private isGameOver(): boolean {
    if (this.isBoardFull()) {
      return !this.canMove();
    }
    return false;
  }

  /**
   * Check if the board is full
   * @returns
   */
  private isBoardFull(): boolean {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Check if can move
   *
   * - Check if there are some cells with the same value in the rows
   *
   * - Check if there are some cells with the same value in the columns
   * @returns
   */
  private canMove(): boolean {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c] === 0) {
          return true;
        }
        if (r < this.rows - 1 && this.board[r][c] === this.board[r + 1][c]) {
          return true;
        }
        if (c < this.cols - 1 && this.board[r][c] === this.board[r][c + 1]) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Win when the board contains a 2048
   */
  private isWin(): boolean {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c] === 2048) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Main loop of the game
   */
  private loop() {
    this.drawer.draw(this.board, this.score, this.numberOfMoves);

    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    // Use the keypress event to listen for the user's input
    // Use ⬅️ ⬆️ ⬇️ ➡️ to move the board
    // Use 'Ctrl + c' to exit the game
    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
      if (key.name === 'left') {
        this.moveLeft();
      } else if (key.name === 'right') {
        this.moveRight();
      } else if (key.name === 'up') {
        this.moveUp();
      } else if (key.name === 'down') {
        this.moveDown();
      }

      if (this.movement) {
        this.addRandomNumber(1);
      }

      if (this.isGameOver()) {
        this.drawer.drawLost(this.board, this.score, this.numberOfMoves);
        this.stop();
      }

      if (this.isWin()) {
        this.drawer.drawWin(this.board, this.score, this.numberOfMoves);
        this.stop();
      }

      this.drawer.draw(this.board, this.score, this.numberOfMoves);
    });
  }

  name(): string {
    return '2048';
  }

  start(): void {
    this.initialize();
    this.loop();
  }

  stop(): void {
    process.exit(0);
  }

  restart(): void {
    throw new Error('Method not implemented.');
  }
}
