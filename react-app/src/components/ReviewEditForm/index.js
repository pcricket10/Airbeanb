import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editReview } from "../../store/reviews";

const ReviewEditForm = ({ reviewId, close }) => {
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
    } else {
      close();
    }
  }
  return (
    <>
      <h1>Edit</h1>
      <form className="review-form">
        {errors?.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
        <div>
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
