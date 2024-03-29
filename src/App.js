import './App.css';
// import ReservoirData from './components/ReservoirData';
// import reservoirIDs from './constants/reservoirIDs';
// import Main from './components/Main';
// import ReservoirDropdown from './components/ReservoirDropdown';
// import Header from './components/Header';
import ReservoirPage from './components/ReservoirPage';
import Homepage from './components/Homepage';
import Sidebar from './components/_Sidebar'


import { Route, Routes } from 'react-router-dom';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';


function App() {

  return (
    <div className="App">

      <div className="App-header">
        <div className="App-header-title"> Reservoirs.fyi</div>
        <div className="App-header-description">California reservoir tracker</div>
      </div>

      <div className="Main">

        <div className="Sidebar">
          <Sidebar />
        </div>

        <div className='Content'>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/Main" element={<Main />} /> */}
            {/* <Route path="/ReservoirPage" element={<ReservoirPage />} /> */}
            <Route path="/:reservoirId" element={<ReservoirPage />} />
          </Routes>
          <div className="NameTag">
            Created by <a href="https://www.linkedin.com/in/christian-znidarsic/" className='NameTagName'>Christian Znidarsic </a>
            (<a href="https://github.com/caznidarsic" className='NameTagName'>GitHub</a>)
          </div>
        </div>
      </div >
    </div>
  );
}

export default App;
