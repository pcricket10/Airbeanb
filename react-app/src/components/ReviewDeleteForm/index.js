import { React } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";



const ReviewDeleteForm = ({ reviewId }) => {
  console.log(reviewId)

  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await dispatch(deleteReview(reviewId))
  }
  return (
    <div className="delete">
      <h1 className="delete-message">⚠️Are you sure you want to delete this review?⚠️</h1>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  )
}


export default ReviewDeleteForm
