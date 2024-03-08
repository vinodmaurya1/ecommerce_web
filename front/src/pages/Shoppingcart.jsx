import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header2 from "../components/header/Header2";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import Gotop from "../components/gotop";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../assets/images/logo.png";
import Header4 from "../components/header/Header4";
import axios from "axios";
import { api_url } from "../redux/config";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cartDetail, showUserDetail } from "../redux/stateSlice/authSlice";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

Shoppingcart.propTypes = {};
 
function Shoppingcart(props) {
  const { user, cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [counts, setCounts] = useState({});
  const [couponValue, setCouponValue] = useState("");
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const loginToken = localStorage.getItem("logintoken");
  const [isShowMobile, setShowMobile] = useState(false);
  const [productDetail, setProductDetail] = useState([""]);
  const [productData, setProductData] = useState([""]);
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

  const fetchData = () => {
    axios
      .get(`${api_url}/get_all_product_cart`)
      .then((res) => {
        console.log(res.data);
        setProductData(res?.data?.data.products);
        setProductDetail(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantity = async (q, data) => {
    console.log(q, data);
    await axios
      .post(
        `${api_url}/add_cart`,
        {
          user_id: user?.user?._id,
          product_id: data.product_id,
          quantity: q,
          amount: data.amount,
        },
        { headers: { Authorization: loginToken } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          // toast.success(res.data.message);
          fetchData();
          dispatch(cartDetail());
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleDecrease = (id) => {
    if (counts[id] > 1) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1,
      }));
    }
  };

  const subtotal = productData.reduce((total, data) => {
    return total + data.amount * (counts[data._id] || 1);
  }, 0);

  const handleRemoveFromCart = async (id) => {
    console.log(id);
    await axios
      .delete(`${api_url}/remove_to_cart/${id}`, {
        headers: { Authorization: loginToken },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          setProductData(res.data.data.products);
          setProductDetail(res?.data?.data);
          // setProductData(
          //   productData.filter((product) => product._id !== res.data.data._id)
          // );
          dispatch(cartDetail());
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleRedeemCode = async () => {
    try {
      await axios
        .post(
          `${api_url}/redeem_coupon`,
          { coupon_name: couponValue },
          {
            headers: { Authorization: loginToken },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message);
            setProductData(res.data.data.products);
            setProductDetail(res?.data?.data);
            // setProductData(
            //   productData.filter((product) => product._id !== res.data.data._id)
            // );
            dispatch(cartDetail());
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios
        .post(
          `${api_url}/booking`,
          {user_id: user?.user?._id},
          {
            headers: { Authorization: loginToken },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message);
            // setProductData(res.data.data.products);
            // setProductDetail(res?.data?.data);
            // setProductData(
            //   productData.filter((product) => product._id !== res.data.data._id)
            // );
            fetchData();
            dispatch(cartDetail());
            dispatch(showUserDetail());
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
            <TabList className="menu-tab">
              <Tab className="user-tag">Menu</Tab>
              <Tab className="user-tag">Categories</Tab>
            </TabList>

            <div className="content-tab">
              <TabPanel className="header-ct-center menu-moblie animation-tab">
                <div className="nav-wrap">
                  <nav className="main-nav mobile">
                    <ul id="menu-primary-menu" className="menu">
                      <li className="menu-item menu-item-has-children-mobile">
                        <Link
                          to="#"
                          className="iteam-menu"
                          onClick={() => {
                            handleToggle("home");
                          }}
                        >
                          Home
                        </Link>
                        <Collapse isOpened={toggle.key === "home"}>
                          <ul
                            className="sub-menu-mobile"
                            style={{
                              display: `${
                                toggle.key === "home" ? "block" : "none"
                              }`,
                            }}
                          >
                            <li className="menu-item menu-item-mobile">
                              <Link to="/">Home Page 01 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v2">Home Page 02 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v3">Home Page 03 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v4">Home Page 04 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v5">Home Page 05 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v6">Home Page 06 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v7">Home Page 07 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v8">Home Page 08 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v9">Home Page 09 </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/home_v10">Home Page 10 </Link>
                            </li>
                          </ul>
                        </Collapse>
                      </li>

                      <li className="menu-item menu-item-has-children-mobile">
                        <Link
                          to="#"
                          className="iteam-menu"
                          onClick={() => {
                            handleToggle("job");
                          }}
                        >
                          Find jobs
                        </Link>
                        <Collapse isOpened={toggle.key === "job"}>
                          <ul
                            className="sub-menu-mobile"
                            style={{
                              display: `${
                                toggle.key === "job" ? "block" : "none"
                              }`,
                            }}
                          >
                            <li className="menu-item menu-item-mobile">
                              <Link to="/joblist_v1">List Layout</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/job-grid">Grid Layout</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/job-list-sidebar">List Sidebar</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/job-grid-sidebar">Grid Sidebar</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/joblist_v5">
                                List Sidebar Fullwidth
                              </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/joblist_v6">
                                Grid Sidebar Fullwidth
                              </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/joblist_v7">Top Map</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/joblist_v8">Top Map Sidebar</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/joblist_v9">Half Map - V1</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/joblist_v10">Half Map - V2</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/jobsingle_v1">Jobs Single - V1</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/jobsingle_v2">Jobs Single - V2</Link>
                            </li>
                          </ul>
                        </Collapse>
                      </li>

                      <li className="menu-item menu-item-has-children-mobile">
                        <Link
                          to="#"
                          className="iteam-menu"
                          onClick={() => {
                            handleToggle("employers");
                          }}
                        >
                          Employers
                        </Link>
                        <Collapse isOpened={toggle.key === "employers"}>
                          <ul
                            className="sub-menu-mobile"
                            style={{
                              display: `${
                                toggle.key === "employers" ? "block" : "none"
                              }`,
                            }}
                          >
                            <li className="menu-item">
                              <Link to="/employers_v1">List Layout</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employers_v2">Grid Layout</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employers_v3">List Sidebar</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employers_v4">Grid Sidebar</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employers_v5">Full Width</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employers_v6">Top Map</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employers_v7">Half Map</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employersingle_v1">
                                Employers Single - V1
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employersingle_v2">
                                Employers Single - V2
                              </Link>
                            </li>

                            <li className="menu-item">
                              <Link to="/employerreview">
                                Employers Reviews
                              </Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/employernotfound">
                                Employers Not Found
                              </Link>
                            </li>
                          </ul>
                        </Collapse>
                      </li>
                      <li className="menu-item menu-item-has-children-mobile">
                        <Link
                          to="#"
                          className="iteam-menu"
                          onClick={() => {
                            handleToggle("candidate");
                          }}
                        >
                          Candidates
                        </Link>
                        <Collapse isOpened={toggle.key === "candidate"}>
                          <ul
                            className="sub-menu-mobile"
                            style={{
                              display: `${
                                toggle.key === "candidate" ? "block" : "none"
                              }`,
                            }}
                          >
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidates_v1">List Layout</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidates_v2">Grid Layout</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidates_v3">List Sidebar</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidates_v4">Top Map</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidates_v5">Half Map</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidates_v6">No Available V1</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidates_v7">No Available V2</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidatesingle_v1">
                                Candidate Single - V1
                              </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/candidatesingle_v2">
                                Candidate Single - V2
                              </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/samplecv">Sample CV</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/samplecvslidebar">
                                Sample CV Sidebar
                              </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/samplecvdetails">CV Details</Link>
                            </li>
                          </ul>
                        </Collapse>
                      </li>
                      <li className="menu-item menu-item-has-children-mobile">
                        <Link
                          to="#"
                          className="iteam-menu"
                          onClick={() => {
                            handleToggle("blog");
                          }}
                        >
                          Blog
                        </Link>
                        <Collapse isOpened={toggle.key === "blog"}>
                          <ul
                            className="sub-menu-mobile"
                            style={{
                              display: `${
                                toggle.key === "blog" ? "block" : "none"
                              }`,
                            }}
                          >
                            <li className="menu-item menu-item-mobile">
                              <Link to="/blog_v1">Blog List </Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/blog_v2">Blog Grid</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/blog_v3">Blog Masonry</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/blogsingle_v1">Blog Details - V1</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/blogsingle_v2">Blog Details - V2</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/blogsingle_v3">
                                Blog Details Sidebar
                              </Link>
                            </li>
                          </ul>
                        </Collapse>
                      </li>
                      <li className="menu-item menu-item-has-children-mobile current-item">
                        <Link
                          to="#"
                          className="iteam-menu"
                          onClick={() => {
                            handleToggle("pages");
                          }}
                        >
                          Pages
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
                            <li className="menu-item menu-item-mobile">
                              <Link to="/aboutus">About Us</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/faqs">FAQS</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/termsofuse">Terms Of Use</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/pricing">Pricing</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/shop">Shop List</Link>
                            </li>
                            <li className="menu-item menu-item-mobile current-item">
                              <Link to="/shoppingcart">Shopping Cart</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/shopsingle">Shop Single</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/checkout">Checkout</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/login">Login</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/createaccount">Create Account</Link>
                            </li>
                            <li className="menu-item menu-item-mobile">
                              <Link to="/contactus">Contact Us</Link>
                            </li>
                          </ul>
                        </Collapse>
                      </li>
                    </ul>
                  </nav>
                </div>
              </TabPanel>

              <TabPanel className="categories animation-tab">
                <div className="sub-categorie-mobile">
                  <ul className="pop-up">
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-1"></span>Design &
                        Creative
                      </Link>
                    </li>
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-8"></span>Digital
                        Marketing
                      </Link>
                    </li>
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-2"></span>Development &
                        IT
                      </Link>
                    </li>
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-3"></span>Music & Audio
                      </Link>
                    </li>
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-4"></span>Finance &
                        Accounting
                      </Link>
                    </li>
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-5"></span>Programming &
                        Tech
                      </Link>
                    </li>
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-6"></span>Video &
                        Animation
                      </Link>
                    </li>
                    <li className="categories-mobile">
                      <Link to="/jobsingle_v1">
                        <span className="icon-categorie-7"></span>Writing &
                        translation
                      </Link>
                    </li>
                  </ul>
                </div>
              </TabPanel>
            </div>
          </Tabs>

          <div className="header-customize-item button">
            <Link to="/">Upload Resume</Link>
          </div>

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
      <Header2 clname="actPage3" handleMobile={handleMobile} />

      <Breadcrumb title="Shopping Cart" className="breadcrumb-section" />

      <section className="shop-section">
        <div className="tf-container">
          <div className="row">
            {productData.length === 0 ? (
              <div className="col-lg-6">
                <img
                  src={require("../assets/images/pages/empty-cart.png")}
                  alt=""
                />
              </div>
            ) : (
              <>
                <div className="col-lg-8">
                  <div className="shopping-cart">
                    <h6>Shopping Cart</h6>
                    <div className="table-res">
                      <ul className="list-shop">
                        {productData.map((data) => {
                          return (
                            <li id={data._id}>
                              <div className="product">
                                <div
                                  className="thumb"
                                  style={{ width: "100px" }}
                                >
                                  <img src={data.product_img} alt="images" />
                                </div>
                                <Link to="#">{data.name}</Link>
                              </div>
                              <div className="quantity cl3">
                                <span
                                  className="btn-quantity minus-btn"
                                  onClick={() => handleQuantity(-1, data)}
                                >
                                  <i className="icon-minus"></i>
                                </span>
                                <input
                                  type="number"
                                  name="number"
                                  value={data.quantity ? data.quantity : 1}
                                  readOnly
                                />
                                <span
                                  className="btn-quantity active plus-btn"
                                  onClick={() => handleQuantity(1, data)}
                                >
                                  <i className="icon-plus"></i>
                                </span>
                              </div>
                              <div className="price">
                                {data.amount}×
                                {data.quantity ? data.quantity : 1} = ₹
                                {data.amount *
                                  (data.quantity ? data.quantity : 1)}
                              </div>
                              <div
                                onClick={() =>
                                  handleRemoveFromCart(data.product_id)
                                }
                                className="delete"
                                style={{ cursor: "pointer" }}
                              >
                                <DeleteOutlinedIcon />
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="coupon">
                      <div className="title">You Have Discount Codes?</div>
                      {/* <p style={{ color: "red" }}>Error</p> */}
                      <div className="cp-form">
                        <div className="group-ip">
                          <input
                            type="text"
                            value={couponValue}
                            onChange={(e) => setCouponValue(e.target.value)}
                            placeholder="Coupon Code"
                          />
                          <button onClick={handleRedeemCode}>Apply</button>
                        </div>
                        <div className="title">Copy this Coupon</div>
                        <Link to="#" className="btn">
                          <ContentCopyOutlinedIcon />
                          VID15
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="shopping-cart">
                    <h6>order summary</h6>
                    <div className="view-cart">
                      <div className="subtotal">
                        <div className="group-ip">
                          <div className="top">
                            <div className="title">Subtotal</div>
                            <div className="price">{`₹${productDetail.subTotal}`}</div>
                          </div>
                          <div className="bottom">
                            <div className="title">Saving</div>
                            <div className="price">-₹460.00</div>
                          </div>
                        </div>
                        <div className="group-ip shipping">
                          <div className="top">
                            <div className="title">Shipping</div>
                          </div>
                          <div className="bottom">
                            <div className="title">
                              Shipping from <span>Adam State</span>{" "}
                            </div>
                            <div className="price st">Free</div>
                          </div>
                          <div className="bottom">
                            <div className="title">
                              Shipping from <span>United State</span>{" "}
                            </div>
                            <div className="price st">₹19.8</div>
                          </div>
                        </div>
                        <div className="total">
                          <div className="title">Total</div>
                          <div className="price">{`₹${productDetail.subTotal}`}</div>
                        </div>
                        <button onClick={handleCheckout} className="btn">
                          proceed to checkout
                        </button>
                        <Link to="#" className="payment">
                          <img
                            src={require("../assets/images/review/payment.png")}
                            alt="images"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <Gotop />
    </>
  );
}

export default Shoppingcart;
