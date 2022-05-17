import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost } from "../../store/posts";
import "./PostForm.css"

const PostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      productName, price, imgUrl
    }

    const response = await dispatch(addPost(newPost))
    history.push("/")
    if (response.errors) {
      setErrors(response.errors)
    }
  }
  return (
    <div className="post-form-modal">
      <h1>Post New Listing</h1>
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
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )

}
export default PostForm
