import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default function Blog() {
  return (
    <React.Fragment>
      <div className="blog-cover"></div>
      <CssBaseline />
      <div className="white">
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', padding: '2rem'}}>
          <p>Blog</p>
        </Typography>
      </Container>
      </div>
    </React.Fragment>
  );
}