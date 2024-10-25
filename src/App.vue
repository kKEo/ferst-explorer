<template>
    <div style="height: 100vh; width: 100vw; background-color: blanchedalmond; margin: 0px; padding: 0px">
      <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
        <div style="background-color: antiquewhite; flex-grow: 1; display: flex;">
          <Drawflow/>
        </div>
      </div>
      <Drawer/>
    </div>
  </template>
  
<script lang="ts" setup>

import Drawer from './components/Drawer.vue';
import Drawflow from './components/Drawflow.vue';

</script>