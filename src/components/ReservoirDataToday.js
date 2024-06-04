import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import CaliforniaMap from './CaliforniaMap';

function ReservoirDataToday(props) {
    let mapWidth = 300;

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

    const renderLineChart = (
        < ResponsiveContainer width="100%" height="100%" >
            <BarChart width={500} height={300} data={props.data} margin={{ top: 20, right: 20, left: 30, bottom: 5, }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tickCount={6} tick={{ fontSize: 12 }} domain={[0, props.capacity]} />
                <Tooltip wrapperStyle={{ fontSize: "16px" }} />
                <Bar dataKey="value" stackId="a" fill="#6879D0" background={{ fill: '#bbbbbb' }} name='Current Storage (AF)' />
                <ReferenceLine y={props.monthAverage.average} stroke="red" label={{ value: `Avg: ${props.monthAverage.average.toLocaleString()} AF`, fill: "black", position: "inside", dy: 10, fontSize: 12 }} className="ReferenceFont" />
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
                {/* <CaliforniaMap resIds={[props.res]} width={mapWidth} height={mapWidth * (2299 / 2000)} /> */}
            </div>
        </div>
    )
}

export default ReservoirDataToday;