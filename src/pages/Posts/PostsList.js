import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useParams, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import { POSTS_PER_PAGE } from "./constants";
import { getPostsByUser, getPostsByTag } from "../../components/Post/postAPI";
import Post from "../../components/Post/Post";

const PostsList = props => {
  const { classes, setPageTitle } = props;
  const dispatch = useDispatch();
  const { userId, tagId } = useParams();
  const location = useLocation();

  const posts = useSelector(state => state.post.posts);
  const status = useSelector(state => state.post.status);
  const totalPages = useSelector(state => state.post.totalPages);

  const fillPostsData = params => {
    if (location.pathname.includes("/users/posts")) {
      params.userId = userId;
      dispatch(getPostsByUser(params));
    } else {
      params.tagId = tagId;
      dispatch(getPostsByTag(params));
    }
  };

  useEffect(() => {
    setPageTitle(location.state.name);
    const params = { page: 0, limit: POSTS_PER_PAGE };
    fillPostsData(params);
  }, [dispatch, userId, tagId]);

  const handlePageChange = (event, page) => {
    const params = { page, limit: POSTS_PER_PAGE };
    fillPostsData(params);
  };

  return (
    <Container className={classes.userContainer} maxWidth="md">
      <Grid container spacing={2}>
        {status === "loading" ? (
          <LinearProgress className={classes.progressBar} />
        ) : (
          posts.map(post => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Post
                ownerName={`${post.owner.title} ${post.owner.title}`}
                key={post.id}
                id={post.id}
                image={post.image}
                tags={post.tags}
                text={post.text}
                tagId={tagId}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Box className={classes.pagination}>
        <Pagination
          color="primary"
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  pagination: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    bottom: 0
  },
  progressBar: {
    width: "100%"
  }
});
PostsList.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setPageTitle: PropTypes.func.isRequired
};
export default withStyles(useStyles)(PostsList);
