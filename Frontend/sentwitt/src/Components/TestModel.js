import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Chart from "./Chart";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Title from "./Title";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../Style/TestModel.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary.light,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  content: {
    width: "100%",
  },
}));

export default function TestModel(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [prediction, setPrediction] = useState(0);
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handle_change = (e) => {
    const value = e.target.value;
    setTweet(value);
  };

  const handle_testmodel = (event, tweet) => {
    event.preventDefault();
    if (props.logged_in) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `JWT ${localStorage.getItem("token")}`);

      var formdata = new FormData();
      formdata.append("tweet", `${tweet}`);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch("http://localhost:8000/sentwitt/test_model/", requestOptions)
        .then((res) => {
          setLoading(false);
          console.log(res.status);
          return res.json();
        })
        .then((json) => {
          console.log(json);
          setPrediction(json.result[0]);
        });
    } else setOpen(true);
  };

  return (
    <div className={classes.root} id="testmodel-card">
      <div className="featureTxt">
        <h2>Tweet Prediction</h2>
        <p>
          Have you ever asked your self what would people think about your
          belifs, sentiments, or opinion. Well we give you the oppurtunity to
          predict what your tweet will look like in the eye of your followers,
          all what you have to do is to write your tweet click process button
          and get you results
        </p>
      </div>
      <CssBaseline />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          you aren't login — sign in !
        </Alert>
      </Snackbar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} className="test-content">
            {/* Recent Orders */}
            <Grid
              className="form-wrapper"
              style={prediction === 0 ? { width: "90%" } : { width: "70%" }}
            >
              <ValidatorForm
                className="form-testmodel"
                noValidate
                onSubmit={(event) => handle_testmodel(event, tweet)}
              >
                <TextValidator
                  id="standard-textarea"
                  label="Tweet"
                  placeholder="Enter your tweet"
                  value={tweet}
                  onChange={handle_change}
                  required
                  name="tweet"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    className={classes.btn}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                  >
                    Process
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </ValidatorForm>
            </Grid>
            {/* Recent Deposits */}
            <Grid
              className="prediction-result"
              style={
                prediction > 0 ? { width: "20%" } : { transform: "scale(0)" }
              }
            >
              <Paper id="score" className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>Positive</Title>
                  <Typography component="p" variant="h4">
                    {Math.round(prediction * 100).toFixed(0)}%
                  </Typography>
                  <Title>Negative</Title>
                  <Typography component="p" variant="h4">
                    {Math.round((1 - prediction) * 100).toFixed(0)}%
                  </Typography>
                </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
