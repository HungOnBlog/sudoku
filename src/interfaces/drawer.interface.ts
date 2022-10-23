export interface I2048Drawer {
  draw(boards: number[][], scores: number, numberOfMoves: number): void;
  drawLost(boards: number[][], scores: number, numberOfMoves: number): void;
  drawWin(boards: number[][], scores: number, numberOfMoves: number): void;
}
