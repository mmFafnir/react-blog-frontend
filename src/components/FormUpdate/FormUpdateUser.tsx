

import { FC, useState, useRef } from 'react';
import axios from '../../axios';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { TUser } from '../../types/TypeUser';
import { closeModal } from '../../store/Slices/modalSlice';
import { TUserUpdate, updateUserAuthMe } from '../../store/Slices/userAuthSlice/asyncActions';
import { Status } from '../../types/Status';

import Form from '../Ui/Form';
import Input from '../Ui/Form/Input';
import Textarea from '../Ui/Form/Textarea';


import imgDefault from '../Person/img.jpg'
import loadingGif from '../FomCreate/loading.gif';

const FormUpdateUser:FC = () => {

    const user = useTypeSelector(state => state.modal.modal.context) as TUser;
    const { status } = useTypeSelector(state => state.user);
    const dispatch = useTypeDispatch();

    const refInputImg = useRef<HTMLInputElement>(null);

    const [fullName, setFullName] = useState<string>(user.fullName);
    const [professions, setProfessions] = useState<string>(user.professions ? user.professions : '');
    const [description, setDescription] = useState<string>(user.description ? user.description : '');
    
    const [img, setImg] = useState<string|null>(user.avatarUrl ? user.avatarUrl : null);
    const [imgLoading, setImgLoading] = useState<boolean>(false);

    const updateImages = async () => {
        if(refInputImg.current && refInputImg.current.files && refInputImg.current.files[0]) {
            setImgLoading(true);
            try {
                const formData = new FormData();
                const file = refInputImg.current.files[0];  
                formData.append('image', file);
                const {data} = await axios.post('/upload', formData);
                setImg(data.url);
            } catch (error) {
                console.log(error);
                alert('Ошибка при загрузке файла!');
            }
            setImgLoading(false)
        }
    }

    const handleSubmit = () => {   
        let newUser: TUserUpdate = {
            fullName,
        }
        if(description.trim().length > 0) newUser['description'] = description;
        if(professions.trim().length > 0) newUser['professions'] = professions;     

        if(img) newUser['avatarUrl'] = img;

        dispatch(updateUserAuthMe(newUser)).then(res => {
            dispatch(closeModal())
        }).catch(err => {
            console.log(err)
        })

    }
    return (
        <div className='form-update form-update-user'>
            <h2>Редактировать профиль</h2> 
            <div className="form-update__body">
                <Form 
                    loading={status === Status.LOADING ? true : false} 
                    handleSubmit={handleSubmit} 
                    valueBtn='Сохранить' 
                    classes={[]}
                >
                    <div className="form-update__img">
                        {
                            imgLoading ? (
                                <img src={loadingGif} alt='loading' />
                            ) : (
                                <img src={img ? img: imgDefault}/>
                            )
                        }
                        <label>
                            <input 
                                ref={refInputImg} 
                                type="file"
                                onChange={updateImages} 
                            />
                            <span>Загрузить фотографию</span>
                        </label>
                    </div>
                    <p>Имя пользователя:</p>
                    <Input 
                        placeholder='Имя пользователя' 
                        name='fullname' 
                        type='text'
                        value={fullName} 
                        setState={setFullName} 
                    />
                    <p>Проффесия:</p>
                    <Input 
                        placeholder='Проффесия' 
                        name='professions' 
                        type='text'
                        value={professions} 
                        setState={setProfessions} 
                    />
                    <p>О себе:</p>
                    <Textarea 
                        name='description'
                        placeholder='О себе' 
                        setState={setDescription} 
                        text={description}
                    />
                </Form>
            </div>        
        </div>
    );
};

export default FormUpdateUser;

