import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const Comment = props => {
  const { comment, classes } = props;
  return (
    <Paper key={comment.id} className={classes.container}>
      <Grid container wrap="nowrap" spacing={2}>
        <>
          <Grid item>
            <Avatar src={comment.owner.picture} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <h4
              style={{ margin: 0, textAlign: "left" }}
            >{`${comment.owner.title}. ${comment.owner.firstName} ${comment.owner.lastName}`}</h4>
            <Typography className={classes.message}>
              {comment.message}
            </Typography>
            <Typography className={classes.publishedDate}>
              Published: {comment.publishDate}
            </Typography>
          </Grid>
        </>
      </Grid>
    </Paper>
  );
};

const useStyles = () => ({
  container: {
    padding: "40px 20px",
    marginTop: 10
  },
  message: {
    textAlign: "left"
  },
  publishedDate: { textAlign: "left", color: "gray" }
});
Comment.propTypes = {
  comment: PropTypes.oneOfType([PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default withStyles(useStyles)(Comment);
