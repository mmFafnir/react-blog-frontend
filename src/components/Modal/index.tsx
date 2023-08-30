import { FC, MouseEvent, ReactNode, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/Slices/modalSlice';
import { isHtmlElement } from '../../assets/scripts/isHtmlElement';
import { UseAnimateProps, useAnimate } from '../../hooks/useAnimate';

import './style.css'

interface IProps {
    children: ReactNode
}

const params:UseAnimateProps = {
    mount: {
        style: {
            opacity: 1,
        },
        delay: 300
    },
    unMount: {
        style: {
            opacity: 0
        },
        delay: 300
    }
}

const Modal:FC<IProps> = ({children}) => {
    
    const { style, handleClose } = useAnimate(params);
    const dispatch = useDispatch();

    const modalKeyClose = (e: globalThis.KeyboardEvent) => {
        if(e.key !== 'Escape') return;
        handleClose(() => dispatch(closeModal()));
    } 

    const modalCloseHandler = (e:MouseEvent) => {
        if (!isHtmlElement(e.target)) return;
        if(e.target.classList.contains('modal') || e.target.closest('.modal__close')) {
            handleClose(() => dispatch(closeModal()));
        }        
    }

    useEffect(() => {
        document.addEventListener('keyup', modalKeyClose);
        return () => {
            document.removeEventListener('keyup', modalKeyClose);
        }
    }, [])

    return (


        <div 
            className={`modal show`}
            style={style}
            onClick={(e) => modalCloseHandler(e)}
        >
            <div className="modal__content ">
                <button className="modal__close" type="button"></button>
                {children}
            </div>
        </div>
    );
};

export default Modal;