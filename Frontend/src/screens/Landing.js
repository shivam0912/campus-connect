import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../types/productConstants'
const Landing = ({  match }) => {
  
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products = [], page, pages } = productList
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div className='landing-page'>
      <Meta />
      {!keyword && (
        <section className='hero-section'>
          <div className='hero-copy'>
            <span className='eyebrow'>Made for campus life</span>
            <h1>Good things deserve a second semester.</h1>
            <p>Buy and sell useful items within your campus community. Less waste, fair prices, and no marketplace noise.</p>
            <div className='hero-actions'>
              <LinkContainer to={userData ? '/createproduct' : '/register'}>
                <Button className='primary-cta'>{userData ? 'List an item' : 'Join the community'}</Button>
              </LinkContainer>
              <a className='secondary-cta' href='#marketplace'>Browse listings <i className='fas fa-arrow-down'></i></a>
            </div>
            <div className='trust-row'>
              <span><i className='fas fa-shield-alt'></i> Private contact details</span>
              <span><i className='fas fa-leaf'></i> Sustainable exchange</span>
            </div>
          </div>
          <div className='hero-panel'>
            <div className='hero-orbit orbit-one'></div>
            <div className='hero-orbit orbit-two'></div>
            <div className='hero-stat-card hero-stat-main'>
              <span className='stat-icon'><i className='fas fa-university'></i></span>
              <strong>Campus-first</strong>
              <small>A focused marketplace for student essentials.</small>
            </div>
            <div className='hero-stat-card hero-stat-small'>
              <strong>{products.length || '—'}</strong>
              <small>items on this page</small>
            </div>
          </div>
        </section>
      )}

      <section className='category-strip' aria-label='Popular categories'>
        {['Books', 'Electronics', 'Study gear', 'Room essentials'].map((category, index) => (
          <span key={category}><i className={`fas ${['fa-book-open', 'fa-laptop', 'fa-drafting-compass', 'fa-chair'][index]}`}></i>{category}</span>
        ))}
      </section>

      <section id='marketplace' className='marketplace-section'>
        <div className='section-heading'>
          <div>
            <span className='eyebrow'>{keyword ? 'Search results' : 'Fresh on campus'}</span>
            <h2>{keyword ? `Results for “${keyword}”` : 'Latest listings'}</h2>
          </div>
          <div className='listing-actions'>
            {keyword && <Link className='clear-search' to='/'>Clear search</Link>}
            <LinkContainer to={userData ? '/createproduct' : '/login'}>
              <Button className='list-item-button'><i className='fas fa-plus'></i> List an item</Button>
            </LinkContainer>
          </div>
        </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='product-grid'>
  {products.map((product) => (
    <Col key={product._id} sm={12} md={6} lg={4} className='product-column'>
      <Product product={product} />
    </Col>
  ))}
</Row>
          <Paginate
            className='paginate'
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
      </section>
    </div>
  )
}
export default Landing
