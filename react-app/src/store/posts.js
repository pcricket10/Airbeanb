// import { csrfFetch } from "./csrf"
import { CLEAR_STORE } from "./users"

const GET_POSTS = 'posts/loadPosts'
const ADD_POST = 'posts/addPost'
const EDIT_POST = 'posts/editPost'
const DELETE_POST = 'posts/deletePost'

const get_Posts = (posts) => ({
  type: GET_POSTS,
  posts
})

const add_Post = (post) => ({
  type: ADD_POST,
  post
})

const edit_Post = (post) => ({
  type: EDIT_POST,
  post
})
const delete_Post = (id) => ({
  type: DELETE_POST,
  id
})

export const getPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts/`);
  if (response.ok) {
    const data = await response.json();
    dispatch(get_Posts(data))
  }
}
export const addPost = (postData) => async (dispatch) => {

  const { productName, price } = postData


  const response = await fetch('/api/posts/', {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      productName,
      price
    })

  })
  if (response.ok) {
    const post = await response.json()
    dispatch(add_Post(post))
    return post
  } else {
    const errors = await response.json()
    console.log(errors)
    return { errors: errors }
  }
}
const initialState = {}

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = {}
      action.posts.posts.forEach(post => { newState[post.id] = post });
      return newState
    case ADD_POST:
      newState = { ...state }
      newState[action.post.id] = action.post
      return newState
    case EDIT_POST:
      newState = { ...state }
      newState[action.post.id] = action.post
      return newState
    case DELETE_POST:
      newState = { ...state }
      delete newState[action.id]
      return newState
    case CLEAR_STORE:
      return initialState
    default:
      return state;


  }
}
