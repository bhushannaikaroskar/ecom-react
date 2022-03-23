import React from 'react'

export default function CategoryCard({title,imageLink}) {
  return (
    <div className="img-card">
        <div className="img-wrap">
            <img className="img" src={imageLink} alt="product-img"/>
        </div>
        <div className="card-overlay">
            <h2 className="font-xx-large">{title}</h2>
        </div>
    </div>
  )
}
