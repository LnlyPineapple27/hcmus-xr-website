import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  //Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: { marginLeft: theme.spacing(10), display: "flex" },
  logo: { flexGrow: "1", cursor: "pointer" },
  link: {
    textDecoration: "none",
    color: "blue",
    fontSize: "20px",
    marginLeft: theme.spacing(2),
    "&:hover": { color: "green", borderBottom: "1px solid green" }
  }
}));

function TopNavBar() {
  const classes = useStyles();

  return (
    <AppBar className='nav-bar' color='default' position="static">
      <CssBaseline/>
      <Toolbar>
        {/* <Typography variant="h4" className={classes.logo}>
          Online payment system
        </Typography> */}
        {/*<img className='brand-logo' src='/brand_logo.png' alt="logo" style={{maxWidth:60}}/> */}
        <Link to='/' className={classes.logo}>
          <img className='brand-logo' src='/brand_logo.png' alt="logo" style={{maxWidth:200}}/>
        </Link>
        <div className={classes.navlinks}>
          <Link to="/login" className={classes.link}>
            Login
          </Link>
          {/* <Link to="/register" className={classes.link}>
            Register
          </Link> */}
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/about" className={classes.link}>
            About
          </Link>
          <Link to="/contact" className={classes.link}>
            Contact
          </Link>
          <Link to="/faq" className={classes.link}>
            FAQ
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;
