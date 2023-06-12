import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviews";
import "./ReviewForm.css";

const ReviewForm = ({ postId, close }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('')
  const [star_rating, setStar_rating] = useState('')

  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      content,
      star_rating,
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
      <h2 className="modal-title">Post New Review</h2>

      <form className="review-form">
        <div className='errors'>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id="star-rating" onChange={e => setStar_rating(e.target.value)} required>
          <input type="radio" name="star-rating" value="5" className="star"></input>
          <input type="radio" name="star-rating" value="4" className="star"></input>
          <input type="radio" name="star-rating" value="3" className="star"></input>
          <input type="radio" name="star-rating" value="2" className="star"></input>
          <input type="radio" name="star-rating" value="1" className="star"></input>

        </div>
        <textarea value={content} onChange={e => setContent(e.target.value)} required></textarea>
        <div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )

}
export default ReviewForm
