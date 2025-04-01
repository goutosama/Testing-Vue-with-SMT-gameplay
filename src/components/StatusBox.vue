<script setup lang="ts">
import StatusIcon from '../assets/icons/StatusIcon.png'

const props = defineProps<{
  name?: string
  hp?: number
  mag?: number
  status?: number
}>()
interface IStatusIcons {
  normal: string
}
const icons: IStatusIcons = {
  normal: StatusIcon
}
</script>

<template>
  <div
    class="font-megaten text-2xl text-fontcolor box-border h-79 w-39 aspect-half p-4 bg-uicolor border-uiaccent border-l-4 border-t-4 dottedcontainer"
  >
    <dots>
      <div class="lefttop dot"></div>
      <div class="leftbottom dot"></div>
      <div class="righttop dot"></div>
      <div class="rightbottom dot"></div>
    </dots>

    <div v-if="props.name !== undefined">
      <p>{{ props.name }}</p>
      <img :src="icons.normal" class="float-left size-14 pixel-perfect mr-4 mt-2" />
      <div class="grid grid-cols-20c-fr">
        <div class="">H</div>
        <div class="text-right">{{ props.hp }}</div>
        <div class="">M</div>
        <div class="text-right">{{ props.mag == undefined ? '····' : props.mag }}</div>
      </div>
    </div>
    <div v-else class="text-center text-black">EMPTY</div>
  </div>
</template>
