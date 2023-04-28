import react, { useEffect, useLayoutEffect } from "react";
import Home from "./components/home";
import Summary from "./components/summary";
import NotFound from "./components/NotFound"
import "./css/main.css"
import Login from "./components/Login"
import Register from "./components/Register"
import { auth } from "./Firebase/firebase-config";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./slice/userSlice";
import { loading } from "./slice/otherSlice";


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loading(true));
    onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser){ dispatch(loading(false)); return; }
      const tmpuser = {
        displayName: currentUser?.displayName,
        email: currentUser?.email,
        photoURL: currentUser?.photoURL,
        uid: currentUser?.uid
      }
      dispatch(setUser(tmpuser));
      dispatch(loading(false));
    });
  },[]);

  console.log("Rendering...");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="transaction-details" element={<Summary />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
