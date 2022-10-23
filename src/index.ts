import { Game2048Drawer } from './implements/drawer';
import { Game2048 } from './implements/game';

function main() {
  const game2048 = new Game2048(new Game2048Drawer());
  game2048.start();
}

main();
