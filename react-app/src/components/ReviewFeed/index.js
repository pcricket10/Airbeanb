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
  const posts = useSelector(state => Object.values(state.posts))
  const reviews = useSelector(state => Object.values(state.reviews))
  console.log(postId, "POST ID")

  useEffect(() => {
    dispatch(getPostReviews(postId))
  }, [dispatch])

  // const postsObject = useSelector(state => state.posts)
  // const posts = Object.values(postsObject)


  return (
    <><h2>reviews</h2>
      <ul className="review-feed">
        <Popup trigger={<button className="review-button">Leave a review</button>} modal nested>
          {close => <ReviewForm postId={postId} close={close} />}
        </Popup>

        {
          reviews.map(review => (
            <UserReview review={review} />

          ))}
      </ul>

    </>

  )
}

export default ReviewFeed;
