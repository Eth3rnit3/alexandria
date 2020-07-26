import React from 'react'
import * as Quill from 'quill';
const Delta = Quill.import('delta');

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

export default function RitchText() {
  React.useEffect(() => {
    const editor = new Quill('#editor-container', {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: "Ajouter du contenu sur l'auteur ...",
      theme: 'snow'  // or 'bubble'
    });

    let change = new Delta();
    editor.on('text-change', function(delta) {
      change = change.compose(delta);
      console.log("Change", editor.root.innerHTML)
    });
  }, [])
  return (
    <div>
      <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet"/>
      <div style={{ height: '350px' }} id="editor-container" />
    </div>
  )
}
