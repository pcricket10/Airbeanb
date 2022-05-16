import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../store/posts";

const EditForm = () => {
  const { postId } = useParams()
  const post = useSelector(state => state.posts[+postId])
  const dispatch = useDispatch();
  const history = useHistory();
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedPost = {
      ...post,
      productName, price, imgUrl
    }

    const response = await dispatch(editPost(postId))
    history.push(`/posts/${postId}`)
    if (response?.errors) {
      setErrors(response.errors)
    }
  }
  return (
    <>
      <h1>Edit</h1>
      <form className="post-form">
        <div>
          <label>Product Name</label>
          <input type="text" value={productName} onChange={e => setProductName(e.target.value)} required></input>
        </div>
        <div>
          <label>Price</label>
          <input type="decimal" value={price} onChange={e => setPrice(e.target.value)} required></input>

        </div>
        <div>
          <label>Image Url</label>
          <input type="text" value={imgUrl} onChange={e => setImgUrl(e.target.value)} required></input>

        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Edit</button>
        </div>
      </form>
    </>
  )

}
export default EditForm
