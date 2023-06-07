
import PostFeed from '../PostFeed';
import About from "../About";
import "./HomePage.css";

function HomePage() {

  return (
    <>
      <div className='main'>
        <div className='total-price'>
          Display total price   |   includes all fees, before taxes (@)__)
        </div>
        <PostFeed />
      </div>
      <About />
    </>
  )

}

export default HomePage
