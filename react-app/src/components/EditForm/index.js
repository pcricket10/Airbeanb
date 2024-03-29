import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editPost } from "../../store/posts";

const EditForm = ({ close }) => {
  const { postId } = useParams()
  const post = useSelector(state => state.posts[+postId])
  const dispatch = useDispatch();
  const [product_name, setProduct_name] = useState(post.product_name)
  const [location, setLocation] = useState(post.location)
  const [price, setPrice] = useState(post.price)
  const [img_url, setImg_url] = useState(post.img_url)
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedPost = {
      ...post,
      product_name, location, price, img_url
    }


    const data = await dispatch(editPost(editedPost))

    if (data) {
      setErrors(data)
    } else {
      close()
    }
  }
  return (
    <>
      <h1>Edit</h1>
      <form className="post-form">
        <div className='errors'>
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Product Name</label>
          <input type="text" value={product_name} onChange={e => setProduct_name(e.target.value)} required></input>
        </div>
        <div>
          <label>Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} required></input>
        </div>
        <div>
          <label>Price</label>
          <input type="decimal" value={price} onChange={e => setPrice(e.target.value)} required></input>

        </div>
        <div>
          <label>Image Url</label>
          <input type="text" value={img_url} onChange={e => setImg_url(e.target.value)} required></input>

        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Edit</button>
        </div>
      </form>
    </>

  )

}
export default EditForm
