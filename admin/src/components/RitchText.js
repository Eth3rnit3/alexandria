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

export default function RitchText({
  defaultValue,
  name = 'richtext',
  placeholder = "Ajouter du contenu sur l'auteur ...",
  inputRef
}) {
  const [_inputValue, set_inputValue] = React.useState(defaultValue);
  const [_editor, set_editor] = React.useState(null);

  // componentDidMount
  React.useEffect(() => {
    const editor = new Quill('#quill-editor-container', {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder,
      theme: 'snow'
    });

    let change = new Delta();
    editor.on('text-change', function(delta) {
      change = change.compose(delta);
      set_inputValue(editor.root.innerHTML)
    });
    set_editor(editor);
  }, [])

  // defaultValue listenner
  React.useEffect(() => {
    if((defaultValue && defaultValue.length >= 1) && _inputValue !== defaultValue && _editor){
      _editor.root.innerHTML = defaultValue;
      set_inputValue(defaultValue);
    }
  }, [defaultValue])

  return (
    <>
      <input type="hidden" value={_inputValue} name={name} ref={inputRef} />
      <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet"/>
      <div style={{ height: '350px' }} id="quill-editor-container" />
    </>
  )
}
