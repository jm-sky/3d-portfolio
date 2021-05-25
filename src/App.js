import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//-------------------------------------------------------------------------
class App {
  //-------------------------------
  constructor(options = {}) {
    this.options = options;
    this.entities = [];
    this.helpers = {};
    this.lights = {};
    this.init();
  }

  //-------------------------------
  init() {
    this.createScene();
    this.createLights();
    this.createCamera();
    this.createRenderer();
    if (this.options.helpers) this.addHelpers();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  //-------------------------------
  createScene() {
    this.bg = new THREE.TextureLoader().load('./space.jpg');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000011);;
    this.scene.background = this.bg;
    this.helpers.gridHelper = new THREE.GridHelper(200, 50);
  }
  //-------------------------------
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: document.querySelector('#bg')
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  //-------------------------------
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.setZ(10);
  }
  //-------------------------------
  createLights() {
    this.lights.pointLight = new THREE.PointLight(0xffffff, 0.8);
    this.lights.pointLight.position.set(9,9,9);
    this.lights.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(...Object.values(this.lights));

    this.helpers.lightHelper = new THREE.PointLightHelper(this.lights.pointLight);
  }
  //-------------------------------
  addHelpers() {
    this.scene.add(...Object.values(this.helpers));
  }
  //-------------------------------
  add(...entities) {
    entities.forEach(entity => {
      this.entities.push(entity);
      if (entity.mesh) this.scene.add(entity.mesh);
    })
  }
  //-------------------------------
  animate() {
    requestAnimationFrame(() => this.animate());
    this.entities.filter(entity => entity.update).forEach(entity => {
      entity.update();
    })
    this.renderer.render(this.scene, this.camera);
  }
  //-------------------------------
}

export default App;