const express = require("express");
const projectsModel = require("../../data/helpers/projectModel.js");

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
        .catch(() => {
            res.status(404).json({ message: "Could not add new project." });
        });
});

router.put("/:id", validateProjectId, (req, res) => {
    projectsModel
        .update(req.params.id, req.body)
        .then((project) => {
            if (project) {
                res.status(201).json(project);
            } else {
                res.status(404).json({ message: "Could not make changes." });
            }
        })
        .catch(() => {
            res.status(404).json({ message: "Could not find the project." });
        });
});

router.delete("/:id", validateProjectId, (req, res) => {
    projectsModel
        .remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Project successfully deleted." });
        })
        .catch(() => {
            res.status(404).json({ message: "Could not find the project." });
        });
});

router.get("/:id/actions", (req, res) => {
    projectsModel
        .getProjectActions(req.params.id)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((error) => {
            res.status(404).json({ message: "Could not find the project id." });
        });
});

//middleware
function validateProjectId(req, res, next) {
    projectsModel.get(req.params.id)
        .then((project) => {
            if (project) {
                req.project = project;
                next();
            } else {
                res.status({ code: 400, message: "invalid project id" });
                next();
            }
        })
        .catch(() => {
            res.status(400).json({ message: "invalid project id." });
        });
}

module.exports = router;
