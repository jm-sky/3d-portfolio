<template>
  <BgCanvas :editMode="!showContent" />
  <a @click="switchContent" class="btn btn-dark border content-switch">
    <i class="fa" :class="showContent ? 'fa-rocket' : 'fa-envelope-open-text'"></i>
  </a>
  <HelloWorld v-if="showContent" />
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue';
import BgCanvas from './components/BgCanvas.vue';
import { ref } from 'vue';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';

const showContent = ref(false);
const switchContent = () => {
  showContent.value = !showContent.value;
}
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
