

import {FC, useState} from 'react';

import './style.css';
import { Status } from '../../../types/Status';

interface IState {
    page: number,
    totalPages: number,
    setPage: (num:number) => void;
    status?: Status
}

const Pagination:FC<IState> = ({page, totalPages, setPage, status}) => {
    // console.log(Array.set(20))
    const numbers = Array.from({length: totalPages },(v,k)=>k+1);
    const [posNum, setPosNum] = useState<number[]>([0, 5]);


    const handlePlusPage = () => {
        if(page == posNum[1]) {handlePlusPosNumber()} 
        setPage(page+1);
    } 
    const handleMinusPage = () =>  {
        if(page-1 == posNum[0]) {handleMinusPosNumber()}
        setPage(page-1);
    }
    const handlePlusPosNumber = () => {
        setPosNum([posNum[0]+5, posNum[1]+5]);
    }
    const handleMinusPosNumber = () => {
        setPosNum([posNum[0]-5, posNum[1]-5]);
    }

    const handleOnClick = (num:number) => setPage(num);
    
    return (
        <div className='pagination'>
            <div className="pagination__wrapper">
                <button 
                    onClick={handleMinusPage} 
                    className={`pagination__prev ${page === 1 ? 'default' : ''} ${status === Status.LOADING ? 'loading' : ''}`}
                >{'<<'}</button>
                {
                    numbers.slice(posNum[0], posNum[1]).map((num) => (
                        <button 
                            key={num} 
                            onClick={() => handleOnClick(num)}
                            className={`pagination__num ${page === num ? 'active' : ''} ${status === Status.LOADING ? 'loading' : ''}`}
                        >{num}</button>
                    ))
                }
                <button 
                    onClick={handlePlusPage} 
                    className={`pagination__next ${page === totalPages ? 'default' : ''} ${status === Status.LOADING ? 'loading' : ''}`}
                >{'>>'}</button>
            </div>
        </div>
    );
};

export default Pagination;