import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getPosts } from '../../store/posts'
import "./PostFeed.css"

function PostFeed() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.posts))

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  return (
    <>

      <ul className="bean-feed" >
        {posts.map(post => (
          <li className="post-container" key={post.id}>
            <div>
              <h1 className="product-name">{post.product_name}</h1>
              <NavLink to={`/posts/${post.id}`}>
                <img className="bean" src={post.img_url} alt={post.product_name}></img>
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </>

  )
}

export default PostFeed;
