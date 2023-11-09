import React from 'react';
import ReservoirDataMulti from './ReservoirDataMulti'
import reservoirIDs from '../constants/reservoirIDs';

function Homepage() {
    return (
        <div className="ReservoirPageHome">
            <h1 className="TitleOfPage">
                Major Reservoirs Summary
            </h1>
            <ReservoirDataMulti name={reservoirIDs[0].name} id={reservoirIDs[0].id} capacity={reservoirIDs[0].capacity} key={reservoirIDs[0].id} />
            <p className="DataFootnote">
                *Historical data is averaged from 1988 to present <br></br>
                Data courtesy of cdec.water.ca.gov
            </p>
        </div>
    );
}

export default Homepage;