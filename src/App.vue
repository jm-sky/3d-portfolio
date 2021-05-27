<template>
  <div id="app">
    <router-view></router-view>
    <div class="bottom-menu">
      <router-link v-for="(link, index) in links" 
          class="btn btn-sm btn-dark mx-1 shadow" 
          :to="link.to"
          :key="index">
        <i class="fa fa-fw" :class="`fa-${link.icon}`"></i>
        {{ link.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
import './sass/index.scss';

export default {
  //===============================================
  name: 'App',
  //===============================================
  data() {
    return {
      links: [
        { text: 'Home', to: '/', icon: 'home' },
        { text: 'Portfolio', to: '/portfolio', icon: 'user' },
        { text: 'Maze', to: '/maze', icon: 'th' },
        { text: 'World', to: '/world', icon: 'globe' },
      ]
    }
  },
  //===============================================
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  background: radial-gradient(circle at top, #777, #111);
}

.bottom-menu {
  position: fixed;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: #aaa5;
  border: 1px solid #ccca;
  padding: 0.25rem 0.0rem;
  border-radius: 0.25rem;

  .router-link-active {
    box-shadow: rgba(255, 255, 255, 0.4) 0 0 0.5rem !important;
    font-weight: bold;
    color: #0af;
  }
}
</style>
