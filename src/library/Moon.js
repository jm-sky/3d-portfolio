import * as THREE from 'three';

class Moon {
  //-------------------------------
  constructor(options = {}, app = null) {
    this.app = options.app || app;
    this.options = options;
    this.orbitSize = options.orbitSize || 50;
    this.rotationSpeed = options.rotationSpeed || 0.01;
    this.init();
  }
  //-------------------------------
  init() {
    this.create_orbit();
    this.create_moon();

    const group = new THREE.Group();
    group.add(this.orbit);
    group.add(this.moon);

    this.mesh = group;
    this.mesh.position.y = 7;

    this.createGUI();
  }
  //-------------------------------
  create_orbit() {
    const orbit_material = new THREE.LineBasicMaterial({ });
    const orbit_geometry = new THREE.CircleGeometry(this.orbitSize, 64);
    this.orbit = new THREE.Line(orbit_geometry, orbit_material);
    this.orbit.position.set(0, 0, 0);
    this.orbit.rotation.x = Math.PI / 2;
    this.orbit.visible = false;
  }
  //-------------------------------
  create_moon() {
    this.bg = new THREE.TextureLoader().load('./assets/moon.jpg');
    this.normalMap = new THREE.TextureLoader().load('./assets/normal.jpg');

    this.geometry = new THREE.SphereGeometry(7, 24, 24);
    this.material = new THREE.MeshStandardMaterial({ 
      map: this.bg,
      normalMap: this.normalMap,
    });

    this.moon = new THREE.Mesh(this.geometry, this.material);
    this.moon.position.setX(this.orbitSize);
    this.moon.position.setY(0);
    this.moon.position.setZ(0);
    this.moon.castShadow = true;
    this.moon.receiveShadow = true;
  }
  //-------------------------------
  createGUI() {
    if (!this.app._gui) return;

    this.app._guiParams.torusFolder = this.app._gui.addFolder('Torus');
    this.app._guiParams.torusFolder.add(this, 'rotationSpeed', 0, 0.5, 0.001);
  }
  //-------------------------------
  update() {
    this.mesh.rotation.y += this.rotationSpeed;
    this.moon.rotation.y += 0.01;
    this.moon.rotation.x += 0.01;
  }
  //-------------------------------
}

export default Moon;