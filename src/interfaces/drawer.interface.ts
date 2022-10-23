export interface ISudokuDrawer {
  draw(board: number[][], seconds: number, cursor: number[]): void;
  drawWin(board: number[][], seconds: number, cursor: number[]): void;
  drawLose(board: number[][], seconds: number, cursor: number[]): void;
}
