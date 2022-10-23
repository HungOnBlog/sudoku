export interface ISudokuDrawer {
  draw(boards: number[][], seconds: number, cursor: number[]): void;
  drawWin(boards: number[][], seconds: number, cursor: number[]): void;
  drawLose(boards: number[][], seconds: number, cursor: number[]): void;
}
