import {FC, useState, useRef, useLayoutEffect, ChangeEvent} from 'react';

interface IProps {
    name: string,
    placeholder: string,
    setState: (value: string) => void,
    text: string
    onBlur?: () => void
}
const MIN_TEXTAREA_HEIGHT = 28;
const Textarea:FC<IProps> = ({name, placeholder, setState, onBlur, text}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const [value, setValue] = useState(text);
    
    const onChange = (event:ChangeEvent<HTMLTextAreaElement>) => setState(event.target.value);
    
    useLayoutEffect(() => {
        if(!textareaRef.current) return;
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;

        setState(textareaRef.current.value)
    }, [text]);

    return (
        <textarea 
            onBlur={onBlur ? onBlur : () => {}}
            onChange={onChange}
            ref={textareaRef} 
            className="style-line" 
            name={name} 
            placeholder={placeholder} 
            style={{minHeight: MIN_TEXTAREA_HEIGHT, resize: "none"}}
            value={text}
        ></textarea>
    );
};

export default Textarea;