const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Users = require("./users.js");
const Pets = require("./pets.js");
const Others = require("./others.js");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/users", Users);
router.use("/pets" , Pets);
router.use("/others", Others);


module.exports = router;
