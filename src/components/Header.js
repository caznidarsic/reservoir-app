import React from 'react';
import ReservoirDropdown from './ReservoirDropdown';
import reservoirIDs from '../constants/reservoirIDs';

function Header({ reservoirs }) {
    console.log(reservoirIDs)

    return (
        <header>
            <nav>
                <ReservoirDropdown reservoirs={reservoirIDs} />
            </nav>
        </header>
    );
}

export default Header;