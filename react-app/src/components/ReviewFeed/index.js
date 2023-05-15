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

  const reviewsSum = reviews.reduce((acc, obj) => acc + obj.star_rating, 0);
  const reviewAverage = reviewsSum / reviews.length;


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
        <p>average: {reviewAverage}</p>
        {

          reviews.map(review => (
            <UserReview key={review.id} review={review} />

          ))}
      </ul>

    </>

  )
}

export default ReviewFeed;
