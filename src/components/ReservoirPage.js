import React from 'react';
import { useLocation } from 'react-router-dom'
import ReservoirData from './ReservoirData'


function ReservoirPage() {
    const location = useLocation();
    const res = location.state.reservoir;

    return (
        <div className="ReservoirPage">
            <h1>{res.name}</h1>
            <ReservoirData name={res.name} id={res.id} capacity={res.capacity} key={res.id} />
        </div>
    );
}

export default ReservoirPage;