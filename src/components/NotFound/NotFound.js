import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { PAGE_NOT_FOUND } from "./constants";

const NotFound = () => (
  <Container>
    <Typography variant="h2">{PAGE_NOT_FOUND}</Typography>
    <Link to="/">Go Home</Link>
  </Container>
);

export default NotFound;
