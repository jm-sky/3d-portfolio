import * as THREE from 'three';

class Moon {
  //-------------------------------
  constructor() {
    this.init();
  }
  //-------------------------------
  init() {
    this.geometry = new THREE.SphereGeometry(7, 24, 24);
    this.bg = new THREE.TextureLoader().load('./moon.jpg');
    this.normalMap = new THREE.TextureLoader().load('./normal.jpg');

    this.material = new THREE.MeshStandardMaterial({ 
      map: this.bg,
      normalMap: this.normalMap,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.setX(60);
    this.mesh.position.setY(10);
    this.mesh.position.setZ(-75);
  }
  //-------------------------------
}

export default Moon;