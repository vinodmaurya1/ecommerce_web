import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { format, sub } from "date-fns";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  Input,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";
import { useSelector, useDispatch } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import { api_url } from "../../redux/config";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const img_url =
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";

const ProductsData = [
  {
    title: "How Innovation Works",
    price: 275,
    discount: 25,
    related: false,
    salesPrice: 350,
    category: ["books"],
    gender: "Men",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#1890FF"],
    photo: img_url,
    id: 1,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Psalms Book for Growth",
    price: 89,
    discount: 10,
    related: true,
    salesPrice: 99,
    category: ["books"],
    gender: "Women",
    rating: 3,
    stock: false,
    qty: 1,
    colors: ["#1890FF", "#94D82D", "#FF4842"],
    photo: img_url,
    id: 2,
    created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "The Psychology of Money",
    price: 125,
    discount: 12,
    related: false,
    salesPrice: 137,
    category: ["fashion", "books"],
    gender: "Kids",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#FF4842", "#1890FF", "#94D82D"],
    photo: img_url,
    id: 3,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Boat Headphone",
    price: 50,
    discount: 15,
    related: true,
    salesPrice: 65,
    category: ["electronics"],
    gender: "Men",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#1890FF", "#94D82D", "#FFC107"],
    photo: img_url,
    id: 4,
    created: sub(new Date(), { days: 4, hours: 9, minutes: 40 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "MacBook Air Pro",
    price: 650,
    discount: 250,
    related: true,
    salesPrice: 900,
    category: ["fashion", "electronics"],
    gender: "Women",
    rating: 3,
    stock: false,
    qty: 1,
    colors: ["#00AB55", "#000000"],
    photo: img_url,
    id: 5,
    created: sub(new Date(), { days: 2, hours: 5, minutes: 50 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Gaming Console",
    price: 25,
    discount: 6,
    related: true,
    salesPrice: 31,
    category: ["electronics"],
    gender: "Men",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#FFC0CB", "#FF4842"],
    photo: img_url,
    id: 6,
    created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Red Valvet Dress",
    price: 150,
    discount: 50,
    related: false,
    salesPrice: 200,
    category: ["fashion"],
    gender: "Women",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#FF4842", "#1890FF", "#94D82D"],
    photo: img_url,
    id: 7,
    created: sub(new Date(), { days: 6, hours: 10, minutes: 0 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Shoes for Girls",
    price: 300,
    discount: 80,
    related: false,
    salesPrice: 380,
    category: ["fashion", "toys"],
    gender: "Women",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#1890FF", "#94D82D", "#FFC107"],
    photo: img_url,
    id: 8,
    created: sub(new Date(), { days: 7, hours: 5, minutes: 20 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Short & Sweet Purse",
    price: 175,
    discount: 25,
    related: false,
    salesPrice: 200,
    category: ["fashion"],
    gender: "Women",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#00AB55", "#000000"],
    photo: img_url,
    id: 9,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Toy Dino for Fun",
    price: 210,
    discount: 40,
    related: false,
    salesPrice: 250,
    category: ["toys"],
    gender: "Kids",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#FFC0CB", "#FF4842"],
    photo: img_url,
    id: 10,
    created: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Cute Soft Teddybear",
    price: 285,
    discount: 60,
    related: false,
    salesPrice: 345,
    category: ["toys"],
    gender: "Kids",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#FF4842", "#1890FF", "#94D82D"],
    photo: img_url,
    id: 11,
    created: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
    description: "hWalletAction@Admin",
  },
  {
    title: "Little Angel Toy",
    price: 5,
    discount: 5,
    related: false,
    salesPrice: 10,
    category: ["toys"],
    gender: "Kids",
    rating: 3,
    stock: true,
    qty: 1,
    colors: ["#1890FF", "#94D82D", "#FFC107"],
    photo: img_url,
    id: 12,
    created: sub(new Date(), { days: 9, hours: 6, minutes: 20 }),
    description: "hWalletAction@Admin",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sno",
    // numeric: false,
    disablePadding: false,
    label: "S.No.",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "trans",
    numeric: false,
    disablePadding: false,
    label: "Trans. No.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleSearch, search } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Box sx={{}}>
        <TextField
          sx={{
            "& input": {
              fontSize: "18px",
              padding: "3px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search User"
          size="small"
          onChange={handleSearch}
          value={search}
        />
      </Box>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const WalletActionByAdmin = () => {
  const [walletTransactions, setWalletTransactions] = useState([""]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const logintoken = localStorage.getItem("logintoken");
  const { user } = useSelector((state) => state.user);

  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState("");

  // React.useEffect(() => {
  //   setRows(getProducts);
  // }, [getProducts]);

  const handleSearch = (event) => {
    const filteredRows = rows.filter((row) => {
      return row.user_id.name.toLowerCase().includes(event.target.value);
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const fetchData = () => {
      try {
        axios
          .post(
            `${api_url}/get_transaction_details`,
            {},
            {
              headers: {
                Authorization: logintoken,
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            setRows(res.data.data.reverse());
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = (id, status) => {
    try {
      axios
        .post(
          `${api_url}/update_wallet`,
          {
            wallet_transaction_id: `${id}`,
            user_id: user?.user._id,
            status: status,
          },
          {
            headers: {
              Authorization: logintoken,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          if (res.data.success === true) {
            fetchData();
            
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box>
        <EnhancedTableToolbar
          numSelected={selected.length}
          search={search}
          handleSearch={(event) => handleSearch(event)}
        />
        <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const serialNumber = rows.length - (page * rowsPerPage + index);
                    return (
                      <TableRow hover tabIndex={-1} key={row.title}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {serialNumber}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            ₹{row.rupee}
                          </Box>
                        </TableCell>
                        <TableCell>{row.transaction_id}</TableCell>
                        <TableCell>{row.user_id.name}</TableCell>
                        <TableCell>
                          <Typography fontWeight="500" variant="">
                            {row.user_id.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            {row.status === 0 ? (
                              <>
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => handleAction(row._id, 1)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn btn-outline-danger mx-1"
                                  onClick={() => handleAction(row._id, 2)}
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <>
                                {row.status === 1 ? (
                                  <p style={{fontSize:"15px"}} className="text-success"><DoneAllIcon/> Accepted</p>
                                ) : (
                                  <p style={{fontSize:"15px"}}  className="text-danger"><CloseIcon/> Rejected</p>
                                )}  
                              </>
                            )}
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default WalletActionByAdmin;
