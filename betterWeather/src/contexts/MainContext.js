import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import {parseData} from '../hooks/parseData'

export const MainContext = createContext({})

export const MainProvider = (props) => {

    const [currentCoordinates, setCurrentCoordinates] = useState(
        {
            cityName: 'Toulouse',
            lon: '1.43',
            lat: '43.61'
        })
    const [epoch, setEpoch] = useState('hourly')
    const [selection, setSelection] = useState('humidity')
    const [foreCastObject, setForeCastObject] = useState(null)
    const [showList, setShowList] = useState(false)

    useEffect(() => {
        async function fetchWeather() {
            setForeCastObject(null)
            const response = await axios.post('/weather', currentCoordinates)
            setForeCastObject({ ...response.data, arrays: parseData(response.data, epoch) })
        }
        fetchWeather()

    }, [currentCoordinates])

    return (
        <MainContext.Provider
            value={{
                selection, 
                setSelection,
                foreCastObject,
                currentCoordinates,
                setCurrentCoordinates,
                showList,
                setShowList,
                epoch, 
                setEpoch
            }}
        >
            {props.children}
        </MainContext.Provider>
    )
}