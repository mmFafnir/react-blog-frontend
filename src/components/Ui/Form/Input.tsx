import {FC, useState, useEffect, memo} from 'react';

interface IProps {
    placeholder: string,
    classes?: string[],
    value?: string
    name: string,
    type: string,
    setState: (value:string) => void;
}

const Input:FC<IProps> = ({placeholder, classes, name, setState, type, value}) => {
    const [currentValue, setCurrentValue] = useState<string>(value ? value : '');

    useEffect(() => {
        setState(currentValue);
    }, [currentValue])
    
    return (
        <input 
            onChange={(e) => setCurrentValue(e.target.value)} 
            type={type} 
            className={`form-input ${classes ? classes.join(' ') : ''}`} 
            name={name} 
            value={currentValue}
            placeholder={placeholder} 
        />
    );
};

export default memo(Input);