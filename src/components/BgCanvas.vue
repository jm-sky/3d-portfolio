<template>
  <canvas id="bg"></canvas>
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
    const stars = Array(600).fill().map(_ => new Star({ spread: 400 }));
    const moon = new Moon();

    app.add(torus);
    app.add(moon);
    app.add(...stars);

    const moveCamera = function() {
      const t = document.body.getBoundingClientRect().top;
      moon.mesh.rotation.x += 0.05;
      moon.mesh.rotation.y += 0.075;
      moon.mesh.rotation.z += 0.05;

      app.camera.position.x = 0 + t * -0.1;
      app.camera.position.z = 30 + t * -0.0002;
      app.camera.position.y = 0 + t * -0.0002;
    }

    document.addEventListener('scroll', moveCamera);
    app.animate();
  }
  //===============================================
}
</script>