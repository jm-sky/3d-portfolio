import * as THREE from 'three';

class Torus {
  //-------------------------------
  constructor(options = {}) {
    this.options = options;
    this.rotationSpeed = options.rotationSpeed || 0.01;
    this.init();
  }
  //-------------------------------
  init() {
    this.geometry = new THREE.TorusGeometry(16, 4, 16, 100);
    this.material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: this.options.wireframe });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 10;
    this.mesh.position.y = 25;
    this.mesh.position.z = -20;
    this.mesh.castShadow = true;
  }
  //-------------------------------
  update() {
    this.mesh.rotation.x += this.rotationSpeed;
    this.mesh.rotation.y += this.rotationSpeed / 2;
  }
  //-------------------------------
}

export default Torus;