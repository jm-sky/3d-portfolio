<template>
  <div id="canvas-wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import App from '../library/App.js';
import Torus from '../library/Torus.js';
import Star from '../library/Star.js';
import Moon from '../library/Moon.js';

export default {
  //===============================================
  name: 'BgCanvas',
  //===============================================
  data() {
    return {
      app: null,
      torus: null,
      stars: null,
      moon: null,
    }
  },
  //===============================================
  methods: {
    //=================
    
    //=================
  },
  //===============================================
  mounted() {
    const app = new App({ helpers: false });
    const torus = new Torus({ wireframe: false });
    const stars = Array(100).fill().map(_ => new Star({ spread: 400 }));
    const moon = new Moon();

    this.app = app;
    this.torus = torus;
    this.stars = stars;
    this.moon = moon;

    this.app.add(this.torus);
    this.app.add(this.moon);
    this.app.add(...this.stars);

    this.app._guiParams.moonFolder.add(this.moon, 'rotationSpeed', 0, 0.5, 0.001);
    this.app._guiParams.torusFolder.add(this.torus, 'rotationSpeed', 0, 0.5, 0.001);
    

    const moveCamera = function() {
      const t = document.body.getBoundingClientRect().top;
      // moon.mesh.rotation.x += 0.05;
      // moon.mesh.rotation.y += 0.075;
      // moon.mesh.rotation.z += 0.05;

      app.camera.position.x = 0 + t * -0.1;
      app.camera.position.z = 30 + t * -0.0002;
      app.camera.position.y = 0 + t * -0.0002;
    }

    // document.addEventListener('scroll', moveCamera);
    app.animate();
  }
  //===============================================
}
</script>