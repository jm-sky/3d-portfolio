import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';


//-------------------------------------------------------------------------
/**
 * App
 * @param {string} options.targetSelector
 * @param {boolean} options.show_stats
 */
class App {
  //-------------------------------
  constructor(options = {}) {
    this.options = options;
    this._targetSelector = options.targetSelector || '#bg';
    this._show_stats = options.show_stats || true;
    this.entities = [];
    this.helpers = {};
    this.lights = {};
    this.init();
  }
  //-------------------------------
  init() {
    this.$target = document.querySelector(this._targetSelector);
    this.createScene();
    this.createLights();
    this.createPlane();
    this.createCamera();
    this.createRenderer();
    this.addHelpers();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    if (this._show_stats) {
      this._stats = new Stats();
      this.$target.appendChild(this._stats.dom);
    }

    window.addEventListener('resize', () => this._OnWindowResize(), false);
  }
  //-------------------------------
  createGUI() {
    this._guiParams = { general: {} };
    this._gui = new GUI();
    const generalRollup = this._gui.addFolder('General');
    const cameraFolder = this._gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'z', 0, 10, 0.01);
    cameraFolder.open();
  }
  //-------------------------------
  createScene() {
    this.bg = new THREE.TextureLoader().load('./assets/space.jpg');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000011);;
    this.scene.background = this.bg;
    this.helpers.gridHelper = new THREE.GridHelper(200, 50);
  }
  //-------------------------------
  createPlane() {
    const geometry = new THREE.PlaneBufferGeometry(100, 100, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
    this.plane = new THREE.Mesh(geometry, material);
    this.plane.rotation.x = -Math.PI / 2;
    this.scene.add(this.plane);
  }
  //-------------------------------
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.$target,
      antialias: true
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  //-------------------------------
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.setY(20);
    this.camera.position.setZ(50);
  }
  //-------------------------------
  createLights() {
    this.lights.pointLight = new THREE.PointLight(0xffffff, 0.8);
    this.lights.pointLight.position.set(9, 9, 11);
    this.lights.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.scene.add(...Object.values(this.lights));

    this.helpers.lightHelper = new THREE.PointLightHelper(this.lights.pointLight);
  }
  //-------------------------------
  _OnWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  //-------------------------------
  addHelpers() {
    if (this.options.helpers == false) return
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

    if (this._stats) {
      this._stats.update();
    }
  }
  //-------------------------------
}

export default App;