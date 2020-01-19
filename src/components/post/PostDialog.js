import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
//MUI stuff
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

//redux
import { connect } from "react-redux";
import { getPost } from "../../redux/actions/dataActions";

const styles = {
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  expandButton: {
    float: "right"
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  closeButton: {
    position: "absolute",
    right: 14,
    top: 8
  }
};
export class PostDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  };

  handleClose = () => this.setState({ open: false });

  render() {
    const {
      classes,
      post,
      UI: { loading }
    } = this.props;

    const dialogMarkup =
      !loading && this.state.open ? (
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <img
              src={post.userImage}
              alt="Profile"
              className={classes.profileImage}
            />
          </Grid>
          <Grid item sm={7}>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/users/${post.userHandle}`}
            >
              @{post.userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography color="textSecondary" variant="body2">
              {dayjs(post.createdAt).format("h:mm a, MMMM DD YYYY")}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{post.body}</Typography>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress size={200} />
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
        >
          <MyButton
            tip="cancel"
            btnClassName={classes.closeButton}
            onClick={this.handleClose}
          >
            <CloseIcon className={classes.closeButton} />
          </MyButton>
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
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});

export default connect(mapStateToProps, { getPost })(
  withStyles(styles)(PostDialog)
);
