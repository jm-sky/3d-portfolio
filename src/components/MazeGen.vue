<template>
  <div class="maze-gen">
    <div class="p-1 mb-1 big border rounded shadow text-white bg-dark"><strong>Maze Generator</strong></div>
    <div class="p-1 mb-1 border rounded shadow">
      <button @click="traverse" class="btn btn-sm btn-primary border rounded shadow"><i class="fa fa-rocket"></i> GO</button>
    </div>
    <div class="p-2 border rounded shadow">
      <div v-for="(row, r) in matrix" :key="`row-${r}`" :title="`Row: ${r}`">
        <MazeCell v-for="(cell, c) in row" :key="`cell-${c}`" 
          :visited="cell.visited"
          :dead="cell.dead"
          :size="size"
          :x="cell.x" 
          :y="cell.y" 
          :step="cell.step" />
      </div>
    </div>
  </div>
</template>

<script>
import MazeCell from './MazeCell.vue';

export default {
  //===============================================
  name: 'MazeGen',
  //===============================================
  components: {
    MazeCell
  },
  //===============================================
  data() {
    return {
      size: 100,
      cols: 10,
      rows: 6,
      matrix: [],
      step: 1,
      current: null
    }
  },
  //===============================================
  computed: {
    //=====================
    nodes() {
      return this.matrix.flat(2);
    },
    //=====================
  },
  //===============================================
  methods: {
    //=====================
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    //=====================
    genMatrix() {
      let matrix = [];

      for (let h = 0; h < this.rows; h++) {
        let row = [];
        for (let w = 0; w < this.cols; w++) {
          let cell = {
            x: w,
            y: h,
            neighbors: [],
            visited: false,
            dead: false
          }
          row.push(cell);
        }
        matrix.push(row);
      }

      matrix.forEach((row, x) => {
        row.forEach((cell, y) => {
          if (row[y-1]) cell.neighbors.push(row[y-1]);
          if (row[y+1]) cell.neighbors.push(row[y+1]);
          if (matrix[x-1] && matrix[x-1][y]) cell.neighbors.push(matrix[x-1][y]);
          if (matrix[x+1] && matrix[x+1][y]) cell.neighbors.push(matrix[x+1][y]);
          console.log('[cell] x:', x, '| y:', y, '| cell:', cell);
        })
      });

      this.matrix = matrix;
      // console.log('[matrix]', this.matrix);
    },
    //=====================
    traverse() {
      console.log('[maze-gen][traverse]', this.current);
      let node = this.current,
          notVisited = node.neighbors.filter(n => n.visited == false),
          len = notVisited.length,
          rand = this.getRandomInt(0, len),
          nextNode = notVisited[rand];

      console.log('[maze-gen][traverse] notVisited:', notVisited, '| len:', len, '| rand:', rand, '| nextNode:', nextNode);

      node.visited = true;
      node.step = this.step;

      if (this.step >= this.rows * this.cols) {
        return
      }

      if (nextNode) {
        this.step++;
        this.current = nextNode;
        node.next = nextNode;
        nextNode.prev = node;

      } else if (node.prev) {
        node.dead = true;
        this.current = node.prev;
      }
    }
    //=====================
  },
  //===============================================
  created() {
    this.genMatrix();
    this.current = this.nodes[0];
  }
  //===============================================
}
</script>

<style scoped>
.cell.visited {
  background: rgba(0, 200, 120, 0.4);
}
.cell.dead {
  background: rgba(200, 100, 0, 0.4);
}
</style>