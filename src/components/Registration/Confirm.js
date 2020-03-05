import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        padding: "3px 2px",
    },
  });

const Confirm = (props) =>  {
    console.log(props);
    const classes = useStyles();
    const next = e => {
        e.preventDefault();
        props.nextStep();
        
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    const {values} = props;
    console.log(values)
    console.log("this is props", props)
        return (
            <Paper className={classes.root}>
                <Typography variant="h5" component="h2">
                    {values.userName}
                </Typography>
                <Typography variant="h5" component="h2">
                    {values.password}
                </Typography>
                <br/>
            <Button
                
                margin="normal"
                fullWidth
                variant="contained"
                label="Continue"
                color="primary"
                style={styles.button}
                onClick={next}
            >Confirm & Continue
            </Button>
            <Button
                margin="normal"
                fullWidth
                variant="contained"
                label="Continue"
                color="primary"
                style={styles.button}
                onClick={back}
            >Go Back
            </Button>
            </Paper>
            

        )
}

const styles = {
    button: {
        margin: 15
    }
}

export default Confirm;