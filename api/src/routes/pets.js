const { Router } = require('express');
const { getAllPets, createPet, updatePet, deletePet, registeredPets } = require("../services/petsServices.js");

const router = Router();

router.get("/", async (req, res) => {
    try {

        const { petId, petName } = req.query;

        res.status(200).json(await getAllPets(petId, petName));

    } catch (error) {

        res.status(404).json({ error: error.message });

    }
})

router.post("/", async (req, res) => {
    try {

        const pet = req.body;
        
        res.status(200).json(await createPet(pet));
        
    } catch (error) {
        
        res.status(404).json({ error: error.message });

    }
})

router.put("/", async (req, res) => {
    try {

        const pet = req.query;

        res.status(200).json(await updatePet(pet));
        
    } catch (error) {
        
        res.status(404).json({ error: error.message });
    }
})

router.delete("/", async (req, res) => {
    try {

        const { petId } = req.query;

        res.status(200).json(await deletePet(petId));

    } catch (error){

        res.status(404).json({ error: error.message });

    }
})

router.get("/registered", async (req, res) => {
    try {
        
        res.status(200).json(await registeredPets());

    } catch (error) {
        
        res.status(404).json({ error: error.message });

    }
})

module.exports = router;
