import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { SOMETHING_WENT_WRONG } from "./constants";

const ErrorFallback = ({ error }) => {
  return (
    <Container>
      <Typography variant="h3">{SOMETHING_WENT_WRONG}</Typography>
      <Typography variant="h5">Error: {error.message}</Typography>
    </Container>
  );
};
ErrorFallback.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object]).isRequired
};
export default ErrorFallback;
