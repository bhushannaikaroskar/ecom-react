
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/footer';
import HomePage from './components/homepage/homepage';
import NavBar from './components/navbar/navbar';

function App() {
  return (
    <div className="grand-body">
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
