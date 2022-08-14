const router = require("express").Router();
const notesController = require("../controllers/notesController");
const verifyUser = require("../middleware/authToken");

router.post("/update-a-note/:id", notesController.update);
router.post(
    "/delete-a-note/:id",
    verifyUser.verifyToken,
    notesController.delete
);
router.post(
    "/create-a-new-note",
    verifyUser.verifyToken,
    notesController.create
);
router.get("/", verifyUser.verifyToken, notesController.index);

module.exports = router;
