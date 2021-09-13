import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import User from "../../components/User/User";
import { getUserList } from "../../components/User/userAPI";
import { USERS_PER_PAGE } from "./constants";

const UserList = props => {
  const { classes } = props;
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const totalUserPages = useSelector(state => state.user.totalPages);
  const status = useSelector(state => state.user.status);

  useEffect(() => {
    const params = { page: 0, limit: USERS_PER_PAGE };
    dispatch(getUserList(params));
  }, [dispatch]);

  const handlePageChange = (event, page) => {
    const params = { page: page - 1, limit: USERS_PER_PAGE };
    dispatch(getUserList(params));
  };

  return (
    <>
      <Container className={classes.userContainer} maxWidth="md">
        <Grid container spacing={4}>
          {status === "loading" ? (
            <LinearProgress className={classes.progressBar} />
          ) : (
            users.map(user => (
              <Grid item key={user.id} xs={12} sm={6} md={4}>
                <User
                  thumbnailURL={user.picture}
                  name={`${user.title}. ${user.firstName} ${user.lastName}`}
                  numberOfPosts={Math.floor(Math.random() * 6) + 1}
                  userId={user.id}
                />
              </Grid>
            ))
          )}
        </Grid>
        <Box className={classes.pagination}>
          <Pagination
            color="primary"
            count={totalUserPages}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </>
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
UserList.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired
};
export default withStyles(useStyles)(UserList);
