<template>
<div id="drawflow"></div>
</template>

<style lang="css">
#drawflow{flex-grow: 1}
.drawflow,.drawflow .parent-node{position:relative}
.parent-drawflow{display:flex;overflow:hidden;touch-action:none;outline:0}
.drawflow{width:100%;height:100%;user-select:none;perspective:0}
.drawflow .drawflow-node{display:flex;align-items:center;position:absolute;background:rgb(155, 189, 189);width:160px;min-height:40px;border-radius:4px;border:2px solid #000;color:#000;z-index:2;padding:15px}
.drawflow .drawflow-node.selected{background:rgb(124, 173, 154)}
.drawflow .drawflow-node:hover{cursor:move}
.drawflow .drawflow-node .inputs,.drawflow .drawflow-node .outputs{width:0}
.drawflow .drawflow-node .drawflow_content_node{width:100%;display:block}
.drawflow .drawflow-node .input,.drawflow .drawflow-node .output{position:relative;width:10px;height:10px;background:rgb(155, 189, 189);border-radius:50%;border:2px solid #000;cursor:crosshair;z-index:-1;margin-bottom:5px}
.drawflow .drawflow-node .input{left:-27px;top:2px;background:rgb(173, 173, 108); opacity: 0;}
.drawflow .drawflow-node .output{right:-8px;top:0px; opacity: 0;}
.drawflow svg{z-index:0;position:absolute;overflow:visible!important}
.drawflow .connection{position:absolute;pointer-events:none;aspect-ratio:1/1}
.drawflow .connection .main-path{fill:none;stroke-width:2px;stroke:#372a72;pointer-events:all}
.drawflow .connection .main-path:hover{stroke:#1266ab;cursor:pointer}
.drawflow .connection .main-path.selected{stroke:#43b993}
.drawflow .connection .point{cursor:move;stroke:#000;stroke-width:2;fill:#fff;pointer-events:all}
.drawflow .connection .point.selected,.drawflow .connection .point:hover{fill:#1266ab}
.drawflow .main-path{fill:none;stroke-width:3px;stroke:#274055}
.drawflow-delete{position:absolute;display:block;width:30px;height:30px;background:#000;color:#fff;z-index:4;border:2px solid #fff;line-height:30px;font-weight:700;text-align:center;border-radius:50%;font-family:monospace;cursor:pointer}
.drawflow>.drawflow-delete{margin-left:-15px;margin-top:15px}
.parent-node .drawflow-delete{right:-15px;top:-15px}
</style>

<script>

import Drawflow from 'drawflow'
import { onMounted, shallowRef, h, getCurrentInstance, render, readonly, ref } from 'vue'
import data from '../libs/examples/data.json'

export default {
    name: 'drawflow',
    setup() {
        const listNodes = readonly([])

        const editor = shallowRef({})
        
        const Vue = {version: 3, h, render};
        const internalInstance = getCurrentInstance()
        internalInstance.appContext.app._context.config.globalProperties.$df = editor;

        const drawing = data

        onMounted(() => {
            const id = document.getElementById("drawflow");
            editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
            editor.value.reroute = true;
            editor.value.start();
            editor.value.import(drawing)
            editor.value.changeModule('Other')
        })

        return {}

    }
}

</script>