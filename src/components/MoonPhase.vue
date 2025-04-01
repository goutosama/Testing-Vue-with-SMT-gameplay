<script lang="ts"></script>

<template>
  <div
    class="absolute left-0 top-2 font-megaten text-fontcolor text-2xl border-4 pt-4 p-5 aspect-half bg-uicolor border-uiaccent border-l-uiaccent border-t-uiaccent border-b-black border-r-black"
  >
    <div class="flex">
      <div>
        7/8 <br />
        MOON
      </div>
      <div id="backgrounder" class="mt-2">
        <img src="../assets/icons/moon.gif" id="moon" class="float-right size-14 pixel-perfect" />
      </div>
    </div>
  </div>
</template>

<style lang="css">
/*#moon {
  mask-image: url('../assets/icons/moon.gif');
  mask-repeat: no-repeat;
  mask-size: contain;
  
  background-image: linear-gradient(to bottom, white, red);
} */

/*
#backgrounder {
  display: inline-block;
  position: relative;
}

#backgrounder::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 50%;
  mask-image: url('../assets/icons/moon.gif');
  mask-repeat: no-repeat;
  mask-size: contain;
  background-image: linear-gradient(to bottom, white, red);
} */
</style>
