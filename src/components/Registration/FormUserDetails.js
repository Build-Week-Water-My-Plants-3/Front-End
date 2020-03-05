
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox'
import { FormLabel } from "@material-ui/core";



const FormUserDetails = (props) =>  {
    // console.log(props);
    const next = e => {
        e.preventDefault();
        props.nextStep();
        props.onSubmit(e);
    }

        const {values, handleChange, handleChecked} = props;
        return (
            <Container>
                
                        <TextField 
                            helperText={values.userNameError}
                            onChange={handleChange("userName")}
                            defaultValue={values.userName}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="userName"
                            label="User Name"
                            
                        />
                        <br/>
                        <TextField
                            onChange={handleChange("password")}
                            defaultValue={values.password}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <br/>
                        
                        <Checkbox checked={values.checkedA}
                        onChange={handleChecked}
                        value="checkedA"
                        label="Are You A Plant Parent?"
                        placeholder="Are You A Plant Parent"
                        color= "primary"
                        inputProps={{"aria-label": "uncontrolled-checkbox"}}/>
                        <FormLabel>Are You A Plant Parent?</FormLabel>
                        <Button
                            type="submit"
                            onSubmit={props.onSubmit}
                            margin="normal"
                            fullWidth
                            variant="contained"
                            label="Continue"
                            color="primary"
                            style={styles.button}
                            onClick={next}
                        >Continue</Button>
                        
            </Container>
        )
    }


const styles = {
    button: {
        margin: 15
    }
}

export default FormUserDetails