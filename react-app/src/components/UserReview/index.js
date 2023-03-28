import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Popup from "reactjs-popup";
import { deleteReview } from "../../store/reviews";
import ReviewDeleteForm from '../ReviewDeleteForm'
import ReviewEditForm from "../ReviewEditForm";

import "./UserReviews.css"


function UserReview({ review }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${review.user_id}`);
      const user = await response.json();
      setUser(user)
    })();
  }, [review])

  const handleEdit = async (e) => {
    e.preventDefault();


  }
  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(review.id))
  }
  const reviewArr = Array(5).fill("/images/star-black.png")
  for (let i = 0; i < review?.star_rating; i++) {
    reviewArr[i] = "/images/star-gold.png"
  }

  console.log(reviewArr);
  return (
    <li className="review-container" key={review.id}>
      <p>@{user?.username}</p>
      {reviewArr.map((url, i) => (

        <img src={url} key={i} alt="star" />
      ))}

      {/* review?.star_rating + "...." */}

      {review?.content}
      {(review?.user_id === sessionUser?.id) &&
        <div className="edit-delete-buttons">
          <Popup trigger={<button className="edit-button" onClick={handleEdit}>Edit</button>} modal nested>
            {close => <ReviewEditForm reviewId={review.id} close={close} />}
          </Popup>
          <Popup trigger={<button className="delete-button" onClick={handleDelete}>Delete</button>} modal nested>
            <ReviewDeleteForm reviewId={review.id} />

          </Popup>
        </div>
      }
    </li>
  )
}

export default UserReview
