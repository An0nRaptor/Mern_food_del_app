import userModel from "../schema/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password



const tokenDataforRegisterUser=(user)=>{

    let {name,email,password} = user;

    const access_token =jwt.sign({id:user._id},process.env.JWT_SECRET)


    return {
        
        access_token,
        name,
        email,
        password

    }

}


const createToken=(id)=>{

    const access_token =  jwt.sign({id},process.env.JWT_SECRET)

    return {
        access_token
    }
}

// Login user
export const loginUser = async(req,res)=>{

        let {password,email} = req.body;

        const user = await userModel.findOne({email})

        if(!user){

            return res.status(403).json({"error":"User not found"})
        }
        
        const isMatched = await bcrypt.compare(password,user.password)

        if(!isMatched){

            return res.status(403).json({"error":"Invalid Credentials"})

        }

      
        res.status(200).json(createToken(user._id))   

    }


// Register user
export const registerUser=async(req,res)=>{

    try {

            let {name,password,email} = req.body;

            if(name.length < 3){

                return res.status(403).json({"error":'Name must be atleast 3 letters long.'})
            }

            if(!email.length){

                return res.status(403).json({"error":"Enter Email"})
            }
        
            if(!emailRegex.test(email)){
        
                return res.status(403).json({"error":"Email is invalid"})
            }
        
            if(!passwordRegex.test(password)){
        
                return res.status(403).json({"error":"Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter "})
            }
        
    
            const isExist =  await userModel.findOne({email})
            
            if(isExist){

            return res.status(400).json({

                    err:'This email already exists'
                })

            }

        
           const hashedPass = await bcrypt.hash(password,10)

              let newUser =  new userModel({name:name,password:hashedPass,email:email })
                
                await newUser.save()

                return res.status(200).json(tokenDataforRegisterUser(newUser))
              

              } catch (error) {

        console.log(error.message);
        
    }

       
         

}


