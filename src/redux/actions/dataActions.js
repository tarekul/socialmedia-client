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
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import Axios from "axios";

// Get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  Axios.get("/posts")
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.get(`/post/${postId}`).then((res) => {
    dispatch({ type: SET_POST, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  });
};

// Like a post
export const likePost = (postId) => (dispatch) => {
  return Axios.get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Unlike posts
export const unlikePost = (postId) => (dispatch) => {
  return Axios.get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

//submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  Axios.post(`/post/${postId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(removeErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
export const deletePost = (postId) => (dispatch) => {
  Axios.delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
      dispatch(removeErrors());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addPost = (body, formData) => (dispatch) => {
  //dispatch({ type: LOADING_DATA });
  let post;
  return Axios.post("/post", { body })
    .then((res) => {
      post = res.data;
    })
    .then(() => {
      if (formData) {
        return Axios.post(`/post/image/${post.postId}`, formData).then(
          (res) => (post.postImageUrl = res.data.postImageUrl)
        );
      }
    })
    .then(() => {
      dispatch({ type: ADD_POST, payload: post });
      dispatch(removeErrors);
      return "post successful";
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
      return err;
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  return Axios.get(`/user/${userHandle}`)
    .then((res) => dispatch({ type: SET_POSTS, payload: res.data.posts }))
    .catch(() => dispatch({ type: SET_POSTS, payload: null }));
};

export const removeErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
