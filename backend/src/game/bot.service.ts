import { Injectable } from '@nestjs/common';
import { Board, WINNING_COMBOS } from './game.types';

@Injectable()
export class BotService {
  getBotMove(board: Board): number {
    const winMove = this.findWinningMove(board, 'O');
    if (winMove !== -1) return winMove;

    const blockMove = this.findWinningMove(board, 'X');
    if (blockMove !== -1) return blockMove;

    return this.getRandomMove(board);
  }

  private findWinningMove(board: Board, player: string): number {
    for (const [a, b, c] of WINNING_COMBOS) {
      if (board[a] === player && board[b] === player && board[c] === null)
        return c;
      if (board[a] === player && board[b] === null && board[c] === player)
        return b;
      if (board[a] === null && board[b] === player && board[c] === player)
        return a;
    }
    return -1;
  }

  private getRandomMove(board: Board): number {
    const available = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }
}
