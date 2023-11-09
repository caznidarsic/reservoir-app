import React, { useState } from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Select from 'react-select';

function ReservoirData(props) {
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [chartRange, setChartRange] = useState('1 year');

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

    function updateRange(newRange) {
        setChartRange(newRange.value);
    }

    const renderLineChart = (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart className="line-chart" data={(chartRange === '1 year' ? props.data.slice(12, 24) : props.data.slice(0, 24))} margin={{ top: 0, right: window.innerWidth < 868 ? 20 : 40, left: window.innerWidth < 868 ? 10 : 50, bottom: 20 }}>
                <CartesianGrid stroke="#ccc" />
                <Legend verticalAlign="top" layout="horizontal" align="right" height="6%" wrapperStyle={{ fontSize: window.innerWidth < 868 ? "8px" : "16px" }} iconSize={window.innerWidth < 868 ? 8 : 16} />
                <Area type="linear" dot={false} dataKey="average" stroke="#008080" fill="#008080" opacity="70%" isAnimationActive={true} name="historical*" />
                <Area type="linear" dot={false} dataKey="value" stroke="#00008b" isAnimationActive={true} name="current" />
                <XAxis dataKey="date" interval={0} tick={{ fontSize: window.innerWidth < 868 ? 8 : 12, angle: window.innerWidth < 868 ? -90 : -20, dy: window.innerWidth < 868 ? 16 : 8 }} />
                <YAxis label={{ value: "Storage (Acre Feet)", angle: -90, dx: window.innerWidth < 868 ? -28 : -50, fontSize: window.innerWidth < 868 ? 12 : 20 }} tickCount={10} tick={{ fontSize: window.innerWidth < 868 ? 8 : 12 }} domain={[0, Math.floor(1.1 * props.capacity)]} />
                <ReferenceLine y={props.capacity} stroke="red" label={{ value: `Capacity: ${props.capacity.toLocaleString()} AF`, position: "insideLeft", dy: 10, fontSize: window.innerWidth < 868 ? 8 : 16 }} />
            </ComposedChart >
        </ResponsiveContainer>
    );

    return (
        <div className="ReservoirChartMonthly">
            <h3 className="TitleOfChart">
                Storage History
            </h3>
            {renderLineChart}
            <div className="ReservoirChartBottom">
                <Select options={options} styles={customStyles} fontSize='12' isSearchable={false} defaultValue={options[0]} onChange={updateRange} />
            </div>
        </div>
    )
    // }

}

export default ReservoirData;