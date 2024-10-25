<template>
    <div style="height: 100vh; width: 100vw; background-color: blanchedalmond; margin: 0px; padding: 0px">
    <div>
      <el-button type="primary" :icon="Edit">I am ElButton</el-button>
      <el-button type="danger" :icon="Delete" @click="deleteItem"></el-button>

      <el-tree style="max-width: 600px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
      <div style="background-color: antiquewhite; flex-grow: 1; display: flex;">
        <Drawflow/>
      </div>
    </div>
  </div>
  </template>
  
<script lang="ts" setup>

import { Edit, Delete, Tools } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Drawflow from './components/Drawflow.vue';

console.log('👋 This message is being logged by "App.vue", included via Vite');

const deleteItem = () => {
  ElMessage({
    message: 'Item has been deleted',
    grouping: true,
    type: 'error'
  })
}

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}

</script>