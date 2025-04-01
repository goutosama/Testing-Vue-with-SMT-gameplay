<script setup lang="ts">
import StatusBox from './StatusBox.vue'
import DirMagBox from './DirMagBox.vue'
import DungeonRenderScreen from '@/components/DungeonRenderScreen.vue';
import MoonPhase from './MoonPhase.vue'
import GradientLine from './GradientLine.vue'

const hp: number = 12
</script>

<template>
  <div class="border-4 border-black-500 aspect-8/7 md:h-screen">
    <!-- On-top elements -->
    <div class="relative z-10">
      <MoonPhase />
      <DirMagBox />
    </div>

    <!-- Upper border -->
    <div class="flex gap-1 h-5 bg-black border-b-4">
      <div class="w-16/256 bg-uicolor border-uiaccent"></div>
      <div class="grow bg-uicolor border-uiaccent border-l-4"></div>
      <div class="w-16/256 bg-uicolor border-uiaccent border-l-4"></div>
    </div>
    <!-- Screen -->
    <div class="flex gap-0 h-46c">
      <div class="w-16/256 bg-uicolor border-uiaccent border-t-4"></div>
      <DungeonRenderScreen class="border-l-4 border-black-00 border-l-black-500 aspect-battleWindow flex flex-grow">
      </DungeonRenderScreen>
      <div class="w-16/256 bg-uicolor border-uiaccent border-l-4 border-t-4"></div>
    </div>
    <!-- Lower part -->
    <div class="grid grid-cols-8-fr-8 grid-rows-20c-70c-fr gap-1 bg-black border-t-4 justify-stretch h-51hc">
      <div class="col-start-1 col-end-2 row-start-1 row-end-4 bg-uicolor border-uiaccent border-t-4"></div>

      <div class="bg-uicolor border-uiaccent border-l-4 border-t-4 self-stretch">
        <GradientLine />
      </div>
      <div class="grid grid-cols-3 gap-1 justify-items-stretch items-stretch">
        <StatusBox :name="'Fagirtn'" :hp="12"></StatusBox>
        <StatusBox> </StatusBox>
        <StatusBox> </StatusBox>
        <StatusBox></StatusBox>
        <StatusBox></StatusBox>
        <StatusBox></StatusBox>
      </div>
      <div class="bg-uicolor border-uiaccent border-l-4 border-t-4"></div>
      <div class="col-start-3 col-end-4 row-start-1 row-end-4 bg-uicolor border-uiaccent border-l-4 border-t-4"></div>
    </div>
  </div>
</template>
