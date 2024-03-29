import React from 'react';
import ReservoirDataMulti from './ReservoirDataMulti'
import reservoirIDs from '../constants/reservoirIDs';
import CaliforniaMap from './CaliforniaMap';

function Homepage() {
    let mapWidth = 650;

    return (
        <div className="ReservoirPageHome">
            <h1 className="TitleOfPage">
                Major Reservoirs Summary
            </h1>
            <ReservoirDataMulti />
            <p className="DataFootnote">
                {/* *Historical data is averaged from 1988 to present <br></br> */}
                Data courtesy of cdec.water.ca.gov
            </p>
            <h3 className="TitleOfChart">
                Reservoir Map
            </h3>
            <CaliforniaMap resIds={reservoirIDs} mapContainerClass={`MapContainerMulti`} />
        </div>
    );
}

export default Homepage;