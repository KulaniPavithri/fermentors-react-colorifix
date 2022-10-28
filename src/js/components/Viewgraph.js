import React from "react";
import { useLocation } from "react-router-dom";
import FermentationGraph from "./FermentationGraph";

const Viewgraph = () => {
    let location = useLocation();
    
    return (
        <FermentationGraph fermentationItem ={location.state} />
    );

}

export default Viewgraph;