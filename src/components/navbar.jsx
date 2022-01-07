import { useNavigate } from "react-router-dom";
import { fileRemoveData, fileUploadedOrNot, removeUser, activeNavComp } from "../actions/actions";
import {useDispatch, useSelector} from "react-redux";
import { auth } from "../Firebase/firebase-config"
import { signOut } from "firebase/auth";

const Navbar = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.getUserFn);
  const myState2 = useSelector((state)=>state.basicfn);

  const  handleOnSummary = (e) =>{
    e.preventDefault();
    navigate("/transaction-details");
    dispatch(activeNavComp(false));
    dispatch(fileRemoveData());
    dispatch(fileUploadedOrNot(false));
  }
  const  handleOnHome = (e) =>{
      e.preventDefault();
      navigate("/");
      dispatch(activeNavComp(true));
  }

  const handleOnSignOut = async (e) =>{
       await signOut(auth);
       dispatch(removeUser());
       dispatch(fileRemoveData());
       dispatch(fileUploadedOrNot(false));
       dispatch(activeNavComp(true));
       navigate("/");
  }


return(
    <>
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
{/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
  <a className="navbar-brand" href="#" onClick={handleOnHome}>Teevro-Task</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li id="home-nav-item" className="nav-item">
        {myState2.isHomeActive?
        <a className="nav-link active" href="#" onClick={handleOnHome}>Home <span className="sr-only">(current)</span></a>:
        <a className="nav-link" href="#" onClick={handleOnHome}>Home <span className="sr-only">(current)</span></a>
      }
      </li>
      <li id="summary-nav-item" className="nav-item">
      {myState2.isHomeActive?
        <a className="nav-link" href="#" onClick={(e)=>{user?handleOnSummary(e):navigate("/login")}}>Summary</a>:
        <a className="nav-link active" href="#" onClick={(e)=>{user?handleOnSummary(e):navigate("/login")}}>Summary</a>
      }
      </li>
    </ul>
    {user ?
    <>
    <button id="log-in" onClick={handleOnSignOut} className="btn btn-outline-info my-2 my-sm-0" type="submit">Log out</button>
    </>:<>
    <form className="form-inline my-2 my-lg-0">
      <button id="log-in" onClick={(e)=>{navigate("/login");}} className="btn btn-outline-info my-2 my-sm-0" type="submit">Log in</button>
      <button id="sign-up" onClick={(e)=>{navigate("/register")}} className="btn btn-info my-2 my-sm-0" type="submit">Sign up</button>
    </form>
    </>
    }
  </div>
</nav>
    </>
);
}

export default Navbar;
