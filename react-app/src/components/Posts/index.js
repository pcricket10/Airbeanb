import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPosts } from '../../store/posts'
import "./Posts.css"

function Posts() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  // const posts = useSelector(state => Object.values(state.posts))

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  return (
    <h1>hi</h1>

  )
}

export default Posts;
