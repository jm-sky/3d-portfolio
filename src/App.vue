<template>
  <MazeGen />
  <!-- <BgCanvas :editMode="!showContent" />
  <a @click="switchContent" class="btn btn-dark border content-switch">
    <i class="fa" :class="showContent ? 'fa-rocket' : 'fa-envelope-open-text'"></i>
  </a>
  <HelloWorld v-if="showContent" /> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import BgCanvas from './components/BgCanvas.vue';
import MazeGen from './components/MazeGen.vue';
import './sass/index.scss';

export default {
  //===============================================
  name: 'App',
  //===============================================
  components: {
    HelloWorld, BgCanvas, MazeGen
  },
  //===============================================
  data() {
    return {
      showContent: false
    }
  },
  //===============================================
  methods: {
    //=================
    switchContent() {
      this.showContent = !this.showContent;
    }
    //=================
  }
  //===============================================
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content-switch {
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
  z-index: 999;
}
</style>
