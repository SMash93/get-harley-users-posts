import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import ShareIcon from "@material-ui/icons/Share";

import { getCommentsForPost } from "./postAPI";
import Comment from "../Comment/Comment";

const Post = props => {
  const { text, image, tags, classes, tagId, id, ownerName, enlarge } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageZoom, setImageZoom] = useState({
    raised: false,
    shadow: 1
  });
  const [expanded, setExpanded] = useState(false);
  const comments = useSelector(state => state.post.comments[id] || {});

  useEffect(() => {}, [comments]);
  const handleExpandClick = () => {
    if (!expanded) {
      dispatch(getCommentsForPost({ postId: id }));
    }
    setExpanded(!expanded);
  };

  const routeToPostsWithTag = tag => {
    history.push({
      pathname: `/tags/posts/${tag}`,
      state: { name: tag }
    });
  };

  const copyShareableLink = () => {
    const url = window.location;
    const toCopyUrl = new URL(`${url.protocol}//${url.host}/post/${id}`);
    toCopyUrl.searchParams.append("ownerName", ownerName);
    toCopyUrl.searchParams.append("image", image);
    toCopyUrl.searchParams.append("text", text);
    toCopyUrl.searchParams.append(
      "tags",
      encodeURIComponent(JSON.stringify(tags))
    );

    navigator.clipboard.writeText(toCopyUrl);
  };

  const cardMediaOnMouseOver = () => {
    if (enlarge) {
      setImageZoom({ raised: true, shadow: 3 });
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        classes={{ root: imageZoom.raised ? classes.cardHovered : "" }}
        onMouseOver={cardMediaOnMouseOver}
        onMouseOut={() => setImageZoom({ raised: false, shadow: 1 })}
        image={image}
      />
      <CardContent className={classes.cardContent}>
        {ownerName && (
          <Link href="#" variant="h6">
            Published by: {ownerName}
          </Link>
        )}
        <Typography paragraph gutterBottom variant="body1">
          {text}
        </Typography>
        {tags &&
          tags.map(tag => (
            <Chip
              className={classes.chip}
              key={tag}
              label={tag}
              clickable
              onClick={() => routeToPostsWithTag(tag)}
              color={tag === tagId ? "secondary" : "primary"}
            />
          ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={copyShareableLink}>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.commentSection}>
          {comments.status === "loading" ? (
            <CircularProgress />
          ) : (
            comments.data &&
            comments.data.map(comment => <Comment comment={comment} />)
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const useStyles = theme => ({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    transition: "transform 0.15s ease-in-out",
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  },
  cardHovered: {
    paddingTop: "20%",
    zIndex: 50,
    position: "absolute",
    maxHeight: "15vw",
    width: "300px"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  chip: {
    marginLeft: theme.spacing(1)
  },
  commentSection: {
    maxHeight: "13vw",
    overflow: "auto"
  }
});

Post.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagId: PropTypes.string,
  ownerName: PropTypes.string,
  enlarge: PropTypes.bool
};
Post.defaultProps = {
  tagId: null,
  ownerName: null,
  enlarge: true
};

export default withStyles(useStyles)(Post);
