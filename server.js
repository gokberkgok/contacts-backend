const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const contactRoutes =  require("./routes/contactRoutes");
const userRoutes =  require('./routes/userRoutes');
const connectDb = require('./config/dbConnection');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(express.json());    // parsera imkan sağlar client serverdan body parse etmek için
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Contacts Backend API - github.com/gokberkgok'
    },
  },
  servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  apis: ['./routes/*.js'], // jsdoc yorumları burada
};

const port = process.env.PORT || 5000;

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

const swaggerDocument = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDb();
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server running on port " + port);
});