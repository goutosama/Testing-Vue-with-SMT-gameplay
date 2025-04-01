<template>
  <div
    class="border-white bg-black border-4 p-1 aspect-gradientLine h-5 m-auto mt-7"
    id="gradientStatus"
  >
    <div id="gradientLine" class="size-full"></div>
  </div>
</template>

<style lang="css">
#gradientLine {
  background-repeat: no-repeat;
  background-size:
    100% 8px,
    cover;
  background-image: radial-gradient(circle at center, blue, green);
}
</style>
