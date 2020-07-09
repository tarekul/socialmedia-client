import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import LikeButton from "../Likebutton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import theme from "../../utils/theme";
//MUI stuff
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//icons
import ChatIcon from "@material-ui/icons/Chat";

//redux
import { connect } from "react-redux";

const styles = {
  ...theme,
  card: {
    marginBottom: 20,
  },
  content: {
    wordBreak: "break-all",
  },
  media: {
    height: "auto",
    textAlign: "center",
    paddingBottom: 10,
  },
  image: {
    maxHeight: 600,
    maxWidth: 800,
    "@media (max-width:500px)": {
      maxHeight: 300,
      maxWidth: 400,
    },
  },
};

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
        postImageUrl,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    return (
      <>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHead}
            avatar={
              <Avatar
                alt="profile pic"
                src={userImage}
                className={classes.bigAvatar}
              />
            }
            title={
              <Typography
                variant="h6"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
              >
                {userHandle}
              </Typography>
            }
            subheader={dayjs(createdAt).fromNow()}
            action={
              <DeletePost
                authenticated={authenticated}
                handle={handle}
                userHandle={userHandle}
                postId={postId}
              />
            }
          />
          <CardContent className={classes.content}>
            <Typography
              variant="body1"
              style={{ paddingLeft: "14px", wordBreak: "break-word" }}
            >
              {body}
            </Typography>
            <LikeButton postId={postId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
            <PostDialog
              postId={postId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
          </CardContent>
          {postImageUrl && (
            <div className={classes.media}>
              <img
                src={postImageUrl}
                className={classes.image}
                alt="post pic"
              />
            </div>
          )}
        </Card>
      </>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
