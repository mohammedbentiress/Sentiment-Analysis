import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function Navbar(props) {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <Link
        onClick={(event) => {
          event.preventDefault();
          setSelectedIndex(0);
          history.push("/");
        }}
        to="/"
      >
        <Typography className="Drawer-Logo" variant="h6" noWrap>
          SenTwitt
        </Typography>
      </Link>
      <Divider />
      <List>
        {[
          { url: "testmodel", title: "Test the Model" },
          { url: "topicAnalysis", title: "Topics Analysis" },
          { url: "trendsAnylsis", title: "Trends Analysis" },
        ].map((item, index) => (
          <ListItem key={index}>
            <Link
              key={index}
              onClick={(event) => handleSelectedFeature(event, item)}
              className="Side-Item"
              to={`/${item.url}`}
            >
              {item.title}
            </Link>
          </ListItem>
        ))}
      </List>
      <List className="Desktop-hidden">
        <Divider />
        <ListItem>
          <Link className="Side-Item" to="/">
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link className="Side-Item" to="/about">
            About
          </Link>
        </ListItem>
        <ListItem>
          <Link className="Side-Item" to="/blog">
            Blog
          </Link>
        </ListItem>
      </List>
    </div>
  );
  const handleSelectedPage = (event, index, item) => {
    event.preventDefault();
    history.push(`/${item}`);
    console.log(window.location.pathname);
    if (["/home", "/about", "/blog"].includes(window.location.pathname)) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(10);
    }
  };

  const handleSelectedFeature = (event, item) => {
    event.preventDefault();
    setSelectedIndex(10);
    history.push(`/${item.url}`);
  };

  const handle_login = (event) => {
    event.preventDefault();
    setSelectedIndex(10);
    history.push("/Login");
  };

  const handle_signUp = (event) => {
    event.preventDefault();
    setSelectedIndex(10);
    history.push("/SignUp");
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <React.Fragment>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </React.Fragment>
          <Link
            onClick={(event) => {
              event.preventDefault();
              setSelectedIndex(0);
              history.push("/");
            }}
            to="/"
          >
            <Typography className="Drawer-Logo" variant="h6" noWrap>
              SenTwitt
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className="nav-horizent">
              <ul className="nav-right">
                {["home", "about", "blog"].map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={(event) =>
                        handleSelectedPage(event, index, item)
                      }
                      to={`/${item}`}
                      style={
                        index === selectedIndex
                          ? {
                              borderBottom: "4px solid white",
                            }
                          : null
                      }
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              {!props.logged_in ? (
                <ul className="nav-left">
                  <li>
                    <Button
                      variant="outlined"
                      onClick={handle_login}
                      className="Login-Button"
                      color="primary"
                    >
                      Login
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="outlined"
                      onClick={handle_signUp}
                      className="SignUp-Button"
                      color="primary"
                    >
                      Sign up
                    </Button>
                  </li>
                </ul>
              ) : (
                <ul className="nav-left">
                  <li>
                    <Button
                      variant="outlined"
                      onClick={props.handle_logout}
                      className="Login-Button"
                      color="primary"
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className={classes.sectionMobile}>
            {!props.logged_in ? (
              <ul className="nav-left">
                <li>
                  <Button
                    variant="outlined"
                    onClick={handle_login}
                    className="Login-Button"
                    color="primary"
                  >
                    Login
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outlined"
                    onClick={handle_signUp}
                    className="SignUp-Button"
                    color="primary"
                  >
                    Sign up
                  </Button>
                </li>
              </ul>
            ) : (
              <ul className="nav-left">
                <li>
                  <Button
                    variant="outlined"
                    onClick={() => props.handle_logout(history)}
                    className="Login-Button"
                    color="primary"
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
