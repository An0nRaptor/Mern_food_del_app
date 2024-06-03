import foodModel from "../schema/Food.js";
import fs from "fs";


// add food item 
const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`

    const {name,description,price,category}= req.body

    const food = new foodModel({

        name:name,
        description:description,
        price:price,
        category:category,
        image:image_filename
    })

    try {
        await food.save();
       return res.status(200).json({success:true,message:"Food Added"})

    }catch(err){
        
        console.log(err);
       return res.status(404).json({message:err.message})
    }

}

// get food list
const listFood = async(req,res)=>{

    try {
        
        const foods = await foodModel.find({})

        return res.status(200).json({data:foods})


    } catch (err) {

        return res.status(500).json({message:err.message})
        
    }
}

  
// remove food item
const removeFood = async (req,res)=>{

    const {_id} = req.body
   

    try{

        const food = await foodModel.findById(_id)
        
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(_id)

        return res.status(200).json({success:true,message:"Food Removed"})

    }catch(err){


        console.log(err);

        return res.status(500).json({success:false,message:err.message})

    }
}

export {addFood,listFood,removeFood}