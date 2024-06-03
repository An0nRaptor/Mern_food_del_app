import mongoose from "mongoose";


export const connectDB = async ()=>{

    await mongoose.connect(process.env.DATABASE_URL,{ autoIndex:true})
    .then(()=>{
        console.log("DB Connected");
    })

}
