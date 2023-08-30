import {FC, useState} from 'react';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { postUserAuthRegister } from '../../store/Slices/userAuthSlice/asyncActions';
import Form from '../Ui/Form';
import Input from '../Ui/Form/Input';

import './style.css';
import Textarea from '../Ui/Form/Textarea';

const FormReg:FC = () => {

    const dispatch = useTypeDispatch();

    const [name, seName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [professions, setProfessions] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const submitHandler = () => {
        if(password === passwordConfirm) {
            dispatch(postUserAuthRegister({
                fullName: name,
                email: email,
                password: password,
                professions: professions,
                description: description
            }))
        }
    }

    return (
        <div className='registration'>
            <div className="registration__body">
                <div className="registration__title">
                    <h2 className="title-page">Регистрация</h2>
                </div>
                <div className="registration__content">
                    <Form handleSubmit={submitHandler} valueBtn='Сохранить' classes={['registration__form ']}>
                        <Input type='text' setState={seName} name='name' placeholder='Имя' classes={[]} />
                        <Input type='text' setState={setEmail} name='email' placeholder='Электронная почта' classes={['progile_mail']} />
                        <Input type='text' setState={setProfessions} name='professions' placeholder='Вид деятельности' classes={[]} />
                        <Textarea name='description' text={description} setState={setDescription} placeholder='Описание' />
                        <Input type='password' setState={setPassword} name='password' placeholder='Пороль' classes={['password']} />
                        <Input type='password' setState={setPasswordConfirm} name='password-confirm' placeholder='Подтвердить пароль' classes={['password']} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default FormReg;