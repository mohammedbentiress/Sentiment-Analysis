import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FeaturesList from './FeaturesList';
import HomePageCover from './HomePageCover.js'


export default function FixedContainer() {
  return (
    <React.Fragment>
      <HomePageCover />
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', padding: '2rem'}}>
          <FeaturesList />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
