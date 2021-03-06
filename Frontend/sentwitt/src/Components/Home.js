import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FeaturesList from "./FeaturesList";

export default function Home() {
  return (
    <React.Fragment>
      <div className="home-cover">
        <h1>AI Driven Sentiment Anlysis</h1>
        <p>
          We produce a new way to process tweets polarity related to twitter
          trends and topics through a Nural Network Model ,you can even test it
          on your own texts and tweets so what you are waiting for signup, have
          a seat and enjoy predicting
        </p>
      </div>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", padding: "2rem" }}
        >
          <FeaturesList />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
