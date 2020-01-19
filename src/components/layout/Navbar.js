import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";

//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//Redux stuff
import { connect } from "react-redux";
//Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

import SharePost from "../post/SharePost";
import { removeErrors } from "../../redux/actions/dataActions";

export class Navbar extends Component {
  state = {
    openDialog: false
  };
  closeDialog = () => {
    this.setState({ openDialog: false }, () => this.props.removeErrors());
  };
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <MyButton
                tip="Share a post"
                onClick={e => this.setState({ openDialog: true })}
              >
                <AddIcon />
              </MyButton>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications />
              </MyButton>
              {this.state.openDialog ? (
                <SharePost openDialog closeDialog={this.closeDialog} />
              ) : null}
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});
export default connect(mapStateToProps, { removeErrors })(Navbar);
