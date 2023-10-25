import React from 'react';
import { useLocation } from 'react-router-dom'
import ReservoirDataMulti from './ReservoirDataMulti'
import reservoirIDs from '../constants/reservoirIDs';

function Homepage() {
    return (
        <div className="ReservoirPage">
            <h1>Major Reservoirs Combined</h1>
            <ReservoirDataMulti name={reservoirIDs[0].name} id={reservoirIDs[0].id} capacity={reservoirIDs[0].capacity} key={reservoirIDs[0].id} />
        </div>
    );
}

export default Homepage;