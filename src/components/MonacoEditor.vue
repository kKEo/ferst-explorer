<template>
    <div ref="editorContainer" id="editor" class="codeEditor"></div>
</template>

<style lang="css" scoped>
    .codeEditor {
        width: 100%;
        height: 100%;
    }
</style>

<script>
import {getCurrentInstance, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

self.MonacoEnvironment = {
    getWorker() {
        return new JsonWorker();
    },
};

export default {

    props: {
        value: String,
    },

    setup(props, {emit}) {
        let monacoEditor = null
        const {proxy} = getCurrentInstance()

        watch(
            () => props.value,
            (value) => {
                if (value !== monacoEditor?.getValue()) {
                    monacoEditor.setValue(value)
                }
            }
        );

        onMounted(() => {
            monacoEditor = monaco.editor.create(proxy.$refs.editorContainer, {
                value: props.value,
                readOnly: false,
                language: 'json',
                theme: 'vs-dark',
                selectOnLineNumbers: true,
                renderSideBySide: false,
            })

            monacoEditor.onDidChangeModelContent(() => {
                const currentValue = monacoEditor?.getValue()
                emit('update:value', currentValue)
            })
        })
        return {}
    }
}
</script>
    