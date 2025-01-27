const { Users, Others } = require("../db");
const { Op } = require("sequelize");

async function getAllUsers(userId, userMail, userName) {
    try {

        if(userId) {
            const user = await Users.findByPk(userId);

            return user;

        } else if(userMail) {
            const user = await Users.findAll({ where: {
                mail: userMail
            }});

            return user;

        } else if(userName) {
            const user = await Users.findAll({ where: {
                name:{
                    [Op.iLike]: `%${userName}%`
                } 
            }});

            return user;

        } else {
            const users = await Users.findAll();
            
            return users;
        }

    } catch (error) {
        
        throw error;

    }
}

async function createUser(user) {
    try {

        // await Users.bulkCreate(user);

        let createdUser = {};

        const check = await Users.findOne({
            where: {
                mail: user.mail
            }
        });

        if(check) {
            return `El usuario ${user.mail} ya se encuentra registrado`;

        } else {
            await Users.create(user)
            .then(async data => {
                const users = await Users.findAll();
                const others = await Others.findByPk(1) 
                await others.update({ statistics: [{ users: users.length, pets: others.statistics[0].pets }] });

                createdUser = data;
            })

            return createdUser;
    
        }

    } catch (error) {
        
        throw error;

    }
}

async function updateUser(user) {
    try {

        const updatedUser = await Users.findByPk(user.id);

        await updatedUser.update(user);
        return updatedUser;
        
    } catch (error) {
        
        throw error;

    }
}

async function deleteUser(userId) {
    try {

        await Users.destroy({
            where: {
                id: userId
            }
        });

        const users = await Users.findAll();
        const others = await Others.findByPk(1) 
        await others.update({ statistics: [{ users: users.length, pets: others.statistics[0].pets }] })
        
    } catch (error) {
        
        throw error;

    }
}

async function login(mail, password) {
    try {

        const user = await Users.findOne({
            where: {
                mail: mail
            }
        })

        if(!user) {
            return "Mail incorrecto";

        } else if(user.password !== password) {
            return "Contraseña incorrecta";

        } else {
            return user;

        }
        
    } catch (error) {

        throw error;
        
    }
}

async function getMembers() {
    try {

        const users = await Users.findAll();
        const members = [];

        users.forEach(u => {
            if(u.memberships.length) {
                members.push(u);
            }
        });

        return members;
        
    } catch (error) {

        throw error;
        
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
    getMembers
}
