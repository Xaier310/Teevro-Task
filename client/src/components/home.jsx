import { CSVReader } from "react-papaparse";
import Navbar from "./navbar";
import Overlay from "./Overlay"
import { fileLoadData, fileUploadedOrNot, fileRemoveData } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { removeFile, toggleIsFileUploaded, changeFile } from "../slice/fileSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.other);
  const { user } = useSelector((state) => state.user);
  const { isFileUploaded, fileData } = useSelector((state) => state.file);
  const handleOnError = (err) => {
    console.log(err);
    alert(err);
  }
  const handleOnDrop = (data) => {
    console.log(data);
    data = data.slice(0, data.length - 1);
    dispatch(changeFile(data));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (fileData?.length > 0) dispatch(toggleIsFileUploaded(true));
  }

  const handleOnRemoveFile = () => {
    dispatch(removeFile(false));
  }


  return (
    <>
      {isLoading ? <Loading /> :
        <>
          <Navbar />
          <div className="Home">
            {isFileUploaded && <Overlay />}
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
            <button id="upload" onClick={(e) => {
              user ? handleOnSubmit(e) : navigate("/login");
            }} className="btn btn-info my-2 my-sm-0" type="submit">Upload</button>
          </div>
        </>
      }
    </>);
}

export default Home;