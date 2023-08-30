
import { FC, useState, useRef } from 'react';

import { IPostCreate } from '../../types/TypePost';

import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { ModalEnum, modalOpen } from '../../store/Slices/modalSlice';
import { useTypeSelector } from '../../hooks/useTypeSelector';

import { postPost } from '../../store/Slices/postsSlice/asyncAction';
import { deleteTags } from '../../store/Slices/tagsSlice';

import axios from '../../axios';

import MyEditor from '../Ui/MyEditor';

import importGif from './loading.gif';

import './style.css';


const FromCreatePost:FC = () => {

    const { tags } = useTypeSelector(state => state.tags);
    const user = useTypeSelector(state => state.user.data);

    const dispatch = useTypeDispatch();

    const [isLoadingImg, setIsLoadingImg] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('')
    const [img, setImg] = useState<string|null>(null);
    const [text, setText] = useState<string>('');

    const refInputImg = useRef<HTMLInputElement>(null);
    

    
    const handleUpdateFile = async () => {
        if(refInputImg.current && refInputImg.current.files) {
            if(img) {
                await deleteInputImg(true);
            }
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

    const deleteInputImg = async (isNew?: boolean) => {
        if(refInputImg.current && refInputImg.current.files && img ){
            setIsLoadingImg(true)
            try {
                await axios.delete('upload/' + img.replace('/uploads/', ''));
                refInputImg.current.files = null;
                if(!isNew) {
                    setImg(null);
                }
            } catch (error) {
                console.log(error)
                alert('Не удалось удалить картинку')
            }
            setIsLoadingImg(false);
        }
    }

    const modalOpenHandler = () => dispatch(modalOpen({modalName: ModalEnum.CREATE_TAG}));

    const handlePostSave = () => {
        if(text.trim() === '' || title.trim() === '') return;
        setIsLoading(true)
        const post:IPostCreate = {
            title,
            text,
            tags,
            imageUrl: img,
            userId: user!._id
        }
        dispatch(postPost(post)).then(() => {
            setIsLoading(false);
            handleClearState();
        }).catch(err => {
            console.warn(err);
            alert('Произошла ошибка при добавлении поста')
        })
    }

    console.log(img)
    const handleClearState = () => {
        setTitle('');
        setImg('');
        setText('');
        if(refInputImg.current) {
            refInputImg.current.files = null;
        }
        dispatch(deleteTags())
    }

    return (
        <>
            <div className="add-post">
                    {
                        img ? (
                            <div className="add-post__img">
                                <button onClick={() => deleteInputImg()} className="add-post__img-delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                                    </svg>
                                </button>
                                <img src={ !isLoadingImg ? img : importGif} />
                            </div>
                        ) : null
                    }
                <div className="add-post_form" >
                    <div className="add-post__title">
                        <input 
                            name="post-text" 
                            placeholder="Напишите что-нибудь" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="add-post__action">
                            <label className="add-post__file" htmlFor="add-post-file">
                                <input ref={refInputImg } onChange={handleUpdateFile} type="file" id="add-post-file" accept="image/png, image/gif, image/jpeg, image/webp"/> 
                                <span className="fas fa-camera" aria-hidden="true"></span> 
                            </label>
                            <button className='add-post__file' onClick={modalOpenHandler}>
                                <span className="fas fa-solid fa-tags fa-camera"></span>
                            </button>
                            <button className="send_post" onClick={handlePostSave}>
                                <span className="fas fa-location-arrow" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                    <div className="add-post__text">
                        <MyEditor text={text} setText={(value: string) => setText(value)}/>
                        <div className='add-post__tags'>
                            {
                                tags.map(tag => (
                                    <p key={tag} className="post__tag">{tag}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            {
                isLoading ? (
                    <div className="post-loading">
                        <span className='loader'></span>
                    </div>
                ) : null
            }
        
        </>
    );
};

export default FromCreatePost;