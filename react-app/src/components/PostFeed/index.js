import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPosts } from '../../store/posts';
import "./PostFeed.css";

function PostFeed() {
  const dispatch = useDispatch();

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
              <h2 className="product-name">{post.product_name}</h2>
              <NavLink to={`/posts/${post.id}`} className="bean-link">
                <img className="bean-homepage" src={post.img_url}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
                  }}
                  alt={post.product_name}></img>
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </>

  )
}

export default PostFeed;
