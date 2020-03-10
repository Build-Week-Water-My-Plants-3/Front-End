import React, {useState, useEffect} from 'react';
import axios from "axios";

//import stuff from "../../mockData/mockPlants";

function Data(){
    const [Data, setData] = useState([]);

    useEffect(() => {
        axios
          .get("https://water-my-plants-bw-3.herokuapp.com/plants/all")
          .then(response => {
            console.log(response);
            setData(response.data);
          })
          .catch(error => console.log(error));
      }, []);
    

console.log("The DATA", Data)
    return(
        <div>
           <ul>
                {Data.map(plant => (
                    <li>
                        {plant.nickname}
                    </li>
                    
                ))}
           </ul>
        </div>
    )
}

export default Data;