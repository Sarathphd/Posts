import { LIST_POST_SUCCESS, LIST_POST_FAIL, CREATE_SUCCESS, CREATE_FAIL, } from './../constants/actionTypes';
import api from './api';

export const create = (data) => async dispatch => {
  try {
    const res = api({ contentType: true }).post("/posts", data)
    .then((response) => {
      dispatch(getAll());
    })
    dispatch({
      type: CREATE_SUCCESS
    });
  } catch (error) {
  }
}

export const getAllListUsers = (page) => async dispatch => {

  try {
    const res = await api({ contentType: true }).get(`posts?_start=${page}&_limit=10`);
    dispatch({
      type: LIST_POST_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LIST_USER_FAIL
    });
  }
}
