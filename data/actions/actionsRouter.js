const express = require("express");
const actionsModel = require("../../data/helpers/actionModel.js");


const router = express.Router();

router.get("/", (req, res) => {
    actionsModel
        .get(req.id)
        .then((action) => {
            res.status(200).json(action);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "error retrieving the data." });
        });
});

router.post("/", (req, res) => {
    actionsModel
        .insert(req.body)
        .then((action) => {
            res.status(201).json(action);
        })
        .catch(() => {
            res.status(404).json({ message: "Could not add new Action." });
        });
});

router.put("/:id", (req, res) => {
    actionsModel
        .update(req.params.id, req.body)
        .then((action) => {
            if (action) {
                res.status(201).json(action);
            } else {
                res.status(404).json({ message: "Could not make changes." });
            }
        })
        .catch(() => {
            res.status(404).json({ message: "Could not find the Action." });
        });
});

router.delete("/:id", (req, res) => {
    actionsModel
        .remove(req.params.id)
        .then((acton) => {
            res.status(200).json({ message: "Action successfully deleted." });
        })
        .catch(() => {
            res.status(404).json({ message: "Could not find the Action." });
        });
});

module.exports = router;