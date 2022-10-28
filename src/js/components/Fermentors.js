import React from "react";
import FermentorItem from "./FermentorItem";

//view all the fermentors
const Fermentors = () => {
    
    const [fermentorList, setFermentorList] = React.useState([]);
    
    React.useEffect (() =>{
        try{
            fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/79b4aa9c-ffae-442d-afad-2e7e45954a75/fermentors.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221028%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221028T002810Z&X-Amz-Expires=86400&X-Amz-Signature=787ebdc7715e4a56f988744118a285b2843481af3721dddea29f3c202d01c48f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22fermentors.json%22&x-id=GetObject')
                .then(response => response.json())
                .then((result) => {

                    setFermentorList([...result]);
                    //console.log(result);
                });
        } catch( error ) {
            console.log (error);
        }
    }, []);

    
    return (
        <div className="container">
            <table className="table mt-5">
                <thead>
                    <tr>
                    <th scope="col">Fermentor ID</th>
                    <th scope="col">View Fermentations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fermentorList.map((fermentor) => {
                           return <FermentorItem fermentor={fermentor} key={fermentor}/>
                        })
                    }
                </tbody>
            </table>
        </div>
        
    );
}

export default Fermentors;