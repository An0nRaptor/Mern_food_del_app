import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../Context/Store";

const FoodItem = ({id, name, description, price, image }) => {

  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)

  return (
    <div className="food_item">
      <div className="food_item_img_container">
        <img className="food_item_img" src={url+"/images/"+image} alt="foodItemImg" />
        {
          !cartItems[id] ? <img className="add" onClick={()=> addToCart(id)} src={assets.add_icon_white} alt="addIcon"/> 
            : <div className="food_item_container">
                <img className="Icon" src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="removeIcon"/>
                <p>{cartItems[id]}</p>
                <img className="Icon" src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="addIcon2"/>
          </div>
         }
      </div>
      <div className="food_item_info">
        <div className="food_item_name_rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="ratingStars" />
        </div>
        <p className="food_item_desc">{description}</p>
        <p className="food_item_price"> ${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
