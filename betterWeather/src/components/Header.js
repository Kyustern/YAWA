import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import axios from 'axios'

import Map from './Map'
import CityList from './CityList'
import useInputValidation from '../hooks/useInputValidation'
import { Input } from './styled/Input'
import { MapProvider } from '../contexts/MapContext'

import key from '../onlyDevs/key'

const emptyRegEx = new RegExp(/^[ \t\r\n]*$/)
const onlyNumbers = new RegExp(/[^a-z ]\ *([.0-9])*\d/g)
const emptyCheck = (input, setCurrentValue, setIsValid) => {
    if (emptyRegEx.test(input)) {
        setIsValid(false)
        console.error('Nope')
    } else {
        setIsValid(true)
    }
    setCurrentValue(input)
}

const getGeoLocation = () => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;
        console.log('Votre position actuelle est :');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude : ${crd.longitude}`);
        console.log(`La précision est de ${crd.accuracy} mètres.`);
    }
    function error(err) {
        console.warn(`ERREUR (${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

const Header = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
        script.defer = true;

        // Attach your callback function to the `window` object
        window.initMap = function() {
            setMapLoaded(true)
        };
        document.head.appendChild(script);

    }, [])

    const [showList, setShowList] = useState(false)
    const [showMap, setShowMap] = useState(true)
    const [mapLoaded, setMapLoaded] = useState(false)
    const [isSearchValid, searchBinding] = useInputValidation(emptyCheck, '31000', true)
    const [data, setData] = useState({})

    useEffect(() => {
        //there is no particular reason to unbind the handler here, but i think it is a good practice so here we are
        document.addEventListener('keydown', enterHandler)
        return (() => {
            document.removeEventListener('keydown', enterHandler)
        })
    })

    const getCities = async () => {
        if (isSearchValid && !showList) {
            const res = await axios.post('/getlocations', { code: searchBinding.value })
            console.log("getCities -> res", res)
            setData(res.data)
            setShowList(true)
        }
    }

    const enterHandler = ({ keyCode }) => {
        if (keyCode === 13) {
            getCities()
        }
    }

    return (
        <Wrapper>
            <NameH1>
                AppTitle
            </NameH1>

            <NewInput
                type='tel'
                placeholder='Entrez un code postal valide'
                maxLength='5'
                pattern="[0-9]*"
                {...searchBinding}
            />

            <ButtonRack>
                <IconButton onClick={() => getCities()}>🔎</IconButton>
                {"geolocation" in navigator && <IconButton onClick={() => setShowMap(true)}>🧭</IconButton>}
            </ButtonRack>

            {showList && <CityList data={data} setShowList={setShowList} />}

            {showMap && <Map mapLoaded={mapLoaded} setShowMap={setShowMap}/>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 5rem 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    background: rgb(42,42,42);
    background: linear-gradient(45deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%); 
`;

const NameH1 = styled.h1`
  margin-left: 1rem;
`;

const IconButton = styled.div`
    outline: none;
    margin-left: 0.5rem;
    font-size: 200%;
    margin: auto;
    ${this}:hover {
      cursor: pointer;
    }
`;

const ButtonRack = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const NewInput = styled(Input)`
    height: 3rem;
    width: 7rem;
    margin: auto;
`

export default Header