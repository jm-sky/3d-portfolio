<template>
  <div class="page p-2">
    <MazeGen />
  </div>
</template>

<script>
import MazeGen from '../components/MazeGen.vue';

export default {
  //===============================================
  name: 'Maze',
  //===============================================
  components: {
    MazeGen
  },
  //===============================================
}
</script>