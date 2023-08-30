import {FC, useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

import { TPost } from '../../types/TypePost';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { selectUserId } from '../../store/Slices/userAuthSlice/selectors';
import { deletePost } from '../../store/Slices/postsSlice/asyncAction';
import { ModalEnum, modalOpen } from '../../store/Slices/modalSlice';
import { setPostElement } from '../../store/Slices/postsSlice';
import { setTags } from '../../store/Slices/tagsSlice';
import { getDate } from '../../assets/scripts/getDate';

import Skeleton from './Skeleton';
import Comments from '../../components/Comments';

import './style.css';

const PostElement:FC = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    
    const userId = useTypeSelector(selectUserId);
    const post = useTypeSelector(state => state.posts.postElement);
    const dispatch = useTypeDispatch();
    
    const [postRecommend, setPostRecommend] = useState<TPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const handleDelete = () => {
        if(!post) return;
        dispatch(deletePost(post._id));
        navigate('/')
    }

    const handleOpenModal = () => {
        dispatch(modalOpen({
            modalName: ModalEnum.UPDATE_POST, 
            context: post
        }));
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`/posts/${id}`).then((res) => {
            dispatch(setPostElement(res.data));
            setLoading(false)
        }).catch((err) => {
            console.log(err);
            navigate('/');
        })
        axios.get('/posts?limit=4').then((res) => {
            setPostRecommend(res.data.posts)
        }).catch((err) => {
            console.log(err)
        })

    }, [id]);

    useEffect(() => {
        if(post && post.tags)  {
            dispatch(setTags(post.tags))
        }
    }, [post])

    useEffect(() => {
        return () => {
            setPostElement(null)
        }
    }, [])


     if(loading) return <Skeleton />
    
    return (
        <div className='post post-element'>
            <div className="post-element__header">
                <div className="header_post__links come_back-share"> 
                    <button onClick={() => navigate(-1)} className="come_back">вернуться назад</button> 
                    
                    {
                        post && userId === post.user._id ? (
                            <div>
                                <button onClick={handleOpenModal} className="share">
                                    редактировать
                                    {/* <span className="fas fa-share-alt" aria-hidden="true"></span> */}
                                </button> 
                                <button onClick={handleDelete} className="share">
                                    удалить
                                    {/* <span className="fas fa-share-alt" aria-hidden="true"></span> */}
                                </button>
                            </div>
                        ) : <></>
                    }
                </div>
                <div className="post-element__author">
                    <p>Автор статьи:</p><Link to={`/user/${post?.user._id}`}>{post?.user.fullName}</Link>
                </div>
            </div>
            <div className="post__content">
                <div className="post-element__title">
                    <h2>{post?.title}</h2>
                    <div className="time_and_tag">
                        <time>{post ? getDate(post.updatedAt) : ''}</time>
                            {
                                post ? (
                                    <div className="post__tags">
                                        {post.tags?.map(tag => (
                                            <p key={tag} className='post__tag'>{tag}</p>
                                        ))}
                                    </div>
                                ) : <></>
                            }
                    </div>
                </div>
                <div className="post__text">
                    {post?.text}
                    {post && post.imageUrl  ? (
                        <img src={post.imageUrl} alt={post.title} />
                    ) : <></>}
                    {/* <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. </p>
                    <br />
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. </p>
                    <img src="https://mmfafnir.github.io/Blob_Front-end/img/image.jpg" alt=""/>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. </p> */}
                </div>
            </div>
            {postRecommend.length > 0 ? (
                <div className="post-element__interesting">
                    <h3>Интересно почитать</h3>
                    <div className="int-links">
                        {
                            postRecommend.map(postRec => (
                                <div key={postRec._id} className="int-links__title"> 
                                    <Link to={`/posts/${postRec._id}`}>{postRec.title}</Link>
                                    <time>{getDate(postRec.updatedAt)}</time>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : null}
            {
                id ? <Comments id={id}/> : <></>
            }
            
        </div>
    );
};

export default PostElement;