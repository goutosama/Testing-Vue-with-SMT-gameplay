<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    direction: String,
    floor: String,
    mag: Number
  },
  mounted() {
    this.direction // type: string
    this.floor // type: string
    this.mag // type: number
  }
})
</script>

<template>
  <div
    class="absolute right-0 top-2 font-megaten text-fontcolor text-base border-4 pt-6 p-5 h-108 aspect-half bg-uicolor border-uiaccent border-l-uiaccent border-t-uiaccent border-b-black border-r-black"
  >
    <div class="grid grid-cols-3">
      <div class="text-xs self-center">DIR:</div>
      <div>S{{ $props.direction }}</div>
      <div class="text-right">2F{{ $props.floor }}</div>
      <div>MAG</div>

      <div class="text-right col-span-2">0{{ $props.mag }}</div>
    </div>
  </div>
</template>
