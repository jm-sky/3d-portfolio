<template>
  <div class="cell d-inline-block border" 
      :class="{ visited: visited, dead: dead }"
      :style="`width: ${size}px; height: ${size}px;`">
    <div class="p-1">{{ x }} / {{ y }}</div>
    <div class="p-1"><b>{{ step || '-' }}</b></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 50
    },
    step: Number,
    x: Number,
    y: Number,
    visited: Boolean,
    dead: Boolean,
  }
}
</script>