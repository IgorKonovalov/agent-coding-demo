import * as THREE from 'three';
import { createEnemy } from './enemy.js';
import { createCoin } from './coin.js';

const LEVEL = {
  ground: [
    [0, 20],
    [25, 15],
    [45, 30],
    [80, 25],
  ],
  platforms: [
    [10, 4, 3],
    [22, 3, 2],
    [35, 4, 4],
    [38, 6, 3],
    [50, 4, 5],
    [65, 5, 3],
    [70, 3, 2],
  ],
  enemies: [
    [12, 8, 18],
    [30, 26, 38],
    [50, 46, 54],
    [60, 56, 68],
    [85, 80, 95],
  ],
  coins: [
    [10, 6], [11, 6], [12, 6],
    [22, 5],
    [50, 6], [51, 6], [52, 6], [53, 6],
    [65, 7],
    [70, 5],
    [90, 2],
  ],
  flagpoleX: 100,
};

export function buildLevel(scene) {
  const platforms = [];
  const enemies = [];
  const coins = [];

  const groundMat = new THREE.MeshStandardMaterial({ color: 0xc84c09 });
  const topMat = new THREE.MeshStandardMaterial({ color: 0x00a800 });

  for (const [x, width] of LEVEL.ground) {
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(width, 2, 2),
      groundMat
    );
    ground.position.set(x + width / 2, -1, 0);
    scene.add(ground);

    const grass = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.3, 2.1),
      topMat
    );
    grass.position.set(x + width / 2, 0.15, 0);
    scene.add(grass);

    platforms.push({
      mesh: { position: ground.position },
      width,
      height: 2,
    });
  }

  const platMat = new THREE.MeshStandardMaterial({ color: 0xc84c09 });
  for (const [x, y, width] of LEVEL.platforms) {
    const plat = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.5, 1.5),
      platMat
    );
    plat.position.set(x, y, 0);
    scene.add(plat);
    platforms.push({ mesh: plat, width, height: 0.5 });
  }

  for (const [x, patrolMin, patrolMax] of LEVEL.enemies) {
    enemies.push(createEnemy(scene, x, patrolMin, patrolMax));
  }

  for (const [x, y] of LEVEL.coins) {
    coins.push(createCoin(scene, x, y));
  }

  // Flagpole
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xcccccc })
  );
  pole.position.set(LEVEL.flagpoleX, 4, 0);
  scene.add(pole);

  const flag = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x00a800 })
  );
  flag.position.set(LEVEL.flagpoleX + 0.85, 7, 0);
  scene.add(flag);

  const flagpole = {
    mesh: pole,
    width: 1.5,
    height: 8,
    x: LEVEL.flagpoleX,
  };

  return { platforms, enemies, coins, flagpole };
}
