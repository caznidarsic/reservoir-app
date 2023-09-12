import '../App.css';
import ReservoirData from './ReservoirData';
import reservoirIDs from '../constants/reservoirIDs';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

function Main() {

    const resCards = reservoirIDs.map((res) => {
        return (
            <ReservoirData name={res.name} id={res.id} key={res.id} />
        )
    }
    )

    const clickHandler = () => {
        console.log("clicked!");
    }

    return (
        <div className="App">
            <div className="App-background">
                {/* <button onClick={clickHandler}>Click me!</button> */}
                {resCards}
            </div>
        </div >
    );
}

export default Main;