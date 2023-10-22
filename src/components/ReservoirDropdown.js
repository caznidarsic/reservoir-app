import React from 'react';
import { Link } from 'react-router-dom';

function ReservoirDropdown({ reservoirs }) {
    return (
        <select>
            {reservoirs.map((reservoir) => (
                <option key={reservoir.id} value={reservoir.name}>
                    <Link to={`/reservoirs/${reservoir.id}`}>{reservoir.name}</Link>
                </option>
            ))}
        </select>
    );
}

export default ReservoirDropdown;