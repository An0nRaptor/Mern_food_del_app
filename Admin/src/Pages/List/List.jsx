import { useEffect, useState } from "react";
import "./List.css";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";


const List = () => {

  const Url = "http://localhost:5000"

  const [list, setList] = useState([]);

  const fetchList = async () => {

    const res = await axios.get(`${Url}/api/food/list`);

    if (res.data) {

      setList(res.data.data);

    } else {

      toast.error("Failed to get the list");

    }
  };

  const removeFoodItem = async (id) => {

    const res = await axios.post(`${Url}/api/food/remove`, { _id: id });

    await fetchList();

    if (!res.data.success) {

      toast.error("Error removing food");

    } else {

      toast.success("Food removed successfully");

    }
  };

  useEffect(() => {

    fetchList()
  
  });

  return (
    <>
      <Toaster />
     
      <div className="list add flex_col">
        <p>All Food List :</p>
          <div className="list_table">
            <div className="list_table_format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>

          { list?.map((item, index) => {
          
            return (
              <div key={index} className="list_table_format">
                <img src={`${Url}/images/` + item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="cursor" onClick={() => removeFoodItem(item._id)}>X</p>
              </div>
            );
          })}
        </div>
      </div>
      
    </>
  );
};

export default List;
