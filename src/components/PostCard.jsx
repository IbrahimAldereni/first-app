import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChatIcon from "@mui/icons-material/Chat";

// style
const useStyles = makeStyles({
  card: {
    margin: "30px 0",
  },
});

function PostCard({ data }) {
  // hooks
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" mb={2}>
          {data.title}
        </Typography>

        <Typography variant="body2">{data.body}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          endIcon={<ChatIcon />}
        >
          Comments
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
