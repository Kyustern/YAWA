import React, { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import Loader from './Loader'
import {MainContext} from '../contexts/MainContext'

const geoApiOpt = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const LocationSelector = ({ setShowMap, mapLoaded }) => {

    const {setCurrentCoordinates} = useContext(MainContext)

    const [isMapShown, setIsMapShown] = useState(false)
    const [gettingPos, setGettingPos] = useState(false)
    const [mapInstance, setMapInstance] = useState(null)
    const mapRef = useRef(null)
    const crosshairRef = useRef(null)

    let mapConfig = {
        center: { lat: 43.3681, lng: 1.6143 },
        zoom: 3,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    }

    const compassButtonHandler = () => {
        setGettingPos(true)
        const success = (pos) => {
            setGettingPos(false)
            if (mapInstance && mapLoaded) {
                const { latitude, longitude } = pos.coords;
                //actually pan to detected position
                mapInstance.setCenter({ lat: Math.round(latitude), lng: Math.round(longitude) })
            }
        }
        console.log("success -> map", mapInstance)

        function error(err) {
            //does nothing and die
            setGettingPos(false)
            console.error(`ERREUR (${err.code}): ${err.message}`);
        }
        if (mapRef.current) {
            navigator.geolocation.getCurrentPosition(success, error, geoApiOpt);
        }
    }

    const getInitialLoc = (mapConfig, callback) => {
        const success = (pos) => {
            const { latitude, longitude } = pos.coords;
            mapConfig.center = { lat: latitude, lng: longitude }
            mapConfig.zoom = 10
            callback()
        }
        const errorHandler = (err) => {
            console.log("err -> err", err)
            callback()
        }
        navigator.geolocation.getCurrentPosition(success, errorHandler, geoApiOpt);
    }

    const drawCrosshair = () => {
        const ctx = crosshairRef.current.getContext('2d')
        crosshairRef.current.height = ctx.canvas.offsetHeight
        crosshairRef.current.width = ctx.canvas.offsetWidth
        const width = crosshairRef.current.width
        const height = crosshairRef.current.height
        const centerOffset = 30
        console.log("drawCrosshair -> ctx", ctx)
        //draw the square at the center of the canvas
        ctx.strokeRect(width / 2 - centerOffset / 2, height / 2 - centerOffset / 2, centerOffset, centerOffset);
        //set the starting point of the line at the center
        ctx.moveTo(width / 2, 0)
        ctx.lineTo(width / 2, height)
        ctx.closePath()

        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.closePath()

        ctx.stroke()
    }

    const drawCoordinates = (mapInstance) => {
        const {lat, lng} = mapInstance.center
        const ctx = crosshairRef.current.getContext('2d')
        const width = crosshairRef.current.width
        ctx.font = 'normal 1rem inherit'
        ctx.clearRect(0, 0, width/2 - 10, 31)
        ctx.strokeText(lat(), 0, 15)
        ctx.strokeText(lng(), 0, 30)
    }

    const validationMarkHandler = () => {
        const {lat, lng} = mapInstance.center
        setCurrentCoordinates({
            cityName: '',
            lon: lng(),
            lat: lat()
        })
        setShowMap(false)
    }

    useEffect(() => {
        //Component mount
        if (mapLoaded) {
            getInitialLoc(mapConfig, () => {
                setIsMapShown(true)
                setMapInstance(new window.google.maps.Map(mapRef.current, mapConfig))
            })
        }

    }, [mapLoaded])

    useEffect(() => {
        if (mapInstance) {
            drawCrosshair()
            drawCoordinates(mapInstance)
            mapInstance.addListener('center_changed', () => drawCoordinates(mapInstance))
        }
    }, [mapInstance])

    return (
        <Background>
            <Wrapper>
                {/* {!mapLoaded && !map ? */}
                {!isMapShown ?
                    <Loader />
                    :
                    <>
                        <div style={{ height: '100%', width: '100%', borderRadius: 'inherit' }} ref={mapRef}></div>
                        <Crosshair ref={crosshairRef}></Crosshair>
                    </>
                }
            </Wrapper>
            <ControlRack>
                <IconButton onClick={() => setShowMap(false)}>❌</IconButton>
                <IconButton onClick={() => compassButtonHandler()}>{gettingPos ? <Loader /> : '🧭'}</IconButton>
                <IconButton onClick={() => validationMarkHandler()}>✅</IconButton>
            </ControlRack>
        </Background>
    )
}

const Crosshair = styled.canvas`
    height: 100%;
    width: 100%;
    position: absolute;
    /* background-color: red; */
    pointer-events: none;
`;

const IconButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    outline: none;
    margin-left: 0.5rem;
    font-size: 200%;
    margin: auto;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(.26,.54,.38,1);
    ${this}:hover {
        background-color: var(--main-accent-color);
        cursor: pointer;
    }
`;

const ControlRack = styled.div`
    display: flex;
    height: 10%;
    width: 90%;
    border-radius: 10px;
    background-color: var(--lighter-background);
    /* background-color: rgba(255, 255, 255, 0.3); */
    /* div:nth-child(2){
        background-color: var(--lighter-background);
    } */
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 90%;
    height: 80%;
    border-radius: 10px;
`

export default LocationSelector