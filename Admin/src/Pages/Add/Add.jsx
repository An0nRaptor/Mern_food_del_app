import "./Add.css";
import { assets } from "../../assets/assets";
import {  useState } from "react";
import axios from "axios"
import { Toaster,toast } from "react-hot-toast";

const Add = () => {

  const Url = "http://localhost:5000"

    const [image,setImage] = useState(false)
    const [data,setData] = useState({

      name:"",
      description:"",
      price:"",
      category:"Salad"
      
    })

    const handleChange=(e)=>{

      const name = e.target.name;
      const value = e.target.value;

      setData(data=>({...data,[name]:value}))

    }

    const onSubmitHandler=async(e)=>{

        e.preventDefault()

        const formData = new FormData()

        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        let res = await axios.post(`${Url}/api/food/add`,formData)
        
        if(res.data.success) {

          setData({

            name:"",
            description:"",
            price:"",
            category:"Salad",
            
          })

          setImage(false)

          toast.success("Food added successfully")

        }else{

          toast.error("Error in adding food ")

        }

    }



  return (
    <>
      <Toaster/>
    <div className="add">
      <form className="flex_col" onSubmit={onSubmitHandler}>
        <div className="add_img_upload flex_col">
          <p>Upload Image :</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className="add_product_name flex_col">
            <p>Product name </p>
            <input onChange={handleChange}  value={data.name} type="text" name="name" placeholder="Type here"/>
        </div>
        <div className="add_product_description flex_col">
            <p>Product description</p>
            <textarea onChange={handleChange} value={data.description} name="description" placeholder="Write content here" required rows=""></textarea>
        </div>
        <div className="add_category_price"> 
                <div className="add_category flex_col">
                    <p>Product category</p>
                    <select onChange={handleChange} name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add_price">
                    <p>Product price</p>
                    <input onChange={handleChange} value={data.price} type="number" name="price" placeholder="$20"/>
                </div>
        </div>
        <button type="submit" className="add_btn">ADD</button>
      </form>
    </div>
    </>
  );
};

export default Add;
