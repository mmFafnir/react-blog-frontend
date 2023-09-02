import { FC, useEffect, useState } from 'react';

import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { setFilterPage } from '../../store/Slices/filterSlice';
import { selectUserId } from '../../store/Slices/userAuthSlice/selectors';
import { fetchPost } from '../../store/Slices/postsSlice/asyncAction';
import { Status } from '../../types/Status';
import { clearPostsState } from '../../store/Slices/postsSlice';

import FromCreatePost from '../../components/FomCreate/FormCreatePost';
import Post from '../../components/Post';
import Pagination from '../../components/Ui/Pagination';
import SkeletonPost from '../../components/Post/skeleton';

import './style.css';
import Empty from '../../components/Ui/Empty';

const Main:FC = () => { 
    
    const userId = useTypeSelector(selectUserId);
    const {posts, status, pages} = useTypeSelector(state => state.posts); 
    const {search, page} = useTypeSelector(state => state.filter);
    const dispatch = useTypeDispatch();


    const handleSetPage = (num: number) => {
        dispatch(setFilterPage(num));
    }

    useEffect(() => {
        dispatch(fetchPost({
            limit: '5',
            page: String(page),
            search: search,
            userId: userId
        }));
    }, [page, search])

    useEffect(() => {
        dispatch(clearPostsState())
    }, [])

    return (
        <>
            <FromCreatePost />  
            {
                status === Status.LOADING ? (
                    [1,2,3].map(num => (
                        <SkeletonPost key={num} />
                    ))
                ) : (
                    posts.length === 0 ? (
                        <Empty text='По статьям тут пусто...'/>
                    ) : (
                        posts.map(post => (
                            <Post key={post._id} post={post}/>
                        ))
                    )
                )
            }
            {
                status !== Status.LOADING && pages > 1 ? (
                    <Pagination status={status} page={page} totalPages={pages} setPage={(num:number) => handleSetPage(num)}/>
                ) : <></>
            }
        </>
                
    );
};

export default Main;