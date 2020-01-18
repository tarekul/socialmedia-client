import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../utils/MyButton";
import PropTypes from "prop-types";
//MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

//icons
import DeleteIcon from "@material-ui/icons/DeleteOutline";

//redux
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    float: "right"
  }
};

function DeletePost(props) {
  const [open, setOpen] = useState(false);

  const { authenticated, handle, userHandle, postId, classes } = props;

  const deleteButton =
    authenticated && handle === userHandle ? (
      <MyButton
        tip="Delete Post"
        onClick={e => setOpen(true)}
        tipClassName={classes.deleteButton}
      >
        <DeleteIcon color="secondary" />
      </MyButton>
    ) : null;

  const handleDelete = () => {
    props.deletePost(postId);
  };
  return (
    <>
      {deleteButton}
      <Dialog open={open} onClose={e => setOpen(false)} maxWidth="sm">
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={e => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  deletePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(DeletePost));
