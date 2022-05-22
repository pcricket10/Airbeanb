import { React } from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";




const ReviewDeleteForm = ({ reviewId }) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {

    e.preventDefault();
    await dispatch(deleteReview(reviewId))
  }
  return (
    <div className="delete">
      <h1 className="delete-message">⚠️Are you sure you want to delete this review?⚠️</h1>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  )
}


export default ReviewDeleteForm
