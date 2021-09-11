import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersList from "../Users/UserList";
import PostsList from "../Posts/PostsList";
import SharedPost from "../SharedPost/SharedPost";
import NotFound from "../../components/NotFound/NotFound";
import RouteWithErrorBoundary from "../../utils/RouteWithErrorBoundary";
import { FOOTER_MESSAGE, WELCOME_MESSAGE } from "./constants";
import Copyright from "../../components/ Copyright/Copyright";

const Home = props => {
  const { classes } = props;
  const [pageTitle, setPageTitle] = useState(WELCOME_MESSAGE);
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Switch>
            <RouteWithErrorBoundary
              path="/"
              exact
              render={() => <UsersList />}
            />
            <RouteWithErrorBoundary
              path="/users/posts/:userId"
              exact
              render={() => <PostsList setPageTitle={setPageTitle} />}
            />
            <RouteWithErrorBoundary
              path="/tags/posts/:tagId"
              exact
              render={() => <PostsList setPageTitle={setPageTitle} />}
            />
            <RouteWithErrorBoundary
              path="/post/:postId"
              exact
              render={() => <SharedPost setPageTitle={setPageTitle} />}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
        <footer className={classes.footer}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            {FOOTER_MESSAGE}
          </Typography>
          <Copyright />
        </footer>
      </div>
    </BrowserRouter>
  );
};
Home.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired
};
const useStyles = theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  root: {
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  footer: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
});
export default withStyles(useStyles)(Home);
