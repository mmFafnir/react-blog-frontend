import { FC, useEffect, useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import axios from '../../axios';

import img from '../../components/Person/img.jpg';
import './style.css';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { fetchPost } from '../../store/Slices/postsSlice/asyncAction';
import Post from '../../components/Post';
import { setFilterPage } from '../../store/Slices/filterSlice';
import Pagination from '../../components/Ui/Pagination';
import { TUser } from '../../types/TypeUser';
import PostsUser from './PostsUser';
import WorksUser from './WorskUser';
import { selectAuth, selectUserId } from '../../store/Slices/userAuthSlice/selectors';
import { ModalEnum, modalOpen } from '../../store/Slices/modalSlice';


export type OmitTUser = Omit<TUser, 'createdAt'|'updatedAt'|'token'>;


enum Tabs {
    POST = 'post',
    WORKS = 'works'
}

const User:FC = () => {

    const { id } = useParams();

    // const isAuth = useTypeSelector(selectAuth);
    const userMe = useTypeSelector(state => state.user.data);
    const dispatch = useTypeDispatch();
    

    const [user, setUser] = useState<OmitTUser|null>(null); 
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const [tab, setTab] = useState<Tabs>(Tabs.POST)

    useEffect(() => {
        if(id === userMe?._id) {
            setUser(userMe)
        } else {
            axios.get(`/users/${id}`).then(res => {
                setUser(res.data)
            }).catch(err => {
                console.warn(err);
                alert('Произошла ошибка при получении данных о пользователе');
                setError(true);
            })
        }
    }, [userMe])

    if(error) return <Navigate to={'/'}/>
    if(!user) return <></>
    return (
        <div className='user'>
            <div className="user__wrapper">
                <div className="user__header">
                    <div>
                        <div className="user__img">
                            <img src={user.avatarUrl ? `http://localhost:4444${user.avatarUrl}` : img} alt={user.fullName} />
                        </div>
                    </div>
                    <div>
                        <div className="user__text">
                            <h1>{user.fullName}</h1>
                            <p>{user.professions}</p>
                            <p className="user__mail">
                                <span>e-mail:</span><a href="mailto:">{user.email}</a>
                            </p>
                        </div>
                    </div>
                    <div>
                        {   
                            user?._id == userMe?._id ? (
                                <button 
                                    onClick={() => dispatch(modalOpen({modalName: ModalEnum.USER_UPDATE, context: user}))}
                                >Редактироваь</button>
                            ) : <></>
                        }
                    </div>
                </div>
                <div className="user__desc">
                    <p>{user.description}</p>
                </div>

                <div className="user__tabs">
                    <button
                        onClick={() => setTab(Tabs.POST)} 
                        className={tab === Tabs.POST ? 'active' : ''}
                    >Статьи</button>
                    <button
                        onClick={() => setTab(Tabs.WORKS)} 
                        className={tab === Tabs.WORKS ? 'active' : ''}
                    >Работы</button>
                </div>
                <div className="user__body">
                    {
                        (tab === Tabs.POST) ? (
                            <PostsUser user={user} />
                        ) : (
                            <WorksUser user={user}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default User;