import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { submitComment } from "../../redux/actions/dataActions";

import theme from "../../utils/theme";
//MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//Redux
import { connect } from "react-redux";

const styles = { ...theme };

function CommentForm(props) {
  const { authenticated, submitComment, postId, classes } = props;
  const [body, setbody] = useState("");
  const [errors, seterrors] = useState(props.UI.errors);

  useEffect(() => {
    seterrors(props.UI.errors);
  }, [props.UI.errors]);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(postId, { body: body });
    setbody("");
  };
  const commentFormMarkup = authenticated ? (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on post"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={(e) => setbody(e.target.value)}
          fullWidth
          className={classes.textField}
          autoComplete="off"
        />
        <hr className={classes.invisibleSeparator} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </>
  ) : null;
  return commentFormMarkup;
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
