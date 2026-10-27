import { createGame, play } from './game.js';

let state = createGame();
const cells = [...document.querySelectorAll('.cell')];
const status = document.querySelector('#status');

function render() {
  cells.forEach((cell, index) => {
    const symbol = state.board[index];
    cell.textContent = symbol === 'X' ? '×' : symbol === 'O' ? '○' : '';
    cell.classList.toggle('o', symbol === 'O');
    cell.classList.toggle('winner', state.line.includes(index));
    cell.disabled = Boolean(symbol || state.winner || state.draw);
    cell.setAttribute('aria-label', `Ligne ${Math.floor(index / 3) + 1}, colonne ${index % 3 + 1}, ${symbol === 'X' ? 'croix' : symbol === 'O' ? 'rond' : 'vide'}`);
  });
  for (const symbol of ['X', 'O']) {
    document.querySelector(`#player-${symbol.toLowerCase()}`).classList.toggle('active', !state.winner && !state.draw && state.current === symbol);
  }
  status.textContent = state.winner
    ? `${state.winner === 'X' ? 'Les croix' : 'Les ronds'} remportent la partie !`
    : state.draw ? 'Match nul. Une revanche ?'
    : state.board.every(cell => !cell) ? 'Les croix ouvrent le bal.'
    : `Aux ${state.current === 'X' ? 'croix' : 'ronds'} de jouer.`;
}

cells.forEach((cell, index) => cell.addEventListener('click', () => {
  state = play(state, index);
  render();
  if (!state.winner && !state.draw) {
    const next = cells.find((_, i) => i > index && !state.board[i]) ?? cells.find((_, i) => !state.board[i]);
    next?.focus({ preventScroll: true });
  }
}));

document.querySelector('#restart').addEventListener('click', () => {
  state = createGame();
  render();
  cells[0].focus({ preventScroll: true });
});
render();
