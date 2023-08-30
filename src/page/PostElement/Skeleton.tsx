import React, { FC } from 'react';
import SkeletonTemplate from '../../components/Ui/SkeletonTemplate';


const Skeleton:FC = () => {
    return (
        <div className='post post-element'>
            <div className="post-element__header">
                <div className="header_post__links come_back-share"> 
                    <button className="come_back">{<SkeletonTemplate width='100' height='14'/>}</button> 
                    
                </div>
                <div className="post-element__author">
                    {<SkeletonTemplate width='300' height='18' />}
                </div>
            </div>
            <div className="post__content">
                <div className="post-element__title">
                    <h2>{<SkeletonTemplate width='200' height='19' />}</h2>
                    <div className="time_and_tag">
                        <time>{<SkeletonTemplate width='81' height='12' />}</time>
                        {/* <div className="post__tags">
                            <p  className='post__tag'></p>
                            <p  className='post__tag'></p>
                            <p  className='post__tag'></p>
                            <p  className='post__tag'></p>
                        </div> */}
                    </div>
                </div>
                <div className="post__text">
                    {<SkeletonTemplate width='100%' height='500' />}
                </div>
            </div>
            <div className="post-element__interesting">
                <h3>{<SkeletonTemplate width='200' height='19' />}</h3>
                <div className="int-links">
                    <div  className="int-links__title"> 
                        <span>{<SkeletonTemplate width='260' height='15'/>}</span>
                        <time>{<SkeletonTemplate width='100' height='10'/>}</time>
                    </div>
                    <div  className="int-links__title"> 
                        <span>{<SkeletonTemplate width='260' height='15'/>}</span>
                        <time>{<SkeletonTemplate width='100' height='10'/>}</time>
                    </div>
                    <div  className="int-links__title"> 
                        <span>{<SkeletonTemplate width='260' height='15'/>}</span>
                        <time>{<SkeletonTemplate width='100' height='10'/>}</time>
                    </div>
                    <div  className="int-links__title"> 
                        <span>{<SkeletonTemplate width='260' height='15'/>}</span>
                        <time>{<SkeletonTemplate width='100' height='10'/>}</time>
                    </div>
                </div>
            </div>
            <div className="comments-block">
                <div className="comment-write">
                    <div className="comment-write__header">
                        <h3>
                            <span>{<SkeletonTemplate width='260' height='17'/>}</span>
                        </h3>
                    </div>

                    <div className="style-form">    
                        <div style={{height: '100px'}} className="style-line">
                            <div style={{marginBottom: '30px'}}>
                                {<SkeletonTemplate width='160' height='15'/>}
                            </div>
                            <div style={{height: '30px'}}></div>        
                        </div>
                    </div>
                    {<SkeletonTemplate width='100' height='32'/>}  
                    
                </div>
            </div>
            
        </div>
    );
};

export default Skeleton;