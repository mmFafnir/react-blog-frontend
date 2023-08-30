import {ReactNode, FC} from 'react';


import './style.css';

interface IProps {
    text: string,
    children?: ReactNode
}
const Empty:FC<IProps> = ({text, children}) => {
    return (
        <div className='empty'>
            <p className='empty__smile'>( ◔ ʖ̯ ◔ )</p>
            <p className='empty__text'>{text}</p>
            {children ? children : <></>}
        </div>
    );
};

export default Empty;