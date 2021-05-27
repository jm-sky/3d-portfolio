import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Plane from './Plane.js';

const SHADOWS = false;
const DEBUG = false;

//-------------------------------------------------------------------------
/**
 * App
 * @param {string} options.targetSelector
 * @param {boolean} options.show_stats
 */
class App {
  //-------------------------------
  constructor(options = {}) {
    this.app = this;
    this.options = options;
    this._containerSelector = options.containerSelector || '#canvas-wrapper';
    this._targetSelector = options.targetSelector || '#canvas';
    this._show_stats = options.show_stats || true;
    this.entities = [];
    this.helpers = {};
    this.lights = {};

    this._previousRAF = null;
    this._minFrameTime = 1.0 / 10.0;

    this.init();
  }
  //-------------------------------
  init() {
    this.$container = document.querySelector(this._containerSelector);
    this.$canvas = document.querySelector(this._targetSelector);
    this.createScene();
    this.createLights();
    this.createPlane();
    this.createCamera();
    this.createRenderer();
    this.createGUI();
    if (this.options.helpers) this.addHelpers();
    if (this.options.fog) this.addFog()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    if (this._show_stats) {
      this._stats = new Stats();
      this.$container.appendChild(this._stats.dom);
    }

    window.addEventListener('resize', () => this._OnWindowResize(), false);
  }
  //-------------------------------
  createGUI() {
    this._guiParams = {};
    this._gui = new GUI();
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
    if (!this.options.createPlane) return;
    const plane = new Plane(this.options);
    this.add(plane);
  }
  //-------------------------------
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.$canvas,
      antialias: true
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (SHADOWS) this.renderer.shadowMap.enabled = true;
    if (SHADOWS) this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }
  //-------------------------------
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera.position.setY(20);
    // this.camera.position.setZ(50);
    let cameraPosition = this.options.cameraPosition || [0, 20, 20];
    this.camera.position.set(...cameraPosition);
    // cameraPosition
  }
  //-------------------------------
  createLights() {
    let pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.name = 'pointLight';
    pointLight.position.set(9, 9, 11);
    pointLight.userData.showHelper = true;
    if (SHADOWS) pointLight.castShadow = true;
    if (SHADOWS) pointLight.shadow.mapSize.width = 512; // default
    if (SHADOWS) pointLight.shadow.mapSize.height = 512; // default
    if (SHADOWS) pointLight.shadow.camera.near = 0.5; // default
    if (SHADOWS) pointLight.shadow.camera.far = 500; // default
    this.helpers.lightHelper = new THREE.PointLightHelper(pointLight);

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    ambientLight.name = 'ambientLight';

    this.addLights(pointLight, ambientLight);
  }
  //-------------------------------
  _OnWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  //-------------------------------
  addLights(...lights) {
    lights.forEach(light => {
      let name = light.name || `${light.constructor.name}__${(new Date()).getTime()}`
      this.lights[name] = light;
      this.scene.add(light);
    });
  }
  //-------------------------------
  addHelpers() {
    this.scene.add(...Object.values(this.helpers));
  }
  //-------------------------------
  addFog() {
    this.scene.fog = new THREE.Fog(0xcce0ff, 50, 1000);
  }
  //-------------------------------
  add(...entities) {
    entities.forEach(entity => {
      let name = entity.name || entity.constructor.name || 'unknown';
      this.entities[name] = this.entities[name] || [];
      this.entities[name].push(entity);
      if (entity.mesh) this.scene.add(entity.mesh);
      if (DEBUG) console.log('[App][add]', name, entity);
    })
  }
  //-------------------------------
  saveCameraStartPosition() {
    this.camera.userData.start = this.camera.userData.start || {};
    this.camera.userData.start.x = this.camera.userData.start.x || this.camera.position.x;
    this.camera.userData.start.z = this.camera.userData.start.z || this.camera.position.z;
    this.camera.userData.start.y = this.camera.userData.start.y || this.camera.position.y;
  }
  //-------------------------------
  _RAF() {
    requestAnimationFrame(t => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }
      this.render(t - this._previousRAF);
      this._previousRAF = t;
    })
  }
  //-------------------------------
  render(timeInMs = 0) {
    // const timeInSeconds = Math.min(timeInMS * 0.001, this._minFrameTime);
    const entities = Object.values(this.entities).flat();
    entities.filter(entity => entity.update).forEach(entity => {
      entity.update(timeInMs);
    });

    this.renderer.render(this.scene, this.camera);

    if (this._stats) this._stats.update();

    this._RAF();
  }
  //-------------------------------
}

export default App;