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
          <input type="radio" name="star-rating" value="1" className="star-rating"></input>
          {/* <label for="1">1</label> */}

          <input type="radio" name="star-rating" value="2" className="star-rating"></input>
          {/* <label for="2">2</label> */}
          <input type="radio" name="star-rating" value="3" className="star-rating"></input>
          {/* <label for="3">3</label> */}
          <input type="radio" name="star-rating" value="4" className="star-rating"></input>
          {/* <label for="4">4</label> */}
          <input type="radio" name="star-rating" value="5" className="star-rating"></input>
          {/* <label for="5">5</label> */}
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
