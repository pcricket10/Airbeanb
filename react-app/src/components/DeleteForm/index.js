import { React } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deletePost } from "../../store/posts";



const DeleteForm = () => {
  const { postId } = useParams()
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = async (e) => {

    e.preventDefault();
    await dispatch(deletePost(postId))
    history.push('/')
    console.log("delete")
  }
  return (
    <div className="delete">
      <h1 className="delete-message">⚠️Are you sure you want to delete this post?⚠️</h1>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  )
}


export default DeleteForm
