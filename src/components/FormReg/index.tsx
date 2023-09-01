import {FC, useState} from 'react';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { postUserAuthRegister } from '../../store/Slices/userAuthSlice/asyncActions';
import Form from '../Ui/Form';
import Input from '../Ui/Form/Input';

import './style.css';
import Textarea from '../Ui/Form/Textarea';
import useForm from '../../hooks/useForm';

const FormReg:FC = () => {

    const dispatch = useTypeDispatch();


    const {handleChange, values, errors, handleSubmit } = useForm(() => submitHandler());

    const [description, setDescription] = useState<string>('');

    const submitHandler = () => {
        if(values.password === values['password-confirm']) {
            dispatch(postUserAuthRegister({
                fullName: values.name,
                email: values.email,
                password: values.password,
                professions: values.professions,
                description: description
            }))
        } else {
            alert('Пароли не совпадают');
        }
    }

    return (
        <div className='registration'>
            <div className="registration__body">
                <div className="registration__title">
                    <h2 className="title-page">Регистрация</h2>
                </div>
                <div className="registration__content">
                    <Form handleSubmit={handleSubmit} valueBtn='Сохранить' classes={['registration__form ']}>
                        <Input type='text' onChange={handleChange} error={errors.name} name='name' placeholder='Имя' classes={[]} />
                        <Input type='text' onChange={handleChange} name='email' placeholder='Электронная почта' classes={['progile_mail']} />
                        <Input type='text' onChange={handleChange} name='professions' placeholder='Вид деятельности' classes={[]} />
                        <Textarea name='description' text={description} setState={setDescription} placeholder='Описание' />
                        <Input type='password' onChange={handleChange} error={errors.password} name='password' placeholder='Пороль' classes={['password']} />
                        <Input type='password' onChange={handleChange} name='password-confirm' placeholder='Подтвердить пароль' classes={['password']} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default FormReg;