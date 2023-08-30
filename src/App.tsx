
import { useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import { useTypeDispatch } from "./hooks/useTypeDispatch";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { getUserAuthMe } from "./store/Slices/userAuthSlice/asyncActions";
import { selectAuth } from "./store/Slices/userAuthSlice/selectors";

import Main from "./page/Main";
import MainLayout from "./Layout/MainLayout";
import Works from "./page/Works";
import Auth from "./page/Auth";
import Posts from "./page/Posts";
import PostElement from "./page/PostElement";
import User from "./page/User";

import './assets/css/App.css';
import './assets/css/snippets.css';
import './assets/css/adaptive.css';
import NotFound from "./page/404/404";

function App() {

  const dispatch = useTypeDispatch();

  const isAuth = useTypeSelector(selectAuth);

  useEffect(() => {
    dispatch(getUserAuthMe());  
  }, [])

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
