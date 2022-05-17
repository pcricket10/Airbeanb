import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import "./ReviewFeed.css"

function PostFeed() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  // const postsObject = useSelector(state => state.posts)
  // const posts = Object.values(postsObject)


  return (
    <><h1>hello from reviews</h1>
      <p>test review 1</p>
      <p>test review 2</p>
      <p>test review 3</p>
      <p>test review 4</p>
      <p>test review 5</p>

    </>

  )
}

export default PostFeed;
