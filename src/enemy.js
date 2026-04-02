import * as THREE from 'three';

const PATROL_SPEED = 2.5;
const GRAVITY = -35;

export function createEnemy(scene, x, patrolMin, patrolMax) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x8b4513 }) // brown goomba
  );
  mesh.position.set(x, 1, 0);
  scene.add(mesh);

  return {
    mesh,
    velocity: new THREE.Vector3(-PATROL_SPEED, 0, 0),
    width: 0.8,
    height: 0.8,
    patrolMin,
    patrolMax,
    isDead: false,
  };
}

export function updateEnemy(enemy, dt) {
  if (enemy.isDead) return;

  // Gravity
  enemy.velocity.y += GRAVITY * dt;
  enemy.mesh.position.y += enemy.velocity.y * dt;

  // Patrol: reverse at boundaries
  enemy.mesh.position.x += enemy.velocity.x * dt;
  if (enemy.mesh.position.x <= enemy.patrolMin) {
    enemy.velocity.x = PATROL_SPEED;
  } else if (enemy.mesh.position.x >= enemy.patrolMax) {
    enemy.velocity.x = -PATROL_SPEED;
  }
}

export function killEnemy(enemy, scene) {
  enemy.isDead = true;
  enemy.mesh.scale.y = 0.2;
  enemy.mesh.position.y -= enemy.height * 0.4;
  setTimeout(() => scene.remove(enemy.mesh), 500);
}
