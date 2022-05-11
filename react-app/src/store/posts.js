// import { csrfFetch } from "./csrf"

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

// TODO edit, delete
const initialState = {}

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      newState = {}
      action.posts.posts.forEach(post => { newState[post.id] = post });
      return newState
  }
}
