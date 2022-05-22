import { React } from "react";




const ReviewDeleteForm = ({ reviewId }) => {
  console.log(reviewId)
  const handleDelete = async (e) => {
    e.preventDefault();
  }
  return (
    <div className="delete">
      <h1 className="delete-message">⚠️Are you sure you want to delete this review?⚠️</h1>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  )
}


export default ReviewDeleteForm
