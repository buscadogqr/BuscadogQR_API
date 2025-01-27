const { Router } = require('express');
const { getAllUsers, createUser, updateUser, deleteUser, login, getMembers } = require("../services/usersServices.js");

const router = Router();

router.get("/", async (req, res) => {
    try {

        const { userId, userMail, userName } = req.query;

        res.status(200).json(await getAllUsers(userId, userMail, userName));

    } catch (error) {

        res.status(404).json({ error: error.message });

    }
})

router.post("/", async (req, res) => {
    try {

        const user = req.body;
        
        res.status(200).json(await createUser(user));
        
    } catch (error) {
        
        res.status(404).json({ error: error.message });

    }
})

router.put("/", async (req, res) => {
    try {

        const user = req.query;

        res.status(200).json(await updateUser(user));
        
    } catch (error) {
        
        res.status(404).json({ error: error.message });
    }
})

router.delete("/", async (req, res) => {
    try {

        const { userId } = req.query;

        res.status(200).json(await deleteUser(userId));

    } catch (error){

        res.status(404).json({ error: error.message });

    }
})

router.get("/login", async (req, res) => {
    try {

        const { mail, password } = req.query;

        res.status(200).json(await login(mail, password));
        
    } catch (error) {
        
        res.status(404).json({ error: error.message });

    }
})

router.get("/members", async (req, res) => {
    try {

        res.status(200).json(await getMembers());
        
    } catch (error) {
        
        res.status(404).json({ error: error.message });

    }
})

module.exports = router;
