import React from "react";
import "../Style/About.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import avatar_mohammed from "../images/mohammedbentiress.jpg";
import avatar_fati from "../images/fati_belfaquih.png";
import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
export default function About() {
  const classes = useStyles();
  return (
    <div>
      <div id="three">
        <section className="introduction">
          <div className="content">
            <h3>Fire binome</h3>
            <div className="decoration-line"></div>
            <h2>
              We're science, developpement, management, and design students.
            </h2>
            <p>
              We are motivated to present you our Ai driven sentiment Anyalusis
              , This our final year project, we workrd to gether on many
              academic projects, thous this is most important one.
            </p>
          </div>
        </section>
      </div>
      <div id="one">
        <div className="left-side">
          <h3 class="no-line">Engineering student</h3>
          <h1>Mohammed Bentiress.</h1>
          <h4>Full stack developper</h4>
          <p>
            Currently a 4th year student in Computer Engineering at the National
            School of Applied Sciences in Oujda. I am really interested in
            becoming a cloud developer. Responsible, motivated, and a
            quick-learning individual, I have a wide range of experience as a
            result of the modules I have studied and adapt well to the business
            environment. I’m already fluent in Java, PHP, and Python.
          </p>
          <ul class="social-list">
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/mohammed-bentiress-29a071173/"
              >
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.facebook.com/med.ben.14473/">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a target="_blank" href="mailto:mohammedbentiress10@gmail.com">
                <MailIcon />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/mohammedbentiress">
                <GitHubIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className="right-side">
          <Avatar
            alt="Remy Sharp"
            src={avatar_mohammed}
            className={classes.large}
          />
        </div>
      </div>
      <div id="two">
        <div className="left-side" style={{ color: "#182430" }}>
          <h3 class="no-line">Engineering student</h3>
          <h1>Fatima bellafkih</h1>
          <h4>Full stack developper</h4>
          <p>
            Leigh has spent the last 16 years designing, and directing work for
            some of the world’s most exciting and forward-thinking brands, such
            as Google, Coca-Cola, Pepsi, Ford, Netflix, and Gorton Market.
            Outside of work Leigh can be found performing as the frontman of
            Warrant tribute act, 'Sweet Cherry Pie'.
          </p>
          <ul class="social-list">
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/fatima-bellafkih/"
              >
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.facebook.com/fatimaezzahra.bellafkih"
              >
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a target="_blank" href="mailto:fatima.zahra.blfk@gmail.com">
                <MailIcon />
              </a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/fatibellafkih">
                <GitHubIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className="right-side">
          <Avatar
            alt="Remy Sharp"
            src={avatar_fati}
            className={classes.large}
          />
        </div>
      </div>
    </div>
  );
}
