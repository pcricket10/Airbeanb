import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost } from "../../store/posts";
import "./PostForm.css";

const PostForm = ({ close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [product_name, setProduct_name] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [img_url, setImg_url] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      product_name, location, price, img_url
    }

    const data = await dispatch(addPost(newPost))
    if (data) {
      setErrors(data)
    } else {
      close();

    }
    history.push("/")
  }


  return (
    <div className="post-form-modal">
      <h2 className="modal-title">Post New Listing</h2>

      <form className="post-form">
        <div className="errors">
          {errors?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <input
          name="product_name"
          type="text"
          placeholder="Product Name"
          value={product_name}
          onChange={e => setProduct_name(e.target.value)}
          required>

        </input>
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required>
        </input>
        <input
          name="price"
          type="decimal"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required>
        </input>


        <input
          name="img_url"
          type="text"
          placeholder="Image URL"
          value={img_url}
          onChange={e => setImg_url(e.target.value)}
          required></input>

        <div>
          <button className="submit" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )

}
export default PostForm
