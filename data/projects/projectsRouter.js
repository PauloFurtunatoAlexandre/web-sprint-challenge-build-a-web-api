const express = require("express");
const projectsModel = require("../../data/helpers/projectModel.js");
const actionsModel = require("../../data/helpers/actionModel.js");
const { remove } = require("../../data/helpers/actionModel.js");

const router = express.Router();

router.get("/", (req, res) => {
    projectsModel
        .get(req.id)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "error retrieving the data." });
        });
});

router.post("/", (req, res) => {
    projectsModel
        .insert(req.body)
        .then((project) => {
            res.status(201).json(project);
        })
        .catch((error) => {
            res.status(404).json({ message: "Could not add new project." });
        });
});

router.put("/:id", (req, res) => {
    projectsModel
        .update(req.params.id, req.body)
        .then((project) => {
            if (project) {
                res.status(201).json(project);
            } else {
                res.status(404).json({ message: "Could not make changes." });
            }
        })
        .catch((error) => {
            res.status(404).json({ message: "Could not find the project." });
        });
});

router.delete("/:id", (req, res) => {
    projectsModel
        .remove(req.params.id)
        .then((project) => {
            res.status(200).json({ message: "Project successfully deleted." });
        })
        .catch((error) => {
            res.status(404).json({ message: "Could not find the project." });
        });
});

module.exports = router;
