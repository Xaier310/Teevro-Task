import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, activeNavComp } from "../actions/actions";
import { auth, googleProvider } from "../Firebase/firebase-config";

const Login = () =>{

  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.getUserFn);
  
  const handleOnSignInWithGoogle = async () =>{
    try{
      const userDetails = await signInWithPopup(auth, googleProvider);
        // console.log(userDetails);
        if(userDetails)
           dispatch(setUser(userDetails.user));
        navigate("/");
    }
    catch(err){
      console.log(err.message);
      let ele = document.getElementById("errorMsg");
      if(ele){ 
          ele.innerText = err.message.substring(17, err.message.length-2);
          setTimeout(()=>{
              if(ele)
              ele.innerText = "";
          },2000);
      }
   }
  }

  const handleOnLogin = async (e) =>{
      try{
          e.preventDefault();
          // if(emailRef.current.value && passRef.current.value)
          const userDetails = await signInWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value);
          if(userDetails)
          dispatch(setUser(userDetails));
          dispatch(activeNavComp(true));
          navigate("/");
      }
      catch(err){
          console.log(err.message);
          let ele = document.getElementById("errorMsg");
          if(ele){ 
              ele.innerText = err.message.substring(17, err.message.length-2);
              setTimeout(()=>{
                  if(ele)
                  ele.innerText = "";
              },2000)
          }

      }
  }


return(
<>
<section className="vh-100" style={{backgroundColor: "#508bfc", height:"100vh"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Sign in</h3>

            <div className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" ref={emailRef} />
              <label className="form-label" htmlFor="typeEmailX-2">Email</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" ref={passRef} />
              <label className="form-label" htmlFor="typePasswordX-2">Password</label>
            </div>

            <div className="form-check d-flex justify-content-start mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form1Example3"
              />
              <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
            </div>

            <button className="btn btn-info btn-lg btn-block" type="submit" onClick={handleOnLogin}>Login</button>
            <p id="errorMsg"></p>
            <hr className="my-4" />

            <button className="btn btn-lg btn-block btn-primary" onClick={handleOnSignInWithGoogle} style={{backgroundColor: "#dd4b39"}} type="submit"><i className="fab fa-google me-2"></i> Sign in with google</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
    );
}

export default Login;