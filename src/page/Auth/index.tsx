
import {FC, useState, useTransition} from 'react';
import { Navigate } from 'react-router-dom';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { selectAuth } from '../../store/Slices/userAuthSlice/selectors';

import FormLogin from '../../components/FormLogin';
import FormReg from '../../components/FormReg';

import './style.css';
import { Status } from '../../types/Status';

const Auth: FC = () => {

    const isAuth = useTypeSelector(selectAuth);
    const {status} = useTypeSelector(state => state.user);
    const [login, setLogin] = useState<boolean>(true);

    if(isAuth) return <Navigate to={'/'} />

    return (
        <div className='auth'>
            <div className={`auth__loading ${status === Status.LOADING ? 'show' : ''}`}>
                <span className='loader'></span>
            </div>
            {
                login ? <FormLogin /> : <FormReg /> 
            }
            <div className="reg-link-body"> 
                {/* {login ? <button className="reg-link">востоновить</button> : null} */}
                <button 
                    onClick={() => setLogin(!login)} 
                    className="reg-link"
                >
                    {login ? 'регистрация' : 'войти'}
                </button> 
            </div>
        </div>
    );
};

export default Auth;