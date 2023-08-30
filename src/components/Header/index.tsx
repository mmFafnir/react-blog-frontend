import {FC, useEffect} from 'react';

import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from '../Ui/Search';
import { selectAuth } from '../../store/Slices/userAuthSlice/selectors';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { logout } from '../../store/Slices/userAuthSlice';
import { Status } from '../../types/Status';
import Burger from '../Ui/Burger';

const Header:FC = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const isAuth = useTypeSelector(selectAuth);
    const status = useTypeSelector(state => state.user.status);

    const dispatch = useTypeDispatch();
    
    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='header'>
            <nav className="nav">
                <div className="cover_block"></div>
                <Link to="/" className={`nav_link ${location.pathname === '/' ? 'active' : ''}` }><span>Главная</span></Link>
                {
                    isAuth ? (
                        <>
                            <Link to="/posts" className={`nav_link ${location.pathname === '/posts' ? 'active' : ''}` }><span>статьи</span></Link>
                            <Link to="/works" className={`nav_link ${location.pathname === '/works' ? 'active' : ''}` }><span>Мои работы</span></Link>
                        </>
                    ) : null
                }
            </nav>
            <div className="header_profile-search">
                <div className="header__profile">
                    {
                        status === Status.LOADING ? (
                            <button onClick={() => navigate('/')} className='loader-btn'>
                                <span className='loader'></span>
                            </button>   
                        ) : (
                            !isAuth ? <Link to="/auth">Профиль</Link> : <button onClick={logoutHandler}>Выйти</button>
                        )
                    }
                </div>
                <div className="header__search">
                    <Search />
                </div>
            </div>
            <div className="header-burger">
                <Burger />
            </div>
        </div>
    );
};

export default Header;