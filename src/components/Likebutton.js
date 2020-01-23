import React, { Component } from "react";
import MyButton from "../utils/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
//redux
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

export class LikeButton extends Component {
  state = {
    buttonDisable: false
  };
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.postId)
    ) {
      return true;
    } else return false;
  };
  likePost = () => {
    this.setState({ buttonDisable: true });
    this.props
      .likePost(this.props.postId)
      .then(() => this.setState({ buttonDisable: false }));
  };
  unlikePost = () => {
    this.setState({ buttonDisable: true });
    this.props
      .unlikePost(this.props.postId)
      .then(() => this.setState({ buttonDisable: false }));
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedPost() ? (
      <MyButton
        tip="Undo like"
        onClick={this.unlikePost}
        buttonDisable={this.state.buttonDisable}
      >
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton
        tip="Like"
        onClick={this.likePost}
        buttonDisable={this.state.buttonDisable}
      >
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
