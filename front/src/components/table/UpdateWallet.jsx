import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// import BackBtn from "../BackBtn";
import { Container, Divider, TableHead } from "@mui/material";
import { api_url } from "../../redux/config";
// import Spinner from "../Spinner";
// import noDataImg from "../../assets/img/no_data.png"
// import noDataImg2 from "../../assets/img/no_data3.jpg"



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const UpdateWallet = () => {
  const [rows, setRows] = useState([
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    const loginToken = localStorage.getItem("logintoken");
    try {
      setLoading(true);
      const response = await axios.get(`${api_url}/transaction/wallet`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      console.log("his-data", response.data);
      // setRows(response?.data?.data.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error("Server Error:", error.response.data);
        // setUserDetails(error.response.data);
      } else if (error.request) {
        console.error("No response received.");
      } else {
        console.error("Request failed:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* {loading ? <Spinner loading={loading} /> : null} */}

      {/* <BackBtn navigate={"/profile_section"} /> */}
      <Box sx={{ margin: "0px 10px" }}>
        <TableContainer component={Paper} sx={{ padding: "0px 10px" }}>
          <Typography
            sx={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}
          >
            Wallet Transactions
          </Typography>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            {/* <TableHead>
              <TableRow>
                <TableCell align="left">Transaction Id</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Balance</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Date & Time</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    {/* <img class="img-fluid" src={noDataImg2} alt="" /> */}
                    <h3>No data here</h3>
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => {
                  const inputDate = row.created_at;
                  // console.log('inputDate' , inputDate)
                  const date = new Date(inputDate);
                  const day = date.getDate();
                  const month = date.getMonth() + 1; // Months are zero-indexed
                  const year = date.getFullYear();
                  const options = {
                    hour: "2-digit",
                    minute: "2-digit",
                  };

                  const formattedTime = date.toLocaleTimeString(
                    "en-US",
                    options
                  );

                  // const formattedDate = date.toLocaleString("en-US", options);
                  const formattedDate = `${day}-${month}-${year} , ${formattedTime} `;

                  return (
                    <TableRow key={row.id}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Container fixed sx={{ padding: "0px" , marginBottom:"10px"}}>
                          <Item>
                            <div
                              className="d-flex"
                              style={{
                                justifyContent: "space-between",
                                padding: "10px",
                                background:"rgb(246 246 246)"
                              }}
                            >
                              <div
                                className="btn text-white"
                                style={{ background: "rgb(126 137 255)" }}
                              >
                                Wallet
                              </div>
                              <div className="btn"
                                style={{ color:"white",
                                  background:row.status === 1 ? "green" : "red",
                                }}
                              >
                                {" "}
                                {row.status === 1 ? "Credit" : "Debit"}
                              </div>
                            </div>
                            <Divider />
                            <div
                              className="d-flex m-3"
                              style={{ justifyContent: "space-between" }}
                            >
                              <div>Transaction Id</div>
                              <div style={{}}>{row.transaction_id}</div>
                            </div>
                            <div
                              className="d-flex m-3"
                              style={{ justifyContent: "space-between" }}
                             >
                              <div>Amount</div>
                              <div
                                style={{color: row.status === 1 ? "green" : "red", fontWeight: "bold" }}
                              >
                                {row.status === 1
                                ? `+₹${row.amount}`
                                : `-₹${row.amount}`}
                              </div>
                            </div>
                            <div
                              className="d-flex m-3"
                              style={{ justifyContent: "space-between" }}
                             >
                              <div>Balance</div>
                              <div
                                style={{ color: "#ea9500", fontWeight: "bold" }}
                              >
                                {`₹ ${row.balance}`}
                              </div>
                            </div>
                            <div
                              className="d-flex m-3"
                              style={{ justifyContent: "space-between" }}
                             >
                              <div>Type</div>
                              <div
                                style={{color: "rgb(178 125 247)", fontWeight: "bold" }}
                              >
                                {row.reason}
                              </div>
                            </div>
                            <div
                              className="d-flex m-3"
                              style={{ justifyContent: "space-between" }}
                            >
                              <div>Status</div>
                              <div
                                style={{
                                  color: row.status === 1 ? "green" : "red",
                                }}
                              >
                                {row.status === 1 ? "Credit" : "Debit"}
                              </div>
                            </div>
                            <div
                              className="d-flex m-3 pb-2"
                              style={{ justifyContent: "space-between" }}
                            >
                              <div>Date</div>
                              <div
                                style={{
                                 
                                }}
                              >
                                {formattedDate}
                              </div>
                            </div>
                          </Item>
                        </Container>
                        {/* <Container fixed>
                          <Item>
                            <div
                              className="d-flex"
                              style={{ justifyContent: "space-between" }}
                            >
                              <div>Withdrawal</div>
                              <div style={{ color: "green" }}>Complate</div>
                            </div>
                            <div
                              className="d-flex"
                              style={{ justifyContent: "space-between" }}
                            >
                              <div>Balance</div>
                              <div style={{ color: "green" }}>
                                {row.status === 1
                                  ? `+₹${row.amount}`
                                  : `-₹${row.amount}`}
                              </div>
                            </div>
                          </Item>
                        </Container> */}
                        {/* <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid> */}
                      </Box>

                      {/* <TableCell sx={{ padding: "0px" }}>
                        {row.transaction_id}
                      </TableCell>
                      <TableCell
                        style={{
                          color: row.status === 1 ? "green" : "red",
                          textAlign: "left",
                          width: "10%",
                        }}
                       >
                        {row.status === 1
                          ? `+₹${row.amount}`
                          : `-₹${row.amount}`}
                      </TableCell>
                      <TableCell style={{ width: "10%" }} align="left">
                        {`₹${row.balance}`}
                      </TableCell>
                      <TableCell
                        style={{
                          color: row.status === 1 ? "green" : "red",
                        }}
                        align="left"
                       >
                        {row.status === 1 ? "Credit" : "Debit"}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ width: "33%" }}
                        align="center"
                       >
                        {formattedDate}
                      </TableCell> */}
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                {/* <Container></Container> */}
                <TablePagination
                  sx={{ overflow: "unset" }}
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UpdateWallet;
