"use client";

import Editor, {useMonaco } from '@monaco-editor/react';
import React, { useEffect, useRef } from 'react'
import { emmetHTML, emmetCSS, emmetJSX, expandAbbreviation, registerCustomSnippets } from 'emmet-monaco-es';

const MonacoCodeEditor = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
    }
  }, [monaco]);

  const editorRef = useRef(null);

  function handleEditorWillMount(monaco) {
    const disposeHTML = emmetHTML(monaco, ['html', 'php']);
    const disposeCSS = emmetCSS(monaco, ['css']);
    const disposeJSX = emmetJSX(monaco, ['jsx','js', 'javascript']);
    disposeHTML();
    disposeCSS();
    disposeJSX();
    expandAbbreviation('a', { type: 'markup', syntax: 'html' })
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
  }


  return (
    <div className='flex flex-col items-stretch justify-center border-[#0F172A] rounded-xl bg-[#0F172A]/90 backdrop-blur-3xl h-full w-full'>
      <div className='p-3 w-full border-b-1 border-[#0F172A]'>
        <h1 className='text-white font-bold font-cursive'>Monacco Code Editor here...</h1>
      </div>

      <div className='rounded-lg h-full overflow-y-scroll'>
        <Editor
          theme="vs-dark"
          height={"100%"}
          width={"100%"}
          beforeMount={handleEditorWillMount}
          defaultLanguage="javascript"
          // defaultValue={`console.log("Hello, World!");\n`}
          onMount={handleEditorDidMount}
          options={{
            "fontSize": 18,
            "fontFamily": "Consolas, 'Courier New', monospace",
            "lineNumbers": 'on',
            "acceptSuggestionOnCommitCharacter": true,
            "acceptSuggestionOnEnter": "on",
            "accessibilitySupport": "auto",
            "autoIndent": false,
            "automaticLayout": true,
            "codeLens": true,
            "colorDecorators": true,
            "contextmenu": true,
            "cursorBlinking": "blink",
            "cursorSmoothCaretAnimation": true,
            "cursorStyle": "line",
            "disableLayerHinting": false,
            "disableMonospaceOptimizations": false,
            "dragAndDrop": true,
            "fixedOverflowWidgets": false,
            "folding": true,
            "foldingStrategy": "auto",
            "fontLigatures": false,
            "formatOnPaste": true,
            "formatOnType": true,
            "hideCursorInOverviewRuler": false,
            "highlightActiveIndentGuide": true,
            "links": true,
            "mouseWheelZoom": true,
            "multiCursorMergeOverlapping": true,
            "multiCursorModifier": "alt",
            "overviewRulerBorder": true,
            "overviewRulerLanes": 2,
            "quickSuggestions": true,
            "quickSuggestionsDelay": 100,
            "readOnly": false,
            "renderControlCharacters": false,
            "renderFinalNewline": true,
            "renderIndentGuides": true,
            "renderLineHighlight": "all",
            "renderWhitespace": "none",
            "revealHorizontalRightPadding": 30,
            "roundedSelection": true,
            "rulers": [],
            "scrollBeyondLastColumn": 5,
            "scrollBeyondLastLine": true,
            "selectOnLineNumbers": true,
            "selectionClipboard": true,
            "selectionHighlight": true,
            "showFoldingControls": "mouseover",
            "smoothScrolling": false,
            "suggestOnTriggerCharacters": true,
            "wordBasedSuggestions": true,
            "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
            "wordWrap": "off",
            "wordWrapBreakAfterCharacters": "\t})]?|&,;",
            "wordWrapBreakBeforeCharacters": "{([+",
            "wordWrapBreakObtrusiveCharacters": ".",
            "wordWrapColumn": 80,
            "wordWrapMinified": true,
            "wrappingIndent": "none"
          }}
        />
      </div>
    </div>
  )
}

export default MonacoCodeEditor;