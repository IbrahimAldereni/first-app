import React, { useContext, useEffect, useState } from "react";

import { Paper, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";
import { loginService } from "../../services/loginService";
import { useHistory } from "react-router";
import { UserContext } from "../../App";

// style
const useStyles = makeStyles({
  flex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  paper: {
    width: "25rem",
    padding: "2rem 3rem",
  },
  btn: {
    margin: "20px 0px !important",
  },
});

function LoginPage() {
  // hooks
  const classes = useStyles();

  const history = useHistory();

  const { setUser } = useContext(UserContext);

  const [allUsers, setAllUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // get all users once the page loaded
    loginService.getAllUsers().then((data) => {
      setAllUsers(data);
    });
  }, []);

  // functions
  const formSubmitHandler = (e) => {
    e.preventDefault();

    // initialize email input error helper message
    setError(false);

    // check if email match
    const userObject = allUsers.find((user) => user.email === email);

    if (userObject) {
      // save user object to the context
      setUser(userObject);

      // redirect to the profile page
      history.push("/profile");
    } else {
      setError(true);
    }
  };

  return (
    <Box className={classes.flex}>
      <Typography variant="h3" color="primary" mb={4}>
        Login
      </Typography>
      <Paper elevation={4} className={classes.paper}>
        <form onSubmit={formSubmitHandler}>
          <TextField
            type="email"
            id="email"
            label="Email"
            margin="normal"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            helperText={error ? "email not found" : ""}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            margin="normal"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            startIcon={<LoginIcon />}
            className={classes.btn}
          >
            login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginPage;
