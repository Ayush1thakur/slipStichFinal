import React from 'react'
import "./imageContainer.css";

const ImageContainer = ({imageSource}) => {
  return (
    <div className='image-container'>
      <img className='image' src={imageSource} alt="" />
    </div>
  )
}

export default ImageContainer
