import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import {Link, useHistory, Redirect, BrowserRouter as Router}from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(5);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  let history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const list = (anchor) => (

      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer("left", false)}
        onKeyDown={toggleDrawer("left", false)}
      >
        <Link to="/">
          <Typography className="Drawer-Logo" variant="h6" noWrap>
                SenTwitt
          </Typography>
        </Link>
        <Divider />
        <List>
          {[{url:'getstarted', title:'Get Started'},
          {url:'trendsAnalysis', title:'Trends Analysis'},
          {url:'protectedtweets', title:'Advenced Tweepy'}].map((item,index) =>(
            <ListItem>
              <Link key={index} className="Side-Item" to={`/${item.url}`}>{item.title}</Link>
            </ListItem>
          ))}
        </List>
        <List className="Desktop-hidden">
          <Divider />
          <ListItem>
            <Link className="Side-Item" to='/'>Home</Link>
          </ListItem>
            <ListItem>
              <Link className="Side-Item" to='/about'>About</Link>
            </ListItem>
            <ListItem>
              <Link className="Side-Item" to='/blog'>Blog</Link>
            </ListItem>
        </List>
        </div>
  );
  const handelSelectedPage = (event,index,item) => {
    event.preventDefault();
    setSelectedIndex(index);
    history.push(`/${item}`);
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handelLogin = (event) =>{
    event.preventDefault();
    history.push('/Login');
  }

  const handelSignUp = (event) =>{
    event.preventDefault();
    history.push('/SignUp');
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const mobileMenuId = 'primary-search-account-menu-mobile';


  return (
    <div className={classes.grow}>
      <AppBar position="fixed"   >
        <Toolbar>
          <React.Fragment>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer("left",true)}
              >
                <MenuIcon onClick={toggleDrawer("left",true)}/>
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
          </React.Fragment>
          <Link to="/">
            <Typography className="Drawer-Logo" variant="h6" noWrap>
              SenTwitt
            </Typography>
          </Link> 
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
              <div className="nav-horizent">
                <ul  className="nav-right">
                {['home','about','blog'].map((item,index) => (
                  <li key={index}><Link 
                  onClick={(event) => handelSelectedPage(event, index, item)} to={`/${item}`}
                  style={ index === selectedIndex ? {
                     borderBottom: "4px solid white",
                    } : null}
                  >
                    {item}</Link>
                  </li>
                )) }
                </ul>
                <ul className="nav-left">
                  <li>
                    <Button variant="outlined" onClick={handelLogin} className="Login-Button" color="primary">
                      Login
                    </Button>
                  </li>
                  <li><Button variant="outlined" onClick={handelSignUp} className="SignUp-Button" color="primary">Sign up</Button></li>
                </ul>
              </div>
          </div>
          <div className={classes.sectionMobile}>
            <ul className="mobile-nav">
              <li>
                <Button variant="outlined" onClick={handelLogin} className="Login-Button" color="primary">
                  Login
                </Button>
              </li>
              <li><Button variant="outlined" onClick={handelSignUp} className="SignUp-Button" color="primary" >Sign up</Button></li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
