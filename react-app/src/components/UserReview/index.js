import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getPostReviews } from "../../store/reviews";
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
    const response = await dispatch(deleteReview(review.id))
  }
  return (
    <li className="review-container" key={review.id}>
      <p>@{user?.username}</p>
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
