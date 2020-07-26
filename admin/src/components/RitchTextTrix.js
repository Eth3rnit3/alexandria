import React from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";

import "trix/dist/trix.css";
import urls from '../api/urls';

export default function RitchText() {
  function handleEditorReady(editor) {
    // this is a reference back to the editor if you want to
    // do editing programatically
    editor.insertString("editor is ready");
  }
  function handleChange(html, text) {
    // html is the new html content
    // text is the new text content
    console.log({html})
    console.log({text})
  }
  React.useEffect(() => {

  }, []);
  return (
    <TrixEditor
      isRailsDirectUpload
      className="custom-css-class"
      autoFocus={true}
      placeholder="editor's placeholder"
      value="initial content <strong>for the editor</strong>"
      uploadURL={urls.upload}
      blobUrlTemplate={urls.uploadTemplate}
      fileParamName="blob"
      onChange={handleChange}
      onEditorReady={handleEditorReady}
    />
  )
}
