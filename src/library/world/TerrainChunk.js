import * as THREE from 'three';
// import * as THREE from 'three';
import spline from './spline';

const _WHITE = new THREE.Color(0x808080);
const _OCEAN = new THREE.Color(0xd9d592);
const _BEACH = new THREE.Color(0xd9d592);
const _SNOW = new THREE.Color(0xFFFFFF);
const _FOREST_TROPICAL = new THREE.Color(0x4f9f0f);
const _FOREST_TEMPERATE = new THREE.Color(0x2b960e);
const _FOREST_BOREAL = new THREE.Color(0x29c100);

class TerrainChunk {
  //-------------------------------
  constructor(params) {
    this.width = params.width || 10;
    this.scale = params.scale || 1;
    this.segments = params.segments || 128;
    this._params = params;
    this.init();
  }
  //-------------------------------
  init() {
    const size = new THREE.Vector3(this.width * this.scale, 0, this.width * this.scale);

    this._plane = new THREE.Mesh(
      new THREE.PlaneGeometry(size.x, size.z, this.segments, this.segments),
      new THREE.MeshStandardMaterial({
        wireframe: false,
        color: 0x77DDAA,
        side: THREE.FrontSide,
        vertexColors: THREE.VertexColors
      })
    );

    this._plane.castShadow = false;
    this._plane.receiveShadow = true;

    this._plane.position.add(this._params.offset);
    this._params.group.add(this._plane);

    //-----------------------------------------
    // colour
    const _colourLerp = (t, p0, p1) => {
      const c = p0.clone();
      return c.lerpHSL(p1, t);
    };

    this._colourSpline = [
      new spline.LinearSpline(_colourLerp),
      new spline.LinearSpline(_colourLerp)
    ];

    // Arid
    this._colourSpline[0].AddPoint(0.0, new THREE.Color(0xb7a67d));
    this._colourSpline[0].AddPoint(0.5, new THREE.Color(0xf1e1bc));
    this._colourSpline[0].AddPoint(1.0, _SNOW);

    // Humid
    this._colourSpline[1].AddPoint(0.0, _FOREST_BOREAL);
    this._colourSpline[1].AddPoint(0.5, new THREE.Color(0xcee59c));
    this._colourSpline[1].AddPoint(1.0, _SNOW);
    //-----------------------------------------

    this.rebuild();
  }
  //-------------------------------
  _chooseColour(x, y, z) {
    const m = this._params.biomeGenerator.Get(x, z);
    const h = y / 100.0;

    if (h < 0.05) {
      return _OCEAN;
    }

    const c1 = this._colourSpline[0].Get(h);
    const c2 = this._colourSpline[1].Get(h);

    return c1.lerpHSL(c2, m);
  }
  //-------------------------------
  rebuild() {
    // console.log('[TerrainChunk][rebuild]', this);
    const colours = [];
    const offset = this._params.offset;

    for (let v of this._plane.geometry.vertices) {
      const heightPairs = [];
      let normalization = 0;
      v.z = 0;

      for (let gen of this._params.heightGenerators) {
        heightPairs.push(gen.Get(v.x + offset.x, v.y + offset.y));
        normalization += heightPairs[heightPairs.length-1][1];
      }


      if (normalization > 0) {
        for (let h of heightPairs) {
          v.z += h[0] * h[1] / normalization;
        }
      }

      colours.push(this._chooseColour(v.x + offset.x, v.z, v.y + offset.y));
    }

    for (let f of this._plane.geometry.faces) {
      const vs = [f.a, f.b, f.c];
      const vertexColors = [];
      for (let v of vs) {
        vertexColors.push(colours[v]);
      }
      f.vertexColors = vertexColors;
    }

    this._plane.geometry.elementsNeedUpdate = true;
    this._plane.geometry.verticesNeedUpdate = true;
    this._plane.geometry.computeVertexNormals();
  }
  //-------------------------------
}


export default TerrainChunk;
