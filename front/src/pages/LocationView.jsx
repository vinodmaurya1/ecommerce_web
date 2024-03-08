import React, { useEffect } from "react";
import Header2 from "../components/header/Header2";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/footer";
import Gotop from "../components/gotop";
import SignIn from "../components/signin";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileView from "../components/mobileview/MobileView";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import { Waypoint } from "react-waypoint";
import img from "../assets/images/partners/thum-1.png";
import "../components/aboutPage/style.scss";
import dataEm from "../assets/fakeData/dataEmployers";
import axios from "axios";
import { api_url } from "../redux/config";

function LocationView(props) {
  const navigation = useNavigate();
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const [isShowMobile, setShowMobile] = useState(false);
  const [cityData, setCityData] = useState([''])

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

  const [viewPortEntered, setViewPortEntered] = useState(false);

  const onVWEnter = () => {
    setViewPortEntered(true);
  };

  const cityDetails = () => {
    try {
      axios
        .post(`${api_url}/city`)
        .then((res) => {
          // console.log("city", res.data);
          setCityData(res.data.data)
        })
        .catch((err) => {
          console.log("city err", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cityDetails();
  }, []);


  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  };

  return (
    <>
      <MobileView />
      <Header2 clname="actPage9" handleMobile={handleMobile} />
      <Breadcrumb title="Location" />
      <section className="wd-banner-counter">
        <div className="container st3">
          <div className="row">
            <div className="col-lg-12">
              <div className="group-title-counter stc">
                <h3>Virtual Mailbox Addresses</h3>
                <p>
                  USA PMB Emphasizing the extensive coverage of USA PMB
                  addresses across the United States, USA PMB is your reliable
                  partner for maintaining a constant U.S. Address no matter
                  where you are globally. We supply you with a genuine physical
                  street address, ensuring you can receive mail from all
                  carriers, including UPS and FedEx.
                </p>
              </div>
              <div className="group-counter wow fadeInUp">
                <div className="row align-item-center">
                  <div className="col-lg-3 col-md-6">
                    <div className="wd-counter widget-counter">
                      <div className="inner wrap-counter">
                        <h2>
                          <Waypoint onEnter={onVWEnter}>
                            <span>
                              {viewPortEntered && (
                                <CountUp
                                  className="counter-number"
                                  end={125}
                                  suffix=""
                                  duration={3}
                                />
                              )}
                            </span>
                          </Waypoint>
                        </h2>
                      </div>
                      <p className="description">
                        Locations for prestigious business addresses
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="wd-counter widget-counter">
                      <div className="inner wrap-counter">
                        <h2>
                          <Waypoint onEnter={onVWEnter}>
                            <span>
                              {viewPortEntered && (
                                <CountUp
                                  className="counter-number"
                                  end={57}
                                  suffix=""
                                  duration={3}
                                />
                              )}
                            </span>
                          </Waypoint>
                        </h2>
                      </div>
                      <p className="description">
                        Countries for incorporation Service
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="wd-counter widget-counter">
                      <div className="inner wrap-counter">
                        <h2>
                          <Waypoint onEnter={onVWEnter}>
                            <span>
                              {viewPortEntered && (
                                <CountUp
                                  className="counter-number"
                                  end={85}
                                  suffix=""
                                  duration={3}
                                />
                              )}
                            </span>
                          </Waypoint>
                        </h2>
                      </div>
                      <p className="description">
                        Countries for your local phone number
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="wd-counter widget-counter br-none">
                      <div className="inner wrap-counter">
                        <h2>
                          <Waypoint onEnter={onVWEnter}>
                            <span>
                              {viewPortEntered && (
                                <CountUp
                                  className="counter-number"
                                  end={59}
                                  suffix=""
                                  duration={3}
                                />
                              )}
                            </span>
                          </Waypoint>
                        </h2>
                      </div>
                      <p className="description">
                        All 50 states Registered agent
                      </p>
                    </div>
                  </div>
                </div>
                <img className="thumb ani4" src={img} alt="images" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="form-sticky stc2">
        <div className="tf-container">
          {/* <div className="job-search-form st1 employers-form">
            <form>
              <div className="d-flex">
                <div className="form-group-1 form-style-1">
                  <input
                    type="text"
                    className="input-filter-search"
                    placeholder="Find Location"
                  />
                  <span className="icon-search search-job"></span>
                </div>
                <div className="form-group-6">
                  <button className="btn btn-find">Find Location</button>
                </div>
              </div>
            </form>
          </div> */}.

          <h4 className="text-center">Select City</h4>
        </div>
      </section>

      <div className="container">
        {/* <div className="row">
          <div className="col-md-2">
            <div className="pricing-box cl3">
              <div className="pricing">
                New York<span>(8)</span>
              </div>
              <a href="#" className="btn">
                Select
              </a>
            </div>
          </div>
        </div> */}

        <div className="group-col-3">
          {cityData.map((idx) => (
            <div key={idx.id} className="employer-block style-2 cl3">
              <div className="inner-box">
                <div className="box-content">
                  <h3>
                    <Link to="#">{capitalizeFirstLetter(idx.name)}</Link>
                    &nbsp;
                    <span className="icon-map-pin"></span>
                  </h3>
                </div>
                <div className="button-readmore">
                  <button
                    className="btn-employer"
                    onClick={() => navigation(`/select_location/${idx.name}/${idx.id}`)}
                  >
                    (4) Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="tf-container st3">
        <div className="row">
          <div className="col-lg-12">
            <Tabs className="group-pricing-v1 tf-tab">
              <h6>Tariffs for the Mailbox</h6>
              <TabList className="menu-tab">
                <Tab className="ct-tab">USA</Tab>
                <Tab className="ct-tab">INTERNATIONAL</Tab>
              </TabList>
              <div className="content-tab">
                <TabPanel className="inner animation-tab">
                  <div className="group-col-3">
                    <h3>kir3</h3>
                  </div>
                </TabPanel>
                <TabPanel className="inner animation-tab">
                  <div className="group-col-3">
                    <h4>hello2</h4>
                  </div>
                </TabPanel>
              </div>
              </Tabs>
              </div>
              </div>
              </div> */}
      <Footer />
      <Gotop />
    </>
  );
}

export default LocationView;
