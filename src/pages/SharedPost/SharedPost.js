import { useParams } from "react-router-dom";
import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Post from "../../components/Post/Post";
import { POST_NOT_FOUND } from "./constants";

const SharedPost = () => {
  const { postId } = useParams();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const ownerName = urlSearchParams.get("ownerName");
  const image = urlSearchParams.get("image");
  const text = urlSearchParams.get("text");
  const tags = JSON.parse(decodeURIComponent(urlSearchParams.get("tags")));

  return (
    <Container maxWidth="md">
      {ownerName && image && text && tags ? (
        <Post
          ownerName={`${ownerName}`}
          key={postId}
          id={postId}
          image={image}
          tags={tags}
          text={text}
          enlarge={false}
        />
      ) : (
        <Box>
          <Typography variant="h3">{POST_NOT_FOUND}</Typography>
        </Box>
      )}
    </Container>
  );
};
export default SharedPost;
