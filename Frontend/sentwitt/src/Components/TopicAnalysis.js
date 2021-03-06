import React, { useState } from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Grid,
  Link,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Slider,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../Style/TopicAnalysis.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  grid: {
    width: "55%",
    margin: "auto",
  },
  fixedHeight: {
    height: 240,
  },
  form: {
    width: "90%",
    display: "grid",
    // gridTemplateColumns: "1.5fr .5fr",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    gap: "2rem",
    alignItems: "center",
    justifyItems: "center",

    "& > *": {
      width: "100%",
      // gridColumn: "1/2",
      // backgroundColor: "#F00"
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center"
    },
  },
  combo: {
    width: "100%",
    textAlign: "left",

    "& > *": {
      width: "100%",
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    // gridColumn: "2/3",
    // gridRow: "1/3",
  },
  slider: {
    // gridRow: "3/4",
    // gridColumn: "1/3",
    alignSelf: "end",
    marginTop: "1.5rem",
  },
  buttonProgress: {
    color: theme.palette.primary.light,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  table: {
    minWidth: 700,
  },
  content: {
    width: "100%",
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

export default function TopicAnalysis(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultType, setRsultType] = useState("");
  const [tweetsNumber, setTweetsNumber] = useState(5);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handle_change = (e) => {
    const value = e.target.value;
    setTopic(value);
  };
  const handleChange = (event) => {
    setRsultType(event.target.value);
  };
  const handleChangeSlider = (event, newValue) => {
    setTweetsNumber(newValue);
  };

  const handle_topicAnalysis = (event, topic) => {
    event.preventDefault();
    if (props.logged_in) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `JWT ${localStorage.getItem("token")}`);

      var formdata = new FormData();
      formdata.append("query", `${topic}`);
      formdata.append("result_type", resultType);
      formdata.append("count", tweetsNumber);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("http://localhost:8000/sentwitt/tweets_query/", requestOptions)
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
  return (
    <div className={classes.root} id="topicAnalysis-card">
      <div className="featureTxt">
        <h2>Topic lookup</h2>
        <p>
          You want to buy a new smartphone but you are doubting wich one to
          choose, or you are no longer confortable with your new nike, you want
          an adivice from other customers just like you who had the same
          experience or you just want reviews about a new movie, book or album ,
          go a head chose your topic, specify wich resulte type you want and
          choose the number of tweets you like(up to 30 tweets per topic)
        </p>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          you aren't login — sign in !
        </Alert>
      </Snackbar>
      <CssBaseline />
      <main className={classes.content}>
        <Container className={classes.container}>
          <Grid className={classes.grid} id="Topics-form" container>
            {/* Recent Orders */}
            <Grid className="form-wrapper" item xs={12} md={8} lg={9}>
              <ValidatorForm
                className={classes.form}
                noValidate
                onSubmit={(event) => handle_topicAnalysis(event, topic)}
              >
                <TextValidator
                  id="standard-textarea"
                  label="Topic"
                  placeholder="Enter your topic"
                  value={topic}
                  onChange={handle_change}
                  required
                  name="topic"
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  style={{ width: "100%" }}
                />
                <div className={classes.combo}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Result Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={resultType}
                      onChange={handleChange}
                    >
                      <MenuItem value={"mixed"}>Mixed</MenuItem>
                      <MenuItem value={"recent"}>Recent</MenuItem>
                      <MenuItem value={"popular"}>Popular</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <PrettoSlider
                  className={classes.slider}
                  valueLabelDisplay="on"
                  onChange={handleChangeSlider}
                  aria-label="tweets-number"
                  defaultValue={5}
                  min={1}
                  max={30}
                />
                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    className={classes.btn}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                  >
                    Process
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </ValidatorForm>
            </Grid>
            {rows.length > 0 && (
              <Grid>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Tweets (RT Retweet)</StyledTableCell>
                        <StyledTableCell align="right">Score</StyledTableCell>
                        <StyledTableCell align="right">
                          Polarity
                        </StyledTableCell>
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
          </Grid>
        </Container>
      </main>
    </div>
  );
}
