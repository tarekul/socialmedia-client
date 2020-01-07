import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST } from "../types";
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
      dispatch(getPosts());
    })
    .catch(err => {
      console.log(err);
    });
};
