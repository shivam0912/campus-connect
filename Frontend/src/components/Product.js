import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  const image = product.images && product.images[0] && product.images[0].image1

  return (
    <article className='product-card-modern'>
      <Link className='product-image-link' to={`/product/${product._id}`}>
        <img className='product-image' src={image} alt={product.name} loading='lazy' />
        <span className='category-pill'>{product.category}</span>
      </Link>
      <div className='product-card-body'>
        <div className='product-card-topline'>
          <span className='condition-label'>Pre-loved</span>
          {product.Cost.negotiable && <span className='negotiable-label'>Negotiable</span>}
        </div>
        <Link className='product-title-link' to={`/product/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className='product-description'>{product.description}</p>
        <div className='product-card-footer'>
          <div>
            <span className='price-caption'>Price</span>
            <strong className='product-price'>₹{Number(product.Cost.price).toLocaleString('en-IN')}</strong>
          </div>
          <Link className='view-product-button' to={`/product/${product._id}`} aria-label={`View ${product.name}`}>
            <i className='fas fa-arrow-right'></i>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Product
