import React from "react";
import { useLocation } from "react-router-dom";
import FermentationGraph from "./FermentationGraph";
import FermentationItem from "./FermentationItem";

//list of the fermentation runs for a given fermentor
const FermentationList = (props) => {
    let location = useLocation();
    const [data, setData] = React.useState (null);
    const [fermentationRunList, setFermentationRunList] = React.useState([]);
    let fermentationList = [];
    let fermentationItem = {
        fermentationID: "",
        status: ""
    }

    React.useEffect (() =>{
        
        try{
            fetch(location.state)
                .then(response => response.json())
                .then((result) => {
                    setData(result);
                });
        } catch( error ) {
            console.log (error);
        }
    }, []);

    React.useEffect(() => {

        if(data){

            data.forEach ((fEvent, lastIndex, data) => {
                
                eventReducer(fEvent, lastIndex == data.length - 1);
               
            });
            
            setFermentationRunList([...fermentationList]);
            
        }
    }, [data]);
    
    //extract data from events, create fermentation run, and create fermentatioin list
    const eventReducer = (event, isLastIndex) => {
        
        switch (event.event_type) {

            case "StartRun": 
                fermentationItem.fermentationID = event.fermentation_run;
                fermentationItem.status = "Active";
                fermentationItem.ph = [];
                fermentationItem.dissolvedOxygen = [];
                fermentationItem.temperature = [];
                return;
            
            case "MeasurePh":
                fermentationItem.ph.push (event.event_properties[0].value);
                break;
            
            case "MeasureDO":
                fermentationItem.dissolvedOxygen.push (event.event_properties[0].value);
                break;

            case "MeasureTemperature":
                fermentationItem.temperature.push (event.event_properties[0].value); 
                break; 

            case "EndRun":
                fermentationItem.status = "Past";
                fermentationList.push ({
                    fermentationID: fermentationItem.fermentationID, 
                    status: fermentationItem.status,
                    ph: fermentationItem.ph, 
                    dissolvedOxygen: fermentationItem.dissolvedOxygen, 
                    temperature: fermentationItem.temperature 
                }); 
                return;
        }

        if (isLastIndex) {
            fermentationList.push ({
                fermentationID: fermentationItem.fermentationID, 
                status: fermentationItem.status,
                ph: fermentationItem.ph, 
                dissolvedOxygen: fermentationItem.dissolvedOxygen, 
                temperature: fermentationItem.temperature 
            });
        }

    }

    return (
        
        <div id="graph-data">
            {
                fermentationRunList.map((item) => {
                    return <FermentationItem fermentationItem={item} key={item.fermentationID}/>;
                })
            }
        </div>
    );
}

export default FermentationList;

