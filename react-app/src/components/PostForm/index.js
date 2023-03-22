import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost } from "../../store/posts";
import { useDropzone } from 'react-dropzone';
import AWS from 'aws-sdk';
import "./PostForm.css";


const PostForm = ({ close }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [product_name, setProduct_name] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [img_url, setImg_url] = useState('')
  //files
  const [errors, setErrors] = useState([])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // const files = acceptedFiles.map(file => {
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // });
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
      <h1>Post New Listing</h1>

      <form className="post-form">
        <div className="errors">
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
        {/* adding dropzone here */}
        <div>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>

        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )

}
export default PostForm
