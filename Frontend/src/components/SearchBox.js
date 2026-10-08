import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../App.css'; // Import the CSS file

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <div className="SearchBox">
      <Form onSubmit={submitHandler} inline className='search-form'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search campus items'
          className='search-input'
        ></Form.Control>
        <Button type='submit' className='search-button' aria-label='Search products'>
          <i className='fas fa-search'></i>
        </Button>
      </Form>
    </div>
  )
}

export default SearchBox
