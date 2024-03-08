import axios from "axios";
import React, { useState, CSSProperties } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { api_url } from "../../redux/config";

function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const options = [
    { value: "op1", label: "Ghaziabad" },
    { value: "op2", label: "Noida" },
    { value: "op3", label: "Ayodhya" },
    { value: "op4", label: "Sivan" },
  ];

  // const api_url = "http://localhost:4040";
  // const api_url = "https://mailbox.asyscraft.com/api";
  // const api_url = "https://bookmysalon.in/api/v1/user/auth/user_register";

  const handleSubmit = () => {
    if (
      userData.email === "" ||
      userData.phone === "" ||
      userData.name === "" ||
      userData.confirm_password === "" ||
      userData.password === ""
    ) {
      toast.error("Please fill out all required fields!");
    } else {
      console.log(userData);
      axios
        .post(`${api_url}/signup`, userData)
        .then((res) => {
          console.log("res data", res.data);
          if (res.data.success === true) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response.data.message);
        });
    }
  };

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  const locationIQKey = "pk.dca404f3f8530122f8d9634f873382b4";
  const [locText, setLocText] = useState("");
  const [locData, setLocData] = useState([""]);

  useEffect(() => {
    if (locText.trim() === "") {
      setLocData(["No Data Here"]);
      return;
    }

    try {
      axios
        .get(
          `https://us1.locationiq.com/v1/search?key=${locationIQKey}&q=${locText}&format=json`
        )
        .then((res) => {
          // console.log("loc res", res.data);
          setLocData(res?.data);
        })
        .catch((err) => {
          console.log("loc err", err);
        });
    } catch (error) {
      console.log("loc error", error);
    }
  }, [locText, locationIQKey]);

  const optionsData = locData.map((location) => ({
    value: location.place_id,
    label: location.display_name,
  }));

  const handleInputChange = (inputValue) => {
    setLocText(inputValue);
    // console.log(inputValue);
  };

  return (
    <section className="account-section">
      <div className="tf-container">
        <div className="row">
          {/* <h4>Create Link free account</h4>
          <div className="col-md-6">
            <div className="ip">
              <label>
                Name <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="ip">
              <label>
                Name <span>*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
          </div> 
          <div className="btn btn-primary">register</div>*/}
          <Tabs className="wd-form-login tf-tab">
            <h4>Create Link free account</h4>
            <div className="content-tab">
              <TabPanel className="inner animation-tab">
                <div>
                  <div className="ip">
                    <label>
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      id="name"
                      value={userData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ip">
                    <label>
                      Username or email address<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Username / Email"
                      id="email"
                      value={userData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ip">
                    <label>
                      Phone<span>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Phone"
                      id="phone"
                      value={userData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ip">
                    <label>
                      Password<span>*</span>
                    </label>
                    <div className="inputs-group auth-pass-inputgroup">
                      <input
                        type={`${showPass ? "text" : "password"}`}
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
                        onClick={() => setShowPass(!showPass)}
                      />
                    </div>
                  </div>
                  {/* <div className="ip">
                    <label>
                      Confirm Password<span>*</span>
                    </label>
                    <div className="inputs-group auth-pass-inputgroup">
                      <input
                        type={`${showPass2 ? "text" : "password"}`}
                        className="input-form password-input"
                        placeholder="Password"
                        id="confirm_password"
                        value={userData.confirm_password}
                        onChange={handleChange}
                        required
                      />
                      <Link
                        className={`password-addon ${
                          showPass2 ? "icon-eye" : "icon-eye-off"
                        }`}
                        onClick={() => setShowPass2(!showPass2)}
                      />
                    </div>
                  </div> */}
                  {/* <div className="ip">
                    <label>
                      City <span>*</span>
                    </label>
                    <Select
                      placeholder="Select city"
                      // defaultValue={groupedOptions[0]}
                      options={optionsData} 
                      onInputChange={handleInputChange}
                      // formatGroupLabel={formatGroupLabel}
                      isClearable
                    />
                  </div> */}
                  <div className="group-ant-choice st">
                    <div className="sub-ip">
                      <input type="checkbox" />I agree to the
                      <Link to="/termsofuse"> Terms of User</Link>
                    </div>
                  </div>
                  <button onClick={handleSubmit}>Register</button>
                  <div className="sign-up">
                    Already have an account?
                    <Link to="/login">&nbsp;Login Here</Link>
                  </div>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
