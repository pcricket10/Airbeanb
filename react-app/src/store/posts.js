
import { CLEAR_STORE } from "./users"

const GET_POSTS = 'post/GET_POSTS'
const GET_USER_POSTS = 'post/GET_USER_POSTS'
const GET_ONE_POST = 'post/GET_ONE_POST'
const ADD_POST = 'post/ADD_POST'
const EDIT_POST = 'post/EDIT_POST'
const DELETE_POST = 'post/DELETE_POST'

const get_Posts = (posts) => ({
  type: GET_POSTS,
  posts
})
const get_One_Post = (post) => ({
  type: GET_ONE_POST,
  post
})
const get_User_Posts = (posts) => ({
  type: GET_USER_POSTS,
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

export const getOnePost = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`)
  if (response.ok) {
    const data = await response.json();
    dispatch(get_One_Post(data))
  }
}

export const getPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts/`);
  if (response.ok) {
    const data = await response.json();
    dispatch(get_Posts(data))
  }
}

export const getUserPosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/posts/`)
  console.log(response, "\n\n\n\n\n")
  if (response.ok) {
    const data = await response.json();
    dispatch(get_User_Posts(data))
  }
}

export const addPost = (postData) => async (dispatch) => {

  const { product_name, location, price, img_url } = postData

  console.log("attempting fetch")
  const response = await fetch('/api/posts/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      product_name,
      location,
      price,
      img_url
    })

  })
  if (response.ok) {
    const data = await response.json()
    dispatch(add_Post(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json()
    console.log(data.errors, "@####$#$Q$@#")
    if (data.errors) {
      return data.errors
    }
  } else {
    console.log("hit the else")
    return ['An error occurred. Please try again.']
  }
}

export const editPost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ product_name: post.product_name, location: post.location, img_url: post.img_url, price: post.price })
  })
  if (response.ok) {
    dispatch(edit_Post(post))
    return post;
  }
}

export const deletePost = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}/`, {
    method: 'DELETE'
  });
  if (response.ok) {
    dispatch(delete_Post(id))
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
    case GET_USER_POSTS:
      newState = {}
      action.posts.posts.forEach(post => { newState[post.id] = post })
      return newState
    case GET_ONE_POST:
      newState = { ...state }
      newState[action.post.id] = action.post
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
