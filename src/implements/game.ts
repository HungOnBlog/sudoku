import { ISudokuBoardGenerator } from '../interfaces/board-generator.interface';
import { ISudokuDrawer } from '../interfaces/drawer.interface';
import { IGame } from '../interfaces/game.interface';
import { ISudokuSolver } from '../interfaces/solver.interface';
import { SudokuSolver } from './solver';

export class SudokuGame implements IGame {
  private board: number[][] = []; // Board size is 9x9
  private rows: number = 9;
  private cols: number = 9;
  private LEVELS: { [key: number]: number } = {
    1: 35,
    2: 35,
    3: 25,
  };
  private LOGO: string = `
 ___  __  __  ____  _____  _  _  __  __ 
 / __)(  )(  )(  _ \(  _  )( )/ )(  )(  )
 \__ \ )(__)(  )(_) ))(_)(  )  (  )(__)( 
 (___/(______)(____/(_____)(_)\_)(______)       
  `;

  private prompt = require('prompt-sync')();
  private level: number = 1; // Level easy: 35 numbers
  private startTimestamp: number = 0;
  private timerInterval: any;
  private solverInterval: any;
  private TIMER_INTERVAL = 1000;
  private SOLVER_INTERVAL = 100;
  private cursor: number[] = [0, 0];
  private solver?: ISudokuSolver;

  constructor(
    private readonly drawer: ISudokuDrawer,
    private readonly boardGenerator: ISudokuBoardGenerator,
  ) {
    this.board = this.generateEmptyBoard();
  }

  /**
   * Generate an empty board
   * @returns
   */
  private generateEmptyBoard(): number[][] {
    return new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));
  }

  /**
   * Select game level and generate a new board
   *
   * @param level 1: easy, 2: medium, 3: hard
   * @returns
   */
  private selectLevel(): void {
    console.log('Select difficulty level:');
    console.log('1. Easy');
    console.log('2. Medium');
    console.log('3. Hard');
    const difficulty = parseInt(this.prompt('Choose a difficulty level: '));
    if (isNaN(difficulty)) {
      console.log('Invalid difficulty');
      return this.selectLevel();
    }
    this.level = difficulty;
  }

  /**
   * Generate a new board
   */
  private generateBoard(): void {
    this.board = this.boardGenerator.generate(
      this.board,
      this.LEVELS[this.level],
    );
  }

  /**
   * Get current playing time
   * @returns
   */
  private getCurrentSeconds(): number {
    return Math.floor((Date.now() - this.startTimestamp) / 1000);
  }

  private isWin(): boolean {
    // Check if all cells are filled
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.board[i][j] === 0) return false;
      }
    }

    // Check rows
    for (let i = 0; i < this.rows; i++) {
      const row = this.board[i];
      const set = new Set(row);
      if (set.size !== this.rows) return false;
    }

    // Check columns
    for (let i = 0; i < this.rows; i++) {
      const column = this.board.map((row) => row[i]);
      const set = new Set(column);
      if (set.size !== this.rows) return false;
    }

    // Check 3x3 boxes
    for (let i = 0; i < this.rows; i += 3) {
      for (let j = 0; j < this.rows; j += 3) {
        const box = [];
        for (let k = i; k < i + 3; k++) {
          for (let l = j; l < j + 3; l++) {
            box.push(this.board[k][l]);
          }
        }
        const set = new Set(box);
        if (set.size !== this.rows) return false;
      }
    }

    return true;
  }

  private startSolveProcess(): void {
    this.solverInterval = setInterval(() => {
      if (this.solver?.isSolved()) {
        clearInterval(this.solverInterval);
      }
      let stepBoard = this.solver?.nextStep()!;
      this.board = stepBoard;
      if (this.isWin()) {
        clearInterval(this.solverInterval);
      }
    }, this.SOLVER_INTERVAL);
  }

  private loop() {
    this.startTimestamp = Date.now();

    // Start timer
    this.timerInterval = setInterval(() => {
      this.drawer.draw(this.board, this.getCurrentSeconds(), [...this.cursor]);
    }, this.TIMER_INTERVAL);

    // Start game loop
    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        this.stop();
      } else if (key.name === 's') {
        this.solver = new SudokuSolver(this.board);
        this.startSolveProcess();
      } else if (key.name === 'up') {
        this.cursor[0] = Math.max(this.cursor[0] - 1, 0);
      } else if (key.name === 'down') {
        this.cursor[0] = Math.min(this.cursor[0] + 1, this.rows - 1);
      } else if (key.name === 'left') {
        this.cursor[1] = Math.max(this.cursor[1] - 1, 0);
      } else if (key.name === 'right') {
        this.cursor[1] = Math.min(this.cursor[1] + 1, this.rows - 1);
      } else if (key.name === 'space') {
        this.board[this.cursor[0]][this.cursor[1]] = 0;
      } else {
        // If match a number from 1 to 9
        const num = parseInt(str);
        if (!isNaN(num) && num >= 1 && num <= 9) {
          this.board[this.cursor[0]][this.cursor[1]] = num;
        }
      }

      if (this.isWin()) {
        this.drawer.drawWin(this.board, this.getCurrentSeconds(), [
          ...this.cursor,
        ]);
        this.stop();
      }

      this.drawer.draw(this.board, this.getCurrentSeconds(), [...this.cursor]);
    });
  }

  name(): string {
    return 'Sudoku';
  }

  start(): void {
    console.log(this.LOGO);
    this.selectLevel();
    this.generateBoard();
    this.loop();
  }
  stop(): void {
    process.exit(0);
  }
  restart(): void {
    throw new Error('Method not implemented.');
  }
}
