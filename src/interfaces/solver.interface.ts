export interface ISudokuSolver {
  nextStep(): number[][];
  isSolved(): boolean;
}
