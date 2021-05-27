<template>
  <BgCanvas :editMode="!showContent" />
  <a @click="switchContent" class="btn btn-dark border content-switch">
    <i class="fa" :class="switchIcon"></i>
  </a>
  <AboutMyself v-if="showContent" />
</template>

<script>
import AboutMyself from '../components/AboutMyself.vue';
import BgCanvas from '../components/BgCanvas.vue';

export default {
  //===============================================
  name: 'Portfolio',
  //===============================================
  components: {
    AboutMyself, BgCanvas
  },
  //===============================================
  data() {
    return {
      showContent: true
    }
  },
  //===============================================
  computed: {
    //=================
    switchIcon() {
      return this.showContent ? 'fa-rocket' : 'fa-envelope-open-text';
    }
    //=================
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