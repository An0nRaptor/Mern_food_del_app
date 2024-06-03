import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/Store";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css"

const FoodDisplay = ({category}) => {

  const { food_list } = useContext(StoreContext);

  return (
    <div className="food_display" id="food_display">
      <h2>Top dishes near you</h2>
      <div className="food_display_list">
            {food_list.map((item,index,_id)=>{
              
                const {_id:id,name,price,description,image} = item;
                

                  if(category == "All" || category == item.category){
                  
                    return(
                      
                       <FoodItem key={index} id={id} name={name} price={price} description={description} image={image}/>

                    )}             
            })}
      </div>
    </div>
  );
};

export default FoodDisplay;
