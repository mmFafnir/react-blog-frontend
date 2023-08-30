import {FC, useState, memo} from 'react';
import axios, { AxiosError } from 'axios';
import { TUserLogin } from '../../types/TypeUser';

import Form from '../Ui/Form';
import Input from '../Ui/Form/Input';

import './style.css';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { postUserAuthLogin } from '../../store/Slices/userAuthSlice/asyncActions';

const FormLogin:FC = () => {

    const dispatch = useTypeDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submitLoginHandler = async () => {
        let user:TUserLogin = {
            email: email,
            password: password
        };            
        dispatch(postUserAuthLogin(user))
    }

    return (
        <div className='login'>
            <div className="login__body">
                <div className="login__title">
                    <h2 className="title-page">Вход</h2>
                </div>
                <div className="login__content">
                    <Form handleSubmit={submitLoginHandler} valueBtn='Войти' classes={['login__form ']}>
                        <Input type='text' setState={setEmail} name='email' placeholder='Электронная почта' classes={['progile_mail']} />
                        <Input type='password' setState={setPassword} name='password' placeholder='Пороль' classes={['password']} />
                    </Form>
                </div>
            </div>
            
        </div>
    );
};

export default memo(FormLogin);