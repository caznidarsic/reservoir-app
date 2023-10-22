import './App.css';
import ReservoirData from './components/ReservoirData';
import reservoirIDs from './constants/reservoirIDs';
import Main from './components/Main';
import ReservoirDropdown from './components/ReservoirDropdown';
import Header from './components/Header';
import ReservoirPage from './components/ReservoirPage';
import Homepage from './components/Homepage';
import Sidebar from './components/_Sidebar'


import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


function App() {

  return (
    <div className="App">

      <div className="App-header">
        <h1>California Reservoir Levels</h1>
      </div>

      <div className="Main">

        <div className="Sidebar">
          <Sidebar />
        </div>

        <div className='Content'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/Main" element={<Main />} /> */}
            <Route path="/ReservoirPage" element={<ReservoirPage />} />
          </Routes>
        </div>

      </div >

    </div>
  );
}

export default App;
