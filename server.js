const express = require("express");
const projectsRouter = require("./data/projects/projectsRouter.js");
const actionsRouter = require("./data/actions/actionsRouter.js");

const helmet = require("helmet");

const server = express();
server.use(express.json());

server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({message: "server is online"})
})

server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionsRouter)

module.exports = server;