<template>
  <q-card class="row q-pa-sm">
    <div class="col-6 full-height max-height">
      <div ref="codeEditor" style="width: 100%; height: 100vh"></div>
    </div>
    <div class="col-6">
      <div ref="snipEditor" style="width: 100%; height: 100vh"></div>
    </div>
    >
  </q-card>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { Dark } from 'quasar';
import { onMounted, ref, watch } from 'vue';
import { useGame } from '../Game';
import { Lobby } from 'src/components/home/LobbySelection.vue';
const props = defineProps({
  lobby: {
    type: Object as () => Lobby,
    required: true,
  },
});

const codeEditor = ref<HTMLElement>();
const snipEditor = ref<HTMLElement>();

let monCodeEditor: monaco.editor.IStandaloneCodeEditor;
let monSnipEditor: monaco.editor.IStandaloneCodeEditor;
let decorations: string[] = [];

const { editorEnabled } = useGame();

watch(editorEnabled, (val) => {
  console.log('Editor Enabled');
  if (val == true) {
    monCodeEditor.updateOptions({ readOnly: false });
  }
});

function updateHighlight(missMatch: { lineNumber: number; colNum: number }[]) {
  if (missMatch.length > 0) {
    const decor: monaco.editor.IModelDeltaDecoration[] = [];

    missMatch.forEach((e) => {
      if (e.colNum != -1 && e.colNum != -2) {
        decor.push({
          range: new monaco.Range(
            e.lineNumber,
            e.colNum,
            e.lineNumber,
            e.colNum + 1
          ),
          options: { inlineClassName: 'wrong-letter' },
        });
      } else if (e.colNum == -1) {
        decor.push({
          range: new monaco.Range(e.lineNumber, 1, e.lineNumber, 1),
          options: {
            isWholeLine: true,
            linesDecorationsClassName: 'wrong-line',
          },
        });
      } else {
        decor.push({
          range: new monaco.Range(e.lineNumber, 1, e.lineNumber, 1),
          options: {
            isWholeLine: true,
            linesDecorationsClassName: 'correct-line',
          },
        });
      }
    });

    decorations = monCodeEditor.deltaDecorations(decorations, decor);
  } else {
    decorations = monCodeEditor.deltaDecorations(decorations, [
      { range: new monaco.Range(1, 1, 1, 1), options: {} },
    ]);
  }
}

function checkIfMatch() {
  const snippetLines = monSnipEditor.getValue().split('\n');
  // const snippetLines = monSnipEditor.getValue().match(/[^\r\n]+/g);
  const codeLines = monCodeEditor.getValue().split('\n');

  const missMatch: {
    lineNumber: number;
    colNum: number;
    line: string;
    snippetLine: string;
  }[] = [];

  if (codeLines && snippetLines) {
    codeLines.forEach((line, index) => {
      if (snippetLines[index]) {
        for (let i = 0; i < line.length; i++) {
          if (!(line[i] == snippetLines[index][i])) {
            missMatch.push({
              lineNumber: index + 1,
              colNum: i + 1,
              line: line,
              snippetLine: snippetLines[index],
            });
          }
        }
      }
      if (line != snippetLines[index] && snippetLines[index] != '') {
        // console.log(
        //   'Line Does not match| CodeLine:' +
        //     line.toString() +
        //     'SnippetLine: ' +
        //     snippetLines[index].toString()
        // );
        missMatch.push({
          lineNumber: index + 1,
          colNum: -1,
          line: line,
          snippetLine: snippetLines[index],
        });
      }
      if (line == snippetLines[index]) {
        missMatch.push({
          lineNumber: index + 1,
          colNum: -2,
          line: line,
          snippetLine: snippetLines[index],
        });
      }
    });
    console.log(missMatch);
    updateHighlight(missMatch);
  }

  if (monCodeEditor.getValue() == monSnipEditor.getValue()) {
    console.log('match');
    useGame().useGameControls().userComplete();
  }
}

onMounted(() => {
  if (codeEditor.value) {
    const el = codeEditor.value;

    const textModel = monaco.editor.createModel('');
    textModel.setEOL(0);

    monCodeEditor = monaco.editor.create(el, {
      value: '',
      minimap: {
        enabled: false,
      },
      readOnly: true,
      language: 'javascript',
      theme: Dark.isActive ? 'vs-dark' : 'vs',
      automaticLayout: true,
      model: textModel,
    });

    monCodeEditor.onDidChangeModelContent(() => {
      checkIfMatch();
    });
    monCodeEditor;
  }

  if (snipEditor.value) {
    const el = snipEditor.value;

    monSnipEditor = monaco.editor.create(el, {
      value: props.lobby.snippet,
      readOnly: true,
      minimap: {
        enabled: false,
      },
    });

    monSnipEditor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC,
      () => null
    );
    monSnipEditor.onDidChangeCursorSelection(() => {
      const pos = monSnipEditor.getPosition();
      if (pos != null) {
        monSnipEditor.setPosition(pos);
      }
    });
  }
});
</script>

<style lang="scss">
.wrong-letter {
  background-color: orange;
}
.wrong-line {
  background-color: red;
}
.unfinished-line {
  background-color: orange;
}
.correct-line {
  background-color: green;
}
.hidden {
  display: none;
}
.monaco-menu-container {
  display: none;
}
</style>
