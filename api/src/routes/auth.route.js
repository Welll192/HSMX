const route = require("express").Router()
const User = require("../models/Usuario")
const jwt = require("jsonwebtoken")
const { json } = require("express")
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

route.post("/login", async (req,res)=>{

    try {
        const {email, password} = req.body

        const findUser = await User.findOne({email:email});
    
        if(!findUser) throw("Usuario Equivocado")

        if(findUser.password!=password) throw("Contraseña equivocada")

        const accessToken = jwt.sign({email: email},"MYSECRETKEY",{expiresIn:"1d"})

        res.status(200).json({email,accessToken})
    
    } catch (error) {
        
        console.log(error);

        res.status(404).json(error)

    }



})




module.exports = route