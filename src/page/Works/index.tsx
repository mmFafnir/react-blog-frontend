
import {FC, useEffect, useState} from 'react';

import { useTypeSelector } from '../../hooks/useTypeSelector';

import FromCreateWork from '../../components/FomCreate/FromCreateWork';
import CardWork from '../../components/CardWork';
// import FromCreatePost from '../../components/FormCreatePost';

import './style.css';
import { fetchWorks, fetchWorksByLimit } from '../../store/Slices/worksSlice/asyncAction';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { useInView } from 'react-intersection-observer';
import { clearWorksState } from '../../store/Slices/worksSlice';
import { Status } from '../../types/Status';
import { selectUserId } from '../../store/Slices/userAuthSlice/selectors';
import SkeletonWork from '../../components/CardWork/SkeletonWork';

const Works:FC = () => {

    const userId = useTypeSelector(selectUserId);
    const {works, status, pages} = useTypeSelector(state => state.works);
    const {search} = useTypeSelector(state => state.filter);

    const dispatch = useTypeDispatch();
    
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    
    console.log(pages !== page && works.length !== 0)
    useEffect(() => {
        if(inView) {
            setPage(prev => prev+1)
            dispatch(fetchWorksByLimit({
                limit: '8',
                page: String(page+1),
                search: search 
            }));
        }
    }, [inView]);
    

    useEffect(() => {
        setPage(1)
        dispatch(fetchWorks({
            limit: '8',
            page: String(1),
            search: search,
            userId: userId
        })).then(res => {
            setIsLoading(false)
        });
    }, [search])

    console.log(search)

    useEffect(() => {        
        dispatch(clearWorksState());
        return () => {
            dispatch(clearWorksState());
        }
    }, [])



    return (
        <div className='works'>
            <div className="works__wrapper">
                <div className="works__title">
                    <h2>Мои работы</h2>
                </div>
                <FromCreateWork />
                {
                    (isLoading) ? (
                        <>
                        {[1,2,3].map(num => (
                            <SkeletonWork key={num} />
                        ))}
                        </>
                    ) : (
                        <>
                        {works.map(work => (
                            <CardWork key={work._id} work={work} />
                            ))}
                        </>
                    )
                }
                {
                    pages !== page && works.length !== 0 ? (
                        <div ref={ref} className="scroll-target"></div>
                    ) : <></>
                }
                {
                    status === Status.LOADING ? (
                        <div className="post-loading">
                            <span className='loader'></span>
                        </div>
                    ) : <></>
                }
            </div>
        </div>
    );
};

export default Works;