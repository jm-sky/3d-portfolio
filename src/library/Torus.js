import * as THREE from 'three';

class Torus {
  //-------------------------------
  constructor(options = {}, app = null) {
    this.app = options.app || app;
    this.options = options;
    this.rotationSpeed = options.rotationSpeed || 0.01;
    this.init();
  }
  //-------------------------------
  init() {
    this.geometry = new THREE.TorusGeometry(16, 4, 16, 96);
    this.material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: this.options.wireframe });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 10;
    this.mesh.position.y = 25;
    this.mesh.position.z = -20;
    this.mesh.castShadow = true;
    this.createGUI();
  }
  //-------------------------------
  createGUI() {
    if (!this.app._gui) return;

    this.app._guiParams.moonFolder = this.app._gui.addFolder('Moon');
    this.app._guiParams.moonFolder.add(this, 'rotationSpeed', 0, 0.5, 0.001);
  }
  //-------------------------------
  update() {
    this.mesh.rotation.x += this.rotationSpeed;
    this.mesh.rotation.y += this.rotationSpeed / 2;
  }
  //-------------------------------
}

export default Torus;