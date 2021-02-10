import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import mapStyles from '../mapStyles';
import './App.css';
import * as data from './data/markers.json';


function Map() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const getFilename = (id) => data.actions[id].filename;
    const getAction = (id) => data.actions[id].action;

    return (
        <GoogleMap 
            defaultZoom={12}
            defaultCenter={{lat:52.076918, lng:5.106366}}
            defaultOptions={{styles: mapStyles}}>

            {data.markers.map(marker =>
           
                <Marker
                    key={marker.id}
                    position={{lat:marker.lat, lng:marker.lng}}
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                    icon={{
                        url: `/dist/svg/${getFilename(marker.action)}`,
                        scaledSize: new window.google.maps.Size(30, 30)
                    }}
                />)
            }
            {selectedMarker && (
            <InfoWindow
            position= {{
            lat: selectedMarker.lat,
            lng: selectedMarker.lng
            }}
            onCloseClick={() => {
                setSelectedMarker(null)
            }}
            >
                <div style={{width:'180px', overflow:'hidden'}}>
                    <h2>{getAction(selectedMarker)}</h2>
                    <p>{selectedMarker.sender}</p>
                    <p>{selectedMarker.desc}</p>
                </div>
        </InfoWindow>
            
            
            )}
        </GoogleMap>
    )
}

 const WrappedMap = withScriptjs(withGoogleMap(Map));
 
 
 export default function App() {
    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <WrappedMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{height:"100%"}} />} 
            containerElement={<div style={{height:"100%"}} />} 
            mapElement={<div style={{height:"100%"}} />} 
            />
        </div>
    )
}