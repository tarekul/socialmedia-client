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
import Avatar from "@material-ui/core/Avatar";
//Icons
import CloseIcon from "@material-ui/icons/Close";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 16,
  },
  closeButton: {
    position: "absolute",
    right: 14,
    top: 8,
  },
  photo: {
    maxWidth: 550,
    maxHeight: 400,
    "@media (max-width:600px)": {
      maxWidth: 300,
      maxHeight: 200,
    },
  },
  cancelPic: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "lightgrey",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  },
});

function SharePost(props) {
  const { openDialog, closeDialog, classes, imageUrl } = props;
  const [newPost, setPost] = useState("");
  const [imageForm, setImageForm] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setPost(event.target.value);
  };

  const handleSubmit = () => {
    props.addPost(newPost, imageForm).then((res) => {
      if (res !== undefined) {
        console.log(res);
        closeDialog();
      }
    });
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInputTwo");
    fileInput.click();
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImage(URL.createObjectURL(image));

    const formData = new FormData();
    formData.append("image", image, image.name);
    setImageForm(formData);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={(e) => closeDialog()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Post</DialogTitle>
      <MyButton
        tip="cancel"
        btnClassName={classes.closeButton}
        onClick={(e) => closeDialog()}
      >
        <CloseIcon />
      </MyButton>
      <DialogContent>
        <form>
          <div style={{ display: "flex" }}>
            <Avatar style={{ marginRight: 10 }} src={imageUrl}></Avatar>
            <TextField
              type="text"
              placeholder="What's on your mind?"
              fullWidth
              multiline
              rows={4}
              rowsMax="4"
              onChange={handleChange}
              value={newPost}
              error={props.UI.errors.error ? true : false}
              helperText={props.UI.errors.error}
            />
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            {image && <img src={image} className={classes.photo} />}
            {image && (
              <MyButton
                tip="remove image"
                btnClassName={classes.cancelPic}
                onClick={() => setImage(null)}
              >
                <CloseIcon />
              </MyButton>
            )}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <input
          id="imageInputTwo"
          type="file"
          hidden="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
        <MyButton tip="select an image" onClick={handleEditPicture}>
          <AddAPhotoIcon />
        </MyButton>
        <Button onClick={handleSubmit}>Post</Button>
      </DialogActions>
    </Dialog>
  );
}
const mapStateToProps = (state) => ({
  imageUrl: state.user.credentials.imageUrl,
  UI: state.UI,
});
export default connect(mapStateToProps, { addPost })(
  withStyles(styles)(SharePost)
);
