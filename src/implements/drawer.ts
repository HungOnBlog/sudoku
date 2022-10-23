import { I2048Drawer } from '../interfaces/drawer.interface';

export class Game2048Drawer implements I2048Drawer {
  /**
   * Number with console color
   */
  private NUMBERS: { [key: number]: (num: string) => string } = {
    0: (num) => `\x1b[37m${num}\x1b[0m`,
    2: (num: string) => `\x1b[31m${num}\x1b[0m`,
    4: (num: string) => `\x1b[32m${num}\x1b[0m`,
    8: (num: string) => `\x1b[33m${num}\x1b[0m`,
    16: (num: string) => `\x1b[34m${num}\x1b[0m`,
    32: (num: string) => `\x1b[35m${num}\x1b[0m`,
    64: (num: string) => `\x1b[36m${num}\x1b[0m`,
    128: (num: string) => `\x1b[37m${num}\x1b[0m`,
    256: (num: string) => `\x1b[41m${num}\x1b[0m`,
    512: (num: string) => `\x1b[42m${num}\x1b[0m`,
    1024: (num: string) => `\x1b[45m${num}\x1b[0m`,
    2048: (num: string) => `\x1b[44m${num}\x1b[0m`,
  };

  /**
   * Add space to the number
   *
   * -If number < 10, add 3 spaces
   *
   * -If number < 100, add 2 spaces
   *
   * -If number < 1000, add 1 space
   *
   * @param number
   * @returns
   */
  private paddingNumber(number: number): string {
    if (number === 0) return '    ';
    if (number < 10) {
      return `${number}   `;
    }
    if (number < 100) {
      return `${number}  `;
    }
    if (number < 1000) {
      return `${number} `;
    }
    return number.toString();
  }

  /**
   * Gap line to make the board looks better
   * @returns
   */
  private gapLine(): string {
    return '                ';
  }

  draw(boards: number[][], scores: number, numberOfMoves: number): void {
    console.clear();
    console.log(`Score: ${scores} | Moves: ${numberOfMoves}`);
    for (let i = 0; i < boards.length; i++) {
      console.log(
        boards[i]
          .map((number) => this.NUMBERS[number](this.paddingNumber(number)))
          .join(''),
      );

      if (i !== boards.length - 1) {
        console.log(this.gapLine());
      }
    }
  }

  drawLost(boards: number[][], scores: number, numberOfMoves: number): void {
    this.draw(boards, scores, numberOfMoves);
    console.log('You lost! 😭😭😭');
  }
  drawWin(boards: number[][], scores: number, numberOfMoves: number): void {
    this.draw(boards, scores, numberOfMoves);
    console.log('You win! 🎉🎉🎉');
  }
}
