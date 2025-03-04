const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const router = require("./src/routes");

app.use(express.json());

app.use("/api", router);

const port = 3001;
server.listen(process.env.PORT || port, () =>
  console.log(`server running at http://localhost:${port}`)
);
