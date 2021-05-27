import * as THREE from 'three';

import {controls} from './world/controls.js';
import TerrainChunkManager from './world/TerrainChunkManager';
import Environment from './Environment';

const loader = new THREE.TextureLoader();

//-------------------------------------------------------------------------
class World {
  //-------------------------------
  _key(x, y, z) {
    return `${x}.${y}.${z}`;
  }
  //-------------------------------
  _cellIndex(xp, yp) {
    // const x = Math.floor(xp / this._cellDimensions.x);
    // const z = Math.floor(yp / this._cellDimensions.z);
    const x = Math.floor(xp / this.size);
    const z = Math.floor(yp / this.size);
    return [x, z];
  }
  //-------------------------------
  constructor() {
    // this.materials = [
    //   new THREE.MeshStandardMaterial({ map: loader.load('./resources/minecraft/textures/blocks/grass_combined.png') }),
    //   new THREE.MeshStandardMaterial({ map: loader.load('./resources/minecraft/textures/blocks/grass_combined.png') }),
    //   new THREE.MeshStandardMaterial({ map: loader.load('./resources/minecraft/textures/blocks/leaves_spruce_opaque.png') }),
    //   new THREE.MeshStandardMaterial({ map: loader.load('./resources/minecraft/textures/blocks/grass_combined.png') }),
    //   new THREE.MeshStandardMaterial({ map: loader.load('./resources/minecraft/textures/blocks/grass_combined.png') }),
    //   new THREE.MeshStandardMaterial({ map: loader.load('./resources/minecraft/textures/blocks/grass_combined.png') }),
    // ];
    // this.width = 10
    // this.height = 10;
    // this.size = 1;
    // this.thickness = 1;
    // this.span = 0;
    this.mesh = new THREE.Group();
    // this._cells = {};

    // for (let x = 0; x < this.width; x++) {
    //   for (let z = 0; z < this.height; z++) {
    //     const geometry = new THREE.BoxGeometry(this.size, this.thickness, this.size);
    //     // const material = new THREE.MeshStandardMaterial({ color: 0x777777 });
    //     const mesh = new THREE.Mesh(geometry, this.materials);
    //     mesh.position.x = x * this.size - 1 + (x * this.span);
    //     mesh.position.z = z * this.size - 1 + (z * this.span);
    //     mesh.position.y = 0;
    //     this.mesh.add(mesh);
    //     let k = this._key(x, 0, z);
    //     this._cells[k] = mesh;
    //   }
    // }
  }
  //-------------------------------
  _LoadBackground() {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/posx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posx.jpg',
        './resources/posx.jpg',
    ]);
    this.app.scene.background = texture;
  }
  //-------------------------------
  attach(app) {
    this.app = app;
    this.app.camera.position.setX(10);
    this.app.camera.position.setZ(10);
    this.app.camera.position.setY(220);
    this.app.add(this);
    // this.app.addFog();
    // this._LoadBackground();

    this.terrainManager = new TerrainChunkManager(app)
    this.environment = new Environment(app);

    let light = new THREE.DirectionalLight(0x808080, 1, 100);
    light.position.set(-100, 100, -100);
    light.target.position.set(0, 0, 0);
    light.castShadow = false;
    this.app.lights['directionalLight'] = light;
    this.app.scene.add(light);

    this.app.add(new controls.FPSControls(app));
  }
  //-------------------------------
}
//-------------------------------------------------------------------------

export default World;