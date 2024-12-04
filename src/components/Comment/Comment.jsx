import React from "react";
import PropTypes from "prop-types";

import { Paper, Typography } from "@mui/material";

function Comment({ data }) {
  return (
    <Paper
      sx={{ marginY: "20px", padding: "10px" }}
      title={`commentCard${data.id}`}
    >
      <Typography sx={{ fontSize: 9 }} color="text.secondary">
        {data?.name}
      </Typography>
      <hr />
      <Typography>{data?.body}</Typography>
    </Paper>
  );
}

// prop types and default props
Comment.propTypes = {
  data: PropTypes.object,
};

Comment.defaultProps = {
  data: {},
};

export default Comment;
