require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/route");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => console.log("Mongoose is Connected"))
  .catch((err) => console.error(err.message));

app.use("/", router);

app.use(express.static(path.join(__dirname, '../front/build')));

app.use('*' , (req, res)=>{res.sendFile(path.resolve(__dirname , '../front/build' , 'index.html'))})



// console.log("env", process.env.API_URL);

app.listen(process.env.PORT, function () {
  console.log(`Server is Running Succesfully : ${process.env.PORT}`);
});