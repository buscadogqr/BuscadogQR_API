const { Router } = require('express');
const { getPrice, createPrice, updatePrice, getStats, createStats } = require("../services/othersServices.js");

const router = Router();

router.get("/price", async (req, res) => {
    try {

        res.status(200).json(await getPrice());
        
    } catch (error) {

        res.status(404).json({ error: error.message });
        
    }
})

router.post("/price", async (req, res) => {
    try {
        
        const { price } = req.query;

        res.status(200).json(await createPrice(price));

    } catch (error) {
        
        res.status(404).json({ error: error.message });

    }
})


router.put("/price", async (req, res) => {
    try {

        const { newPrice } = req.query;

        res.status(200).json(await updatePrice(newPrice));
        
    } catch (error) {

        res.status(404).json({ error: error.message });
        
    }
})

router.get("/stats", async (req, res) => {
    try {

        res.status(200).json(await getStats());
        
    } catch (error) {

        res.status(404).json({ error: error.message });
        
    }
})

router.post("/stats", async (req, res) => {
    try {

        res.status(200).json(await createStats());

    } catch (error) {
        
        res.status(404).json({ error: error.message });

    }
})

module.exports = router;
