import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editReview } from "../../store/reviews";

const ReviewEditForm = ({ reviewId }) => {
  const review = useSelector(state => state.reviews[+reviewId])

  const dispatch = useDispatch();
  const history = useHistory();
  const [content, setContent] = useState(review.content)
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedReview = {
      ...review,
      content
    }


    const response = await dispatch(editReview(editedReview))
    if (response?.errors) {
      setErrors(response.errors)
    }
  }
  return (
    <>
      <h1>Edit</h1>
      <form className="review-form">
        <div>
          <label>Content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} required></textarea>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Edit</button>
        </div>
      </form>
    </>
  )

}
export default ReviewEditForm
