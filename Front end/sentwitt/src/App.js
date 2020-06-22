import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import FixedContainer from './Components/FixedContainer';
import SignUp from './Components/FormSignUp';
import Login from './Components/FormLogin';
import Blog from './Components/Blog'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const GetStarted = () =>(
    <h1>Get Started</h1>
)

const TrendsAnalysis = () =>(
  <h1>Trends Analysis</h1>
)

const ProtectedTweets = () =>(
  <h1>Advenced Tweepy</h1>
)

const About = () =>(
  <h1>About</h1>
)
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={FixedContainer} />
          <Route path="/home" component={FixedContainer} />
          <Route path="/getstarted" component={GetStarted}/>
          <Route path="/trendsAnalysis" component={TrendsAnalysis} />
          <Route path="/protectedtweets" component={ProtectedTweets} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/SignUp"  component={SignUp} />
          <Route path="/Login"  component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
