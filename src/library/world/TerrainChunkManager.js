// import * as THREE from 'three';
import * as THREE from '../src/three';
import TerrainChunk from './TerrainChunk';
import Heightmap from './Heightmap';
import HeightGenerator from './HeightGenerator';
import {noise} from '../src/noise';


class TerrainChunkManager {
  //-------------------------------
  constructor(params = {}) {
    this._params = params;
    this._chunkSize = params.chunkSize || 500;
    this.init(params);
  }
  //-------------------------------
  init(params) {
    this._initNoise(params);
    this._initBiomes(params);
    this._initTerrain(params);
  }
  //-------------------------------
  _initNoise(params) {
    params.guiParams.noise = {
      octaves: 6,
      persistence: 0.707,
      lacunarity: 1.8,
      exponentiation: 4.5,
      height: 300.0,
      scale: 800.0,
      noiseType: 'simplex',
      seed: 277945293654
    };

    const noiseRollup = params.gui.addFolder('Terrain.Noise');
    noiseRollup.add(params.guiParams.noise, "noiseType", ['simplex', 'perlin', 'rand']).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.noise, "scale", 32.0, 4096.0).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.noise, "octaves", 1, 20, 1).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.noise, "persistence", 0.25, 1.0).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.noise, "lacunarity", 0.01, 4.0).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.noise, "exponentiation", 0.1, 10.0).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.noise, "height", 0, 512).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.noise, "seed", 0, 99999999, 1).onChange(this.onNoiseChanged.bind(this));

    this._noise = new noise.Noise(params.guiParams.noise);

    params.guiParams.heightmap = {
      height: 16,
    }
  }
  //-------------------------------
  _initBiomes(params) {
    params.guiParams.biomes = {
      octaves: 2,
      persistence: 0.5,
      lacunarity: 2.0,
      exponentiation: 3.9,
      scale: 2048.0,
      noiseType: 'simplex',
      seed: 2,
      exponentiation: 1,
      height: 1
    };

    const noiseRollup = params.gui.addFolder('Terrain.Biomes');
    noiseRollup.add(params.guiParams.biomes, "scale", 64.0, 4096.0).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.biomes, "octaves", 1, 20, 1).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.biomes, "persistence", 0.01, 1.0).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.biomes, "lacunarity", 0.01, 4.0).onChange(this.onNoiseChanged.bind(this));
    noiseRollup.add(params.guiParams.biomes, "exponentiation", 0.1, 10.0).onChange(this.onNoiseChanged.bind(this));

    this._biomes = new noise.Noise(params.guiParams.biomes);
  }
  //-------------------------------
  _initTerrain(params) {
    params.guiParams.terrain = {
      wireframe: false,
    };

    this._chunks = {};
    this._group = new THREE.Group();
    this._group.rotation.x = -Math.PI / 2;
    params.scene.add(this._group);

    const w = 0;
    for (let x = -w; x <= w; x++) {
      for (let z = -w; z <= w; z++) {
        this._addChunk(x, z);
      }
    }

    const terrainRollup = params.gui.addFolder('Terrain');
    terrainRollup.add(params.guiParams.terrain, 'wireframe').onChange(() => {
      for (let k in this._chunks) {
        this._chunks[k].chunk._plane.material.wireframe = params.guiParams.terrain.wireframe;
      }
    });
  }
  //-------------------------------
  onNoiseChanged() {
    for (let k in this._chunks) {
      this._chunks[k].chunk.rebuild();
    }
  }
  //-------------------------------
  _key(x, z) {
    return `${x}.${z}`;
  }
  //-------------------------------
  _addChunk(x, z) {
    // console.log('[TerrainChunkManger][_addChunk]', x, z);
    const offset = new THREE.Vector2(x * this._chunkSize, z * this._chunkSize);
    const chunk = new TerrainChunk({
      group: this._group,
      offset: new THREE.Vector3(offset.x, offset.y, 0),
      scale: 1,
      width: this._chunkSize,
      biomeGenerator: this._biomes,
      heightGenerators: [new HeightGenerator(this._noise, offset, 100000, 100000 + 1)]
    });

    const k = this._key(x, z);
    const edges = [];
    for (let xi = -1; xi <= 1; xi++) {
      for (let zi = -1; zi <= 1; zi++) {
        if (xi == 0 || zi == 0) {
          continue;
        }
        edges.push(this._key(x + xi, z + zi));
      }
    }

    this._chunks[k] = {
      chunk: chunk,
      edges: edges
    }
  }
  //-------------------------------
  SetHeightmap(img) {
    const heightmap = new HeightGenerator(
      new Heightmap(this._params.guiParams.heightmap, img),
      new THREE.Vector2(0, 0), 250, 300
    );

    for (let k in this._chunks) {
      this._chunks[k].chunk._params.heightGenerators.unshift(heightmap);
      this._chunks[k].chunk.rebuild();
    }
  }

  //-------------------------------
  update(timeInMs) {
  }
  //-------------------------------
}

export default TerrainChunkManager;