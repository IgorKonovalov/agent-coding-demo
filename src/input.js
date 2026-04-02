const keys = {};

window.addEventListener('keydown', (e) => { keys[e.code] = true; });
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

export function isDown(code) {
  return !!keys[code];
}

export function isJump() {
  return isDown('Space') || isDown('ArrowUp');
}

export function horizontalAxis() {
  return (isDown('ArrowRight') ? 1 : 0) - (isDown('ArrowLeft') ? 1 : 0);
}
