import { Paper, Typography } from "@mui/material";
import React from "react";

function Comment({ data }) {
  return (
    <Paper sx={{ marginY: "20px", padding: "10px" }}>
      <Typography sx={{ fontSize: 9 }} color="text.secondary">
        {data.name}
      </Typography>
      <hr />
      <Typography>{data.body}</Typography>
    </Paper>
  );
}

export default Comment;
