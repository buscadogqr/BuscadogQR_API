const { Users, Pets, Others } = require("../db");

async function getAllPets(petId, petName) {
    try {

        if(petId) {
            const pet = await Pets.findByPk(petId);
            return pet;

        } else if(petName) {
            const pets = await Pets.findAll({
                where: {
                    name: petName
                }
            });

            return pets;

        } else {
            const pets = await Pets.findAll();
    
            return pets;

        }

    } catch (error) {
        
        throw error;

    }
}

async function createPet(pet) {
    try {

        if(!pet.name) {
            await Pets.create(pet);

        } else {
            const user = await Users.findOne({
                where: {
                    mail: pet.userOwner
                }
            });
            
            if(!user) {
                return `El usuario ${pet.userOwner} no está registrado`;
            } else {
    
                const todayDate = new Date();
                const acquired = todayDate.getDate() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getFullYear();    
    
                await Pets.create(pet)
                await user.update({ memberships: [ ...user.memberships, { acquired, pet: pet.name } ] });
    
                const pets = await Pets.findAll();
                const others = await Others.findByPk(1) 
                await others.update({ statistics: [{ users: others.statistics[0].users, pets: pets.length }] })
            }

        }

    } catch (error) {
        
        throw error;

    }
}

async function updatePet(pet) {
    try {

        const updatedPet = await Pets.findByPk(pet.id);
        await updatedPet.update(pet);
        return updatedPet;
        
    } catch (error) {
        
        throw error;

    }
}

async function deletePet(petId) {
    try {

        const pet = await Pets.findByPk(petId);


        const user = await Users.findOne({
            where: {
                mail: pet.userOwner
            }
        });

        const memberships = user.memberships.filter(m => m.pet !== pet.name);
        await user.update({ memberships });

        await Pets.destroy({
            where: {
                id: petId
            }
        });
        
    } catch (error) {
        
        throw error;

    }
}

async function registeredPets() {
    try {
        const pets = await Pets.findAll();
        const registered = [];
    
        pets.forEach(p => {
            if(p.name) {
                registered.push(p)
            }
        });
    
        return registered;
        
    } catch (error) {
        
        throw error;

    }
}

module.exports = {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    registeredPets
}
