
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import {Footer,HomePage,ProductPage,NavBar} from "./components"

function App() {

  const location = useLocation();
  const isProductPage = location.pathname === "/product"

  return (
    <div className={"grand-body "+ (isProductPage?"grid-products":"") }>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product" element={<ProductPage/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
