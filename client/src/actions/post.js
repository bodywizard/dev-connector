import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, ADD_COMMENT, REMOVE_COMMENT } from './types';

/**
 * Get Posts
 */
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
}

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
};

// Add post
export const addPost = formData => async dispatch => {
  try {
    const res = await axios.post('/api/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    const { statusText: msg, status } = err.response;
    const { errors } = err.response.data;
    if (errors) {
      for (let error of errors) { dispatch(setAlert(error.msg, 'danger')); }
    }
    dispatch({ type: POST_ERROR, payload: { msg, status } })
  }
};