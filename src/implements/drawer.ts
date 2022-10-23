import { ISudokuDrawer } from '../interfaces/drawer.interface';

export class SudokuDrawer implements ISudokuDrawer {
  draw(board: number[][], seconds: number, cursor: number[]): void {
    console.clear();
    console.log(`Time: ${seconds}s`);
    for (let i = 0; i < board.length; i++) {
      const line = board[i]
        .map((cell, index) => {
          const x = i;
          const y = index;

          if (cursor[0] === x && cursor[1] === y) {
            return '▓ ';
          }

          if (cell === 0) {
            return '  ';
          }
          return `${cell} `;
        })
        .map((cell, index) => {
          if (index % 3 === 0) {
            return `|${cell}`;
          }
          if (index === 8) {
            return `${cell}|`;
          }
          return cell;
        })
        .join(' ');
      console.log(line);
      if (i % 3 === 2) {
        console.log('------------------------------');
      }
    }
  }

  drawWin(board: number[][], seconds: number, cursor: number[]): void {
    this.draw(board, seconds, cursor);
    console.log('You win! 🎉🎉🎉');
  }

  drawLose(boards: number[][], second: number, cursor: number[]): void {
    this.draw(boards, second, cursor);
    console.log('You lose! 😭😭😭');
  }
}
