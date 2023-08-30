import { FC, useEffect } from 'react';

import { fetchPost } from '../../store/Slices/postsSlice/asyncAction';
import { setFilterPage } from '../../store/Slices/filterSlice';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';

import { Status } from '../../types/Status';
import { OmitTUser } from '.';

import SkeletonPost from '../../components/Post/skeleton';
import Pagination from '../../components/Ui/Pagination';
import Post from '../../components/Post';
import Empty from '../../components/Ui/Empty';


interface IProps {
    user: OmitTUser
}

const PostsUser:FC<IProps> = ({user}) => {

    const {page, search} = useTypeSelector(state => state.filter);
    const {posts, status, pages} = useTypeSelector(state => state.posts);

    const dispatch = useTypeDispatch();
    
    const handleSetPage = (num: number) => {
        dispatch(setFilterPage(num));
    }


    useEffect(() => {
        if(!user) return;
        dispatch(fetchPost({
            limit: '5',
            page: String(page),
            search: search 
        }));
    }, [user, page, search])

    return (
        <div>
            
            {
                status === Status.LOADING ? (
                    [1,2,3].map(num => (
                        <SkeletonPost key={num} />
                    ))
                ) : (
                    <>
                        {posts.map(post => (
                            <Post key={post._id} post={post} />
                        ))}
                    </> 
                )                
            }
            {
                pages > 1 ? (
                    <Pagination status={status} page={page} totalPages={pages} setPage={(num:number) => handleSetPage(num)}/>
                ) : <></>
            }
              {
                posts.length === 0 ? (
                    <Empty text='Пусто...'/>
                ) : <></>
            }
        </div>
    );
};

export default PostsUser;