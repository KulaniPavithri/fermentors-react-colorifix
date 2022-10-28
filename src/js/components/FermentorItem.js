import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { fermentorURLs } from "./FermentorURL";

const FermentorItem = (props) => {
    
    const [url, setUrl] = React.useState("");
    let navigate = useNavigate();

    const selectFermentationAPI = (fermentorID) => {
        return fermentorURLs.find((element) => element.fermentorID == fermentorID).url;
        
    }

    React.useEffect(() =>{
        setUrl(selectFermentationAPI(props.fermentor));
    }, [props.fermentor]);

    const viewFermentations = (e) => {
        
        return navigate("/fermentations", {state: url});
    };

    return(
        <React.Fragment>
            <tr className="align-middle">
                <td className="max-50">
                    {props.fermentor}
                </td>
                <td className="max-50">
                    <button type="button" className="btn btn-primary" onClick={viewFermentations}>
                        View Fermentations
                    </button>       
                </td>
                            
            </tr>
        </React.Fragment>

    );
}

export default FermentorItem;