import userModel from "../schema/User.js"

// add items to user cart
export const addToCart =async(req,res)=>{

    const {userId,itemId} = req.body;


    try {
        
        let userData = await userModel.findById({_id:req.body.userId})

        let cartData = await userData.cartData;
        
        if(!cartData[itemId]){

            cartData[itemId] = 1;

        }else{

            cartData[itemId] += 1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})

        return res.status(200).json({success:true,message:"Added to cart"})

    } catch (error) {

        console.log("Error",error);

        res.status(404).json({error:error.message});
        
    }



}


// remove items from the user cart

export const removeFromCart=async(req,res)=>{

    const {userId,itemId} = req.body;

    try {

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData;
        
        if(cartData[itemId]>0){

            cartData[itemId] -= 1;

        }

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Item Removed"})

        
        
    } catch (error) {
        console.log(error);
        res.status(404).json({error:error.message});
    }

}


// fetch user cart data 

export const getCart =async(req,res)=>{

    const {userId} = req.body


    try {
        
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        res.json({success: true,cartData: cartData})

    } catch (error) {

        console.log(error);
        
        res.status(404).json({success: false,error: error})

    }

}
