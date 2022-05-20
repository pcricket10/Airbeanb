import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PostFeed from '../PostFeed';
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postState)
  const [isLoaded, setIsloaded] = useState(false)

  // useEffect(() => {
  //   dispatch(getPosts())
  //     .then(() => setIsloaded(true))
  // }, [dispatch])
  // if (!isLoaded) return null
  return (
    <>
      <h1>Welcome to AirBeanb!</h1>
      <h2>Find bean farmers from around the world!</h2>
      <PostFeed />

    </>
  )
}

export default HomePage
