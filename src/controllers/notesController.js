const notesModel = require("../models/notes");
const jwt = require("jsonwebtoken");
const getUserId = require("../services/getIdUser");
class notesController {
    async index(req, res) {
        try {
            let userId = getUserId(req);
            console.log(userId);
            const response = await notesModel.find({
                userId,
            });
            console.log(response);
            return res.json({
                message: "fetch data successfully 🎉",
                status: true,
                data: response,
            });
        } catch (error) {
            console.log(error);
            res.json({
                message: "fetch data faild 🎉",
                status: false,
            });
        }
    }
    async create(req, res) {
        try {
            let title = req.body.title;
            let content = req.body.content;

            let id = getUserId(req);

            const response = await notesModel.create({
                userId: id,
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
