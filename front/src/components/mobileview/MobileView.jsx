import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-2.png";
import { useDispatch, useSelector } from "react-redux";

const MobileView = () => {
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const [isShowMobile, setShowMobile] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userBtn, setUserBtn] = useState(false);
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
    if (user.success === true) {
      setUserBtn(true);
    }
  }, [user]);

  return (
    <div className="menu-mobile-popup">
      <div className="modal-menu__backdrop" onClick={handleMobile}></div>
      <div className="widget-filter">
        <div className="mobile-header">
          <div id="logo" className="logo">
            <Link to="/">
              <img className="site-logo" src={logo} alt="Image" />
            </Link>
          </div>
          <Link className="title-button-group" onClick={handleMobile}>
            <i className="icon-close"></i>
          </Link>
        </div>

        <Tabs className="tf-tab">
          <div className="content-tab">
            <TabPanel className="header-ct-center menu-moblie animation-tab">
              <div className="nav-wrap">
                <nav className="main-nav mobile">
                  <ul id="menu-primary-menu" className="menu">
                    <li className="menu-item current-item">
                      <Link
                        to="/"
                        className="iteam-menu"
                        onClick={() => {
                          handleToggle("home");
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="menu-item ">
                      <Link to="/howtowork">How to work</Link>
                    </li>
                    <li className="menu-item ">
                      <Link to="/aboutus">About Us</Link>
                    </li>
                    <li className="menu-item ">
                      <Link to="/contactus">Contact Us</Link>
                    </li>
                    <li className="menu-item">
                      <Link to="/pricing">Plans</Link>
                    </li>
                    <li className="menu-item menu-item-has-children-mobile">
                      <Link
                        to="#"
                        className="iteam-menu"
                        onClick={() => {
                          handleToggle("pages");
                        }}
                      >
                        Services
                      </Link>
                      <Collapse isOpened={toggle.key === "pages"}>
                        <ul
                          className="sub-menu-mobile"
                          style={{
                            display: `${
                              toggle.key === "pages" ? "block" : "none"
                            }`,
                          }}
                        >
                          <li className="nav-sub subnav2">
                            <Link to="/MailForwarding">Mail Forwarding</Link>
                          </li>
                          <li className="nav-sub subnav3">
                            <Link to="/PackageForwarding">
                              Packages Forwarding
                            </Link>
                          </li>
                          <li className="nav-sub subnav4">
                            <Link to="/OnlineMailManagement">
                              Online Mail Management
                            </Link>
                          </li>
                          <li className="nav-sub subnav5">
                            <Link to="/Edmm_dmm">EDMM / DMM</Link>
                          </li>
                          <li className="nav-sub subnav6">
                            <Link to="/Fulfillment">Fulfillment Shop</Link>
                          </li>
                          <li className="nav-sub subnav7">
                            <Link to="/RegisteredAgent">
                              Registered Agent Service
                            </Link>
                          </li>
                          <li className="nav-sub subnav8">
                            <Link to="/Company_Formation_Service">
                              Company Formation Service
                            </Link>
                          </li>
                          <li className="nav-sub subnav9">
                            <Link to="/Tel_Fax_Line">Local Tel Fax Line</Link>
                          </li>
                          <li className="nav-sub subnav10">
                            <Link to="/faqs">FAQS</Link>
                          </li>
                        </ul>
                      </Collapse>
                    </li>
                  </ul>
                </nav>
              </div>
            </TabPanel>
          </div>
        </Tabs>

        {userBtn ? (
          <button className="header-customize-item btn btn-outline-primary">
            Logout
          </button>
        ) : (
          <div className="header-customize-item button">
            <Link to="/">Sign In / Sign Up</Link>
          </div>
        )}

        <div className="mobile-footer">
          <div className="icon-infor d-flex aln-center">
            <div className="icon">
              <span className="icon-call-calling">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
              </span>
            </div>
            <div className="content">
              <p>Need help? 24/7</p>
              <h6>
                <Link to="tel:0123456678">001-1234-88888</Link>
              </h6>
            </div>
          </div>
          <div className="wd-social d-flex aln-center">
            <ul className="list-social d-flex aln-center">
              <li>
                <Link to="#">
                  <i className="icon-facebook"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="icon-linkedin2"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="icon-twitter"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="icon-pinterest"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="icon-instagram1"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="icon-youtube"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
