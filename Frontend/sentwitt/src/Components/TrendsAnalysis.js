import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import PublicIcon from "@material-ui/icons/Public";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../Style/TrendsAnalysis.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../Style/TrendsAnalysis.css";
import Snackbar from "@material-ui/core/Snackbar";
import Chart from "./Chart";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(tweet, prediction) {
  return { tweet, prediction };
}

export default function TrendsAnalysis(props) {
  const classes = useStyles();
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedTrend, setSelectedTrend] = useState(-1);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (trend, index) => {
    console.log(trend);
    console.log(index);
    setSelectedTrend(index);
    console.log(selectedTrend);
    if (props.logged_in) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `JWT ${localStorage.getItem("token")}`);

      var formdata = new FormData();
      formdata.append("trend", trend);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch("http://localhost:8000/sentwitt/trends_tweets/", requestOptions)
        .then((res) => {
          setLoading(false);
          console.log(res.status);
          return res.json();
        })
        .then((json) => {
          console.log(json);
          const rows_tmp = [];
          json.map((item) => {
            rows_tmp.push(
              createData(
                item["tweet"],
                Math.round(item["prediction"] * 100).toFixed(0)
              )
            );
          });
          setRows(rows_tmp);
        })
        .catch((error) => console.log("error", error));
    } else setOpen(true);
  };

  useEffect(() => {
    if (props.logged_in) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `JWT ${localStorage.getItem("token")}`);

      var formdata = new FormData();
      formdata.append("woeid", "1");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("http://localhost:8000/sentwitt/trends_lookup/", requestOptions)
        .then((res) => {
          setLoading(false);
          console.log(res.status);
          return res.json();
        })
        .then((json) => {
          setTrends(json);
        });
    }
  }, []);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root} id="trend-container">
      <div className="featureTxt">
        <h2>Trends Analysis</h2>
        <p>
          We leave in wide world where social media keep us up to date. Here you
          can found the twitter trends in the global world. What is more
          intresting than getting trends, is to have top tweets attached to for
          a specific trend and analyze there sentiment, Choose a trend and enjoy
          the result.
          <br /> Note: For any trends you picked up you get only tweets in
          english language
        </p>
      </div>
      {!props.logged_in && (
        <Alert severity="info" variant="outlined">
          Sign in to see trends of the day — check it out!
        </Alert>
      )}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          sign in first !
        </Alert>
      </Snackbar>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
      {trends.length > 0 &&
        trends.map((trend, index) => (
          <Chip
            variant="outlined"
            label={trend}
            color="primary"
            icon={<PublicIcon />}
            style={
              index === selectedTrend
                ? {
                    // borderBottom: "4px solid white",
                    backgroundColor: "#3f51b5",
                    borderColor: "#3f51b5",
                    color: "#f1f2f2",
                  }
                : null
            }
            onClick={(event) => handleClick(trend, index)}
          />
        ))}
      {rows.length > 0 && (
        <Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Tweets (RT Retweet)</StyledTableCell>
                  <StyledTableCell align="right">Score</StyledTableCell>
                  <StyledTableCell align="right">Polarity</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row["tweet"]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["prediction"]}%
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row["prediction"] > 50 ? "positive" : "negative"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {/* <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid> */}
    </div>
  );
}
