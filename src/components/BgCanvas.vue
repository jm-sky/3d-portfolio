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
      if (this.app._gui) this.app._gui.domElement.hidden = !this.editMode;
      if (this.app._stats) this.app._stats.domElement.hidden = !this.editMode;
    }
    //=================
  },
  //===============================================
  methods: {
    //=================
    moveCamera() {
      const top = document.body.getBoundingClientRect().top,
            height = document.querySelector('main').offsetHeight,
            progress = -top / height;

      this.app.scene.rotation.y = -top * 0.001;
      this.app.camera.position.x = this.app.camera.userData.start.x + Math.round(progress * 100);
      this.app.camera.position.y = this.app.camera.userData.start.y + Math.round(progress * 100);
      this.app.camera.position.z = this.app.camera.userData.start.z + Math.round(progress * 100);
    },
    //=================
  },
  //===============================================
  mounted() {
    const app = new App({ helpers: false, createPlane: true });
    this.app = app;
    this.app.camera.position.set(10, 30, 10);;

    this.app.saveCameraStartPosition();
    this.app.add(new Torus({ app, wireframe: false }));
    this.app.add(new Moon({ app }));
    this.app.add(...Array(200).fill().map(_ => new Star({ spread: 300 })));
    
    document.addEventListener('scroll', this.moveCamera);
    app.render();

    window.$canvasApp = app;
  },
  //===============================================
  beforeUnmount() {
    document.removeEventListener('scroll', this.moveCamera);
    if (this.app._gui) this.app._gui.domElement.remove();
    if (this.app._stats) this.app._stats.domElement.remove();
  }
  //===============================================
}
</script>