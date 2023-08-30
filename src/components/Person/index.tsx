
import { FC } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';

import img from './img.jpg';
import './style.css'
import { Link } from 'react-router-dom';


const Person:FC = () => {


    const {data, status} = useTypeSelector(state => state.user);
    
    return (
        <div className="person_block">
          <div className="person__img">
              <img src={data?.avatarUrl ? data.avatarUrl : img} alt={data?.fullName} />
          </div>
          <div className="person__title">
            <h2><Link to={`${process.env.REACT_APP_API_URL}/user/${data?._id}`}>{data?.fullName}</Link></h2>
            <p className="sub_title">{data?.professions}</p>
          </div>
          {/* <div className="person__social social">
            <a className="inst" href="#">
                <img src="https://mmfafnir.github.io/Blob_Front-end/img/118mm1.png" alt="" />
            </a>
            <a className="vk" href="#">
                <img src="https://mmfafnir.github.io/Blob_Front-end/img/4681.png" alt="" />
            </a>
            <a className="P" href="#">
                <img src="https://mmfafnir.github.io/Blob_Front-end/img/tg.png" alt="" />
            </a>
          </div> */}
          {
            data?.description ? (
              <div className="person__description">
                <p>{data?.description}</p>
              </div>
            ) : null
          }
          <div className="person__btn"> 
            <Link className="my_work person__btn" to={'/works'}>Мои работы</Link>
            <Link className="write_me person__btn" to={`/user/${data?._id}`}>Профиль</Link>
          </div>
        </div>
    );
};

export default Person;