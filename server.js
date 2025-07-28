const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const contactRoutes =  require("./routes/contactRoutes");
const userRoutes =  require('./routes/userRoutes');
const connectDb = require('./config/dbConnection');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(express.json());    // parsera imkan sağlar client serverdan body parse etmek için

const port = process.env.PORT || 5000;

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

const swaggerJsDoc = require('./swagger/swaggerConfig');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

connectDb();
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server running on port " + port);
});