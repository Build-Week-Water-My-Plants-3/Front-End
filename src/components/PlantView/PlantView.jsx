
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

import { waterPlant } from "../../store/actions/userActions";
import { axiosWithAuth } from "../../utils/axiosAuth";

import mockPlants from '../../mockData/mockPlants'
const useStyles = makeStyles({
  card: {
    width: "80%",
    maxWidth: 650,
    margin: "25px auto",
    textAlign: "center"
  },
  waterContainer: {
    marginTop: 25,
    display: "flex",
    justifyContent: "space-around"
  },
  button: {
    width: "40%",
    marginTop: 10
  },
  waterInput: {
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
// slicing off the last part of the url, as it's the plant ID


const PlantView = () => {
  const mockPlantId = window.location.pathname.slice(-1) -1;
  const mockPlant = mockPlants[mockPlantId]
  const dispatch = useDispatch();
  const { isWatering, waterMessage } = useSelector(state => {
    return {
      isWatering: state.userReducer.isWatering,
      waterMessage: state.userReducer.waterMessage
    };
  });
  const params = useParams();
  const classes = useStyles();
  const user = useSelector(state => state.userReducer.user);
  const { id } = params; //The id of the plant that we want to view

  const [plant, setPlant] = useState(mockPlant);
  const [waterAmount, setwaterAmount] = useState(0);

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get(`/api/plant/${id}`)
  //     .then(res => {
  //       setPlant({
  //         name: res.data.name,
  //         species: res.data.species,
  //         days_to_water: res.data.days_to_water,
  //         // months: res.data.month_at_job
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }, [id]);

  const handleWaterClick = () => {
    dispatch(waterPlant(id, waterAmount));
  };
console.log(window.location)
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {plant.name}
        </Typography>
        <Typography className={classes.info} color="textSecondary">
          {plant.blurb}
        </Typography>
        <img style={{width:'50%'}}src={plant.image}/>
        {waterMessage && waterMessage.length > 0 ? (
          <Typography className={classes.info} color="textSecondary">
            {waterMessage}
          </Typography>
        ) : (
          false
        )}
        <div className={classes.waterContainer}>
          <FormControl className={classes.waterInput}>
            <InputLabel htmlFor="standard-adornment-amount">In How Many Days?</InputLabel>
            <Input
              id="standard-adornment-amount"
              type="number"
              value={waterAmount}
              onChange={e => setwaterAmount(e.target.value)}
              placeholder="Water me!"
              startAdornment={
                <InputAdornment position="start">*</InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
            disabled={isWatering}
            onClick={handleWaterClick}
          >
            WATER
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantView;
