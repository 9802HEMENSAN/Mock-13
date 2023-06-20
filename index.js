const mongoose = require("mongoose")
const express = require("express")
const { connection } = require("./controllers/connection")
const { UserRouter } = require("./routes/user.route")
const { BlogsRouter } = require("./routes/blogs.router")
const {PatchBlogsRouter} = require("./routes/Patch.route");
const {GetBlogsRouter}=require("./routes/Get.route")
const {auth}=require("./middleware/auth.middleware");
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
 
app.get("/", (req, res) => {
    res.send("Mock-13");
})

app.use("/user", UserRouter);
app.use("/blogs", GetBlogsRouter);
app.use("/blog", PatchBlogsRouter);
app.use(auth);
app.use("/blog", BlogsRouter );

 
app.listen(process.env.PORT , async () => {
    try {
        await connection
        console.log("connected to DB !")
    } catch (error) {
        console.log(error)
    }
    console.log("connected to db")
})



