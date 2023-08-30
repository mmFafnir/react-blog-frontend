import { FC, useEffect } from 'react';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';

import { fetchWorks } from '../../store/Slices/worksSlice/asyncAction';
import { setFilterPage } from '../../store/Slices/filterSlice';

import { OmitTUser } from '.';

import Pagination from '../../components/Ui/Pagination';
import CardWork from '../../components/CardWork';
import { Status } from '../../types/Status';
import SkeletonWork from '../../components/CardWork/SkeletonWork';
import Empty from '../../components/Ui/Empty';


interface IProps {
    user: OmitTUser
}

const WorksUser:FC<IProps> = ({user}) => {
    const {page, search} = useTypeSelector(state => state.filter);
    const {works, status, pages} = useTypeSelector(state => state.works);

    const dispatch = useTypeDispatch();
    
    const handleSetPage = (num: number) => {
        dispatch(setFilterPage(num));
    }
    
    useEffect(() => {
        if(!user) return;
        dispatch(fetchWorks({
            limit: '5',
            page: String(page),
            search: search,
            userId: user._id
        }));
    }, [search])


    return (
        <div>
            {
                status === Status.LOADING ? (
                    <>{
                        [1,2,3].map(num => (
                            <SkeletonWork />
                        ))
                    }</>
                ) : (
                    <>{
                        works.map(work => (
                            <CardWork key={work._id} work={work}/>
                        ))
                    }</>
                )
            }
            {
                pages > 1 ? (
                    <Pagination page={page} totalPages={pages} setPage={(num:number) => handleSetPage(num)}/>
                ) : <></>
            }
            {
                works.length === 0 ? (
                    <Empty text='Пусто...'/>
                ) : <></>
            }

        </div>
    );
};

export default WorksUser;