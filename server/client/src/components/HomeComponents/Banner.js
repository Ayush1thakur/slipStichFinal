import './banner.css';
import Image from '../Layout/Image';
import { NavHashLink } from 'react-router-hash-link';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-left">
        <h1 className="banner-heading">
          Crafting Beauty, One Stitch at a Time
        </h1>
        <div className="banner-buttons">
          <button className="shop-btn tone-down">Shop Now</button>
          <NavHashLink to="/#about-us"><button className="learn-btn tone-up">Learn More</button></NavHashLink>
        </div>
      </div>
      <div className="banner-right">
        <Image />
      </div>
    </div>
  );
};

export default Banner;
