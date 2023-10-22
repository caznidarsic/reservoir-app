import '../App.css';
import ReservoirData from './ReservoirData';
import reservoirIDs from '../constants/reservoirIDs';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

function Main() {

    const resCards = reservoirIDs.map((res) => {
        // console.log(res.id);
        return (
            <ReservoirData name={res.name} id={res.id} key={res.id} />
        )
    }
    )

    const clickHandler = () => {
        console.log("clicked!");
    }

    return (


        < div className="cards-flex-container" >
            {resCards}
        </div >

    );
}

export default Main;