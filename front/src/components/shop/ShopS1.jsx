import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { cartDetail } from "../../redux/stateSlice/authSlice";
import axios from "axios";
import { api_url } from "../../redux/config";
import { toast } from "react-toastify";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

ShopS1.propTypes = {};

const options = [
  { value: "op4", label: "Sort by (Default)" },
  { value: "increment", label: "Low to high" },
  { value: "decrement", label: "High to low" },
];



function ShopS1(props) {
  const { data } = props;
  const { user, cart } = useSelector((state) => state.user);
  const [showData, setShowData] = useState([]);
  const dispatch = useDispatch();
  const loginToken = localStorage.getItem("logintoken");
  const [productData, setProductData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);

  //   useEffect(() => {
  //  setShowData(data)
  //   }, [data])

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${api_url}/get_all_product`)
        .then((res) => {
          console.log(res.data);
          setProductData(res?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const handleAddToCart = async (data) => {
    // console.log(id);
    await axios
      .post(
        `${api_url}/add_cart`,
        {
          user_id: user?.user?._id,
          product_id: data._id,
          quantity: data.quantity,
          amount: data.amount,
        },
        { headers: { Authorization: loginToken } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
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

  const handleSort = (e) => {
    console.log(e);
    if (e.value === "increment") {
      setProductData([...productData].sort((a, b) => a.amount - b.amount));
    } else if (e.value === "decrement") {
      setProductData([...productData].sort((a, b) => b.amount - a.amount));
    } else {
      setProductData(productData);
    }
  };

  const handlePagination = (val) => {
    // let val = e.target.value;
    console.log(val);
    setPage(val)
  };

  const handleCategory = (e) => {
    const val = parseInt(e.target.value);
    const isChecked = e.target.checked;

    // if (isChecked) {
    //   setChecked(true);
    //   setProductData(productData.filter((product) => product.category === val));
    // } else {
    //   setChecked(false);
    //   setProductData(productData);
    // }
  };


  const ItemPerPage = 3;

  return (
    <section className="shop-section">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12 tf-tab">
            <div className="wd-meta-select-job">
              <div className="wd-findjob-filer">
                <div className="group-select-display">
                  <p className="nofi-job">
                    Total Product-<span>&nbsp;{productData.length}</span>
                  </p>
                </div>
                <div>
                  Category
                  <div>
                    <FormGroup sx={{ flexDirection: "row" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={1}
                            onClick={(e) => handleCategory(e)}
                            checked={checked}
                          />
                        }
                        label="Electronic"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={2}
                            onClick={(e) => handleCategory(e)}
                          />
                        }
                        label="Skin Care"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Daily Use"
                      />
                      <FormControlLabel control={<Checkbox />} label="Health" />
                      <FormControlLabel control={<Checkbox />} label="Mackup" />
                    </FormGroup>
                  </div>
                </div>
                <div className="group-select">
                  <Dropdown
                    options={options}
                    className="react-dropdown sort-buy"
                    value={options[0]}
                    onChange={(e) => handleSort(e)}
                  />
                </div>
              </div>
            </div>
            <div className="content-tab">
              <div className="inner">
                <div className="group-col-3">
                  {productData
                    ?.filter((product) => product.active === true)
                    .map((idx) => (
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
                <div>Show {(page-1)*ItemPerPage + 1} to {page*ItemPerPage} of {productData.length} result</div>
                <ul className="pagination-job padding">
                  <li>
                    <Link to="#">
                      <i className="icon-keyboard_arrow_left"></i>
                    </Link>
                  </li>
                  {Array.from({
                    length: Math.ceil(productData.length / ItemPerPage),
                  }).map((product, index) => (
                    <li className={index + 1 === page ? "current" : ""}>
                      <div>
                        <button
                          onClick={(e) => handlePagination(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </div>
                    </li>
                  ))}
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
