import './RoundedImage.css'

import React from 'react'

const RoundedImage = ({className, src, alt, width}) => {
  return (
    <img  className={className} src={src} alt={alt} />
  )
}

export default RoundedImage