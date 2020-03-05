import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  content: {
    textAlign: "left",
    padding: 20
  },
  divider: {
    marginTop: `15px`,
    marginBottom: `20px`
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    margin: 0,
    alignSelf: "flex-end"
  },
  subheading: {
    lineHeight: 1.5,
    fontSize: "0.82em",
    opacity: "0.54"
  },
  bigAvatar: {
    margin: "0 auto",
    marginTop: 20,
    width: 100,
    height: 100
  }
}));

const PlantCard = ({ name, blurb, image, id = 1 }) => {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = () => {
    history.push(`/plant/${id}`);
  };
  return (
    <Card className={classes.card}>
      <Avatar alt="plant avatar" src={image} className={classes.bigAvatar} />

      <CardContent className={classes.content}>
        <Typography className={classes.heading} variant={"h6"}>
          {name}
        </Typography>
        <Typography className={classes.subheading} variant={"caption"}>
          {blurb}
        </Typography>
        <Divider className={classes.divider} light />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleClick}
          className={classes.button}
          fullWidth
        >
          View Info
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
