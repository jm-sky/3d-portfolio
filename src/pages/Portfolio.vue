<template>
  <BgCanvas :editMode="!showContent" />
  <a @click="switchContent" class="btn btn-dark border content-switch">
    <i class="fa" :class="showContent ? 'fa-rocket' : 'fa-envelope-open-text'"></i>
  </a>
  <HelloWorld v-if="showContent" />
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import BgCanvas from '../components/BgCanvas.vue';

export default {
  //===============================================
  name: 'Portfolio',
  //===============================================
  components: {
    HelloWorld, BgCanvas
  },
  //===============================================
  data() {
    return {
      showContent: true
    }
  },
  //===============================================
  methods: {
    //=================
    switchContent() {
      this.showContent = !this.showContent;
    }
    //=================
  },
  //===============================================
}
</script>

<style>
.content-switch {
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
  z-index: 999;
}
</style>