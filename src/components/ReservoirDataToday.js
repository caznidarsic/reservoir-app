import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ComposedChart, BarChart, Bar, LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Select from 'react-select';

function ReservoirDataToday(props) {
    const storagePercentage = props.data[0].value / props.capacity;
    let storagePercentageColor = 'blue';
    if (storagePercentage > 0.75) {
        storagePercentageColor = 'limegreen'
    } else if (storagePercentage > 0.50) {
        storagePercentageColor = 'blue'
    } else if (storagePercentage > 0.25) {
        storagePercentageColor = 'gold'
    } else if (storagePercentage > 0) {
        storagePercentageColor = 'red'
    }
    const storageAvgPercentage = props.data[0].value / props.monthAverage.average;
    let storageAvgPercentageColor = 'blue';
    if (storageAvgPercentage > 1) {
        storageAvgPercentageColor = 'limegreen'
    } else if (storageAvgPercentage > 0.75) {
        storageAvgPercentageColor = 'blue'
    } else if (storageAvgPercentage > 0.50) {
        storageAvgPercentageColor = 'gold'
    } else if (storageAvgPercentage > 0) {
        storageAvgPercentageColor = 'red'
    }

    // function to get the name of the month from a string in the format "MM/DD/YYYY"
    function getMonthName(dateString) {
        const dateParts = dateString.split("/");
        const month = parseInt(dateParts[0]);
        const day = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        // months are zero based so must offset
        const date = new Date(year, month - 1, day);

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthName = monthNames[date.getMonth()];

        return monthName;
    }

    const options = [
        // { value: '6 months', label: '6 months' },
        { value: '1 year', label: '1 year' },
        { value: '2 years', label: '2 years' }
    ]

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: '16px',
            height: '20px',
            width: '150px'
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '16px',
            width: '150px',
        })
    };

    const renderLineChart = (
        < ResponsiveContainer width="100%" height="100%" >
            <BarChart width={500} height={300} data={props.data} margin={{ top: 20, right: window.innerWidth < 868 ? 20 : 40, left: window.innerWidth < 868 ? 0 : 30, bottom: window.innerWidth < 868 ? 0 : 5, }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: window.innerWidth < 868 ? 8 : 12 }} />
                <YAxis tickCount={6} tick={{ fontSize: window.innerWidth < 868 ? 8 : 12 }} domain={[0, props.capacity]} />
                <Tooltip wrapperStyle={{ fontSize: window.innerWidth < 868 ? "10px" : "16px" }} />
                <Bar dataKey="value" stackId="a" fill="#6879D0" background={{ fill: '#bbbbbb' }} name='Current Storage (AF)' />
                <ReferenceLine y={props.monthAverage.average} stroke="red" label={{ value: `Avg: ${props.monthAverage.average.toLocaleString()} AF`, fill: "black", position: "inside", dy: window.innerWidth < 868 ? 6 : 10, fontSize: window.innerWidth < 868 ? 6 : 12 }} className="ReferenceFont" />
            </BarChart>
        </ResponsiveContainer >
    );

    return (
        <div className="ReservoirChartDaily">

            <div className="ReservoirChartDailyHeader">
                <h3 className="TitleOfChart">
                    Current Storage
                </h3>
            </div>

            <div className="ReservoirChartDailyContent">
                <div className="ReservoirChartDailyContentChart">
                    {renderLineChart}
                </div>
                <div className="ReservoirChartDailyContentInfo">
                    <div className='ReservoirChartDailyContentInfoText'>
                        Data as of midnight {props.data[0].date}
                    </div>
                    <div className='ReservoirChartDailyContentInfoText' style={{ color: storageAvgPercentageColor }}>
                        {(storageAvgPercentage).toLocaleString(undefined, { style: 'percent' })} of average.
                    </div>
                    <div className='ReservoirChartDailyContentInfoText' style={{ color: storagePercentageColor }}>
                        {(storagePercentage).toLocaleString(undefined, { style: 'percent' })} of total capacity.
                    </div>
                    <div className='ReservoirChartDailyContentInfoText'>
                        Current Storage: {props.data[0].value.toLocaleString()} AF
                    </div>
                    <div className='ReservoirChartDailyContentInfoText'>
                        Avg. Storage for {getMonthName(props.monthAverage.date)}: {props.monthAverage.average.toLocaleString()} AF
                    </div>
                    <div className='ReservoirChartDailyContentInfoText'>
                        Total Capacity: {props.capacity.toLocaleString()} AF
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservoirDataToday;