import * as THREE from 'three';
import { isJump, horizontalAxis } from './input.js';

const MOVE_SPEED = 8;
const JUMP_FORCE = 14;
const GRAVITY = -35;

export function createPlayer(scene) {
  const geometry = new THREE.BoxGeometry(0.8, 1.2, 0.8);
  const material = new THREE.MeshStandardMaterial({ color: 0xe52521 }); // Mario red
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(2, 2, 0);
  scene.add(mesh);

  return {
    mesh,
    velocity: new THREE.Vector3(0, 0, 0),
    width: 0.8,
    height: 1.2,
    isGrounded: false,
    isDead: false,
  };
}

export function updatePlayer(player, dt) {
  if (player.isDead) return;

  const dir = horizontalAxis();
  player.velocity.x = dir * MOVE_SPEED;

  if (isJump() && player.isGrounded) {
    player.velocity.y = JUMP_FORCE;
    player.isGrounded = false;
  }

  player.velocity.y += GRAVITY * dt;

  player.mesh.position.x += player.velocity.x * dt;
  player.mesh.position.y += player.velocity.y * dt;
}
