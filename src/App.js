import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Spiner from "./Spiner";
import Location from "./Location";
import SearchPage from "./SearchPage";
import { useState } from "react";
import { useEffect } from "react";
import { mockdata } from "./constants/products";

import { Routes, Route } from "react-router-dom";
import Producto from "./Producto";
import NotFound from "./NotFound";
import CONFIG from "./config/config";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);


  const callServer = async ()=>{

    if(CONFIG.use_server)    {

      try {
        const req= await fetch(
            CONFIG.server_url
        )
        const res= await req.json();
        setProducts(res.products)
        console.log("server-true")
      } catch (error) {
        console.log(error);
      }

    }
    else{
      console.log("server-false")

      setProducts(mockdata.products)
    }
  }


  useEffect(() => {
    async function recogeDatos() {
      await callServer();

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    recogeDatos();
  }, []);

  return (

    <div className="App">
      
      <Header />
       
      
      {loading ? <Spiner /> : <Location/>&&<Routes>
      
        <Route path="/" element={<SearchPage theproducts={products} />} />

        <Route path="/products/:productId" element={<Producto theproducts={products}/> }/>
        <Route path="*" element={<NotFound />} />

        
      </Routes>}
      
    </div>

  );
}

export default App;
