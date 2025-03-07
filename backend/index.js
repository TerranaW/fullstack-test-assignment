const express = require("express");
const http = require("http");
const db = require("./src/db");
const cors = require("cors");

db.then(() => {
  console.log("connected to db")
}).catch(() => {
  console.log("error connecting to db")
});

const app = express();
const server = http.createServer(app);

const router = require("./src/routes");

app.use(cors());
app.use(express.json())
app.use(router);

const port = 3001;
server.listen(process.env.PORT || port, () =>
  console.log(`server running at http://localhost:${port}`)

);
