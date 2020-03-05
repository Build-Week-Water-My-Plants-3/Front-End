import React, { useEffect, useState } from "react";
import PlantCard from "../PlantCard/PlantCard";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { axiosWithAuth } from "../../../utils/axiosAuth";
import mockPlants from '../../../mockData/mockPlants';

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




// const getRandomPlantAvatar = () => {
//   const randInt = Math.floor(Math.random() * avatars.length);
//   return avatars[randInt];
// };

const PlantList = () => {
  const classes = useStyles();
  // const [userData, setUserData] = useState([]);
  // useEffect(() => {
  //   axiosWithAuth()
  //     .get("/api/plants/all")
  //     .then(response => {
  //       setUserData(response.data);
  //       console.log("plant data is:", response.data);
  //     })
  //     .catch(error => {
  //       console.log("The data was now returned", error);
  //     });
  // }, []);

  return (
    <div className={classes.gridContainer}>
      <Paper className={classes.grid}>
        {
          
          // userData
          mockPlants
          .map((mockPlant, index) => {
          return (
            <PlantCard
              name={mockPlant.name}
              blurb={mockPlant.species}
              image={mockPlant.image}
              id={mockPlant.id}
              key={index}
            />
          );
        })}
      </Paper>
    </div>
  );
};

export default PlantList;
