import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SortBuy from "../dropdown/SortBuy";
import axios from "axios";
import { api_url } from "../../redux/config";
import { toast } from "react-toastify";

CandiSec2.propTypes = {};

function CandiSec2(props) {
  const { data } = props;
  const [modalData, setModalData] = useState("");
  const [getData, setGetData] = useState([])
  


  useEffect(() => {
    setGetData(data)
  }, [data])
  

  const handleModalClick = (data) => {
    setModalData(data);
    // console.log( 'md' ,data )
  };

  const handleuserDelete = (id) => {
    try {
      axios
        .delete(`${api_url}/user_delete/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            toast.success(`${res.data.data.name} Successfully Deleted!`)
            setGetData(getData.filter(u=>u._id !== res.data.data._id))
          } 
        })
        .catch((error) => {
          console.log(error);
          toast.success(`User does not Deleted!`)
        });
      } catch (error) {
      toast.success(`User does not Deleted!`)
      console.log(error);
    }
  };

  return (
    <>
      <div
        class="modal fade"
        // id="UniqueModalId"
        id={`modal${modalData._id}`}
        tabindex="-1"
        aria-labelledby={`${modalData._id}Label`}
        aria-hidden="true"
       >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id={`${modalData._id}Label`}>
                Profile
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="d-flex justify-content-between">
                <p>
                  <strong>Name</strong>
                </p>
                <p>
                  <strong>:</strong>
                </p>
                <p>{modalData.name}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>
                  <strong>Email</strong>
                </p>
                <p>
                  <strong>:</strong>
                </p>
                <p>{modalData.email}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>
                  <strong>Phone</strong>
                </p>
                <p>
                  <strong>:</strong>
                </p>
                <p>{modalData.phone}</p>
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
            </div>
          </div>
        </div>
      </div>
      <section className="candidates-section">
        <div className="tf-container">
          <div className="row">
            <Tabs className="col-lg-12 tf-tab">
              <div className="wd-meta-select-job">
                <div className="wd-findjob-filer">
                  <div className="group-select-display">
                    <TabList className="inner menu-tab">
                      <Tab className="btn-display active">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M4.5 0H0.500478C0.5 0.380952 0.5 0.596931 0.5 1.33333V14.6667C0.5 15.4031 0.500478 16 0.500478 16H4.5C4.5 16 4.5 15.4031 4.5 14.6667V1.33333C4.5 0.596931 4.5 0.380952 4.5 0Z"
                            fill="white"
                          />
                          <path
                            d="M10.5 0H6.50048C6.5 0.380952 6.5 0.596931 6.5 1.33333V14.6667C6.5 15.4031 6.50048 16 6.50048 16H10.5C10.5 16 10.5 15.4031 10.5 14.6667V1.33333C10.5 0.596931 10.5 0.380952 10.5 0Z"
                            fill="white"
                          />
                          <path
                            d="M16.5 0H12.5005C12.5 0.380952 12.5 0.596931 12.5 1.33333V14.6667C12.5 15.4031 12.5005 16 12.5005 16H16.5C16.5 16 16.5 15.4031 16.5 14.6667V1.33333C16.5 0.596931 16.5 0.380952 16.5 0Z"
                            fill="white"
                          />
                        </svg>
                      </Tab>
                      <Tab className="btn-display">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M0.5 12.001L0.5 16.0005C0.880952 16.001 1.09693 16.001 1.83333 16.001L15.1667 16.001C15.9031 16.001 16.5 16.0005 16.5 16.0005L16.5 12.001C16.5 12.001 15.9031 12.001 15.1667 12.001L1.83333 12.001C1.09693 12.001 0.880952 12.001 0.5 12.001Z"
                            fill="#A0A0A0"
                          />
                          <path
                            d="M0.5 6.00098L0.5 10.0005C0.880952 10.001 1.09693 10.001 1.83333 10.001L15.1667 10.001C15.9031 10.001 16.5 10.0005 16.5 10.0005L16.5 6.00098C16.5 6.00098 15.9031 6.00098 15.1667 6.00098L1.83333 6.00098C1.09693 6.00098 0.880952 6.00098 0.5 6.00098Z"
                            fill="#A0A0A0"
                          />
                          <path
                            d="M0.5 0.000976562L0.5 4.0005C0.880952 4.00098 1.09693 4.00098 1.83333 4.00098L15.1667 4.00098C15.9031 4.00098 16.5 4.0005 16.5 4.0005L16.5 0.000975863C16.5 0.000975863 15.9031 0.000975889 15.1667 0.000975921L1.83333 0.000976504C1.09693 0.000976536 0.880952 0.000976546 0.5 0.000976562Z"
                            fill="#A0A0A0"
                          />
                        </svg>
                      </Tab>
                    </TabList>
                    <p className="nofi-job">
                      <span>1249</span> candidates recommended for you
                    </p>
                  </div>
                  <SortBuy />
                </div>
              </div>
              <div className="content-tab">
                <TabPanel className="inner">
                  <div className="group-col-3">
                    {getData.length > 0 &&
                      getData.map((idx) => {
                        return (
                          <div
                            key={idx._id}
                            class="features-job wd-thum-career stc style-2 cl3"
                          >
                            <div class="job-archive-header">
                              <div class="career-header-left">
                                <img
                                  src={idx.profile_img_url}
                                  alt="jobtex"
                                  class="thumb"
                                />
                                <div class="career-left-inner">
                                  <h4>
                                    <Link to="/Candidatesingle_v1">
                                      {/* {idx.email} */}
                                    </Link>
                                  </h4>
                                  <h3>
                                    <Link to="/Candidatesingle_v1">
                                      {idx.name}
                                    </Link>
                                    &nbsp;
                                    <span class="icon-bolt"></span>
                                  </h3>
                                  <p>{idx.email} </p>
                                  <p>{idx.phone} </p>
                                </div>
                              </div>
                              <div
                                class="career-header-right"
                                onClick={() => handleuserDelete(idx._id)}
                              >
                                <span class="icon-heart">🗑️</span>
                              </div>
                            </div>
                            <div class="job-archive-footer">
                              <button
                                class="tf-btn"
                                type="button"
                                data-bs-toggle="modal"
                                // data-bs-target="#UniqueModalId"
                                data-bs-target={`#modal${modalData._id}`}
                                onClick={() => handleModalClick(idx)}
                              >
                                View Profile
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <ul className="pagination-job p-top-st1">
                    <li>
                      <Link to="#">
                        <i className="icon-keyboard_arrow_left"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">1</Link>
                    </li>
                    <li className="current">
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="icon-keyboard_arrow_right"></i>
                      </Link>
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel className="inner">
                  {getData.length > 0 &&
                    getData.map((idx) => {
                      return (
                        <div
                          key={idx._id}
                          className="features-job wd-thum-career"
                        >
                          <div className="job-archive-header">
                            <div className="career-header-left">
                              <img
                                src={idx.avt}
                                alt="jobtex"
                                className="thumb"
                              />
                              <div className="career-left-inner">
                                <h4>
                                  <Link to="/Candidatesingle_v1">
                                    {idx.unit}
                                  </Link>
                                </h4>
                                <h3>
                                  <Link to="/Candidatesingle_v1">
                                    {idx.name}
                                  </Link>
                                  &nbsp;
                                  <span className="icon-bolt"></span>
                                </h3>
                                <ul className="career-info">
                                  <li>{idx.cate}</li>
                                  <li>
                                    <span className="icon-map-pin"></span>
                                    {idx.map}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="career-header-right">
                              <span className="icon-heart"></span>
                              <Link to="/Candidatesingle_v1" className="tf-btn">
                                View Profile
                              </Link>
                            </div>
                          </div>
                          <div className="job-archive-footer">
                            <div className="career-footer-left">
                              <ul className="career-tag">
                                <li>
                                  <Link to="#">Blender</Link>
                                </li>
                                <li>
                                  <Link to="#">Sketch</Link>
                                </li>
                                <li>
                                  <Link to="#">Adobe XD</Link>
                                </li>
                                <li>
                                  <Link to="#">Figma</Link>
                                </li>
                              </ul>
                            </div>
                            <div className="carrer-footer-right">
                              <span className="icon-dolar1"></span>
                              <p>${idx.price}/month</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  <ul className="pagination-job p-top-st1">
                    <li>
                      <Link to="#">
                        <i className="icon-keyboard_arrow_left"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">1</Link>
                    </li>
                    <li className="current">
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="icon-keyboard_arrow_right"></i>
                      </Link>
                    </li>
                  </ul>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}

export default CandiSec2;
