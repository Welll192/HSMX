const route = require("express").Router()
const User = require("../models/Usuario")

// REGISTRO
route.post("/registro", async (req,res)=>{

    try {
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
        })
        const saveUser = await newUser.save();
        res.status(200).json(saveUser)

    } catch (error) {
        res.status(500).json("hubo un problema en el servidor");
    }

})



// LOGIN



module.exports = route