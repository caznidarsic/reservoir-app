import React, { useState } from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Select from 'react-select';

function ReservoirData(props) {
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [chartRange, setChartRange] = useState('5 years');

    const options = [
        // { value: '6 months', label: '6 months' },
        { value: '1 year', label: '1 year' },
        { value: '5 years', label: '5 years' },
        { value: 'Max', label: 'Max' }
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
            <ComposedChart className="line-chart" data={(chartRange === '1 year' ? props.data.slice(props.data.length - 12, props.data.length) : chartRange === '5 years' ? props.data.slice(props.data.length - 60, props.data.length) : props.data.slice(0, props.data.length))} margin={{ top: 0, right: 40, left: 50, bottom: 32 }}>
                <CartesianGrid stroke="#ccc" />
                <Legend verticalAlign="top" layout="horizontal" align="right" height="6%" wrapperStyle={{ fontSize: "16px" }} iconSize={16} />
                <Area type="linear" dot={false} dataKey="average" stroke="#008080" fill="#008080" opacity="70%" isAnimationActive={true} name="Historical Average" />
                <Area type="linear" dot={false} dataKey="value" stroke="#00008b" isAnimationActive={true} name="Actual" />
                <XAxis dataKey="date" interval={(chartRange === '1 year' ? 0 : chartRange === '5 years' ? 2 : 11)} tick={{ fontSize: 12, angle: -90, dy: 28 }} />
                <YAxis label={{ value: "Storage (Acre Feet)", angle: -90, dx: -50, fontSize: 20 }} tickCount={10} tick={{ fontSize: 12 }} domain={[0, Math.floor(1.1 * props.capacity)]} />
                <ReferenceLine y={props.capacity} stroke="red" label={{ value: `Capacity: ${props.capacity.toLocaleString()} AF`, position: "insideLeft", dy: 10, fontSize: 16 }} />
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
                <Select options={options} styles={customStyles} fontSize='12' isSearchable={false} defaultValue={options[1]} onChange={updateRange} />
            </div>
        </div>
    )
    // }

}

export default ReservoirData;