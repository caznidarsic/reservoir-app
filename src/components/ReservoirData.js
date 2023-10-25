import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ComposedChart, LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Select from 'react-select';

function ReservoirData(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartRange, setChartRange] = useState('1 year');

    const options = [
        // { value: '6 months', label: '6 months' },
        { value: '1 year', label: '1 year' },
        { value: '2 years', label: '2 years' }
    ]

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: '16px', // Adjust the text size as needed
            height: '20px',  // Adjust the height as needed
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

    useEffect(() => {
        const url = `https://www.reservoirapi.christianznidarsic.com/resdata?stationid=${props.id}&span=2`
        // const url = `http://localhost:3000/resdata?stationid=${props.id}&span=2`

        axios.get(url)
            .then(response => {
                // setData(cleanData(response.data));
                setData(response.data);

                // console.log(data);
                setLoading(false);
            })
            .catch(error => {
                // console.log(error)
                // setError(error);
                setLoading(false);
            })

    }, [])

    const renderLineChart = (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart className="line-chart" data={(chartRange === '1 year' ? data.slice(12, 24) : data.slice(0, 24))} margin={{ top: 0, right: 40, left: 50, bottom: 20 }}>
                <CartesianGrid stroke="#ccc" />
                <Legend verticalAlign="top" layout="horizontal" align="right" height="6%" />
                <Area type="linear" dot={false} dataKey="average" stroke="#008080" fill="#008080" opacity="70%" isAnimationActive={true} name="historical*" />
                <Area type="linear" dot={false} dataKey="value" stroke="#00008b" isAnimationActive={true} name="current" />
                <XAxis label={{ position: "insideBottom", offset: -25, fontSize: 20 }} dataKey="date" interval={0} tick={{ fontSize: 12, angle: -20, dy: 8 }} />
                <YAxis label={{ value: "Current Storage (AF)", angle: -90, dx: -45, fontSize: 20 }} tickCount={10} tick={{ fontSize: 12 }} domain={[0, Math.floor(1.1 * props.capacity)]} />
                <ReferenceLine y={props.capacity} stroke="red" label={{ value: `Capacity: ${props.capacity} AF`, position: "insideLeft", dy: 10, fontSize: 16 }} />
            </ComposedChart >
        </ResponsiveContainer>
    );


    if (loading) {
        return <div>
            <h1>
                Loading chart...
            </h1>
        </div>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="res-flex-container">
            <h3>Storage History</h3>
            {renderLineChart}
            <p style={{ fontSize: '10px' }}>
                *Historical data is averaged from 1988 to present <br></br>
                Data courtesy of cdec.water.ca.gov
            </p>
            <div className="res-flex-container-bottom">
                <Select options={options} styles={customStyles} fontSize='12' isSearchable={false} defaultValue={options[0]} onChange={updateRange} />
            </div>
        </div>
    )
}

export default ReservoirData;