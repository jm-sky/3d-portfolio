<template>
  <div id="canvas-wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import App from '../library/App.js';
import World from '../library/World.js';

export default {
  //===============================================
  name: 'World',
  //===============================================
  data() {
    return {
      app: null
    }
  },
  //===============================================
  mounted() {
    const app = new App({ helpers: true });
    const world = new World();

    this.app = app;

    world.attach(app);
    app.render();
  },
  //===============================================
  beforeUnmount() {
    if (this.app._gui) this.app._gui.domElement.remove();
    if (this.app._stats) this.app._stats.domElement.remove();
  }
  //===============================================
}
</script>