import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import mapStyles from '../mapStyles';
import './App.css';
import * as data from './data/markers.json';
// import * as firebase from 'firebase';
import { firebase } from '@firebase/app';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEdptQ-lMHVGmyjbgEEkjw-G6s00ta0y8",
    authDomain: "corona-app-5000c.firebaseapp.com",
    projectId: "corona-app-5000c",
    storageBucket: "corona-app-5000c.appspot.com",
    messagingSenderId: "796612055326",
    appId: "1:796612055326:web:c3d5ff79153cda12db790f",
    measurementId: "G-ZC9D1J3111"
  };

firebase.initializeApp(firebaseConfig);

function Map() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const getFilename = (id) => data.actions[id].filename;
    const getAction = (id) => data.actions[id].action;

    return (
        <GoogleMap 
            defaultZoom={12}
            defaultCenter={{lat:52.076918, lng:5.106366}}
            defaultOptions={{styles: mapStyles}}>

            {/* <FirebaseDatabaseNode path="0/markers/">
                {data => {
                    const { value } = data;
                    if (value === null || typeof value === "undefined") return null;
                    const values = Object.values(value);
                    const valuesWithKeys = values.map(
                    (value) =>
                        <Marker
                            key={value.id}
                            position={{lat:value.lat, lng:value.lng}}
                            onClick={() => {
                                setSelectedMarker(value);
                            }}
                            icon={{
                                url: `/dist/svg/${getFilename(value.action)}`,
                                scaledSize: new window.google.maps.Size(30, 30)
                            }}
                        />
                    );
                    return <AutoComplete items={valuesWithKeys} />;
                }}
                </FirebaseDatabaseNode> */}

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
            options={{
                pane: 'mapPane',
                pixelOffset: new window.google.maps.Size(0, -25)
            }}
            >
                <div style={{width:'180px', overflow:'hidden', marginBottom:'12px'}}>
                    <h2>{getAction(selectedMarker.action)}</h2>
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