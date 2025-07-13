const express = require('express');
const dotenv = require('dotenv').config();
const { dbConnection } = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const contactRoutes =  require("./routes/contactRoutes");
const connectDb = require('./config/dbConnection');

const app = express();

app.use(express.json());    // parsera imkan sağlar client serverdan body parse etmek için

const port = process.env.PORT || 5000;

app.use("/api/contacts", contactRoutes);

app.use(errorHandler);
connectDb();


app.listen(port, () => {
    console.log("Server running on port " + port);
});