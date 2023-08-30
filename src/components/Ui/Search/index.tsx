

import { FC, useRef, FormEvent, useEffect } from 'react';
import { useTypeDispatch } from '../../../hooks/useTypeDispatch';
import { setFilter, setFilterSearch } from '../../../store/Slices/filterSlice';


import './style.css';
import { useLocation } from 'react-router-dom';

const Search:FC = () => {

    const location = useLocation();
    const dispatch = useTypeDispatch();

    const ref = useRef<HTMLInputElement>(null)
    const handleSearchSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const input = target.querySelector('input');
        if(!input) return;
        dispatch(setFilter({search: input!.value, page: 1}));
    }

    useEffect(() => {
        if(!ref.current) return
        ref.current.value = '';
        dispatch(setFilter({search: '', page: 1}))
    }, [location])

    return (
        <form onSubmit={(e) => handleSearchSubmit(e)} className="search">
            <input 
                ref={ref} 
                className="search_input" 
                type="text" 
                placeholder="Поиск по блоку" 
            /> 
        </form>
    );
};

export default Search;