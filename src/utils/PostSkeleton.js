import React from "react";
import NoImg from "../images/no-img.png";
import theme from "../utils/theme";
//MUI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  ...theme,
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginBottom: 10
  }
};

const PostSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => {
    return (
      <Card className={classes.card} key={index}>
        <CardHeader
          avatar={
            <Avatar
              alt="profile pic"
              src={NoImg}
              className={classes.bigAvatar}
            />
          }
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.handle} />
          <div className={classes.date} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
        </CardContent>
      </Card>
    );
  });
  return <>{content}</>;
};

export default withStyles(styles)(PostSkeleton);
