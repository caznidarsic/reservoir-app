import React from 'react';
import ImageMapper from 'react-image-mapper';

const CaliforniaMap = (props) => {

    return (
        <div className="MapContainerOuter">
            <div className={props.mapContainerClass}>
                {/* <img className="MapImage" src="california_outline.png" alt="california_outline" height={props.height} width={props.width}></img> */}
                <img className="MapImage" src="california_outline.png" alt="california_outline"></img>
                {props.resIds.map((reservoir, index) => (
                    // <a key={index} className="IconLink" href={`/${reservoir.id}`} style={{ position: 'absolute', top: props.height * reservoir.map_y_factor, left: props.width * reservoir.map_x_factor }}>
                    <a key={index} className="IconLink" href={`/${reservoir.id}`} style={{ position: 'absolute', top: `${reservoir.map_y_factor * 100}%`, left: `${reservoir.map_x_factor * 100}%` }}>
                        <img src="blue_circle_icon.png" alt={reservoir.name} width={Math.sqrt(reservoir.capacity) / 75}></img>
                        {reservoir.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CaliforniaMap;