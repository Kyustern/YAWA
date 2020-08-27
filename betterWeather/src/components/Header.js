import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios'

import Map from './Map'
import CityList from './CityList'
import { Input } from './styled/Input'
import useInputValidation from '../hooks/useInputValidation'

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

    const [showList, setShowList] = useState(false)
    const [showMap, setShowMap] = useState(true)

    const [isSearchValid, searchBinding] = useInputValidation(emptyCheck, '31000', true)
    // const [showlist, setshowlist] = useState(false)
    const [data, setData] = useState({})

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


    useEffect(() => {
        //there is no particular reason to unbind the handler here, but i think it is a good practice so here we are
        document.addEventListener('keydown', enterHandler)

        return (() => {
            document.removeEventListener('keydown', enterHandler)
        })
    })

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
                {"geolocation" in navigator && <IconButton onClick={() => getGeoLocation()}>🧭</IconButton>}
            </ButtonRack>

            {showList && <CityList data={data} setShowList={setShowList} />}

            {showMap && <Map />}
        </Wrapper>
    )
}

export default Header