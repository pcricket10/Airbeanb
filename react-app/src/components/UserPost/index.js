import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getOnePost } from '../../store/posts'
import "./UserPost.css"

function UserPost() {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  const { postId } = useParams()
  console.log("post id", postId)
  const currentPost = posts[postId]
  console.log(currentPost, "current post")



  // useEffect(() => {
  //   dispatch(getOnePost(postId))
  // })
  return (
    <h1>{currentPost.product_name}</h1>
  )

}
export default UserPost;
