
import {FC, useState} from 'react';
import { Navigate } from 'react-router-dom';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { selectAuth } from '../../store/Slices/userAuthSlice/selectors';

import FormLogin from '../../components/FormLogin';
import FormReg from '../../components/FormReg';


import './style.css';
const Auth: FC = () => {

    const isAuth = useTypeSelector(selectAuth);
    const [login, setLogin] = useState<boolean>(true);

    if(isAuth) return <Navigate to={'/'} />

    return (
        <div className='auth'>
            {
                login ? <FormLogin /> : <FormReg /> 
            }
            <div className="reg-link-body"> 
                {login ? <button className="reg-link">востоновить</button> : null}
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