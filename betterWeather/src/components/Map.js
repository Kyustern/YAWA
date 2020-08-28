import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Loader from './Loader'

const Map = ({setShowMap, mapLoaded}) => {
    let map
    const mapRef = useRef()

    useEffect(() => {
        console.log("Map -> mapLoaded", mapLoaded)
        if (mapLoaded) {
            map = new window.google.maps.Map(document.getElementById('mapRef'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
              });
        }
    }, [mapLoaded])

    return(
        <Background>
            <Wrapper>
                {!mapLoaded ? 
                    <Loader/>
                : 
                    <MapContainer style={{height: '100%', width: '100%'}}>
                        <ActualMap id='mapRef' ref={mapRef}/>
                    </MapContainer>
                }
            </Wrapper>

            <button onClick={() => setShowMap(false)}>CLOSE</button>
        </Background>
    )
}

const ActualMap = styled.div`

`;

const MapContainer = styled.div`
    height: 100%;
    width: 100%;
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
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 90%;
    height: 90%;
    border-radius: 10px;
`

export default Map