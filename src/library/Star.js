import * as THREE from 'three';

class Star {
  //-------------------------------
  constructor(options = {}) {
    this.options = options;
    this.spread = options.spread || 100;
    this.init();
  }
  //-------------------------------
  init() {
    this.geometry = new THREE.SphereGeometry(0.25, 24, 24);
    this.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(this.spread));
    this.mesh.position.set(x, y, z);
  }
  //-------------------------------
}

export default Star;