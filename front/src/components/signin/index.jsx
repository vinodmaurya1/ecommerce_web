import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/review/google.png";
import img2 from "../../assets/images/review/tweet.png";
import { toast } from "react-toastify";
import axios from "axios";
import { api_url } from "../../redux/config";

function SignIn() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };


  // const api_url = "http://localhost:4040"
  // const api_url = "https://mailbox.asyscraft.com/api";
  // const api_url = "https://bookmysalon.in/api/v1/user/auth/user_register";

  const handleSubmit = () => {
    if (
      userData.email === "" ||
      userData.password === ""
    ) {
      toast.error("Please fill out all required fields!");
    }else{
      axios.post(`${api_url}/signin`, userData).then((res)=>{
        console.log("res data",res.data)
        if (res.data.success === true) {
          toast.success(res.data.message)
          localStorage.setItem("logintoken" , res.data.user.token)
          navigate("/")
        }else{
          toast.error(res.data.message)
        }
      }).catch((err)=>{
        console.log('err' , err)
        toast.error(err.response.data.message);
      })
    }
  };


  return (
    <section className="account-section">
      <div className="tf-container">
        <div className="row">
          <div className="wd-form-login">
            <h4>Log In</h4>
            {/* <div className="nofi-form">
              <p>
                Username: <span>candidate</span> or <span>employer</span>
              </p>
              <p>
                Password: <span>jobtex</span>
              </p>
            </div> */}
            <div>
              <div className="ip">
                <label>
                  Username or email address<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Email / Username"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="ip">
                <label>
                  Password<span>*</span>
                </label>
                <div className="inputs-group auth-pass-inputgroup">
                  <input
                    type={showPass ? "text" : "password"}
                    className="input-form password-input"
                    placeholder="Password"
                    id="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                  <Link
                    className={`password-addon ${
                      showPass ? "icon-eye" : "icon-eye-off"
                    }`}
                    id="password-addon"
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
              </div>
              <div className="group-ant-choice">
                <div className="sub-ip">
                  <input type="checkbox" />
                  Remember me
                </div>
                <Link to="#" className="forgot">
                  Fogot password?
                </Link>
              </div>
              <button onClick={handleSubmit}>Login</button>
               {/*<p className="line-ip">
                <span>or sign up with</span>
              </p>
              <Link to="#" className="btn-social">
                Continue with Facebook
              </Link>
              <Link to="#" className="btn-social">
                <img src={img} alt="images" /> Continue with Google
              </Link>
              <Link to="#" className="btn-social">
                <img src={img2} alt="images" /> Continue with Twitter
              </Link> */}
              
              <div className="sign-up">
                Not registered yet? <Link to="/createaccount">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
