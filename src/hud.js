let hudEl;

export function createHUD() {
  hudEl = document.createElement('div');
  hudEl.style.cssText = `
    position: fixed; top: 16px; left: 16px; right: 16px;
    display: flex; justify-content: space-between;
    font-family: monospace; font-size: 20px; color: white;
    text-shadow: 2px 2px 0 black;
    pointer-events: none; z-index: 10;
  `;
  hudEl.innerHTML = `
    <span id="hud-score">SCORE: 0</span>
    <span id="hud-coins">COINS: 0</span>
    <span id="hud-lives">LIVES: 3</span>
  `;
  document.body.appendChild(hudEl);
}

export function updateHUD(state) {
  document.getElementById('hud-score').textContent = `SCORE: ${state.score}`;
  document.getElementById('hud-coins').textContent = `COINS: ${state.coins}`;
  document.getElementById('hud-lives').textContent = `LIVES: ${state.lives}`;
}

export function showMessage(text) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: monospace; font-size: 48px; color: white;
    text-shadow: 3px 3px 0 black; z-index: 20;
  `;
  document.body.appendChild(msg);
  return msg;
}
