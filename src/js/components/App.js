import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import FermentationList from "./FermentationList";
import Fermentors from "./Fermentors";
import Viewgraph from "./Viewgraph";

const App = () => {

    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Fermentors />} />
                <Route exact path="/fermentations" element={<FermentationList />} />
                <Route exact path="/fermentationgraph" element={<Viewgraph />} />           
            </Routes>
        </HashRouter>
    );
  
};

export default App;