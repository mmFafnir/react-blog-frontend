import {FC,useEffect,useState} from 'react';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useTypeDispatch } from '../../hooks/useTypeDispatch';
import { fetchComments, postAnswer, postComments } from '../../store/Slices/commentsSlice/asyncActions';
import { Status } from '../../types/Status';

import Form from '../Ui/Form';
import Textarea from '../Ui/Form/Textarea';


import img from '../Person/img.jpg';
import './style.css';
import { selectAuth } from '../../store/Slices/userAuthSlice/selectors';
import { useNavigate } from 'react-router-dom';
import { getDate } from '../../assets/scripts/getDate';

interface IProps {
    id: string
}

const Comments:FC<IProps> = ({id}) => {
    const isAuth = useTypeSelector(selectAuth);

    const navigate = useNavigate();

    const {status, comments, pages} = useTypeSelector(state => state.comments);
    const dispatch = useTypeDispatch();

    const [limit, setLimit] = useState<number>(5);
    const [text, setText] = useState<string>('');
    const [answerComment, setAnswerComment] = useState<{id: string, userName:string}|null>(null);


    const handleOpenCommentList = (action:'add'|'remove'|'toggle' ,parent: HTMLElement|null) => {
        if(!parent) return;
        const answers = parent.querySelector('.comments');
        const answersList = parent.querySelector('.comments__list');
        const target =  parent.querySelector('.comment_open') as HTMLElement;
        answers?.classList[action]('active');
        target.classList.add('default');
        if(answers?.classList.contains('active')) {
            answers.setAttribute('style', `height: ${answersList?.clientHeight}px`);
            target!.innerText = 'Свернуть';
            setTimeout(() => {
                answers.setAttribute('style', `height: auto`);
            }, 300)
        } else {
            answers?.setAttribute('style', `height: ${answersList?.clientHeight}px`);
            setTimeout(() => {
                answers?.setAttribute('style', `height: ${0}px`);
            }, 100)
            target!.innerText = 'Развернуть';
        }
        
        setTimeout(() => {
            target.classList.remove('default');
        }, 400)
        
    }
    
    const handleOnFocus = (id:string, userName:string) => {
        const textarea = document.querySelector('.comment-write textarea') as HTMLTextAreaElement;
        if(!textarea) return;
        textarea.focus();
        setAnswerComment({id, userName})
    }   
    
    const handlerOnBlur = () => {
        setAnswerComment(null)
    }

    const submitHandler = () => {

        if(!isAuth) {
            navigate('/auth')
        }
        if(text.trim().length === 0) return;
        if(answerComment) {
            dispatch(postAnswer({
                id: answerComment.id,
                answer: {
                    text: text,
                    userAnswer: answerComment.userName
                }
            }))
        } else {
            dispatch(postComments({
                id: id,
                comment: {
                    text: text,
                }
            }))
        }
        setText('');
        setAnswerComment(null)
    }

    useEffect(() => {
        if(!id) return;
        dispatch(fetchComments({
            id: id,
            limit: String(limit),
            page:'1'
        }))
    }, [id, limit])


    useEffect(() => {

    }, [])

    return (
        <div className='comments-block'>
            <div className="comment-write">
                <div className="comment-write__header">
                    <h3>
                        {answerComment ? (
                            <span>Ответ на комментарий</span>
                        
                        ) : <span>Обсуждение</span>}
                    </h3>
                    {
                        answerComment ? (
                            <button onClick={handlerOnBlur} className='comment-write__cancel'>Отменить ответ</button>
                        ) : <></>
                    }
                </div>

                <Form handleSubmit={submitHandler} valueBtn='Отправить' classes={['comment-form']}>
                    <Textarea 
                        text={text}
                        setState={setText} 
                        name='text_comment' 
                        placeholder='Текст комментария'
                    />
                </Form>
            </div>
            <div className={`comments-block__loading ${status === Status.LOADING ? 'active': ''}`}>
            <span className='loader'></span>
            </div>
            <ul className="comments">
                {comments.length === 0 && status !== Status.LOADING ? <p>Пока ни одного комментария, будьте первым!</p> : <></>}
                {
                    comments.map(comment => (
                        <li key={comment._id} className="comments_item">
                            <div className="comments__header">
                                <div className="persone_avatar">
                                    <img src={comment.user.avatarUrl ? comment.user.avatarUrl : img} />
                                </div>
                                <div className="persone_name">
                                <div className="name">{comment.user.fullName}</div>
                                <time dateTime="12.04.2002 19:00">{getDate(comment.createdAt)}</time>
                                </div>
                            </div>
                            <div className="comments__text">{comment.text}</div>
                            
                            <div className="comments__footer">
                                <button 
                                    onClick={(e) => {
                                        handleOnFocus(comment._id, comment.user.fullName);
                                        if(comment.answers?.length === 0) return;
                                        handleOpenCommentList('add', e.currentTarget.closest('.comments_item'))
                                    }} 
                                    className="link-blue comment_btn"
                                >ответить</button>
                                {
                                    comment.answers?.length !== 0 ? (
                                        <button 
                                            onClick={(e) => handleOpenCommentList('toggle', e.currentTarget.closest('.comments_item'))}  
                                            className="link-blue comment_btn comment_open"
                                        >развернуть</button>
                                    ) : <></>
                                }
                            </div>
                            {/* <!-- Вложенный коментарий --> */}
                            <ul className="comments" style={{height: '0px'}}>
                                <div className="comments__list">
                                    {
                                        comment.answers?.map(answer => (
                                            <li key={answer._id} className="comments_item">
                                                <div className="comments__header">
                                                    <div className="persone_avatar">
                                                        <img src={answer.user.avatarUrl ? answer.user.avatarUrl : img} />
                                                    </div>
                                                    <div className="persone_name">
                                                    <div className="name">{answer.user.fullName}</div>
                                                    <p>Ответ на комментарий: {answer.userAnswer}</p>
                                                    <time dateTime="12.04.2002 19:00">{getDate(answer.createdAt)}</time>
                                                    </div>
                                                </div>
                                                <div className="comments__text">{answer.text}</div>
                                                <button onClick={() => handleOnFocus(comment._id, answer.user.fullName)} className="link-blue comment_btn">ответить</button>
                                            </li>
                                        ))
                                    }
                                </div>
                            </ul>
                        </li>
                    ))
                }
          </ul>
          {
            pages >= 2 ? (
                <button 
                  onClick={() => setLimit(prev => prev*5)}
                  className='link-blue comment_btn'
                >
                    {
                        status === Status.LOADING ? 'Загрузка...' : 'Еще...'
                    }                    
                </button>
            ): <></>
          }
        </div>
    );
};

export default Comments;