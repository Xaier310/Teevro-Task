import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase-config"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slice/userSlice";
import { activeNavComp } from "../slice/otherSlice";
import Loading from "./Loading";

const Register = () => {

  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.other);

  const handleOnRegister = async (e) => {
    try {
      e.preventDefault();
      const userDetails = await createUserWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value);
      if (userDetails){ 
        const tmpuser = {
          displayName: userDetails?.user?.displayName,
          email: userDetails?.user?.email,
          photoURL: userDetails?.user?.photoURL,
          uid: userDetails?.user?.uid
        }
        dispatch(setUser(tmpuser));
      }
      dispatch(activeNavComp(true));
      navigate("/");
    }
    catch (err) {
      console.log(err.message);
      let ele = document.getElementById("errorMsg");
      if (ele) {
        ele.innerText = err.message.substring(17, err.message.length - 2);;
        setTimeout(() => {
          if (ele)
            ele.innerText = "";
        }, 2000)
      }
    }
  }

  if(isLoading) return <Loading />;
  
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#508bfc", height: "100vh" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">

                  <h3 className="mb-5">Register</h3>

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
                  <button className="btn btn-info btn-lg btn-block" type="submit" onClick={handleOnRegister}>Sign up</button>
                  <p id="errorMsg"></p>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;