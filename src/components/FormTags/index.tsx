import {FC, useState, useRef, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { setTags } from '../../store/Slices/tagsSlice';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { closeModal } from '../../store/Slices/modalSlice';

import './style.css';

const recommendTags = [
    'продвижение видео', 'Разработка сайтов', 'Frontend', 'Backend', 'React Js', 'TypeScript'
]

interface IProps {
    setState?: (tags: string[]) => void;
}

const FormTags:FC<IProps> = ({setState}) => {
    const {tags} = useTypeSelector(state => state.tags);
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const [currentTags, setCurrentTags] = useState<string[]>([]);

    const createTag = () => {
        if(!inputRef.current
        || currentTags.find(prev => prev.toLocaleLowerCase() === inputRef.current!.value.toLocaleLowerCase())
        || inputRef.current!.value === ''
        || currentTags.length === 5) return;

        const value = inputRef.current.value;
        inputRef.current.value = '';
        setCurrentTags([value, ...currentTags]);
    }

    const deleteTag = (id:string) => setCurrentTags(prev => prev.filter(tag => tag !== id));

    const changeCheckedHandler = (checked: boolean, value:string) => {
        if(checked) {
            if(currentTags.length === 5) return;
            setCurrentTags(prev => [value, ...prev])
        } else {
            setCurrentTags(prev => prev.filter(tag => tag !== value))
        }
    }
    
    const saveHandler = () => {
        if(currentTags.length === 0) return;
        dispatch(setTags(currentTags));
        dispatch(closeModal());
    }
    
    useEffect(() => {
        setCurrentTags(tags)
    }, [])

    useEffect(() => {
        if(!setState) return;
        setState(currentTags)
    }, [currentTags])

    return (
        <div className='form-tags'>
            <div className="form-tags__wrapper">
                <div className="form-tags__input">
                    <input 
                        ref={inputRef} 
                        placeholder='Поиск тега' 
                        type="text"
                        onKeyUp={(e) => e.key == 'Enter' ? createTag() : null} 
                    />
                    <button onClick={createTag}>
                        <i className="fas fa-solid fa-plus"></i>    
                    </button>    
                </div>  
                <div className="form-tags__list">
                    {
                        currentTags.map(tag => (
                            <p key={tag} className="post-tag">
                                <button onClick={() => deleteTag(tag)}></button>
                                <span>{tag}</span> 
                            </p>
                        ))
                    }
                </div>
                <div className="form-tags__recommend">
                    <p>Рекоммендованные теги</p>
                    <div className="form-tags__list">
                        {recommendTags.map(tag => (
                            <div key={tag} className="form-tags__tag">
                                <input 
                                    id={tag} 
                                    type="checkbox"
                                    onChange={(e) => changeCheckedHandler(e.target.checked, tag)}
                                    checked={currentTags.find(prev => prev === tag) ? true : false}
                                />
                                <label htmlFor={tag}>
                                    <span className='checkbox'></span>
                                    <span>{tag}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                {
                    !setState ? <button className="form-tags__save" onClick={saveHandler }>Сохранить</button> : <></>  
                }
            </div>
        </div>
    );
};

export default FormTags;