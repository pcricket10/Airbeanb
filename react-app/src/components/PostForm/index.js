import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../store/posts";

const PostForm = () => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      productName, price
    }

    const response = await dispatch(addPost(newPost))
    // if (response.errors) {
    //   setErrors(response.errors)
    // }
  }
  return (
    <>
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
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </>
  )

}
export default PostForm
