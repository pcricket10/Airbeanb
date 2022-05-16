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

  // console.log("post", post)
  const currentPost = posts[postId - 1]
  console.log(currentPost, "current post")



  useEffect(() => {
    dispatch(getOnePost(postId))
  }, [dispatch])
  return (
    <>

      <h1>{currentPost?.product_name}</h1>
      <img className="bean" src={currentPost?.img_url} alt={currentPost?.product_name} />
      <p>${currentPost?.price} </p>
    </>



  )
  // console.log(post, "POST")
  // return (<h1>hi</h1>)

}
export default UserPost;
