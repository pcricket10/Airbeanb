import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviews";
import "./ReviewForm.css";

const ReviewForm = ({ postId, close }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      content,
      post_id: postId
    }

    const data = await dispatch(addReview(newReview))
    if (data) {
      setErrors(data)
    } else {
      close();
    }
  }

  return (
    <div className="review-form-modal">
      <h1>Post New Review</h1>

      <form className="review-form">
        <div className='errors'>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <textarea value={content} onChange={e => setContent(e.target.value)} required></textarea>

        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )

}
export default ReviewForm
