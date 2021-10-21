import React from "react";

import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import Nav from "./Nav";
import { makeStyles } from "@mui/styles";

// style
const useStyles = makeStyles({
  box: {
    height: "90vh",
  },
});

function Layout({ children }) {
  // hooks
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Container>
        <Box className={classes.box}>{children}</Box>
      </Container>
    </>
  );
}

export default Layout;
