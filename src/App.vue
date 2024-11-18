<template>
    <div style="height: 100vh; width: 100vw; background-color: blanchedalmond; margin: 0px; padding: 0px">
      <div style="height: 60%; width: 100%; display: flex; flex-direction: column;">
        <div style="background-color: antiquewhite; flex-grow: 1; display: flex;">
          <Drawflow/>
        </div>
      </div>
      <div style="height: 40%; width: 100%">
        <MonacoEditor value="Test"/>
      </div>
      <Drawer/>
    </div>
  </template>
  
<script lang="ts" setup>

import Drawer from './components/Drawer.vue';
import Drawflow from './components/Drawflow.vue';
import MonacoEditor from './components/MonacoEditor.vue';

</script>