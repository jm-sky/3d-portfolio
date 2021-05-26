<template>
  <div id="app">
    <router-view></router-view>
    <div class="bottom-menu">
      <router-link class="btn btn-sm btn-dark mx-1 shadow" to="/">
        <i class="fa fa-fw fa-home"></i>
        Home
      </router-link>
      <router-link class="btn btn-sm btn-dark mx-1 shadow" to="/portfolio">
        <i class="fa fa-fw fa-user"></i>
        Portfolio
      </router-link>
      <router-link class="btn btn-sm btn-dark mx-1 shadow" to="/maze">
        <i class="fa fa-fw fa-th"></i>
        Maze
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
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;
  background: radial-gradient(circle at top, #777, #111);
}

.bottom-menu {
  position: fixed;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;

  .router-link-active {
    box-shadow: rgba(255, 255, 255, 0.4) 0 0 0.5rem !important;
  }
}
</style>
