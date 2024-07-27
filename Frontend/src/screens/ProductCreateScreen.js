import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [images, setImages] = useState('')
  const [uploading, setUploading] = useState(false)

  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [expiresOn, setExpiresOn] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [shippingCharge, setShippingCharge] = useState('')

  const [price, setPrice] = useState(0)
  const [negotiable, setNegotiable] = useState(false)

  const dispatch = useDispatch()
  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, success } = productCreate
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin

  useEffect(() => {
    if (success || !userData) {
      history.push('/')
    }
  }, [history, success, userData])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'qwdzopo4')
    setUploading(true)
    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dh3bp7vbd/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setImages(res.data.url)
    } catch (error) {
      console.error(error)
    }
    setUploading(false)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct(
        name,
        images,
        description,
        category,
        expiresOn,
        shippingAddress,
        shippingCharge,
        price,
        negotiable
      )
    )
  }

  return (
    <div className="container">
      <FormContainer>
        <div className="form-wrapper" style={{ backgroundColor: '#c3e8ff', 
        
            padding: '20px', borderRadius: '10px' }}>
          <h1 className="text-center mb-4">Upload Your Property</h1>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name of the property</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter what product do you have'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ backgroundColor: 'white', color: 'black', padding:'10px'}}
              />
            </Form.Group>

            <Form.Group controlId='images'>
              <Form.Label>Image <span className="small-text">(Upload Image only)</span></Form.Label>
              <Row>
                <Col xs={12} md={6}>
                  <Form.File
                    onChange={uploadFileHandler}
                    id='image-file'
                    label='Choose File'
                    custom
                    accept="image/*"
                    style={{ display: 'none' , padding:'10px'}} // Hide the default input
                  />
                  <label htmlFor="image-file" className="custom-file-upload"
                  style={{fontSize:'9px',borderRadius:'10px',cursor:'pointer', background:'green', padding:'10px',margin:'10px',color:'#fff'}}
                  >
                    Browse
                  </label>
                </Col>
                {images && (
                  <Col xs={12} md={6} className="mt-2">
                    <img src={images} className="uploaded-image" alt='Uploaded' />
                  </Col>
                )}
              </Row>
              {uploading && <Loader />}
            </Form.Group>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter category like: electronics, books, Furniture..'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    style={{ backgroundColor: 'white', color: 'black', padding:'10px' }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId='expiresOn'>
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type='date'
                    value={expiresOn}
                    onChange={(e) => setExpiresOn(e.target.value)}
                    required
                    style={{ backgroundColor: 'white', color: 'black', padding:'10px' }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter description'
                rows='3'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ backgroundColor: 'white', color: 'black' , padding:'10px'}}
              />
            </Form.Group>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{ backgroundColor: 'white', color: 'black', padding:'10px' }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId='negotiable'>
                  <Form.Check
                    type='checkbox'
                    label='Negotiable Price'
                    checked={negotiable}
                    onChange={(e) => setNegotiable(e.target.checked)}
                    style={{ backgroundColor: 'white', color: 'black'}}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId='shippingaddress'>
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter delivery address'
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                    style={{ backgroundColor: 'white', color: 'black', padding:'10px' }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId='shippingCharge'>
                  <Form.Label>Shipping Charge</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter shipping charge'
                    value={shippingCharge}
                    onChange={(e) => setShippingCharge(e.target.value)}
                    required
                    style={{ backgroundColor: 'white', color: 'black', padding:'10px' }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type='submit' variant='primary' className="mt-3" 
            style={{margin:'0 150px', fontSize:'12px'}}
            >
              Upload Property
            </Button>
          </Form>
        </div>
      </FormContainer>
    </div>
  )
}

export default ProductCreateScreen
