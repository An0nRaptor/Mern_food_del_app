import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore_menu" id="explore_menu">
      <h1>Explore our menu</h1>
      <p className="explore_menu_text">
        Choose from a diverse menu featuring a detectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
         <div className="explore_menu_list">

          {
            menu_list.map((item,index)=>{
            
            return (    
                <div key={index} className="explore_menu_list_item" onClick={()=>setCategory(prevVal => prevVal === item.menu_name ? "All" : item.menu_name)}>
                    <img className={category === item.menu_name ? "active" : ''} src={item.menu_image} alt=""/>
                    <p>{item.menu_name}</p>
                </div>

            )
        })}
      </div>
      <hr/>
    </div>
  );
};


export default ExploreMenu;
