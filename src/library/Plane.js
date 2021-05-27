import * as THREE from 'three';

class Plane {
  //-------------------------------
  constructor(options = {}) {
    this.options = options;
    this.init();
  }
  //-------------------------------
  init() {
    this.geometry = new THREE.PlaneBufferGeometry(200, 200, 4, 4);
    this.material = new THREE.MeshStandardMaterial({ color: 0x333333 });
    // this.material = new THREE.MeshPhongMaterial({ color: 0x333333, opacity: 0.7, transparent: true });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
  }
  //-------------------------------
}

export default Plane;