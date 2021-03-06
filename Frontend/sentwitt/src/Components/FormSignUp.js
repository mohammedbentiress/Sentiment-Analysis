import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00848C ",
  },
}));

export default function SignUp(props) {
  let history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
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
              Sign up
            </Typography>
            <ValidatorForm
              className={classes.form}
              noValidate
              onSubmit={(e) => props.handle_signup(e, user, history)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoComplete="fname"
                    name="first_name"
                    value={user.first_name}
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handle_change}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    variant="outlined"
                    value={user.last_name}
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    onChange={handle_change}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    variant="outlined"
                    value={user.email}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handle_change}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    variant="outlined"
                    value={user.username}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="uname"
                    onChange={handle_change}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    variant="outlined"
                    value={user.password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handle_change}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="Login" variant="body2">
                    Already have an account? Sign in
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
