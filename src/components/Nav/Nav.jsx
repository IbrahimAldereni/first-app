import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import { UserContext } from "../../App";

// style
const useStyles = makeStyles({
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

function Nav() {
  // hooks
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <div title="nav">
      <AppBar position="sticky" color="primary">
        <Toolbar className={classes.flex}>
          <Box display="flex" className={classes.flex}>
            <PersonPinIcon fontSize="large" />
            <Typography variant="h5" ml={1}>
              First App
            </Typography>
          </Box>

          <Box display="flex" className={classes.flex}>
            <Typography title="navUsername" mr={1}>
              {user?.name}
            </Typography>
            <Avatar title="navAvatar">{user?.name?.[0]?.toUpperCase()}</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
