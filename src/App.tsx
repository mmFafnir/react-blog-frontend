
import { FC, useEffect, useState } from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import { useTypeDispatch } from "./hooks/useTypeDispatch";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { getUserAuthMe } from "./store/Slices/userAuthSlice/asyncActions";
import { selectAuth, selectUserId } from "./store/Slices/userAuthSlice/selectors";

import Main from "./page/Main";
import MainLayout from "./Layout/MainLayout";
import Works from "./page/Works";
import Auth from "./page/Auth";
import Posts from "./page/Posts";
import PostElement from "./page/PostElement";
import User from "./page/User";
import NotFound from "./page/404/404";

import './assets/css/App.css';
import './assets/css/snippets.css';
import './assets/css/adaptive.css';
import { deleteTags } from "./store/Slices/tagsSlice";

const App:FC = () => {

  const isAuth = useTypeSelector(selectAuth);
  const dispatch = useTypeDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hide, setHide] = useState<boolean>(false);
  
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserAuthMe()).then(res => {
      setHide(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 250)
    })  
  }, [])

  useEffect(() => {
    dispatch(deleteTags())
  }, [location])

  if(isLoading) return (
    <div className={`loading-blog ${hide ? 'hide' : ''}`}>
      <span className="loader-blog"></span>
      <span className="loader-blog-light"></span>
    </div>
  )

  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={isAuth ? <Main /> : <Posts />} />
          <Route path="/auth" element={<Auth />} />
          {
            isAuth ? (
              <>
                <Route path="/posts" element={<Posts />} /> 
                <Route path="/works" element={<Works />} />
              </>
            ) : null
          }
          <Route path="/user/:id"  element={<User />}/>
          <Route path="/posts/:id" element={<PostElement />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
