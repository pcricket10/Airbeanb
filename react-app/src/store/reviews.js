// import { csrfFetch } from "./csrf"
import { CLEAR_STORE } from "./users"

const GET_REVIEWS = 'review/GET_REVIEWS'
const GET_POST_REVIEWS = 'review/GET_POST_REVIEWS'
const GET_ONE_REVIEW = 'review/GET_ONE_REVIEW'
const ADD_REVIEW = 'review/ADD_REVIEW'
const EDIT_REVIEW = 'review/EDIT_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'

const get_Reviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})
const get_One_Review = (review) => ({
  type: GET_ONE_REVIEW,
  review
})
const get_Post_Reviews = (reviews) => ({
  type: GET_POST_REVIEWS,
  reviews
})

const add_Review = (review) => ({
  type: ADD_REVIEW,
  review
})

const edit_Review = (review) => ({
  type: EDIT_REVIEW,
  review
})
const delete_Review = (id) => ({
  type: DELETE_REVIEW,
  id
})



export const getPostReviews = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}/reviews/`)
  console.log(response, "\n\n\n\n\n")
  if (response.ok) {
    const data = await response.json();
    dispatch(get_Post_Reviews(data))
  }
}

export const addReview = (reviewData) => async (dispatch) => {

  const { content } = reviewData


  const response = await fetch('/api/reviews/new', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content
    })

  })
  if (response.ok) {
    const review = await response.json()
    dispatch(add_Review(review))
    return review
  } else {
    const errors = await response.json()
    console.log(errors)
    return { errors: errors }
  }
}

export const editReview = (review) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${review.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content })
  })
  if (response.ok) {
    dispatch(edit_Review(review))
    return review;
  }
}

export const deleteReview = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}/`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(delete_Review(id))
  }

}
const initialState = {}

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = {}
      action.reviews.reviews.forEach(review => { newState[review.id] = review });
      return newState
    case GET_POST_REVIEWS:
      newState = {}
      action.reviews.reviews.forEach(review => { newState[review.id] = review })
      return newState
    case GET_ONE_REVIEW:
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState
    case ADD_REVIEW:
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState
    case EDIT_REVIEW:
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState
    case DELETE_REVIEW:
      newState = { ...state }
      delete newState[action.id]
      return newState
    case CLEAR_STORE:
      return initialState
    default:
      return state;


  }
}
