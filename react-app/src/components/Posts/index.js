import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPosts } from '../../store/posts'
import "./Posts.css"

function Posts() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))
  // const postsObject = useSelector(state => state.posts)
  // const posts = Object.values(postsObject)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  return (
    <><h1>hello from posts</h1>
      {/* <p>hard coded. change later</p> */}
      <ul className="bean-feed" >
        {posts.map(post => (
          <li className="post-container" key={post.id}>
            <div>
              <h1>{post.product_name}</h1>
            </div>
          </li>
        ))}



        {/* <img className="bean" src="https://solidstarts.com/wp-content/uploads/Green-Bean-scaled.jpg"></img>
        <img className="bean" src="https://www.eatthis.com/wp-content/uploads/sites/4/2020/03/variety-of-beans.jpg?quality=82&strip=1"></img>
        <img className="bean" src="https://solidstarts.com/wp-content/uploads/Green-Bean-scaled.jpg"></img>
        <img className="bean" src="https://www.eatthis.com/wp-content/uploads/sites/4/2020/03/variety-of-beans.jpg?quality=82&strip=1"></img>
        <img className="bean" src="https://solidstarts.com/wp-content/uploads/Green-Bean-scaled.jpg"></img>
        <img className="bean" src="https://www.eatthis.com/wp-content/uploads/sites/4/2020/03/variety-of-beans.jpg?quality=82&strip=1"></img>
        <img className="bean" src="https://solidstarts.com/wp-content/uploads/Green-Bean-scaled.jpg"></img>
        <img className="bean" src="https://www.eatthis.com/wp-content/uploads/sites/4/2020/03/variety-of-beans.jpg?quality=82&strip=1"></img>
        <img className="bean" src="https://solidstarts.com/wp-content/uploads/Green-Bean-scaled.jpg"></img>
        <img className="bean" src="https://www.eatthis.com/wp-content/uploads/sites/4/2020/03/variety-of-beans.jpg?quality=82&strip=1"></img>
        <img className="bean" src="https://solidstarts.com/wp-content/uploads/Green-Bean-scaled.jpg"></img>
        <img className="bean" src="https://www.eatthis.com/wp-content/uploads/sites/4/2020/03/variety-of-beans.jpg?quality=82&strip=1"></img> */}
      </ul>
    </>

  )
}

export default Posts;
