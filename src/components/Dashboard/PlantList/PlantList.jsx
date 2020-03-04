import React, { useEffect, useState } from "react";
import PlantCard from "../PlantCard/PlantCard";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { axiosWithAuth } from "../../../utils/axiosAuth";
import pic1 from "../../../plantImages/mock1.jpg"
import pic2 from "../../../plantImages/mock3.jpg";
import pic3 from "../../../plantImages/mock4.jpg";
import pic4 from "../../../plantImages/mock5.jpg";


const useStyles = makeStyles(theme => ({
  grid: {
    display: "grid",
    width: "100%",
    maxWidth: "1200px",
    gridTemplateColumns: "repeat( auto-fit, minmax(235px, 1fr) )",
    gridAutoRows: "1fr",
    gap: "15px",
    margin: 25,
    boxShadow: "none"
  },
  gridContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const avatars = [pic1, pic2, pic3, pic4];

const getRandomPlantAvatar = () => {
  const randInt = Math.floor(Math.random() * avatars.length);
  return avatars[randInt];
};

const PlantList = () => {
  const classes = useStyles();
  const [plantData, setPlantData] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("/api/plant/")
      .then(response => {
        setPlantData(response.data);
        console.log("plant data is:", response.data);
      })
      .catch(error => {
        console.log("The data was now returned", error);
      });
  }, []);

  return (
    <div className={classes.gridContainer}>
      <Paper className={classes.grid}>
        {plantData.map((plant, index) => {
          return (
            <PlantCard
              name={plant.name}
              blurb={plant.species}
              image={getRandomPlantAvatar()}
              id={plant.plant_id}
              key={index}
            />
          );
        })}
      </Paper>
    </div>
  );
};

export default PlantList;
