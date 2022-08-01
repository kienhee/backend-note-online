const notesModel = require("../models/notes");
const jwt = require("jsonwebtoken");

class notesController {
    async index(req, res) {
        try {
            let getTokenFromRequest = req.headers["authorization"];
            let token = getTokenFromRequest.split(" ")[1];
            const userId = jwt.verify(
                token,
                process.env.PRIVATE_KEY,
                function (err, res) {
                    return res.id;
                }
            );
            const response = await notesModel.find({
                userId,
            });
            res.json(response);
        } catch (error) {
            res.json(error);
        }
    }
    async create(req, res) {
        try {
            let getTokenFromRequest = req.headers["authorization"];
            let token = getTokenFromRequest.split(" ")[1];
            const userId = jwt.verify(
                token,
                process.env.PRIVATE_KEY,
                function (err, res) {
                    return res.id;
                }
            );
            let title = req.body.title;
            let content = req.body.content;
            // const data = {
            //     userId: userId,
            //     title: title,
            //     content: content,
            // };

            const response = await notesModel.create({
                userId,
                title,
                content,
            });
            res.json({
                message: "Create successful note 🎉",
                status: true,
                response: response,
            });
        } catch (error) {
            res.json({
                message: "Failed to create note 💔",
                status: false,
                response: error,
            });
        }
    }
    async delete(req, res) {
        try {
            await notesModel.deleteOne({
                _id: req.params.id,
            });
            return res.json({ message: "Delete Successfully!", status: true });
        } catch (error) {
            return res.json({ message: "Delete fail!", status: false });
        }
    }
    async update(req, res) {
        try {
            let postId = req.params.id;
            let title = req.body.title;
            let content = req.body.content;
            await notesModel.findByIdAndUpdate(postId, { title, content });
            res.status(200).json({
                message: "Update Successfully",
                status: true,
            });
        } catch (error) {
            return res.json({ message: "update fail!", status: false });
        }
    }
}
module.exports = new notesController();
