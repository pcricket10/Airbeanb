import React from "react";
import './About.css';
import GHLogo from './GitHub-Mark-64px.png'
import LILogo from './LI-In-Bug.png'
function About() {
  return (

    <div className="about">

      <div>
        <p className="name"> Philip McCrickard</p>
      </div>

      <ul className="logos">
        <li>

          <a href="https://github.com/pcricket10/Airbeanb">
            <img src={GHLogo} className="logo" alt="Github Logo" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/pcricket10/">
            <img src={LILogo} className="logo" alt="LinkedIn Logo" />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default About;
