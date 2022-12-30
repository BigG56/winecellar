import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
//import { useDispatch } from 'react-redux';

function App() {
  return (
    <div className="App" style={{flex: 1}}>
     <Router>
        <Header />
        <Routes>
          <Route exact path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
