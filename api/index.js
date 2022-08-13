const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require("./src/routes/auth.route")
require("dotenv").config()

mongoose.connect(process.env.MONGOOSE_URL).then(()=>console.log("todo ok")).catch(()=>console.log("no sirvo para la programacion"))

app.use(express.json())

app.use("/api/user",authRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})