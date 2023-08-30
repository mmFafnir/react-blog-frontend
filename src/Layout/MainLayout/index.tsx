import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { selectAuth } from '../../store/Slices/userAuthSlice/selectors';

import Header from '../../components/Header';
import Aside from '../../components/Aside';
import ModalLayout from '../ModalLayout';

import './style.css'
const MainLayout:FC = () => {

    const isAuth = useTypeSelector(selectAuth);
    const modalOpen = useTypeSelector(state => state.modal.modalOpen);

    useEffect(() => {
        if(modalOpen) {
            document.body.classList.add('lock')
        } else {
            document.body.classList.remove('lock')
        }
    }, [modalOpen])
    return (

        <div className={`App ${!isAuth ? 'no-auth' : ''}`}>
            <div className="wrapper">
                <Header />
                {
                    isAuth ? <Aside /> : null 
                } 
                <main className="main">
                    <div className="main__wrapper">
                        <Outlet />
                    </div>
                </main>  
                <ModalLayout />
            </div>
      </div>
    );
};

export default MainLayout;