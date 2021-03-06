import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Popup from "reactjs-popup";
import { getPostReviews } from "../../store/reviews";
import ReviewForm from "../ReviewForm";
import UserReview from "../UserReview";
import "./ReviewFeed.css";

function ReviewFeed({ postId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const reviews = useSelector(state => Object.values(state.reviews))

  useEffect(() => {
    dispatch(getPostReviews(postId))
  }, [postId, dispatch])



  return (
    <><h2>reviews</h2>
      {user &&
        <Popup trigger={<button className="review-button">Leave a review</button>} modal nested>
          {close => <ReviewForm postId={postId} close={close} />}
        </Popup>
      }
      <ul className="review-feed">
        {
          reviews.map(review => (
            <UserReview key={review.id} review={review} />

          ))}
      </ul>

    </>

  )
}

export default ReviewFeed;
