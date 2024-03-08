import React from "react";
import PropTypes from "prop-types";
import Header2 from "../components/header/Header2";
import Partner from "../components/partner";
import dataPartner from "../assets/fakeData/dataPartner";
import Footer from "../components/footer";
import About from "../components/about";
import Banner03 from "../components/banner/Banner03";
import Gotop from "../components/gotop";
import { useEffect,useState } from "react";
import Testimonial from "../components/aboutPage/Testimonial";
import dataTestimonials from "../assets/fakeData/dataTestimonials";
import MobileView from "../components/mobileview/MobileView";
import Preloader from "../components/preloader";
import { useDispatch, useSelector } from "react-redux";
import { showUserDetail } from "../redux/stateSlice/authSlice";

Home_v3.propTypes = {};

function Home_v3(props) {
  const { user, loadingBar } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  // useEffect(() => {
  //   setLoading(loadingBar);
  //   console.log("loading", loadingBar, loading);
  // }, [loadingBar]);



  useEffect(() => {
    if (!user) {
      // setLoading(false);
      // toast.error("Session expired!");
      // console.log("user", user);
    }
    if (user.success === true) {
      // setLoading(false);
    } else {
      // setLoading(true);
    }
  }, [user]);

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

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();
  }, []);



//   const apiKey = process.env.REACT_APP_API_KEY;
// const apiUrl = process.env.REACT_APP_API_URL;

// console.log(`API Key: ${apiKey}`);
// console.log(`API URL: ${apiUrl}`);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <MobileView />

          <Header2 clname="act1" handleMobile={handleMobile} />
          <Banner03 />

          <Partner data={dataPartner} />

          {/* <Category data={dataCate} className="job-category-section-two" />

            <Job03 data={dataJobs} /> 

            <Location data={dataLocation} />*/}

          <About className="review-job-section" />

          {/* <Employer data={dataEm} className="employer-section-two" /> */}
          <Testimonial data={dataTestimonials} />
          <Footer />
          <Gotop />
        </>
      )}
    </>
  );
}

export default Home_v3;
