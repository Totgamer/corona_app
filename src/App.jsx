import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import mapStyles from '../mapStyles';
import './App.css';

let lat = null;
let lng = null;

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // console.log(position.coords.latitude);
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        document.getElementById('lat').value = lat;
        document.getElementById('lng').value = lng;
    });
} else {
    lat = 52.076918;
    lng = 5.106366;
}

function Map() {
    
    let data = {};

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        data = myObj;
    }
    };
    xmlhttp.open("GET", "markers.php", false);
    xmlhttp.send();

    const [selectedMarker, setSelectedMarker] = useState(null);
    const getFilename = (id) => data.actions[id].filename;
    const getAction = (id) => data.actions[id].action;

    return (
        <GoogleMap 
            defaultZoom={12}
            defaultCenter={{lat: lat, lng: lng}}
            defaultOptions={{styles: mapStyles}}>

            {data.markers.map(marker =>
           
                <Marker
                    key={marker.id}
                    position={{lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
                    onClick={() => {
                        setSelectedMarker(marker);
                    }}
                    icon={{
                        url: `svg/${getFilename(marker.action)}`,
                        scaledSize: new window.google.maps.Size(30, 30)
                    }}
                />)
            }
            {selectedMarker && (
            <InfoWindow
            position= {{
                lat: parseFloat(selectedMarker.lat), 
                lng: parseFloat(selectedMarker.lng) 
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

    function closeWindowMarker() {
        var form = document.getElementsByClassName('upload-f');
        form[0].classList.add("hidden");
    }

    function closeWindowUser() {
        var form = document.getElementsByClassName('upload-f');
        form[1].classList.add("hidden");
    }

    function openWindowMarker() {
        var form = document.getElementsByClassName('upload-f');
        form[0].classList.remove("hidden");
    }

    function openWindowUser() {
        var form = document.getElementsByClassName('upload-f');
        form[1].classList.remove("hidden");
    }

    function closeAllWindows() {
        closeWindowMarker();
        closeWindowUser();
    }

    return (
        <div style={{width: "100vw", height: "100vh", backgroundColor: "#ffffff"}}>
            <div id="header">
                <a href="#"><i class="fas fa-bars"></i></a>
               <a href="https://www.youtube.com/watch?v=zzd4ydafGR0"> <img src="img/logo.png"></img>
               </a>
            </div>
            <div style={{width: "100%", height: "80vh"}}>
                <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{height:"100%"}} />} 
                containerElement={<div style={{height:"100%"}} />} 
                mapElement={<div style={{height:"100%"}} />} 
                />
            </div>
            <div id="footer">
                <a href="#" onClick={openWindowMarker}><i class="fas fa-plus-circle"></i></a>
                <a href="#" onClick={closeAllWindows}><i class="fas fa-map-marker-alt"></i></a>
                <a href="#" onClick={openWindowUser}><i class="fas fa-user"></i></a>
            </div>
            {/* marker toevoegen */}
            <form class="upload-f hidden" method="POST" action="post.php">
                <div id="close" onClick={closeWindowMarker}>x</div>
                <label for="fname">Naam</label>
                <input type="text" id="name" name="name"/>
                <label for="desc">Beschrijving</label>
                <textarea id="desc" name="desc" rows="4" cols="20" />
                <label for="soort">Activiteit</label>
                <select name="action" id="action">
                    <option value="0">Boodschappen</option>
                    <option value="1">Fietsen</option>
                    <option value="2">Hardlopen</option>
                    <option value="3">Hond uitlaten</option>
                    <option value="4">Wandelen</option>
                </select>
                <input class="hidden" type="text" id="lat" name="lat"/>
                <input class="hidden" type="text" id="lng" name="lng"/>
                <input class="btn-sub" type="submit" name="submit" value="Submit"/>
            </form>
            {/* user toevoegen */}
            <form class="upload-f hidden" method="POST" action="post.php">
                <div id="close" onClick={closeWindowUser}>x</div>
                <label for="fname">Voornaam & Achternaam</label>
                <input type="text" id="fname" name="fname"/>
                <input class="btn-sub" type="submit" name="submit" value="Submit"/>
            </form>
        </div>
    )
}