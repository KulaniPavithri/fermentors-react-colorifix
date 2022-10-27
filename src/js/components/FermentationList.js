import React from "react";
import FermentationGraph from "./FermentationGraph";

const FermentationList = (props) => {
    const [data, setData] = React.useState (null);
    const [fermentationRunList, setFermentationRunList] = React.useState([]);
    let fermentationList = [];
    let fermentationItem = {
        fermentationID: "",
        status: ""
    }

    React.useEffect (() =>{
        try{
            fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/80fd8d77-cec2-4a8c-8663-55fe44cde887/AA0C-8AD7B319D4A4N.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221027%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221027T212852Z&X-Amz-Expires=86400&X-Amz-Signature=a4966e6f0d631211dd4d07b44b2bdda712cad92e30d0a1809b3f2de11eedfa79&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22AA0C-8AD7B319D4A4N.json%22&x-id=GetObject')
                .then(response => response.json())
                .then((result) => {

                    setData(result);
                    //console.log(result);
                });
        } catch( error ) {
            console.log (error);
        }
    }, []);

    React.useEffect(() => {

        if(data){

            data.forEach ((fEvent, lastIndex, data) => {
                //console.log("fermentID " + fEvent.fermentation_run);
                
                eventReducer(fEvent, lastIndex == data.length - 1);
               
            });
            
            //console.log("list list list");
            //console.log (fermentationList);
            setFermentationRunList([...fermentationRunList, ...fermentationList]);
            
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
                break;
            
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
                break;
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
        <div>
            <FermentationGraph fermentationItem = {fermentationRunList[0]}/>
        </div>
    );
}

export default FermentationList;

