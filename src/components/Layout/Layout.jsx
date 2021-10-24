import React from "react";

import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

import Nav from "../Nav/Nav";

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
