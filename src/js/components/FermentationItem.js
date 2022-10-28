import React from "react";
import { useNavigate } from "react-router-dom";

//visualizing data of a fermentation run
const FermentationItem = (props) => {

    let navigate = useNavigate();

    const activeRef = React.useRef();

    React.useEffect(() => {
        if(props.fermentationItem.status == "Active")
            activeRef.current.style.color = "red";
    })
    const viewGraph = (e) => {
        return navigate("/fermentationgraph", {state: props.fermentationItem});
    };

    return(
        <div id="fermentation-run">
            <div id="table-info">
                <div ref={activeRef}>Status: {props.fermentationItem.status}</div>
                <div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={viewGraph}>View Graph</button>
                </div>
            </div>
            <div id="table">
                <div >
                <table className="table">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">PH</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.fermentationItem.ph.map((item, i) => {
                            return (
                            <tr className="align-middle">
                                <td className="text-center" >
                                   {item }
                                </td>       
                            </tr>)
                        })}
                        
                    </tbody>
                </table>
                </div>
                <div>
                <table className="table">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">Dissolved Oxygen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.fermentationItem.dissolvedOxygen.map((item) => {
                            return (
                            <tr className="align-middle">
                                <td className="text-center">
                                   {item }
                                </td>       
                            </tr>)
                        })}
                        
                    </tbody>
                </table>
                </div>
                <div>
                <table className="table">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">Temperature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.fermentationItem.temperature.map((item) => {
                            return (
                            <tr className="align-middle">
                                <td className="text-center">
                                   {item }
                                </td>       
                            </tr>)
                        })}
                        
                    </tbody>
                </table>
                </div>
            </div>
            
        </div>

    );
}

export default FermentationItem;