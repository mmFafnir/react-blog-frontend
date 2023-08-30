
import { FC, useEffect, useState } from 'react';

import { TWork } from '../../types/TypeWork';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { selectUserId } from '../../store/Slices/userAuthSlice/selectors';
import { deleteWork } from '../../store/Slices/worksSlice/asyncAction';

import './style.css';

interface IProps {
    work: TWork
}

const CardWork:FC<IProps> = ({work}) => {

    const userId = useTypeSelector(selectUserId);
    const dispatch = useTypeDispatch();

    const [isMount, setIsMount] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const handleDeleteWork = () => {
        setLoading(true);
        dispatch(deleteWork(work._id)).then(res => {
            setLoading(false)
        })
    }

    useEffect(() => {
        setTimeout(() => setIsMount(true), 50)
    }, [])
 
    return (
        <article className={`card-work anim-show ${isMount ? 'show' : ''}`}>
            <div className="card-work__wrapper">
                {
                    work.imageUrl ? (
                        <div className="card-work__img">
                            <img src={work.imageUrl} alt={work.title} />
                        </div>
                    ) : <></>
                }
                <div className="card-work__content">
                    <h3>{work.title}</h3>
                    <div className="card-work__text">
                        <p>{work.text}</p>
                        <div className="card-work__tags tags">
                            {
                                work.tags.map(tag => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </div>
                    </div>
                    {
                        work.url ? (
                            <div className="link-to-site"> 
                                <a target='_blank' href={work.url}>Перейти на сайт</a> 
                            </div>
                        ) : <></>
                    }
                    {
                        userId === work.userId ? (
                            <button 
                                onClick={handleDeleteWork} 
                                className="card-work__delete"
                            >{loading ? 'Загрузка...' : 'Удалить'}</button>
                        ) : <></>
                    }
                </div>
            </div>
        </article>
    );
};

export default CardWork;