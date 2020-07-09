import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import theme from "../../utils/theme";
//MUI
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  ...theme,
  small: {
    width: 50,
    height: 50,
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
  dialogCard: {
    backgroundColor: "lightgrey",
    borderRadius: 50,
    marginBottom: 20,
    width: "fit-content",
  },
};

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;

    return comments.map((comment, index) => {
      const { body, createdAt, userImage, userHandle } = comment;
      return (
        <Fragment key={createdAt}>
          <Card className={classes.dialogCard}>
            <CardHeader
              className={classes.cardHead}
              avatar={
                <Avatar
                  alt="profile pic"
                  src={userImage}
                  className={classes.small}
                />
              }
              title={
                <Typography
                  variant="body1"
                  component={Link}
                  to={`/users/${userHandle}`}
                  color="primary"
                >
                  {userHandle}
                </Typography>
              }
              subheader={dayjs(createdAt).fromNow()}
            />

            <CardContent>
              <Typography variant="body1" style={{ paddingLeft: "14px" }}>
                {body}
              </Typography>
            </CardContent>
          </Card>
        </Fragment>
      );
    });
  }
}

export default withStyles(styles)(Comments);
