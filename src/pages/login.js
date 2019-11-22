import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.pageStyles
});

function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) {
      seterrors(props.UI.errors);
    }
  }, [props.UI.errors]);

  const handleSubmit = event => {
    event.preventDefault();
    //this.setState({ loading: true });
    const userData = {
      email: email,
      password: password
    };
    props.loginUser(userData, props.history);
  };
  const handleChange = e => {
    e.target.name === "email"
      ? setemail(e.target.value)
      : setpassword(e.target.value);
    // this.setState({
    //   [event.target.name]: event.target.value
    // });
  };

  const {
    classes,
    UI: { loading }
  } = props;
  //const { errors } = this.state;
  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src={AppIcon} alt="mailbox" className={classes.image} />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.button}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            don't have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});
const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
