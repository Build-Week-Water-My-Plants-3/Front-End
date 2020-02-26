
// COMES FROM DASHBOARD CAN IMPLEMENT CALENDAR FUNCTIONALITY HERE? 
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import { useParams } from "react-router-dom";

import { tipWorker } from "../../store/actions/userActions";
import { axiosWithAuth } from "../../utils/axiosAuth";

const useStyles = makeStyles({
  card: {
    width: "80%",
    maxWidth: 650,
    margin: "25px auto",
    textAlign: "center"
  },
  tipContainer: {
    marginTop: 25,
    display: "flex",
    justifyContent: "space-around"
  },
  button: {
    width: "40%",
    marginTop: 10
  },
  tipInput: {
    width: "40%"
  },
  title: {
    fontSize: 40
  },
  tagLine: {
    // fontStyle: "italic",
    fontSize: 25,
    margin: 10
  },
  info: {
    marginBottom: 12,
    fontStyle: "italic"
  }
});

const WorkerView = () => {
  const dispatch = useDispatch();
  const { isTipping, tipMessage } = useSelector(state => {
    return {
      isTipping: state.userReducer.isTipping,
      tipMessage: state.userReducer.tipMessage
    };
  });
  const params = useParams();
  const classes = useStyles();
  const user = useSelector(state => state.userReducer.user);
  const { id } = params; //The id of the worker that we want to view

  const [worker, setWorker] = useState({
    name: user.name,
    info: user.info,
    tagline: user.tagline
  });
  const [tipAmount, setTipAmount] = useState(0);

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/worker/${id}`)
      .then(res => {
        setWorker({
          name: res.data.name,
          info: res.data.info,
          tagline: res.data.tagline,
          months: res.data.month_at_job
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleTipClick = () => {
    dispatch(tipWorker(id, tipAmount));
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {worker.name}
        </Typography>
        <Typography className={classes.info} color="textSecondary">
          {worker.info}
        </Typography>
        <Typography
          className={classes.tagLine}
          color="textSecondary"
          variant="body2"
          component="p"
        >
          "{worker.tagline}"
        </Typography>
        {tipMessage && tipMessage.length > 0 ? (
          <Typography className={classes.info} color="textSecondary">
            {tipMessage}
          </Typography>
        ) : (
          false
        )}
        <div className={classes.tipContainer}>
          <FormControl className={classes.tipInput}>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              type="number"
              value={tipAmount}
              onChange={e => setTipAmount(e.target.value)}
              placeholder="Tip me well!"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
            disabled={isTipping}
            onClick={handleTipClick}
          >
            Tip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerView;
