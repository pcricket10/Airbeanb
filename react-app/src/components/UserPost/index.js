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
  const createdAt = new Date(currentPost?.created_at).toLocaleString()
  const updatedAt = new Date(currentPost?.updated_at).toLocaleString()
  useEffect(() => {
    (async () => {
      console.log(currentPost, "CURENTPOST")
      const response = await fetch(`/api/users/${currentPost?.user_id}`);
      const data = await response.json();
      console.log(data, "DATA DATA DATA")
      setUserName(data?.username)
    })();
  }, [currentPost])


  const handleEdit = async (e) => {
    e.preventDefault();
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(postId))
    history.push('/')
  }

  console.log(postId)

  useEffect(() => {
    dispatch(getOnePost(postId))

  }, [postId, dispatch])



  return (
    <div className="bean-container">

      <h2 className="bean-created">
        Created: {createdAt} {createdAt !== updatedAt ? <>(Edited: {updatedAt})</> : ""} by {userName ? userName : "loading"}

      </h2>
      <h2>

      </h2>
      <h1 className="bean-title">{currentPost?.product_name}</h1>
      <div className="img-detail-container">
        <img className="bean-post" src={currentPost?.img_url}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
          }}
          alt={currentPost?.product_name} />
        <div className="detail-container">


          <p>${currentPost?.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} </p>
          <p>Located at {currentPost?.location}</p>
        </div>
      </div>

      {(currentPost?.user_id === user?.id) &&
        <div className="edit-delete-post-buttons">
          <Popup trigger={<button className="edit-button" onClick={handleEdit}>Edit</button>} modal nested>
            {close => <EditForm close={close} />}
          </Popup>

          <Popup trigger={<button className="delete-button" onClick={handleDelete}>Delete</button>} modal nested>
            <DeleteForm />
          </Popup>
        </div>

      }
      <ReviewFeed postId={postId} />
    </div>



  )
  // console.log(post, "POST")
  // return (<h1>hi</h1>)

}
export default UserPost;
