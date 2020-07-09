import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import LikeButton from "../Likebutton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
//MUI stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

//icons
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

//redux
import { connect } from "react-redux";
import { getPost, removeErrors } from "../../redux/actions/dataActions";
import theme from "../../utils/theme";

const styles = {
  ...theme,
  profileImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },
  dialogContent: {
    "@media (max-width:600px)": {
      padding: 0,
    },
    wordBreak: "break-all",
  },
  expandButton: {
    float: "right",
  },
  closeBut: {
    position: "absolute",
    right: 14,
    top: 8,
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
};

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, postId } = this.props;
    const newPath = `/users/${userHandle}/post/${postId}`;
    this.setState({ newPath });
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);

    this.setState({ open: true });
    this.setState({ oldPath });
    //setnewPath(newPath);
    this.props.getPost(this.props.postId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.removeErrors();
  };

  render() {
    let fullScreen;
    if (window.matchMedia("(max-width: 600px)").matches) {
      /* The viewport is less than, or equal to, 600 pixels wide */
      fullScreen = true;
    } else {
      /* The viewport is greater than 600 pixels wide */
      fullScreen = false;
    }
    const {
      classes,
      post,
      UI: { loading },
    } = this.props;

    const dialogMarkup =
      !loading && this.state.open ? (
        <>
          <Card className={classes.dialogCard}>
            <CardHeader
              className={classes.cardHead}
              avatar={
                <Avatar
                  alt="profile pic"
                  src={post.userImage}
                  className={classes.bigAvatar}
                />
              }
              action={
                <MyButton
                  tip="cancel"
                  btnClassName={classes.closeBut}
                  onClick={this.handleClose}
                >
                  <CloseIcon className={classes.closeButton} />
                </MyButton>
              }
              title={
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/users/${post.userHandle}`}
                  color="primary"
                >
                  {post.userHandle}
                </Typography>
              }
              subheader={dayjs(post.createdAt).format("h:mm a, MMMM DD YYYY")}
            />

            <CardContent>
              <Typography variant="body1" style={{ paddingLeft: "14px" }}>
                {post.body}
              </Typography>
              <LikeButton postId={post.postId} />
              <span>{post.likeCount} Likes</span>
              <MyButton tip="comments">
                <ChatIcon color="primary" />
              </MyButton>
              <span>{post.commentCount} comments</span>
            </CardContent>
          </Card>

          <Comments comments={post.comments} />
          <CommentForm postId={post.postId} />
        </>
      ) : (
        <div className={classes.spinnerDiv}>
          <CircularProgress size={150} thickness={2} />
        </div>
      );
    return (
      <>
        <MyButton
          tip="Expand post"
          tipClassName={classes.expandButton}
          onClick={this.handleOpen}
        >
          <UnfoldMoreIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          fullScreen={fullScreen}
        >
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  removeErrors: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
  removeErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
