import React from "react";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";

function TextCell({ data }) {
  return (
    <div className="featureTxt">
      <h2>{data.title}</h2>
      <p> {data.item}</p>
      <Link to={`/${data.url}`}>
        <Button variant="contained" color="primary">
          {data.button}
        </Button>
      </Link>
    </div>
  );
}

export default TextCell;
