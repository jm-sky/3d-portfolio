import * as THREE from 'three';

class Torus {
  //-------------------------------
  constructor(options = {}) {
    this.options = options;
    this.init();
  }
  //-------------------------------
  init() {
    this.geometry = new THREE.TorusGeometry(29, 8, 16, 100);
    this.material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: this.options.wireframe });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 20;
    this.mesh.position.z = -120;
  }
  //-------------------------------
  update() {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.005;
  }
  //-------------------------------
}

export default Torus;