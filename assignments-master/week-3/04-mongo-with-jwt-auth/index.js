const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
require("dotenv").config();

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use((err, req, res, next) => {
  res.status(500).json({
    msg: "an error occured",
  });
  console.log(err);
});
