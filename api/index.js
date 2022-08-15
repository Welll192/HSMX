const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require("./src/routes/auth.route")
const contactRoute = require("./src/routes/contact.route")
const cors=require("cors")
app.use(cors());
mongoose.connect("mongodb+srv://pepito:pepito123456@hsmx.jvtru29.mongodb.net/HSMX?retryWrites=true&w=majority").then(()=>console.log("todo ok")).catch(()=>console.log("no sirvo para la programacion"))


app.use(express.json())

app.use("/api/user/auth",authRoute)
app.use("/api/contact",contactRoute)

app.listen(8000,()=>{
    console.log(`Server is running on port 8000`);
})