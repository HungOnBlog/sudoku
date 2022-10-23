import { ISudokuSolver } from '../interfaces/solver.interface';

export class SudokuSolver implements ISudokuSolver {
  board: number[][];
  constructor(board: number[][]) {
    this.board = board;
  }
  nextStep(): number[][] {
    throw new Error('Method not implemented.');
  }
  isSolved(): boolean {
    throw new Error('Method not implemented.');
  }
}
