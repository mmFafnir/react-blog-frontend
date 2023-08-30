import { FC, useEffect, useState, } from 'react';
import {ContentState, Editor, EditorState, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './style.css';

interface IProps {
    setText: (value: string) => void,
    text: string
}
const MyEditor:FC<IProps> = ({setText, text}) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(ContentState.createFromText(text)),
    );

    const [isFocus, setIsFocus] = useState<boolean>(false)
    const renderEditor = () => {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        setText(value);
    }

    const clearEditor = () => {
        const contentState = ContentState.createFromText('');
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      };
    

    useEffect(() => {
        renderEditor()
    }, [editorState])

    useEffect(() => {
        if(text === '') {
            clearEditor()
        }
    }, [text])
    return (
        <div className={`my-editor ${isFocus ? 'focus' : ''}`}>
            <Editor 
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)} 
                placeholder='Введите текст...' 
                editorState={editorState} 
                onChange={setEditorState} 
            />      
        </div>
    );
};

export default MyEditor;