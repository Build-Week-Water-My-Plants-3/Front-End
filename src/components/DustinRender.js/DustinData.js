import React, {useState, useEffect} from 'react';
import axios from "axios";

import stuff from "../../mockData/mockPlants";

function Data(){
    const [Data, setData] = useState([]);

    useEffect(() => {
        axios
        .post("https://water-my-plants-bw-3.herokuapp.com/plants/all")
        .then(response => setData(response))
    })

console.log("The DATA", stuff)
    return(
        <div>
           <ul>
                {stuff.map(plant => (
                    <li>
                        {plant.name}
                    </li>
                    
                ))}
           </ul>
        </div>
    )
}

export default Data;