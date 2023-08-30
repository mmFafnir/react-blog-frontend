

import { FC, useEffect, useState } from 'react';

import Person from '../Person';

import './style.css';

const Aside:FC = () => {

    const [isMount, setIsMount] = useState<boolean>(false);

    useEffect(() => {
        setIsMount(true)
    }, [])

    return (
        <aside className={`aside anim-left ${isMount ? 'show' : ''}`}>
            <div className="aside_content">
                <div className="aside_bg">
                    <img src="https://mmfafnir.github.io/Blob_Front-end/img/Rectangle%201.jpg" alt="#" />
                </div>  
                <Person />
            </div>
        </aside>
    );
};

export default Aside;