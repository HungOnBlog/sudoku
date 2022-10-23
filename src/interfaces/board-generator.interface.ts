export interface ISudokuBoardGenerator {
  generate(emptyBoard: number[][], numberOfHints: number): number[][];
}
