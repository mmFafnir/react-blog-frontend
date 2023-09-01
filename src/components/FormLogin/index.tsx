import {FC, useState, memo} from 'react';
import { TUserLogin } from '../../types/TypeUser';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { postUserAuthLogin } from '../../store/Slices/userAuthSlice/asyncActions';

import Form from '../Ui/Form';
import Input from '../Ui/Form/Input';

import './style.css';
import useForm from '../../hooks/useForm';

const FormLogin:FC = () => {

    const dispatch = useTypeDispatch();

    const {handleChange, values, errors, handleSubmit } = useForm(() => submitLoginHandler());
    
    const submitLoginHandler = async () => {
        let user:TUserLogin = {
            email: values.email,
            password: values.password
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
                    <Form handleSubmit={handleSubmit} valueBtn='Войти' classes={['login__form ']}>
                        <Input 
                            onChange={handleChange} 
                            type='text' 
                            name='email' 
                            placeholder='Электронная почта' 
                            classes={['progile_mail']}
                            error={errors.email} 
                        />
                        <Input 
                            onChange={handleChange} 
                            type='password' 
                            name='password' 
                            placeholder='Пороль' 
                            classes={['password']}
                            error={errors.password} 
                        />
                    </Form>
                </div>
            </div>
            
        </div>
    );
};

export default memo(FormLogin);