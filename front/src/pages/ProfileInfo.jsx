import React, { useEffect } from "react";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import Gotop from "../components/gotop";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { api_url } from "../redux/config";
import MobileView from "../components/mobileview/MobileView";
import Header2 from "../components/header/Header2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WalletRecord from "../components/table/WalletRecord";
import OrderHistory from "../components/table/OrderHistory";
import DatatableReceive from "../components/table/DatatableReceive";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { showUserDetail } from "../redux/stateSlice/authSlice";

ProfileInfo.propTypes = {};

function ProfileInfo(props) {
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const dispatch = useDispatch();
  const [isShowMobile, setShowMobile] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState("");
  const [userData, setUserData] = useState({
    name: user?.user?.name || "",
    profile_img: null,
  });
  const [rupeeValue, setRupeeValue] = useState("");
  const [kycData, setKycData] = useState({
    adhar_no: "",
    adhar_front: null,
    adhar_back: null,
    pan_no: "",
    pan_img: null,
  });
  const logintoken = localStorage.getItem("logintoken");

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setUserData({ ...userData, [e.target.id]: e.target.files[0] });
    } else {
      setUserData({ ...userData, [e.target.id]: e.target.value });
    }
  };

  const handleToggle = (key) => {
    if (toggle.key === key) {
      setToggle({
        status: false,
      });
    } else {
      setToggle({
        status: true,
        key,
      });
    }
  };

  const handleMobile = () => {
    const getMobile = document.querySelector(".menu-mobile-popup");
    setShowMobile(!isShowMobile);
    !isShowMobile
      ? getMobile.classList.add("modal-menu--open")
      : getMobile.classList.remove("modal-menu--open");
  };

  useEffect(() => {
    if (!user) {
      setUserDetails("");
    } else {
      //   console.log("user", user);
      setUserDetails(user?.user);
    }
  }, [user]);

  const handleAddCash = () => {
    try {
      axios
        .post(
          `${api_url}/add_cash`,
          { user_id: userDetails._id, rupee: rupeeValue },
          {
            headers: { Authorization: `${logintoken}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    if (userData.name === "") {
      toast.error("Please fill out all required fields!");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("profile_img", userData.profile_img);
        axios
          .post(`${api_url}/user_update`, formData, {
            headers: { Authorization: `${logintoken}` },
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.success === true) {
              toast.success(res.data.message);
              dispatch(showUserDetail());
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Invaild Details!");
          });
      } catch (error) {
        toast.error("Invaild Details!");
        console.log(error);
      }
    }
  };

  const handleKycChange = (e) => {
    if (e.target.type === "file") {
      setKycData({ ...kycData, [e.target.id]: e.target.files[0] });
    } else {
      setKycData({ ...kycData, [e.target.id]: e.target.value });
    }
  };

  const handleKycSubmit = () => {
    if (
      kycData.adhar_no === "" ||
      kycData.adhar_front === null ||
      kycData.adhar_back === null ||
      kycData.pan_no === "" ||
      kycData.pan_img === null
    ) {
      toast.error("Please fill out all required fields!");
    } else {
      try {
        const formData = new FormData();
        formData.append("adhar_no", kycData.adhar_no);
        formData.append("adhar_front", kycData.adhar_front);
        formData.append("adhar_back", kycData.adhar_back);
        formData.append("pan_no", kycData.pan_no);
        formData.append("pan_img", kycData.pan_img);
        axios
          .post(`${api_url}/kyc_upload`, formData, {
            headers: { Authorization: logintoken},
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
              toast.success(res.data.message);
              dispatch(showUserDetail())
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Invaild Details!");
          });
      } catch (error) {
        toast.error("Invaild Details!");
        console.log(error);
      }
    }
  };

  return (
    <>
      <MobileView />
      <Header2 clname="actCan1" handleMobile={handleMobile} />
      <Breadcrumb title="Profile" className="breadcrumb-section" />

      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel2">
                Add Cash
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  ₹
                </span>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Ruppe"
                  aria-label="rupee"
                  aria-describedby="basic-addon1"
                  name="rupee"
                  id="rupee"
                  value={rupeeValue}
                  onChange={(e) => setRupeeValue(e.target.value)}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddCash}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="term-section">
        <div className="tf-container">
          <Tabs className="row tf-tab">
            <div className="col-lg-3">
              <TabList className="menu-tab tab-term po-sticky">
                <Tab className="ct-tab">Profile</Tab>
                <Tab className="ct-tab">Wallet Transactions </Tab>
                <Tab className="ct-tab">Order History</Tab>
              </TabList>
            </div>
            <div className="col-lg-9">
              <div className="content-tab">
                <TabPanel className="term-content animation-tab">
                  <div className="row">
                    <div class="col-lg-12">
                      <section class="content-body p-xl-4">
                        <div>
                          <div class="row">
                            <div class="col-lg-9">
                              <div class="row gx-3">
                                <div class="col-6  mb-3">
                                  <label class="form-label">Name</label>
                                  <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    id="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div class="col-lg-6  mb-3">
                                  <label class="form-label">Email</label>
                                  <input
                                    class="form-control"
                                    type="email"
                                    placeholder="example@mail.com"
                                    value={userDetails.email}
                                    readOnly
                                  />
                                </div>
                                <div class="col-lg-6  mb-3">
                                  <label class="form-label">Phone</label>
                                  <input
                                    class="form-control"
                                    type="tel"
                                    placeholder="+1234567890"
                                    value={userDetails.phone}
                                    readOnly
                                  />
                                </div>
                                <div class="col-lg-6  mb-3">
                                  <label class="form-label">Birthday</label>
                                  <input class="form-control" type="date" />
                                </div>
                                <div class="col-lg-12  mb-3">
                                  <label class="form-label">Address</label>
                                  <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Type here"
                                  />
                                </div>
                              </div>
                            </div>
                            <aside class="col-lg-3">
                              <figure class="text-lg-center">
                                <img
                                  style={{ width: "196px", height: "196px" }}
                                  class="img-lg mb-3 img-avatar"
                                  src={
                                    userDetails.profile_img_url
                                      ? userDetails.profile_img_url
                                      : require("../assets/images/user/avatar/avtar-male.png")
                                  }
                                  alt="User Photo"
                                />
                                <input
                                  type="file"
                                  class="form-control"
                                  aria-describedby="basic-addon2"
                                  name="profile_img"
                                  id="profile_img"
                                  onChange={handleChange}
                                />
                              </figure>
                            </aside>
                          </div>
                          <br />
                          <div
                            className="d-flex"
                            style={{ justifyContent: "space-evenly" }}
                          >
                            <button
                              class="btn btn-primary"
                              onClick={handleSave}
                            >
                              Save changes
                            </button>
                            <button
                              className="btn btn-primary"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal2"
                            >
                              Add Cash
                            </button>
                          </div>
                        </div>
                        <hr class="my-5" />
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <label class="form-label">Aadhar Number</label>
                            <input
                              class="form-control"
                              type="number"
                              placeholder="Aadhar No."
                              name="adhar_no"
                              id="adhar_no"
                              value={kycData.adhar_no}
                              onChange={handleKycChange}
                            />
                          </div>
                          <div className="col-md-6 mb-2">
                            <label class="form-label">Pan Number</label>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Pan No."
                              name="pan_no"
                              id="pan_no"
                              value={kycData.pan_no}
                              onChange={handleKycChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <div class="card mb-4">
                              <div class="card-header">
                                <h6>Aadhar Front Card</h6>
                              </div>
                              <div class="card-body">
                                <div class="input-upload">
                                  <img
                                    className="m-2"
                                    src={
                                      userDetails.adhar_front_url
                                        ? userDetails.adhar_front_url
                                        : require("../assets/images/cadidate/gallery-img.png")
                                    }
                                    alt="pan-card"
                                  />
                                  <input
                                    type="file"
                                    class="form-control"
                                    aria-describedby="basic-addon2"
                                    name="adhar_front"
                                    id="adhar_front"
                                    onChange={handleKycChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="card mb-4">
                              <div class="card-header">
                                <h6>Aadhar Back Card</h6>
                              </div>
                              <div class="card-body">
                                <div class="input-upload">
                                  <img
                                    className="m-2"
                                    src={
                                      userDetails.adhar_back_url
                                        ? userDetails.adhar_back_url
                                        : require("../assets/images/cadidate/gallery-img.png")
                                    }
                                    alt="pan-card"
                                  />
                                  <input
                                    type="file"
                                    class="form-control"
                                    aria-describedby="basic-addon2"
                                    name="adhar_back"
                                    id="adhar_back"
                                    onChange={handleKycChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div class="card mb-4">
                              <div class="card-header">
                                <h6>Pan Card</h6>
                              </div>
                              <div class="card-body">
                                <div class="input-upload">
                                  <img
                                    className="m-2"
                                    src={
                                      userDetails.pan_img_url
                                        ? userDetails.pan_img_url
                                        : require("../assets/images/cadidate/gallery-img.png")
                                    }
                                    alt="pan-card"
                                  />
                                  <input
                                    type="file"
                                    class="form-control"
                                    aria-describedby="basic-addon2"
                                    name="pan_img"
                                    id="pan_img"
                                    onChange={handleKycChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={handleKycSubmit}
                          >
                            Update KYC
                          </button>
                        </div>
                        <hr class="my-5" />
                      </section>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="term-content animation-tab">
                  <WalletRecord />
                </TabPanel>
                <TabPanel className="term-content animation-tab">
                  <h6>Order History</h6>
                  <OrderHistory />
                </TabPanel>
                <TabPanel className="term-content animation-tab">
                  <h6>4. Site terms of use modifications</h6>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie a, finibus nec ex.
                  </p>
                  <ul className="list-dot">
                    <li>
                      {" "}
                      Aliquam elementum, est sed interdum cursus, felis ex
                      pharetra nisi, ut elementum tortor urna eu nulla. Donec
                      rhoncus in purus quis blandit.
                    </li>
                    <li> Etiam eleifend metus at nunc ultricies facilisis.</li>
                    <li>
                      {" "}
                      Nullam vel eleifend est, eu posuere risus. Vestibulum
                      ligula ex, ullamcorper sit amet molestie a, finibus nec
                      ex.
                    </li>
                  </ul>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie
                  </p>
                </TabPanel>
                <TabPanel className="term-content animation-tab">
                  <h6>5. Risks</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer sed euismod justo, sit amet efficitur dui. Aliquam
                    sodales vestibulum velit, eget sollicitudin quam. Donec non
                    aliquam eros. Etiam sit amet lectus vel justo dignissim
                    condimentum.
                  </p>
                  <p>
                    In malesuada neque quis libero laoreet posuere. In consequat
                    vitae ligula quis rutrum. Morbi dolor orci, maximus a
                    pulvinar sed, bibendum ac lacus. Suspendisse in consectetur
                    lorem. Pellentesque habitant morbi tristique senectus et
                    netus et malesuada fames ac turpis egestas. Aliquam
                    elementum, est sed interdum cursus, felis ex pharetra nisi,
                    ut elementum tortor urna eu nulla. Donec rhoncus in purus
                    quis blandit.
                  </p>
                  <p>
                    Etiam eleifend metus at nunc ultricies facilisis. Morbi
                    finibus tristique interdum. Nullam vel eleifend est, eu
                    posuere risus. Vestibulum ligula ex, ullamcorper sit amet
                    molestie{" "}
                  </p>
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
      <Footer />
      <Gotop />
    </>
  );
}

export default ProfileInfo;
