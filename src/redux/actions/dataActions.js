import {
  SET_POSTS,
  SET_POST,
  ADD_POST,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI
} from "../types";
import Axios from "axios";

// Get all posts
export const getPosts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  Axios.get("/posts")
    .then(res => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const getPost = postId => dispatch => {
  dispatch({ type: LOADING_UI });
  Axios.get(`/post/${postId}`).then(res => {
    dispatch({ type: SET_POST, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  });
};

// Like a post
export const likePost = postId => dispatch => {
  Axios.get(`/post/${postId}/like`)
    .then(res => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
// Unlike posts
export const unlikePost = postId => dispatch => {
  Axios.get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deletePost = postId => dispatch => {
  Axios.delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addPost = body => dispatch => {
  //dispatch({ type: LOADING_DATA });
  return Axios.post("/post", { body })
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      return err;
    });
};

export const removeErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
