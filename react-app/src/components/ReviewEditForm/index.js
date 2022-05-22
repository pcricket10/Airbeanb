import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReview } from "../../store/reviews";

const ReviewEditForm = ({ reviewId, close }) => {
  const review = useSelector(state => state.reviews[+reviewId])

  const dispatch = useDispatch();

  const [content, setContent] = useState(review.content)
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedReview = {
      ...review,
      content
    }


    const data = await dispatch(editReview(editedReview))
    if (data) {
      setErrors(data)
    } else {
      close();
    }
  }
  return (
    <>
      <h1>Edit</h1>
      <form className="review-form">
        <div className="errors">
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

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
