import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    let recentPostMarkup = !loading ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <CircularProgress />
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPostMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI
});
export default connect(mapStateToProps, { getPosts })(home);
