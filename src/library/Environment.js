import * as THREE from 'three';
import {Sky} from 'three/examples/jsm/objects/Sky.js';
import {Water} from 'three/examples/jsm/objects/Water.js';

//-------------------------------------------------------------------------
class Environment {
  //-------------------------------
  constructor(app) {
    this._params = app;
    this.size = (app.options.water || {}).size || 5000;
    this.segments = (app.options.water || {}).segments || 100;
    this.init(app);
  }
  //-------------------------------
  init(app) {
    this._group = new THREE.Group();
    this.mesh = this._group;
    this.createWater();
    this.createSky();

    app.add(this);
  }
  //-------------------------------
  createSky() {
    const params = this._params;

    params._guiParams.sky = {
      turbidity: 10.0,
      rayleigh: 2,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      luminance: 1,
    };

    params._guiParams.sun = {
      inclination: 0.31,
      azimuth: 0.25,
    };

    const onShaderChange = () => {
      for (let k in params._guiParams.sky) {
        this._sky.material.uniforms[k].value = params._guiParams.sky[k];
      }
      for (let k in params._guiParams.general) {
        this._sky.material.uniforms[k].value = params._guiParams.general[k];
      }
    };

    const onSunChange = () => {
      var theta = Math.PI * (params._guiParams.sun.inclination - 0.5);
      var phi = 2 * Math.PI * (params._guiParams.sun.azimuth - 0.5);

      const sunPosition = new THREE.Vector3();
      sunPosition.x = Math.cos(phi);
      sunPosition.y = Math.sin(phi) * Math.sin(theta);
      sunPosition.z = Math.sin(phi) * Math.cos(theta);

      if (this._sky) this._sky.material.uniforms['sunPosition'].value.copy(sunPosition);
      if (this._water) this._water.material.uniforms['sunDirection'].value.copy(sunPosition.normalize());
    };

    const skyRollup = this._params._gui.addFolder('Sky');
    skyRollup.add(params._guiParams.sky, "turbidity", 0.1, 30.0).onChange(onShaderChange);
    skyRollup.add(params._guiParams.sky, "rayleigh", 0.1, 4.0).onChange(onShaderChange);
    skyRollup.add(params._guiParams.sky, "mieCoefficient", 0.0001, 0.1).onChange(onShaderChange);
    skyRollup.add(params._guiParams.sky, "mieDirectionalG", 0.0, 1.0).onChange(onShaderChange);
    skyRollup.add(params._guiParams.sky, "luminance", 0.0, 2.0).onChange(onShaderChange);

    const sunRollup = this._params._gui.addFolder('Sun');
    sunRollup.add(params._guiParams.sun, "inclination", 0.0, 1.0).onChange(onSunChange);
    sunRollup.add(params._guiParams.sun, "azimuth", 0.0, 1.0).onChange(onSunChange);

    this._sky = new Sky();
    this._sky.scale.setScalar(this.size);
    this._group.add(this._sky);

    onShaderChange();
    onSunChange();
  }
  //-------------------------------
  createWater() {
    const waterGeometry = new THREE.PlaneBufferGeometry(this.size, this.size, this.segments, this.segments);
    this._water = new Water(
      waterGeometry,
      {
        textureWidth: 2048,
        textureHeight: 2048,
        waterNormals: new THREE.TextureLoader().load('./resources/waternormals.jpg', (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        alpha: 0.5,
        sunDirection: new THREE.Vector3(1, 0, 0),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 0.0,
        fog: undefined
      }
    );
    this._water.rotation.x = - Math.PI / 2;
    this._water.position.y = 4;
    this._group.add(this._water);
  }
  //-------------------------------
  update(timeInMs) {
    let timeInSeconds = timeInMs * 0.001;

    if (this._water) this._water.material.uniforms['time'].value += timeInSeconds;

    this._group.position.x = this._params.camera.position.x;
    this._group.position.z = this._params.camera.position.z;
  }
  //-------------------------------
}


export default Environment;