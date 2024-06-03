import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/Store";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, food_list,getTotalCartAmount,url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart_items">
        <div className="card_items_title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart_items_title cart_items_item " key={index}>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart_bottom">
        <div className="cart_total ">
          <h2>Cart Total</h2>
          <div>
            <div className="cart_total_details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0 ? 0 : 2 }</p>
            </div>
            <hr />
            <div className="cart_total_details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
        <div className="cart_promocode">
          <div>
            <p>If you have promo code, add it here.</p>
            <div className="cart_promo_code_input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
