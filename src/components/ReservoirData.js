import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
        console.log(newRange.value);
    }

    useEffect(() => {
        // const url = `/dynamicapp/req/JSONDataServlet?Stations=${props.id}&SensorNums=15&dur_code=${(chartRange === '6 months' ? 'D' : 'M')}&${getDateRange()}`;
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
            <LineChart className="line-chart" data={(chartRange === '1 year' ? data.slice(12, 23) : data.slice(0, 23))} >
                <Line type="monotone" dataKey="value" stroke="#8884d8" isAnimationActive={false} />
                <CartesianGrid stroke="#ccc" />
                <XAxis label={{ dy: 25, fontSize: 20 }} dataKey="date" interval={5} tick={{ fontSize: 12 }} />
                <YAxis label={{ value: "Current Storage (AF)", dx: -60, angle: -90, fontSize: 20 }} tick={{ fontSize: 12 }} />
            </LineChart >
        </ResponsiveContainer>
    );


    if (loading) {
        return <div>
            <h1>
                Loading...
            </h1>
        </div>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        // <div className="ReservoirCard">
        <div className="res-flex-container">
            <h3>Storage History</h3>
            {renderLineChart}
            <div className="res-flex-container-bottom">
                <Select options={options} styles={customStyles} fontSize='12' defaultValue={options[0]} onChange={updateRange} />
            </div>
        </div>
        // </div>

    )
}

export default ReservoirData;