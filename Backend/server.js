import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js";


// app config
const app = express();
const PORT = 5000;


// middleware
app.use(express.json())
app.use(cors())
dotenv.config()

// DB
connectDB() 

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

app.use("/api/cart",cartRouter)

app.use("/api/order",orderRouter)



app.listen(PORT,()=>{

    console.log(`Server listening on PORT ${PORT}`);

})

