import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage'
import PostForm from './components/PostForm'
import UserPost from './components/UserPost'
import { authenticate } from './store/session';
import "./index.css"
import EditForm from './components/EditForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/posts/new' exact={true}>
          <PostForm />
        </Route>
        <Route path='/posts/:postId/edit' exact={true}>
          <EditForm />
        </Route>
        <Route path='/posts/:postId' exact={true}>
          <UserPost />
        </Route>

        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route>
          <h1>404: Page not found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
