import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const AuthRoute = props => {
  const { component: Component, authenticated, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
};
export default connect(mapStateToProps)(AuthRoute);
