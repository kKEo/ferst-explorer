<template>
     <div style="position: fixed; top: 0px;">
      <el-button type="primary" :icon="Edit">I am ElButton</el-button>
      <el-button type="danger" :icon="Delete" @click="deleteItem"></el-button>

      <el-button type="primary" :icon="Tools" @click="switchModule"></el-button>
      <el-button type="primary" :icon="ArrowUp" @click="loadModule"></el-button>
      

      <el-tree style="max-width: 600px" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </div>
</template>

<script lang="ts" setup>

import { Edit, Delete, Tools, ArrowUp } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { getCurrentInstance } from 'vue';

import {convert, example} from '../models/component'

const instance = getCurrentInstance();


const deleteItem = () => {
  ElMessage({
    message: 'Item has been deleted',
    grouping: true,
    type: 'error'
  })
}

function switchModule() {
  const editor = instance?.appContext.config.globalProperties.$df;
  const modules = Object.keys(editor.value.drawflow.drawflow)
  const nextModule = modules[(modules.indexOf(editor.value.module)+1)%modules.length]
  editor.value.changeModule(nextModule)
}

function loadModule() {
  const editor = instance?.appContext.config.globalProperties.$df;
  const module = convert(example)
  console.log("module: ", module)
  editor.value.drawflow.drawflow['Example'] = module 
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