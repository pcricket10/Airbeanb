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
    <>
      <h1>Are you sure you want to delete this review?</h1>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </>
  )
}


export default ReviewDeleteForm
