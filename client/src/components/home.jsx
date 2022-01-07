import { CSVReader } from "react-papaparse";
import Navbar from "./navbar";
import Overlay from "./Overlay"
import { fileLoadData, fileUploadedOrNot, fileRemoveData } from "../actions/actions";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myState = useSelector((state)=>state);
    const user = useSelector((state)=>state.getUserFn);
    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
      }
    const handleOnDrop = (data) => {
        // console.log(data);
        dispatch(fileLoadData(data));
    };
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        if(myState.basicfn.fileData && myState.basicfn.fileData.length>0)
        dispatch(fileUploadedOrNot(true));
    }

    const handleOnRemoveFile = () =>{
      dispatch(fileRemoveData());
      dispatch(fileUploadedOrNot(false));
    }

   
    return(
      <>
    {myState.basicfn.isLoading ? <Loading />:
    <>
    <Navbar />
    <div className="Home">
    {myState.basicfn.isFileUploaded && <Overlay />}
    <div id="csvreader">
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
    >
    <span id="dropcsv">Drop CSV file here or click to upload.</span>
    </CSVReader>
    </div>
    <button id="upload" onClick={(e)=>{
       user?handleOnSubmit(e):navigate("/login");
      }} className="btn btn-info my-2 my-sm-0" type="submit">Upload</button>
    </div>
    </>
     }
    </>);
}

export default Home;