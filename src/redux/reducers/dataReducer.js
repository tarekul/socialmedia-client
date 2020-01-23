import {
  SET_POSTS,
  SET_POST,
  ADD_POST,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case SET_POST:
      state.post = action.payload;
      return {
        ...state
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts]
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        const comments = state.post.comments;
        state.post = action.payload;
        state.post.comments = comments;
      }

      return {
        ...state
      };
    case SUBMIT_COMMENT:
      // const idx = state.posts.findIndex(
      //   post => post.postId === action.payload.postId
      // );

      //state.posts[idx].commentCount = state.posts[idx].commentCount + 1;
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    case DELETE_POST:
      let i = state.posts.findIndex(post => post.postId === action.payload);
      state.posts.splice(i, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}
