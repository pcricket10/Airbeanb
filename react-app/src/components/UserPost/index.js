import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { getOnePost, deletePost } from '../../store/posts'
import Popup from "reactjs-popup";
import EditForm from '../EditForm'
import DeleteForm from '../DeleteForm'
import "./UserPost.css"


function UserPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  const { postId } = useParams()

  // console.log("post", post)
  const currentPost = posts[postId - 1]
  console.log(currentPost, "current post")
  const handleEdit = async (e) => {
    e.preventDefault();

    console.log("edit")
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await dispatch(deletePost(postId))
    history.push('/')
    console.log("delete")
  }


  useEffect(() => {
    dispatch(getOnePost(postId))
  }, [dispatch])

  return (
    <div>

      <h1>{currentPost?.product_name}</h1>
      <img className="bean" src={currentPost?.img_url} alt={currentPost?.product_name} />
      <p>${currentPost?.price} </p>
      <Popup trigger={<button className="edit-button" onClick={handleEdit}>Edit</button>} modal nested>
        <EditForm />
      </Popup>
      <Popup trigger={<button className="delete-button" onClick={handleDelete}>Delete</button>} modal nested>
        <DeleteForm />
      </Popup>
      <button className="delete-button" onClick={handleDelete}>Old Delete</button>
    </div>



  )
  // console.log(post, "POST")
  // return (<h1>hi</h1>)

}
export default UserPost;
