import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getPostReviews } from "../../store/reviews";
import Popup from "reactjs-popup";
import "./ReviewFeed.css"
import UserReview from "../UserReview";
import ReviewForm from "../ReviewForm";

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
    <><h1>hello from reviews</h1>
      <ul className="review-feed">

        <Popup trigger={<button className="review-button">Leave a review</button>} modal nested>
          <ReviewForm postId={postId} />
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
