const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path =require("path")

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Docu API",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis:[`${path.join(__dirname,"./routes/index.js")}`]
};

// INSTANCIA DE EXPRESS
const server = express();
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

server.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));
// parse application/json
server.use(express.json());

server.use("/", routes);

module.exports = server;
