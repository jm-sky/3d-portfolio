import * as THREE from 'three';
// import * as THREE from 'three';
import graphics from '../src/graphics';

class Heightmap {
  //-------------------------------
  constructor(params, img) {
    this._params = params;
    this._data = graphics._GetImageData(img);
  }
  //-------------------------------
  Get(x, y) {
    const _GetPixelAsFloat = (x, y) => {
      const position = (x + this._data.width * y) * 4;
      const data = this._data.data;
      return data[position] / 255.0;
    }

    // Bilinear filter
    const offset = new THREE.Vector2(-250, -250);
    const dimensions = new THREE.Vector2(500, 500);

    const xf = 1.0 - math.sat((x - offset.x) / dimensions.x);
    const yf = math.sat((y - offset.y) / dimensions.y);
    const w = this._data.width - 1;
    const h = this._data.height - 1;

    const x1 = Math.floor(xf * w);
    const y1 = Math.floor(yf * h);
    const x2 = math.clamp(x1 + 1, 0, w);
    const y2 = math.clamp(y1 + 1, 0, h);

    const xp = xf * w - x1;
    const yp = yf * h - y1;

    const p11 = _GetPixelAsFloat(x1, y1);
    const p21 = _GetPixelAsFloat(x2, y1);
    const p12 = _GetPixelAsFloat(x1, y2);
    const p22 = _GetPixelAsFloat(x2, y2);

    const px1 = math.lerp(xp, p11, p21);
    const px2 = math.lerp(xp, p12, p22);

    return math.lerp(yp, px1, px2) * this._params.height;
  }
  //-------------------------------
}

export default Heightmap;
