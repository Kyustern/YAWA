import { useState, useEffect, useContext } from 'react'
import Chart from 'chart.js'

import { MainContext } from '../contexts/MainContext'
import Graph from 'chart.js'

const lineDatasetOptions = {
    tension: 0.1,
    pointHitRadius: 20,
    pointRadius: 10,
    pointStyle: 'circle',
    label: 'Temperature',
    backgroundColor: 'rgba(255, 99, 132, 0.4)',
    borderColor: 'rgb(255, 99, 132)',
}

const options = {
    maintainAspectRatio: true,
    legend: { display: false },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

const useGraph = (ref) => {

    const { 
        foreCastObject,
        selection,
        epoch
    } = useContext(MainContext)
    const [range, setRange] = useState([0, 11])
    const [graph, setGraph] = useState(null)

    
    //changes the data of the graph
    useEffect(() => {
        if (graph) {
            const { parsedLabels, parsedData } = foreCastObject.arrays
            graph.data.labels = parsedLabels.slice(range[0], range[1])
            graph.data.datasets[0].data = parsedData[selection].data.slice(range[0], range[1])
            graph.update()
        }
    }, [range])


    useEffect(() => {
        if (graph) {
            graph.destroy()
        }
        if (foreCastObject) {


            const { parsedLabels, parsedData } = foreCastObject.arrays
            const data = {
                labels: parsedLabels.slice(0, 11),
                datasets: [{
                    ...lineDatasetOptions,
                    data: parsedData[selection].data.slice(0, 11)
                }]                
            }


            setGraph(new Graph(ref.current.getContext('2d'), 
            {
                type: 'line', 
                data,
                options : {
                    ...options,
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            label: (tooltipItems) => `${tooltipItems.yLabel} ${parsedData[selection].toolTipLabel}`
                        }
                    } 
                } 
            }
            ))
        }
    }, [foreCastObject, selection])

    return [graph, range, setRange]

}

export default useGraph