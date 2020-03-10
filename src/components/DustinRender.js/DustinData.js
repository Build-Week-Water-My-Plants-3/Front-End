import React, {useState, useEffect} from 'react';
import axios from "axios";

function Data(){
    const [Data, setData] = useState([]);

    useEffect(() => {
        axios.post("https://water-my-plants-bw-3.herokuapp.com/plants/all")
        .then(response => {
            console.log("Hello:",response)
            setData(response)
        })
    }, [])


    return(
        <div>
            <h1>hello
                {Data}
            </h1>
        </div>
    )
}

export default Data;