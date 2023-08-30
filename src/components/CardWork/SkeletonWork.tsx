import React from 'react';
import SkeletonTemplate from '../Ui/SkeletonTemplate';

const SkeletonWork = () => {
    return (
        <article className="card-work">
            <div className="card-work__wrapper">
                <div className="card-work__img" style={{overflow: 'hidden'}}>
                    <SkeletonTemplate width='332' height='450' />
                </div>
                <div className="card-work__content">
                    <h3>
                        <SkeletonTemplate width='100' height='19' />
                    </h3>
                    <div className="card-work__text">
                        <p>
                            <SkeletonTemplate width='318' height='200' />
                        </p>
                        <div className="card-work__tags tags">
                            <p style={{backgroundColor: 'transparent', padding:'0px'}}>
                                <SkeletonTemplate width='59' height='21' />
                            </p>
                            <p style={{backgroundColor: 'transparent', padding:'0px'}}>
                                <SkeletonTemplate width='70' height='21' />
                            </p>
                            <p style={{backgroundColor: 'transparent', padding:'0px'}}>
                                <SkeletonTemplate width='100' height='21' />
                            </p>
                            <p style={{backgroundColor: 'transparent', padding:'0px'}}>
                                <SkeletonTemplate width='59' height='21' />
                            </p>
                            
                        </div>
                    </div>
                    <div className="link-to-site"> 
                        <SkeletonTemplate width='120' height='21' />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default SkeletonWork;