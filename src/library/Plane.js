import * as THREE from 'three';

class Plane {
  //-------------------------------
  constructor(options = {}) {
    this.options = options;
    this.init();
  }
  //-------------------------------
  init() {
    this.geometry = new THREE.PlaneBufferGeometry(200, 200, 12, 12);
    this.material = new THREE.MeshStandardMaterial({ color: 0x333333 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
  }
  //-------------------------------
}

export default Plane;