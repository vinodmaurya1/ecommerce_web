import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import SelectLocation from "../dropdown";
import axios from "axios";
import Select from "react-select";

Banner03.propTypes = {};

function Banner03(props) {
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

  console.log(process.env.REACT_APP_LOCATION_IQ_KEY, "key");
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
    <section className="tf-slider sl2 over-flow-hidden">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="content wow fadeInUp">
              <div className="heading">
                <h2>Online Mailbox </h2>
                <p>
                  Our company is an Indian company that provides various online
                  services, including email. Our company Mail is popular for
                  business users and offers a suite of productivity tools.
                </p>
              </div>
              <div className="form-sl">
                {/* <form action="/job-list-sidebar"> */}
                  <div className="row-group-search home1 st">
                    <div className="form-group-1">
                      <span className="icon-search search-job"></span>
                      {/* <input
                        type="text"
                        className="input-filter-search"
                        placeholder="Find Your Location"
                      /> */}
                      <Select
                        placeholder="Select Country"
                        // defaultValue={groupedOptions[0]}
                        options={optionsData}
                        onInputChange={handleInputChange}
                        // formatGroupLabel={formatGroupLabel}
                        isClearable
                      />
                    </div>
                    {/* <div className="form-group-1 mr-2">
                      <span className="icon-search search-job"></span>
                      <Select
                        placeholder="Select State"
                        // defaultValue={groupedOptions[0]}
                        options={optionsData}
                        onInputChange={handleInputChange}
                        // formatGroupLabel={formatGroupLabel}
                        isClearable
                      />
                    </div>
                    <div className="form-group-1">
                      <span className="icon-search search-job"></span>
                      <Select
                        placeholder="Select City"
                        // defaultValue={groupedOptions[0]}
                        options={optionsData}
                        onInputChange={handleInputChange}
                        // formatGroupLabel={formatGroupLabel}
                        isClearable
                      />
                    </div> */}
                    {/* <div className="form-group-2">
                      <span className="icon-map-pin"></span>
                      <SelectLocation />
                    </div> */}
                    <div className="form-group-4">
                      <button className="btn btn-find">
                        Find Location
                      </button>
                    </div>
                  </div>
                {/* </form> */}
              </div>
              {/* <ul className="list-category">
                <li>
                  <Link to="#">Designer</Link>
                </li>
                <li className="current">
                  <Link to="#">Developer</Link>
                </li>
                <li>
                  <Link to="#">Tester</Link>
                </li>
                <li>
                  <Link to="#">Writing</Link>
                </li>
                <li>
                  <Link to="#">Project Manager</Link>
                </li>
              </ul> */}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="wd-review-job thumb2 widget-counter tf-sl2">
              <div className="thumb">
                <img
                  src={require("../../assets/images/review/thumb4.png")}
                  alt="images"
                />
              </div>
              <div className="tes-box ani5">
                <div className="client-box">
                  <div className="avt">
                    <img
                      src={require("../../assets/images/review/client.jpg")}
                      alt="images"
                    />
                    <div className="badge"></div>
                  </div>
                  <div className="content">
                    <h6 className="number wrap-counter">
                      <CountUp
                        className="number"
                        end={480}
                        suffix="+"
                        duration={3}
                      />
                    </h6>
                    <div className="des">Happpy Candidates</div>
                  </div>
                </div>
              </div>
              <div className="icon1 ani3">
                <img
                  src={require("../../assets/images/review/icon2.png")}
                  alt="images"
                />
              </div>
              <div className="icon2 ani4">
                <img
                  src={require("../../assets/images/review/icon3.png")}
                  alt="images"
                />
              </div>
              <div className="icon3 ani6">
                <img
                  src={require("../../assets/images/review/icon4.png")}
                  alt="images"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner03;