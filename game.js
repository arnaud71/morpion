export const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function createGame() {
  return { board: Array(9).fill(null), current: 'X', winner: null, line: [], draw: false };
}

export function play(state, index) {
  if (!Number.isInteger(index) || index < 0 || index > 8 || state.board[index] || state.winner || state.draw) return state;
  const board = [...state.board];
  board[index] = state.current;
  const line = winningLines.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) ?? [];
  const winner = line.length ? state.current : null;
  const draw = !winner && board.every(Boolean);
  return { board, current: winner || draw ? state.current : state.current === 'X' ? 'O' : 'X', winner, line, draw };
}
