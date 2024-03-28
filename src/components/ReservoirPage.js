import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ReservoirData from './ReservoirData'
import ReservoirDataToday from './ReservoirDataToday'
import reservoirIDs from '../constants/reservoirIDs';
import CaliforniaMap from './CaliforniaMap';


function ReservoirPage() {
    let mapWidth = 300;

    // console.log("RENDER AGAIN")
    const { reservoirId } = useParams();
    const res = reservoirIDs.find(reservoir => reservoir.id === reservoirId);

    const [data_yesterday, setData_yesterday] = useState(null);
    const [data_current, setData_current] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // function to get the number of the month from a string in the format "MM/DD/YYYY"
    function getMonthNumber(dateString) {
        const dateParts = dateString.split("/");
        const month = parseInt(dateParts[0]);
        return month
    }

    useEffect(() => {
        // console.log('USE EFFECT')
        async function getData() {
            let url = `https://www.reservoirapi.christianznidarsic.com/resdata/daily?stationid=${res.id}`
            // let url = `http://localhost:3000/resdata/daily?stationid=${res.id}`
            await axios.get(url)
                .then(response => {
                    setData_yesterday(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    // console.log(error)
                    setError(error);
                    setLoading(false);
                })

            url = `https://www.reservoirapi.christianznidarsic.com/resdata/monthly?stationid=${res.id}&span=34`
            // url = `http://localhost:3000/resdata/monthly?stationid=${res.id}&span=34`

            await axios.get(url)
                .then(response => {
                    setData_current(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    // console.log(error)
                    setError(error);
                    setLoading(false);
                })
        }

        getData()

    }, [res])

    if (loading) {
        return <div>
            <h1>
                Loading charts...
            </h1>
        </div>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (data_current && data_yesterday) {
        /* Make sure that both data_yesterday and data_current have been updated before rendering the page. 
        Else, the children (charts) will be rendered multiple times which will cut the chart animation short.*/
        if (data_yesterday[0].stationId === res.id && data_current[0].stationId === res.id) {
            // console.log("RENDERING CHARTS WITH resid: ", data_yesterday[0])
            // need to get the average storage for the current month to be used in the current
            const monthAverage = data_current.filter((element) => { return getMonthNumber(element.date) === getMonthNumber(data_yesterday[0].date) })[0];
            return (
                <div className="ReservoirPage">
                    <h1 className="TitleOfPage">
                        {res.name}
                    </h1>
                    <div className="ReservoirPageTop">
                        <ReservoirDataToday res={res} name={res.name} id={res.id} capacity={res.capacity} key={`${res.id}_today`} data={data_yesterday} monthAverage={monthAverage} />
                        <CaliforniaMap resIds={[res]} width={mapWidth} height={mapWidth * (2299 / 2000)} mapContainerClass={`MapContainer`} />
                    </div>
                    {/* <ReservoirDataToday name={res.name} id={res.id} capacity={res.capacity} key={`${res.id}_today`} data={data_yesterday} monthAverage={monthAverage} /> */}
                    <ReservoirData name={res.name} id={res.id} capacity={res.capacity} key={`${res.id}_monthly`} data={data_current} />
                    <p className="DataFootnote">
                        {/* *Historical data is averaged from 1988 to present <br></br> */}
                        Data courtesy of cdec.water.ca.gov
                    </p>
                </div>
            );
        }
    }
}

export default ReservoirPage;