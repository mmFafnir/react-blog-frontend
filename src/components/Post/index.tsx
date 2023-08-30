

import {FC, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { TPost } from '../../types/TypePost';

import './style.css';
import { getDate } from '../../assets/scripts/getDate';

interface IProps {
    post: TPost
}

const Post:FC<IProps> = ({post}) => {

    const [isMount, setIsMount] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => setIsMount(true), 50)
    }, [])
    return (
        <article className={`post post-card ${isMount ? 'show' : ''}`}>
            {
                post.imageUrl ? (
                    <div className="post__img">
                        <img src={post.imageUrl} alt="" />
                    </div>
                ) : <></>
            }
            {/*             
                <div className="post__video">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/d-Wnk_kdlZM?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div> 
            */}
            <div className="post_description">
                <div className="post__text">
                    <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2> 
                    <p>{post.text.length > 700 ? post.text.substring(0,  700) + '...' : post.text}</p>
                </div>
                <div className="post__footer">
                    <div className="post__footer_left time_and_tag">
                        <time dateTime={post.updatedAt}>{`${getDate(post.createdAt)}`}</time>
                        {
                            post.tags ? (
                                <div className="post__tags">
                                    {
                                        post.tags.map(tag => (
                                            <p key={tag} className="post__tag">{tag}</p>
                                        ))
                                    }
                                </div>
                            ) : <></>
                        }
                    </div>
                    <div className="post__link-to-article"> 
                        <Link className="link-blue" to={`/posts/${post._id}`}>
                            читать
                        </Link> 
                    </div>
                </div>
            </div>
          </article>
    );
};

export default Post;