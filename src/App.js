import './App.css';
import ReservoirData from './components/ReservoirData';
import reservoirIDs from './constants/reservoirIDs';
import Main from './components/Main';

function App() {

  return (
    <div className="App">
      <div className="App-header">
        <h1>California Reservoir Levels</h1>
      </div>
      <div className="App-background">
        <Main />
      </div>
    </div >
  );
}

export default App;
