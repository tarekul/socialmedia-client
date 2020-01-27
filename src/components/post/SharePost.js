import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MyButton from "../../utils/MyButton";
//Redux
import { connect } from "react-redux";
import { addPost } from "../../redux/actions/dataActions";
//MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
//Icons
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    margin: 0,
    padding: 16
  },
  closeButton: {
    position: "absolute",
    right: 14,
    top: 8
  }
});

function SharePost(props) {
  const { openDialog, closeDialog, classes } = props;
  const [newPost, setPost] = useState("");

  const handleChange = event => {
    setPost(event.target.value);
  };

  const handleSubmit = () => {
    props
      .addPost(newPost)
      .then(res => (res === undefined ? closeDialog() : null));
  };

  return (
    <Dialog
      open={openDialog}
      onClose={e => closeDialog()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Post</DialogTitle>
      <MyButton
        tip="cancel"
        btnClassName={classes.closeButton}
        onClick={e => closeDialog()}
      >
        <CloseIcon />
      </MyButton>
      <DialogContent>
        <form>
          <TextField
            type="text"
            placeholder="What's on your mind?"
            fullWidth
            multiline
            rowsMax="4"
            onChange={handleChange}
            value={newPost}
            error={props.UI.errors.error ? true : false}
            helperText={props.UI.errors.error}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Post</Button>
      </DialogActions>
    </Dialog>
  );
}
const mapStateToProps = state => ({
  UI: state.UI
});
export default connect(mapStateToProps, { addPost })(
  withStyles(styles)(SharePost)
);
