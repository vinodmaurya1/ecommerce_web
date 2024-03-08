import React, { useEffect } from "react";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import dataCandi from "../assets/fakeData/dataCandi";
import Form3 from "../components/formsearch/Form3";
import CandiSec2 from "../components/candidates/CandiSec2";
import Gotop from "../components/gotop";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../assets/images/logo.png";
import Header4 from "../components/header/Header4";
import Form2 from "../components/formsearch/Form2";
import FormSearch from "../components/formsearch";
// import SelectLocation from "../dropdown";
import Dropdown from "react-dropdown";
import SelectLocation from "../components/dropdown";
import MobileView from "../components/mobileview/MobileView";
import Header2 from "../components/header/Header2";
import axios from "axios";
import { api_url } from "../redux/config";

UsersView.propTypes = {};

function UsersView(props) {
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const [isShowMobile, setShowMobile] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const logintoken = localStorage.getItem("logintoken");
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    const fetchUser = () => {
      try {
        axios
          .get(`${api_url}/all_user_details`)
          .then((res) => {
            console.log(res.data);
            setUserDetails(res?.data?.data);
            setSearchData(res?.data?.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const filteredUsers = userDetails.filter((user) =>
  //     user.name.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setUserDetails(filteredUsers);
  // }, [searchValue]);

  useEffect(() => {
    if (searchValue === "" || searchValue === null || searchValue === undefined) {
      setSearchData(userDetails);
    } else {
      const filteredUsers = userDetails.filter(
        (user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchData(filteredUsers);
    }
  }, [searchValue]);

  console.log( "search",searchValue);

  // const handleChangeSearch = (e) => {
  //   setSearchData(e.target.value);
  // };

  return (
    <>
      <MobileView />
      <Header2 clname="actCan1" handleMobile={handleMobile} />
      <Breadcrumb title="Find Users" className="breadcrumb-section" />
      <section className="form-sticky stc2">
        <div className="tf-container">
          <div className="job-search-form st1 employers-form">
            <form>
              <div className="row-group-search d-flex">
                <div className="form-group-1 form-style-1">
                  <input
                    type="text"
                    className="input-filter-search"
                    placeholder="Search User"
                    id="search"
                    name="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <span className="icon-search search-job"></span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <CandiSec2 data={searchData} />
      <Footer />
      <Gotop />
    </>
  );
}

export default UsersView;
