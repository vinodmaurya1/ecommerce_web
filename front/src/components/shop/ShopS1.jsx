import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { cartDetail } from "../../redux/stateSlice/authSlice";
import axios from "axios";
import { api_url } from "../../redux/config";
import { toast } from "react-toastify";

ShopS1.propTypes = {};

const options = [
  { value: "op4", label: "Sort by (Default)" },
  { value: "op5", label: "New" },
  { value: "op6", label: "Last" },
];

function ShopS1(props) {
  const { data } = props;
  const { user, cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const loginToken = localStorage.getItem("logintoken");

  const handleAddToCart = async (data) => {
    // console.log(id);
    await axios
      .post(
        `${api_url}/add_cart`,
        { user_id: user?.user?._id, product_id: data._id  , quantity:data.quantity , amount:data.amount},
        { headers: { Authorization: loginToken } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(cartDetail())
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  // useEffect(() => {
  //   if (!user) {
  //     setUserBtn(false);
  //     setUserDetails("");
  //   } else {
  //     setUserBtn(true);
  //     // console.log("user", user);
  //     setUserDetails(user?.user);
  //   }
  // }, [cart]);

  return (
    <section className="shop-section">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12 tf-tab">
            <div className="wd-meta-select-job">
              <div className="wd-findjob-filer">
                <div className="group-select-display">
                  <p className="nofi-job">
                    Total Product-<span>&nbsp;{data.length}</span>
                  </p>
                </div>
                <div className="group-select">
                  <Dropdown
                    options={options}
                    className="react-dropdown sort-buy"
                    value={options[0]}
                  />
                </div>
              </div>
            </div>
            <div className="content-tab">
              <div className="inner">
                <div className="group-col-3">
                  {data.filter(product => product.active === true).map((idx) => (
                    <div
                      key={idx._id}
                      className="employer-block style-3 cl3 wd-shop stc"
                    >
                      <div className="inner-box">
                        <Link to="#">
                          <div className="product-main-images">
                            <img
                              className="logo-company"
                              src={idx.product_img_url}
                              alt="jobtex"
                            />
                          </div>
                          <div className="product-hover-images">
                            <img
                              className="logo-company"
                              src={idx.product_img_url}
                              alt="jobtex"
                            />
                          </div>
                        </Link>
                        <div className="box-content">
                          <h3>
                            <Link to="#">{idx.name}</Link>
                          </h3>
                          <h6>
                            <Link to="#">{idx.description}</Link>
                          </h6>
                          <ul className="price">
                            <li className="price-first">{idx.amount}</li>
                            <li className="bold">{idx.amount}</li>
                          </ul>
                        </div>
                        <ul className="list-btn-action">
                          <li>
                            <Link
                              to="#"
                              className="wish-list"
                              data-tooltip="Add to wish list"
                            >
                              <i className="icon-heart"></i>
                            </Link>
                          </li>
                        </ul>
                        <button
                          onClick={() => handleAddToCart(idx)}
                          className="btn-employer"
                        >
                          add to cart
                        </button>
                        {/* <button className="group-btn">
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="pagination-job padding">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopS1;
