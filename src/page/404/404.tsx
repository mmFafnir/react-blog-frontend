import { FC } from 'react';

import tsvPng from './tv.png';
import gif from './404.gif'

import './style.css';
import { Link } from 'react-router-dom';

const NotFound:FC = () => {
    return (
        <div className='not-found'>
            <p>Упс... Страница не найден</p>
            <div className="tv">
                <img className='tv-img' src={tsvPng} alt="" />
                <img className='img-404' src={gif} alt="" />
            </div>
            {/* <div className="not-found__link">
                <Link to={'/'}>Перейди на главную</Link>
            </div> */}
        </div>
    );
};

export default NotFound;