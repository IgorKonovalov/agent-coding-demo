import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x5c94fc); // NES sky blue

  // Orthographic camera for 2.5D look
  const viewWidth = 24;
  const aspect = window.innerWidth / window.innerHeight;
  const viewHeight = viewWidth / aspect;
  const camera = new THREE.OrthographicCamera(
    -viewWidth / 2, viewWidth / 2,
    viewHeight / 2, -viewHeight / 2,
    0.1, 100
  );
  camera.position.set(0, 5, 20);
  camera.lookAt(0, 5, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(10, 20, 10);
  scene.add(directional);

  // Handle window resize
  window.addEventListener('resize', () => {
    const newAspect = window.innerWidth / window.innerHeight;
    const newViewHeight = viewWidth / newAspect;
    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = newViewHeight / 2;
    camera.bottom = -newViewHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer };
}
