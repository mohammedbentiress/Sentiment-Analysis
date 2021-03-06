import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SignUp from "./Components/FormSignUp";
import Login from "./Components/FormLogin";
import Blog from "./Components/Blog";
import About from "./Components/About";
import TestModel from "./Components/TestModel";
import TopicAnalysis from "./Components/TopicAnalysis";
import TrendsAnalysis from "./Components/TrendsAnalysis";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link
        target="_blank"
        color="inherit"
        href="https://github.com/mohammedbentiress/Sentiment-Analysis"
      >
        Link to project Github
      </Link>{" "}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function App() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(0);
  const [logged_in, setLogged_in] = useState(() => {
    const stickyValue =
      localStorage.getItem("token") && localStorage.getItem("token") != ""
        ? true
        : false;
    return stickyValue;
  });
  const [open_success, setOpen_success] = useState(false);
  const [open_failed, setOpen_failed] = useState(false);

  const handleCloseSuccess = () => {
    setOpen_success(false);
  };
  const handleCloseFailed = () => {
    setOpen_failed(false);
  };
  useEffect(() => {
    fetch("http://localhost:8000/sentwitt/current_user/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        setStatus(res.status);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (status == 200) {
          setUsername(json.username);
          setLogged_in(true);
        } else setLogged_in(false);
      });
  });

  const handle_login = (e, user, history) => {
    e.preventDefault();
    const data = {
      username: user.username,
      password: user.password,
    };
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setOpen_success(true);
          history.goBack();
        } else setOpen_failed(true);
        return res.json();
      })
      .then((json) => {
        localStorage.setItem("token", json.token);
        setLogged_in(true);
      });
  };

  const handle_signup = (e, user, history) => {
    e.preventDefault();
    const data = {
      username: user.username,
      password: user.password,
    };
    fetch("http://localhost:8000/sentwitt/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setStatus(res.status);
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.username == "A user with that username already exists.") {
          console.log(json.username);
          alert(json.username);
        }
        if (status == 200) {
          localStorage.setItem("token", json.token);
          setLogged_in(true);
          setUsername(json.username);
          history.goBack();
        }
      });
  };

  const handle_logout = (history) => {
    localStorage.removeItem("token");
    setLogged_in(false);
    setUsername("");
  };
  return (
    <Router>
      <div className="App">
        <Navbar logged_in={logged_in} handle_logout={handle_logout} />
        <Snackbar
          open={open_success}
          autoHideDuration={3000}
          onClose={handleCloseSuccess}
        >
          <Alert severity="success">Login successfull!</Alert>
        </Snackbar>
        <Snackbar
          open={open_failed}
          autoHideDuration={3000}
          onClose={handleCloseFailed}
        >
          <Alert variant="filled" severity="error">
            username or password isn't correct — check it out!
          </Alert>
        </Snackbar>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route
            path="/testmodel"
            render={(props) => <TestModel logged_in={logged_in} />}
          />
          <Route
            path="/topicAnalysis"
            render={(props) => <TopicAnalysis logged_in={logged_in} />}
          />
          <Route
            path="/trendsAnylsis"
            render={(props) => <TrendsAnalysis logged_in={logged_in} />}
          />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route
            path="/SignUp"
            render={(props) => <SignUp handle_signup={handle_signup} />}
          />
          <Route
            path="/Login"
            render={(props) => <Login handle_login={handle_login} />}
          />
        </Switch>
        <Box id="footer" pt={4}>
          <Copyright />
        </Box>
      </div>
    </Router>
  );
}

export default App;
