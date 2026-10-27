import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame, play, winningLines } from './game.js';

test('une nouvelle partie contient neuf cases vides et les croix commencent', () => {
  assert.deepEqual(createGame(), { board: Array(9).fill(null), current: 'X', winner: null, line: [], draw: false });
});
test('les tours alternent sans modifier l’état précédent', () => {
  const initial = createGame();
  const next = play(initial, 4);
  assert.equal(next.board[4], 'X');
  assert.equal(next.current, 'O');
  assert.equal(initial.board[4], null);
  assert.equal(play(next, 0).board[0], 'O');
});
test('une case occupée ou un index invalide ne consomme pas de tour', () => {
  const state = play(createGame(), 4);
  for (const index of [4, -1, 9, 1.5, '1', null, NaN]) assert.equal(play(state, index), state);
});
for (const line of winningLines) {
  test(`victoire sur ${line.join(', ')} et blocage de la partie terminée`, () => {
    let state = createGame();
    const others = Array.from({ length: 9 }, (_, i) => i).filter(i => !line.includes(i));
    for (const index of [line[0], others[0], line[1], others[1], line[2]]) state = play(state, index);
    assert.equal(state.winner, 'X');
    assert.deepEqual(state.line, line);
    assert.equal(state.draw, false);
    assert.equal(play(state, others[2]), state);
  });
}
test('les ronds peuvent aussi gagner', () => {
  const state = [0, 3, 1, 4, 8, 5].reduce(play, createGame());
  assert.equal(state.winner, 'O');
});
test('un plateau rempli sans alignement donne un match nul', () => {
  const state = [0, 1, 2, 4, 3, 5, 7, 6, 8].reduce(play, createGame());
  assert.equal(state.draw, true);
  assert.equal(state.winner, null);
  assert.equal(play(state, 0), state);
});
test('une victoire au dernier coup prime sur le match nul', () => {
  const state = [0, 1, 2, 3, 4, 5, 7, 6, 8].reduce(play, createGame());
  assert.equal(state.winner, 'X');
  assert.equal(state.draw, false);
});
