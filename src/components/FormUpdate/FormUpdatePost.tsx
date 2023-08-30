

import { FC, useState, useRef } from 'react';
import axios from '../../axios';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { TPostUpdate, updatePost } from '../../store/Slices/postsSlice/asyncAction';
import { TPost } from '../../types/TypePost';
import { Status } from '../../types/Status';

import FormTags from '../FormTags';
import Form from '../Ui/Form';
import Input from '../Ui/Form/Input';
import MyEditor from '../Ui/MyEditor';

import { closeModal } from '../../store/Slices/modalSlice';

import './style.css';

const FormUpdatePost:FC = () => {

    const post = useTypeSelector(state => state.modal.modal.context) as TPost;
    const { statusElement } = useTypeSelector(state => state.posts);
    const dispatch = useTypeDispatch();

    const refInputImg = useRef<HTMLInputElement>(null);

    

    const [title, setTitle] = useState<string>(post.title);
    const [newTags, setNewTags] = useState<string[]>([]);
    const [text, setText] = useState<string>(post.text);
    const [img, setImg] = useState<string|null>(post.imageUrl ? post.imageUrl : null);

    const updateImages = async () => {
        if(refInputImg.current && refInputImg.current.files && refInputImg.current.files[0]) {
            try {
                const formData = new FormData();
                const file = refInputImg.current.files[0];  
                formData.append('image', file);
                const {data} = await axios.post('/upload', formData);
                setImg(data.url)
            } catch (error) {
                console.log(error);
                alert('Ошибка при загрузке файла!')

            }
        }
    }

    const handleSubmit = () => {   
        let newPost:TPostUpdate = {
            title: title,
            text: text,
            tags: newTags,
        }
        if(img) {
            newPost.imageUrl = img;
        }
        dispatch(updatePost({id: post._id, post: newPost})).then(res => {
            dispatch(closeModal());
        });
    }

    console.log(statusElement)

    return (
        <div className='form-update'>
            <h2>Редактировать статью</h2> 
            <div className="form-update__body">
                <Form 
                    loading={statusElement === Status.LOADING ? true : false} 
                    handleSubmit={handleSubmit} 
                    valueBtn='Сохранить' 
                    classes={[]}
                >
                    <div className="form-update__img">
                        {img ? <img src={`http://localhost:4444${img}`}/> : <></>}
                        <label>
                            <input 
                                ref={refInputImg} 
                                type="file"
                                onChange={updateImages} 
                            />
                            <span>Загрузить фотографию</span>
                        </label>
                    </div>
                    <p>Название статьи:</p>
                    <Input 
                        placeholder='Название статьи' 
                        name='title' 
                        type='text'
                        value={post.title} 
                        setState={setTitle} 
                    />
                    <p>Описание статьи:</p>
                    <MyEditor text={text} setText={setText} />

                    <p>Теги:</p>
                    <FormTags  setState={setNewTags}/>
                </Form>
            </div>        
        </div>
    );
};

export default FormUpdatePost;

