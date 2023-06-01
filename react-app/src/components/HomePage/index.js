
import PostFeed from '../PostFeed';
import About from "../About";
import "./HomePage.css";

function HomePage() {

  return (
    <>
      <h1>Welcome to AirBeanb!</h1>
      <h2>Find bean farmers from around the world!</h2>

      <PostFeed />
      <About />
    </>
  )
}

export default HomePage
