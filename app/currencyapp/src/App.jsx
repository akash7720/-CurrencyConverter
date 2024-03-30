// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CurrencyConverter from './compunds/CurrencyConverter';

function App() {
  return (
    <div className="App">
       <Routes>
           <Route path='/' element={<CurrencyConverter/>}/>
       </Routes>
    </div>
  );
}

export default App;
