import * as THREE from 'three';

export function createCoin(scene, x, y) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.08, 16),
    new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 })
  );
  mesh.position.set(x, y, 0);
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);

  return {
    mesh,
    width: 0.6,
    height: 0.6,
    collected: false,
  };
}

export function updateCoin(coin, dt) {
  if (coin.collected) return;
  coin.mesh.rotation.z += 3 * dt;
}

export function collectCoin(coin, scene) {
  coin.collected = true;
  scene.remove(coin.mesh);
}
