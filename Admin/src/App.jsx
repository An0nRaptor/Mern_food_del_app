import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./index.css"
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";

const App = () => {
  
  return <div>
    <Navbar/>
    <div className="app_content">
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </div>
  </div>;
};

export default App;
