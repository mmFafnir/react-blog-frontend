import { useEffect, useState } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { fetchPost, fetchPostByLimit } from '../../store/Slices/postsSlice/asyncAction';
import { Status } from '../../types/Status';
import { useInView } from 'react-intersection-observer';
import { clearPostsState } from '../../store/Slices/postsSlice';

import Post from '../../components/Post';
import SkeletonPost from '../../components/Post/skeleton';

const Posts = () => {
    
    const {posts, status, pages} = useTypeSelector(state => state.posts); 
    const { search } = useTypeSelector(state => state.filter);
    const dispatch = useTypeDispatch();
    
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const [page, setPage] = useState<number>(1);
    const [istLoading, setIstLoading] = useState<boolean>(true)

    useEffect(() => {
        if(inView) {
            setPage(prev => prev+1)
            dispatch(fetchPostByLimit({
                limit: '8',
                page: String(page+1),
                search: search 
            }));
        }
    }, [inView]);
    
    useEffect(() => {
        setPage(1);
        setIstLoading(true);
        dispatch(fetchPost({
            limit: '8',
            page: String(1),
            search: search 
        })).then(res => {
            setIstLoading(false)
        });
    }, [search])

    useEffect(() => {        
        dispatch(clearPostsState());
        return () => {
            dispatch(clearPostsState());
        }
    }, [])


    return (
        <div>
            <h2>Страница постов</h2>
            {
                istLoading ? (
                    [1, 2, 3].map(num => (
                        <SkeletonPost key={num} />
                    ))
                ) : (
                    posts.map(post => (
                        <Post key={post._id} post={post}/>
                    ))
                )
            }
            {
                pages !== page && posts.length !== 0 ? (
                    <div ref={ref} className="scroll-target"></div>
                ) : <></>
            }
            {
                status === Status.LOADING && !istLoading ? (
                    <div className="post-loading">
                        <span className='loader'></span>
                    </div>
                ) : <></>
            }

        </div>
    );
};

export default Posts;