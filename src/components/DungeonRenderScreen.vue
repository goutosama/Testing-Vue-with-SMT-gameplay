<script setup lang="js">
import { onMounted } from 'vue'
import Player from '../components/newDungeonRenderer.js'
//import atlasImage from '../assets/crawler/atlas.png'
import jsonData from '../assets/crawler/atlas.json'

onMounted(() => {
  let atlasImg = document.createElement('img')
  atlasImg.src = '/src/assets/crawler/atlas.png'

  let canvas = document.getElementById('mainCanvas')
  canvas.width = 224
  canvas.height = 104

  atlasImg.onload = () => {
    const atlasCanvas = document.createElement('canvas')
    console.log(atlasCanvas.width, atlasCanvas.height)
    atlasCanvas.width = atlasImg.width
    atlasCanvas.height = atlasImg.height
    let atlasCtx = atlasCanvas.getContext('2d')
    atlasCtx.drawImage(atlasImg, 0, 0)
    const backgroundColor = {
      r: 0,
      g: 0,
      b: 0
    }
    const player = new Player('renderer', 224, 104, atlasCanvas, jsonData, 5, 4, backgroundColor)
  }
})

</script>

<template>
  <div id="renderer" class="bg-uiaccent">
    <canvas id="mainCanvas"></canvas>
    <div id="coords" class="hidden"></div>
  </div>
</template>

<style lang="css">
#mainCanvas {
  image-rendering: optimizeSpeed;
  /* Older versions of FF */
  image-rendering: -moz-crisp-edges;
  /* FF 6.0+ */
  image-rendering: -webkit-optimize-contrast;
  /* Safari */
  image-rendering: -o-crisp-edges;
  /* OS X & Windows Opera (12.02+) */
  image-rendering: pixelated;
  /* Awesome future-browsers */
  -ms-interpolation-mode: nearest-neighbor;
  /* IE */
}
</style>
