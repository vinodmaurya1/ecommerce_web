import React from "react";
import Header2 from "../components/header/Header2";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/footer";
import Gotop from "../components/gotop";
import img1 from "../assets/images/job/work-icon-1.jpg";
import img2 from "../assets/images/job/work-icon-2.jpg";
import img3 from "../assets/images/job/work-icon-3.jpg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileView from "../components/mobileview/MobileView";

function HowToWork(props) {
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const [isShowMobile, setShowMobile] = useState(false);

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
  return (
    <>
      <MobileView/>
      <Header2 clname="actPage8" handleMobile={handleMobile} />
      <Breadcrumb title="How to work" className="breadcrumb-section" />
      <section className="wd-iconbox style-3 inner-iconbox-section">
        <div className="tf-container">
          <div className="title-iconbox style-3 stc">
            <h4>How it work?</h4>
            <p>
              Pellentesque quis lectus sagittis, gravida erat id, placerat
              tellus.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="group-col-3">
                <div className="tf-iconbox style-3 cl3 stc2">
                  <div className="box-header">
                    <div className="img1">
                      <img src={img1} alt="img" />
                    </div>
                  </div>
                  <div className="box-content">
                    <h6 className="box-title">
                      <Link to="/Blogsingle_v1">Select a Location</Link>
                    </h6>
                    <p>
                    Select a real street address by browsing through our list of locations across the US and internationally. Additionally, for each location you can preview what your future digital address will look like.
                    </p>
                    <button>
                      Start Now&nbsp;
                      <span className="icon-arrow-right2" />
                    </button>
                  </div>
                </div>
                <div className="tf-iconbox style-3 cl3 stc2">
                  <div className="box-header">
                    <div className="img1">
                      <img src={img2} alt="img" />
                    </div>
                  </div>
                  <div className="box-content">
                    <h6 className="box-title">
                      <Link to="/Blogsingle_v1">Pick a Service Plan</Link>
                    </h6>
                    <p>
                    Whether you are a business, a road warrior, or an expat you will find the right service plan for you. Selectively choose from features such as Open & Scan, Forwarding, Check Deposit, and Shredding. Prices start as low as $5.99.
                    </p>
                    <button>
                      Start Now&nbsp;
                      <span className="icon-arrow-right2" />
                    </button>
                  </div>
                </div>
                <div className="tf-iconbox style-3 cl3 stc2">
                  <div className="box-header">
                    <div className="img1">
                      <img src={img3} alt="img" />
                    </div>
                  </div>
                  <div className="box-content ">
                    <h6 className="box-title">
                      <Link to="/Blogsingle_v1">
                      Manage Your Mail
                      </Link>
                    </h6>
                    <p>
                    As you receive mail you can easily view and manage it from your mobile device or computer. No matter where you are in the world you will be notified via native app alerts, text messaging, or emails when mail arrives or a requested action has been completed.
                    </p>
                    <button>
                      Start Now&nbsp;
                      <span className="icon-arrow-right2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Gotop />
    </>
  );
}

export default HowToWork;
