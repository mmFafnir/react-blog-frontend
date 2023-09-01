import {FC, useState, useEffect, memo} from 'react';

interface IProps {
    placeholder: string,
    classes?: string[],
    value?: string
    name: string,
    type: string,
    error?: string,
    onChange?: (event: any) => void
}

const Input:FC<IProps> = ({placeholder, classes, name, type, value, onChange, error}) => {
    return (
        <div>
            <input 
                onChange={onChange} 
                type={type} 
                className={`form-input ${classes ? classes.join(' ') : ''}`} 
                name={name} 
                defaultValue={value}
                placeholder={placeholder} 
            />
            {error ? <p className='error-notify'>{error}</p> : null}
        </div>
    );
};

export default memo(Input);