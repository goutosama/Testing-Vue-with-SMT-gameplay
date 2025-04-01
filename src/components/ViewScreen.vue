<script setup>
import { onMounted } from 'vue'
import DungeonRenderer from '../components/dungeonrenderer.js'
import atlasImage from '../assets/crawler/atlas.png'
import jsonData from '../assets/crawler/atlas.json'

var mapData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

onMounted(() => {
  const crawler = new DungeonRenderer('renderer', atlasImage, jsonData, mapData, 224, 104)

  var lastKeyDown = null

  document.body.onkeydown = function (event) {
    if (lastKeyDown != event.which) {
      switch (event.which) {
        case 37:
        case 103:
        case 81:
          {
            crawler.turnLeft()
            lastKeyDown = event.which
            event.preventDefault()
          }
          break
        case 39:
        case 105:
        case 69:
          {
            crawler.turnRight()
            lastKeyDown = event.which
            event.preventDefault()
          }
          break
        case 38:
        case 104:
        case 87:
          {
            crawler.moveForward()
            lastKeyDown = event.which
            event.preventDefault()
          }
          break
        case 40:
        case 101:
        case 83:
          {
            crawler.moveBackward()
            lastKeyDown = event.which
            event.preventDefault()
          }
          break
      }
    }
  }

  document.body.onkeyup = function (event) {
    if (lastKeyDown == event.which) {
      lastKeyDown = null
    }
  }
})
</script>

<template>
  <div id="renderer">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<style lang="css">
#renderCanvas {
  image-rendering: optimizeSpeed; /* Older versions of FF */
  image-rendering: -moz-crisp-edges; /* FF 6.0+ */
  image-rendering: -webkit-optimize-contrast; /* Safari */
  image-rendering: -o-crisp-edges; /* OS X & Windows Opera (12.02+) */
  image-rendering: pixelated; /* Awesome future-browsers */
  -ms-interpolation-mode: nearest-neighbor; /* IE */
}
</style>
