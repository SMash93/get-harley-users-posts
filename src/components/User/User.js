import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

const User = props => {
  const history = useHistory();
  const { classes, name, thumbnailURL, numberOfPosts, userId } = props;

  const openPostsPage = () => {
    history.push({
      pathname: `users/posts/${userId}`,
      state: { name }
    });
  };
  return (
    <Card className={classes.card}>
      <Avatar alt={name} src={thumbnailURL} className={classes.avatarLarge} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography> Number of Posts: {numberOfPosts}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Profile
        </Button>
        <Button
          aria-label="Get Posts"
          size="small"
          color="primary"
          onClick={openPostsPage}
        >
          Posts
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  avatarLarge: {
    alignSelf: "center",
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
});

User.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired,
  numberOfPosts: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired
};

export default withStyles(useStyles)(User);
