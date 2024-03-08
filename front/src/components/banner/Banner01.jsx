import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import FormContent from "./FormContent";
import CountUp from "react-countup";

Banner01.propTypes = {};

function Banner01(props) {
  return (
    <section className="tf-slider sl1 parallax over-flow-hidden">
      <div className="tf-container p-0">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <FormContent />
          </div>
          <div className="col-lg-4">
            <div className="wd-review-job thumb2 widget-counter tf-sl2" style={{zIndex:"1"}}>
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
              <div className="icon2 ani4" style={{}}>
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
      <div className="overlay"></div>
    </section>
  );
}

export default Banner01;
