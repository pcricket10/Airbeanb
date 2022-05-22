import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Popup from "reactjs-popup";
import { deletePost, getOnePost, getPosts } from '../../store/posts';
import DeleteForm from '../DeleteForm';
import EditForm from '../EditForm';
import ReviewFeed from '../ReviewFeed';
import "./UserPost.css";

function UserPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const posts = useSelector(state => state.posts)
  const { postId } = useParams()
  // const [userName, setUserName] = useState("")
  const [loaded, setLoaded] = useState(false)


  // const [posts[postId], setposts[postId]] = useState(posts[postId])
  // useEffect(() => {
  //   dispatch(getPosts())

  // }, [dispatch])

  useEffect(() => {
    dispatch(getPosts())
    setLoaded(true)

  }, [dispatch])

  const post = posts[postId]
  console.log(post)
  const userName = post?.user?.username



  // useEffect(() => {

  //   if (posts[postId]) {
  //     const user = fetchUser(posts[postId])
  //     setUserName(user.userName)
  //     setLoaded(true)
  //   }

  //   return () => {
  //     console.log("hi")
  //   }
  //   // console.log(data, "DATA DATA DATA")

  // }, [posts])




  const handleEdit = async (e) => {
    e.preventDefault();
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(postId))
    history.push('/')
  }

  console.log(postId)




  const createdAt = new Date(post?.created_at).toLocaleString()
  const updatedAt = new Date(post?.updated_at).toLocaleString()
  return loaded && (

    <div className="bean-container">
      {!posts[postId] && <h1>404. Item not found</h1>}
      {posts[postId] &&

        <><h2 className="bean-created">
          Created: {createdAt} {createdAt !== updatedAt ? <>(Edited: {updatedAt})</> : ""} by {userName ? userName : "loading"}

        </h2>
          <h2>

          </h2>
          <h1 className="bean-title">{post?.product_name}</h1>
          <div className="img-detail-container">
            <img className="bean-post" src={post?.img_url}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"
              }}
              alt={posts[postId]?.product_name} />
            <div className="detail-container">


              <p>${posts[postId]?.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} </p>
              <p>Located at {posts[postId]?.location}</p>
            </div>

          </div>

          {(posts[postId]?.user_id === user?.id) &&
            <div className="edit-delete-post-buttons">
              <Popup trigger={<button className="edit-button" onClick={handleEdit}>Edit</button>} modal nested>
                {close => <EditForm close={close} />}
              </Popup>

              <Popup trigger={<button className="delete-button" onClick={handleDelete}>Delete</button>} modal nested>
                <DeleteForm />
              </Popup>
            </div>

          }
          <ReviewFeed postId={postId} />
        </>
      }
    </div>



  )
  // console.log(post, "POST")
  // return (<h1>hi</h1>)

}
export default UserPost;
