const express = require("express");
const projectsRouter = require("./data/projects/projectsRouter.js");
const actionsRouter = require("./data/actions/actionsRouter.js");

const helmet = require("helmet");

const server = express();
server.use(express.json());

server.use(logger);
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({ message: "server is online" });
});


function logger(req, res, next) {
    console.log(
        `${req.method} request to ${
            req.url
        } at ${new Date().toISOString()} from ${req.get("Host")}`
        
    );
    next();
}

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
