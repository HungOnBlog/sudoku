import { SudokuDrawer } from './implements/drawer';
import { SudokuGame } from './implements/game';
import { SudokuBoardGenerator } from './implements/generator';

function main() {
  const sudoku = new SudokuGame(new SudokuDrawer(), new SudokuBoardGenerator());
  sudoku.start();
}

main();
