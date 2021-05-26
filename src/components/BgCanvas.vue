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
  props: {
    editMode: Boolean
  },
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
  watch: {
    //=================
    editMode() {
      this.app._gui.domElement.hidden = !this.editMode;
      this.app._stats.domElement.hidden = !this.editMode;
    }
    //=================
  },
  //===============================================
  methods: {
    //=================
    moveCamera() {
      const t = document.body.getBoundingClientRect().top;
      this.app.scene.rotation.y = t * 0.001;
    },
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
    
    document.addEventListener('scroll', this.moveCamera);
    app.animate();

    window.$canvasApp = app;
  }
  //===============================================
}
</script>