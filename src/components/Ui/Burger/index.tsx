import React, { useState } from 'react';


import './style.css'
import { Link, useLocation } from 'react-router-dom';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { selectAuth } from '../../../store/Slices/userAuthSlice/selectors';

const Burger = () => {
    const location = useLocation();
    const isAuth = useTypeSelector(selectAuth);
    const {data, status} = useTypeSelector(state => state.user);
    
    const [isActive, setIsActive] = useState<boolean>(false);


    return (
        <div className='burger'>
            <div className={`burger-icon ${isActive ? 'active' : ''}`} onClick={() => setIsActive(prev => !prev)}> 
                <span></span>
            </div>
            <div className={`burger-menu ${isActive ? 'active' : ''}`}>
                <div className="aside-content">
                    <div className="aside_bg">
                        <img src="	https://mmfafnir.github.io/Blob_Front-end/img/Rectangle%201.jpg" alt="#" />
                    </div>
                    {
                        isAuth ? (
                            <div className="aside-person__block">
                                <div className="aside-person__img">
                                    <img src="img/gde-i-kak-vyrashivat-talanty.png" alt="#" />
                                </div>
                                <div className="aside-person__title">
                                    <h2>Фамилия Имя</h2>
                                    <p className="sub_t-tle"> блог front-end разработчика </p>
                                </div>
                            </div>
                        ) : (
                            <div style={{marginBottom: '30px'}}></div>
                        )
                    }

                    <div className="aside-links__body">
                        <ul className="aside-links__list">
                            <li className="aside__link">
                                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Главная</Link>
                            </li>
                            {
                                isAuth ? (
                                    <>
                                        <li className="aside__link"> 
                                            <Link to="/posts" className={location.pathname === '/posts' ? 'active' : ''}>Статьи</Link> 
                                        </li>
                                        <li className="aside__link"> 
                                            <Link to="/works" className={location.pathname === '/works' ? 'active' : ''}>Работы</Link> 
                                        </li>
                                    </>
                                ) : (
                                    <li className="aside__link"> 
                                        <Link to="/auth" className={location.pathname === '/works' ? 'active' : ''}>Войти</Link> 
                                    </li>
                                )
                            }
                        </ul>
                        {
                            isAuth ? (
                                <div className="aside-person__btn aside-person__btn-mg"> 
                                    <Link className="my_work aside__btn person__btn" to="/works">Мои работы</Link>
                                    <Link className="write_me aside__btn person__btn" to={`${process.env.REACT_APP_API_URL}/user/${data?._id}`}>Мой профиль</Link>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Burger;