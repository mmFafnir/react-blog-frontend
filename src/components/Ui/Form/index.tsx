

import {FC, ReactNode, FormEvent, memo, MouseEvent} from 'react';

import './style.css';

interface IProps {
    valueBtn: string,
    children: ReactNode,
    classes: string[],
    handleSubmit: (e:MouseEvent) => void,
    loading?: boolean

}

const Form:FC<IProps> = ({loading, valueBtn, children, classes, handleSubmit}) => {

    const submit = (e:MouseEvent) => {
        e.preventDefault();
        handleSubmit(e)
    }

    return (
        <div className={`form ${classes.join(' ')}`}>
            <form onSubmit={e => e.preventDefault()} className='style-form'>                
                {children}
            </form>
            {
                loading ? (
                    <div className="btn-loader btn-form">
                        <span className='loader'></span>
                    </div>
                ) : (
                    <button onClick={submit} className="btn-form">{valueBtn}</button>
                )
            }
        </div>
    );
};

export default memo(Form);