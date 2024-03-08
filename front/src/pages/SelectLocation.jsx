import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import JobSec9 from "../components/jobs/JobSec9";
import dataCities from "../assets/fakeData/dataCities";
import Gotop from "../components/gotop";
import PopupJob from "../components/popup/PopupJob";
import { Link, useParams } from "react-router-dom";
import Header4 from "../components/header/Header4";
import MobileView from "../components/mobileview/MobileView";
import Header2 from "../components/header/Header2";
import MapSection from "../components/map";
import dataMap from "../assets/fakeData/dataMap";
import Breadcrumb from "../components/breadcrumb";
import axios from "axios";
import { api_url } from "../redux/config";

SelectLocation.propTypes = {};

function SelectLocation(props) {
  const [isShow, setShow] = useState(false);
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const [isShowMobile, setShowMobile] = useState(false);
  const { city_id, city_name } = useParams();
  const [areaData, setAreaData] = useState([""]);

  const handlePopup = () => {
    const getPopUp = document.querySelector(".sidebar-popup");
    setShow(!isShow);
    !isShow
      ? getPopUp.classList.add("modal-menu--open")
      : getPopUp.classList.remove("modal-menu--open");
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

  const AreaDetails = () => {
    try {
      axios
        .get(`${api_url}/area_by_city?city_id=${city_id}`)
        .then((res) => {
          // console.log("area", res.data);
          setAreaData(res.data.data);
        })
        .catch((err) => {
          console.log("area err", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AreaDetails();
  }, []);

  return (
    <>
      <MobileView />
      <Header2 clname="actPage9" handleMobile={handleMobile} />
      <Breadcrumb title="Select Location" />
      <section>
        <div className="tf-container ctn-full">
          <div className="row">
            <div className="col-lg-12">
              <div className="group-half-map st1">
                <div className="content-left">
                  <div className="wd-findjob-filer">
                    <h5>Mailbox in {city_name} </h5>
                  </div>
                  <div className="content-job style-scroll sc1">
                    {areaData.length > 0 ? (
                      areaData.map((idx) => (
                        <div key={idx.id} className="features-job style-2">
                          <div className="job-archive-header">
                            <div className="inner-box">
                              <div className="box-content">
                                <h3>
                                  <Link to="/pricing"> {idx.name} </Link>
                                  <span className="icon-bolt"></span>
                                </h3>
                                <ul>
                                  <li>
                                    <span className="icon-map-pin"></span>
                                    {/* {idx.map}  */} H.no. 72 , {idx.name}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="job-archive-footer">
                            <div className="job-footer-left">
                              <div className="star"></div>
                            </div>
                            <div className="job-footer-right">
                              <div className="price">
                                <span className="icon-dolar1"></span>
                                <p>
                                  {/* {idx.price} */} $11
                                  <span className="year">/year</span>
                                </p>
                              </div>
                              <p className="days">
                                <Link className="btn btn-primary">Select</Link>
                              </p>
                            </div>
                          </div>
                          <Link
                            to="/pricing"
                            className="jobtex-link-item"
                            tabIndex="0"
                          ></Link>
                        </div>
                      ))
                    ) : (
                      <div className="text-center">
                        <div>No data found</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="content-right">
                  <MapSection className={"row-height"} markers={dataMap} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gotop />
    </>
  );
}

export default SelectLocation;
