import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import Select from 'react-select';
import reservoirIDs from '../constants/reservoirIDs';

function ReservoirDataMulti() {

    const [data, setData] = useState([]);
    const [areas, setAreas] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartRange, setChartRange] = useState('5 years');

    const totalCapacity = reservoirIDs.reduce((total, reservoir) => {
        return total + reservoir.capacity;
    }, 0);

    const options = [
        // { value: '6 months', label: '6 months' },
        { value: '1 year', label: '1 year' },
        { value: '5 years', label: '5 years' },
        { value: 'Max', label: 'Max' },
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
        // Sort the reservoirs by capacity in ascending order and create a string of comma separated IDs
        const sortedReservoirs = reservoirIDs.sort((a, b) => a.capacity - b.capacity);
        const idArray = sortedReservoirs.map(reservoir => reservoir.id);
        const idString = idArray.join(',');

        const url = `https://www.reservoirapi.christianznidarsic.com/resdata/monthly?stationid=${idString}&span=34`
        // const url = `http://localhost:3000/resdata/monthly?stationid=${idString}&span=2`

        axios.get(url)
            .then(response => {
                setData(response.data);
                setAreas(sortedReservoirs.map((res) => {
                    return (
                        <Area key={res.id} name={res.name} type="linear" dot={false} dataKey={res.id} stackId={1} stroke="#00008b" isAnimationActive={true} legendType="none" />
                    )
                }
                ));

                setLoading(false);
            })
            .catch(error => {
                // console.log(error)
                setError(error);
                setLoading(false);
            })

    }, [])

    // const renderLineChart = (
    //     <ResponsiveContainer width="100%" height="100%" >
    //         <ComposedChart className="line-chart" data={(chartRange === '1 year' ? data.slice(data.length - 12, data.length) : chartRange === '5 years' ? data.slice(data.length - 60, data.length) : data.slice(0, data.length))} margin={{ top: 0, right: window.innerWidth < 868 ? 20 : 40, left: window.innerWidth < 868 ? 10 : 50, bottom: 20 }}>
    //             <CartesianGrid stroke="#ccc" />
    //             {/* <Legend verticalAlign="top" layout="horizontal" align="right" height="6%" wrapperStyle={{ fontSize: window.innerWidth < 868 ? "8px" : "16px" }} iconSize={window.innerWidth < 868 ? 8 : 16} /> */}
    //             <Tooltip wrapperStyle={{ fontSize: window.innerWidth < 868 ? "10px" : "16px" }} />
    //             <Area type="linear" dot={false} dataKey="totalAverage" stroke="#008080" fill="#008080" opacity="70%" isAnimationActive={true} name="Historical Average" />
    //             {areas}
    //             <XAxis dataKey="date" interval={(chartRange === '1 year' ? 0 : chartRange === '5 years' ? 2 : 11)} tick={{ fontSize: window.innerWidth < 868 ? 8 : 12, angle: window.innerWidth < 868 ? -90 : -20, dy: window.innerWidth < 868 ? 16 : 8 }} />
    //             <YAxis label={{ value: "Storage (Acre Feet)", angle: -90, dx: window.innerWidth < 868 ? -28 : -50, fontSize: window.innerWidth < 868 ? 12 : 20 }} tickCount={10} tick={{ fontSize: window.innerWidth < 868 ? 8 : 12 }} domain={[0, Math.floor(1.05 * totalCapacity)]} />
    //             <ReferenceLine y={totalCapacity} stroke="red" label={{ value: `Capacity: ${totalCapacity.toLocaleString()} AF`, position: "insideLeft", dy: 10, fontSize: window.innerWidth < 868 ? 8 : 16 }} />
    //         </ComposedChart >
    //     </ResponsiveContainer >
    // );

    const renderLineChart = (
        <ResponsiveContainer width="100%" height="100%" >
            <ComposedChart className="line-chart" data={(chartRange === '1 year' ? data.slice(data.length - 12, data.length) : chartRange === '5 years' ? data.slice(data.length - 60, data.length) : data.slice(0, data.length))} margin={{ top: 0, right: 40, left: 50, bottom: 32 }}>
                <CartesianGrid stroke="#ccc" />
                {/* <Legend verticalAlign="top" layout="horizontal" align="right" height="6%" wrapperStyle={{ fontSize: window.innerWidth < 868 ? "8px" : "16px" }} iconSize={window.innerWidth < 868 ? 8 : 16} /> */}
                <Tooltip wrapperStyle={{ fontSize: "16px" }} />
                <Area type="linear" dot={false} dataKey="totalAverage" stroke="#008080" fill="#008080" opacity="70%" isAnimationActive={true} name="Historical Average" />
                {areas}
                <XAxis dataKey="date" interval={(chartRange === '1 year' ? 0 : chartRange === '5 years' ? 2 : 11)} tick={{ fontSize: 12, angle: -90, dy: 28 }} />
                <YAxis label={{ value: "Storage (Acre Feet)", angle: -90, dx: -50, fontSize: 20 }} tickCount={10} tick={{ fontSize: 12 }} domain={[0, Math.floor(1.05 * totalCapacity)]} />
                <ReferenceLine y={totalCapacity} stroke="red" label={{ value: `Capacity: ${totalCapacity.toLocaleString()} AF`, position: "insideLeft", dy: 10, fontSize: 16 }} />
            </ComposedChart >
        </ResponsiveContainer >
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
        <div className="ReservoirChartMulti">
            <h3 className="TitleOfChart">
                Storage History
            </h3>
            {renderLineChart}
            <div className="ReservoirChartBottom" >
                <Select options={options} styles={customStyles} fontSize='12' isSearchable={false} defaultValue={options[1]} onChange={updateRange} />
            </div>
        </div>
    )
}

export default ReservoirDataMulti;