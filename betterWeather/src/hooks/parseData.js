export const parseData = (data, epoch) => {
    const options = { weekday: 'long', month: 'short', day: '2-digit' };
    //Determine which properties of the response will be passed to the chart
    const parsedData = {
        temp: {
            data: data[epoch].map(
                (v) => {
                    switch (epoch) {
                        case 'hourly':
                            return v.temp
                        case 'daily':
                            return v.temp.max
                    }
                }),
            toolTipLabel: '°C',
            designation: 'Temperature'
        },
        humidity: {
            data: data[epoch].map((v) => v.humidity),
            toolTipLabel: '%',
            designation: 'Humidity'
        },
        wind_speed: {
            data: data[epoch].map((v) => v.wind_speed),
            toolTipLabel: 'Km/h',
            designation: 'Wind speed'
        },
        pressure: {
            data: data[epoch].map((v) => v.pressure),
            toolTipLabel: 'hPa',
            designation: 'Pressure'
        }
    }
    //Labels 
    const parsedLabels = data[epoch].map((v) => {
        const temp = new Date(v.dt * 1000)
        switch (epoch) {
            case 'hourly':
                return `${temp.getHours().toString()} h`
            case 'daily':
                return temp.toLocaleDateString(options)
        }
    })

    return { parsedData, parsedLabels }
}