import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00848C",
  },
}));

export default function Login(props) {
  let history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  return (
    <div className="blanc">
      <div className="form-wrapper">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <ValidatorForm
              className={classes.form}
              noValidate
              onSubmit={(e) => props.handle_login(e, user, history)}
            >
              <TextValidator
                variant="outlined"
                value={user.username}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address or username"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={handle_change}
                validators={["required"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              <TextValidator
                variant="outlined"
                value={user.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handle_change}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </Container>
      </div>
    </div>
  );
}
