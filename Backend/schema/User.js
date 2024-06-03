import mongoose,{Schema} from "mongoose";

const userSchema =  mongoose.Schema({

        name:{
            type: String,
            required: true,

        },
        email:{
            type: String,
            required: true,
                   
        },
        password:{
    
            type:String,
            required: true
        },
        cartData:{
    
            type:Object,
            default: {}
        }
    
    
})


export default  mongoose.model("users",userSchema)

