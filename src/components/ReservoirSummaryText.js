import React from 'react';

const ReservoirSummaryText = (props) => {

    return (
        <div className="ReservoirSummaryText">
            <div className="ReservoirSummaryTextHeader">
                <h3 className="TitleOfChart">
                    Reservoir Info
                </h3>
            </div>
            <p>
                {props.summary}
            </p>
        </div>
    );
};

export default ReservoirSummaryText;