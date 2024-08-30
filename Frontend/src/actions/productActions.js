import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_SUCCESS,
} from '../types/productConstants';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_RESET });
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `${API_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    await axios.delete(`${API_URL}/api/products/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const createProduct = (
  name,
  image1,
  description,
  category,
  expiresOn,
  address,
  shippingCharge,
  price,
  negotiable
) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/products`,
      {
        name,
        images: [{ image1 }],
        description,
        category,
        expiresOn,
        address,
        shippingCharge,
        price,
        negotiable,
      },
      config
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateProduct = (
  id,
  name,
  image1,
  description,
  category,
  expiresOn,
  address,
  shippingCharge,
  price,
  negotiable
) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const { data } = await axios.put(
      `${API_URL}/api/products/${id}`,
      {
        name,
        images: [{ image1: image1 }],
        description,
        category,
        expiresOn,
        address,
        shippingCharge,
        price,
        negotiable,
      },
      config
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const createProductReview = (productId, comment) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_REQUEST });
    const {
      userLogin: { userData },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };
    await axios.post(
      `${API_URL}/api/products/${productId}/reviews`,
      { comment },
      config
    );
    dispatch({ type: PRODUCT_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
