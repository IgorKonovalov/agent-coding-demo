export function createGameState() {
  return {
    score: 0,
    coins: 0,
    lives: 3,
    gameOver: false,
    levelComplete: false,
    shownComplete: false,
  };
}

export function addScore(state, points) {
  state.score += points;
}

export function collectCoinState(state) {
  state.coins++;
  state.score += 50;
}

export function loseLife(state) {
  state.lives--;
  if (state.lives <= 0) {
    state.gameOver = true;
  }
}
