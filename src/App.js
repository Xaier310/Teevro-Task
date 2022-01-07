import react from "react";
import Home from "./components/home";
import Summary from "./components/summary";
import NotFound from "./components/NotFound"
import "./css/main.css"
import Login from "./components/Login"
import Register from "./components/Register"
import { auth } from "./Firebase/firebase-config";
import { setUser } from "./actions/actions";
import {useDispatch, useSelector} from "react-redux";
import Loading from "./components/Loading"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const user = useSelector((state)=>state.getUserFn);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser)=>{
    dispatch(setUser(auth.currentUser));
  });
  
  // console.log(auth?.currentUser, user);

  console.log("Rendering...");

  return (
    <div className="App">
     <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="transaction-details" element={user ? <Summary />:<Navigate to="/"/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
  // <Navigate to="/"/>
}

export default App;
