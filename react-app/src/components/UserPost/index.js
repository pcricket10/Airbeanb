import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Popup from "reactjs-popup";
import { deletePost, getOnePost } from '../../store/posts';
import DeleteForm from '../DeleteForm';
import EditForm from '../EditForm';
import ReviewFeed from '../ReviewFeed';
import "./UserPost.css";


function UserPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => state.posts)
  const { postId } = useParams()
  const [userName, setUserName] = useState("")
  const currentPost = posts[postId]

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${currentPost?.user_id}`);
      const data = await response.json();
      setUserName(data?.username)
    })();
  }, [currentPost])


  const handleEdit = async (e) => {
    e.preventDefault();
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await dispatch(deletePost(postId))
    history.push('/')
    console.log("delete")
  }

  console.log(postId)
  useEffect(() => {
    dispatch(getOnePost(postId))

  }, [dispatch])



  return (
    <div className="bean-container">

      <p className="bean-title">{currentPost?.product_name}</p>
      <img className="bean-post" src={currentPost?.img_url}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
        }}
        alt={currentPost?.product_name} />
      <p>by: {userName ? userName : "loading"}</p>
      <p>${currentPost?.price} </p>
      <p>Created: {new Date(currentPost?.created_at).toLocaleString()}</p>
      <p>Edited: {new Date(currentPost?.updated_at).toLocaleString()}</p>
      <p>Located at {currentPost?.location}</p>
      {(currentPost?.user_id === user?.id) &&
        <>
          <Popup trigger={<button className="edit-button" onClick={handleEdit}>Edit</button>} modal nested>
            {close => <EditForm close={close} />}
          </Popup>

          <Popup trigger={<button className="delete-button" onClick={handleDelete}>Delete</button>} modal nested>
            <DeleteForm />
          </Popup>
        </>

      }
      <ReviewFeed postId={postId} />
    </div>



  )
  // console.log(post, "POST")
  // return (<h1>hi</h1>)

}
export default UserPost;
