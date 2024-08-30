import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import Home from "./components/home/Home.tsx";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from "react";
import * as geocoordinates from "./geocoordinates";
import ReactSlider from "react-slider";
import Select from "react-select";


function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);

  const [lng, setLng] = useState(-83.6967);
  const [lat, setLat] = useState(42.285);
  const [zoom, setZoom] = useState(4);
  const [selectedOption, setSelectedOption] = useState(null);
 
  const options = [
    {value: 'Michigan', label: 'Michigan, Color Off'},
    {value: 'California', label: 'California, Color Off'},
    {value: 'Colorado', label: 'Colorado, Color Off'},
    {value: 'Florida', label: 'Florida, Color Off'},
    {value: 'Washington', label: 'Washington, Color Off'},
    {value: 'All On', label: 'All Color On'},
    {value: 'All Off', label: 'All Color Off'}

  ]

  useEffect(() => {
    if (map.current) return; // initialize map only once
    // eslint-disable-next-line no-undef
   popup.current = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
   });

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      addStateData();
    });

    map.current.on("mouseenter", "Michigan", popupStates);
    map.current.on("mouseenter", "Colorado", popupStates);
    map.current.on("mouseenter", "California", popupStates);
    map.current.on("mouseenter", "Florida", popupStates);
    map.current.on("mouseenter", "Washington", popupStates);


    map.current.on("mouseleave", "Michigan", event => {
      map.current.getCanvas().style.cursor = '';
      popup.current.remove();
    })
    map.current.on("mouseleave", "Colorado", event => {
      map.current.getCanvas().style.cursor = '';
      popup.current.remove();
    })
    map.current.on("mouseleave", "California", event => {
      map.current.getCanvas().style.cursor = '';
      popup.current.remove();
    })
    map.current.on("mouseleave", "Florida", event => {
      map.current.getCanvas().style.cursor = '';
      popup.current.remove();
    })
    map.current.on("mouseleave", "Washington", event => {
      map.current.getCanvas().style.cursor = '';
      popup.current.remove();
    })
  });

  function addStateData() {
    map.current.addSource("Michigan", geocoordinates.michigan.default);
    map.current.addSource("Colorado", geocoordinates.colorado.default);
    map.current.addSource("California", geocoordinates.california.default);
    map.current.addSource("Washington", geocoordinates.washington.default);
    map.current.addSource("Florida", geocoordinates.florida.default);

    // Add a new layer to visualize the polygon.
    map.current.addLayer({
      id: "Michigan",
      type: "fill",
      source: "Michigan", // reference the data source
      layout: {},
      paint: {
        "fill-color": "#000066", // orange/redcolor fill
        "fill-opacity": 0.5,
      },
    });
    // Add an outline around the polygon.
    map.current.addLayer({
      id: "outlineMichigan",
      type: "line",
      source: "Michigan",
      layout: {},
      paint: {
        "line-color": "#666699",
        "line-width": 1,
      },
    });
    map.current.addLayer({
      id: "Colorado",
      type: "fill",
      source: "Colorado", 
      layout: {},
      paint: {
        "fill-color": "#ff6600", 
        "fill-opacity": 0.5,
      },
    });
   
    map.current.addLayer({
      id: "outlineColorado",
      type: "line",
      source: "Colorado",
      layout: {},
      paint: {
        "line-color": "#666699",
        "line-width": 1,
      },
    });

    map.current.addLayer({
      id: "California",
      type: "fill",
      source: "California", 
      layout: {},
      paint: {
        "fill-color": "#009933", 
        "fill-opacity": 0.5,
      },
    });
    
    map.current.addLayer({
      id: "outlineCalifornia",
      type: "line",
      source: "California",
      layout: {},
      paint: {
        "line-color": "#666699",
        "line-width": 1,
      },
    });

    map.current.addLayer({
      id: "Washington",
      type: "fill",
      source: "Washington", 
      layout: {},
      paint: {
        "fill-color": "#006699", 
        "fill-opacity": 0.5,
      },
    });
    
    map.current.addLayer({
      id: "outlineWashington",
      type: "line",
      source: "Washington",
      layout: {},
      paint: {
        "line-color": "#666699",
        "line-width": 1,
      },
    });

    map.current.addLayer({
      id: "Florida",
      type: "fill",
      source: "Florida", 
      layout: {},
      paint: {
        "fill-color": "#cc66ff", // color fill
        "fill-opacity": 0.5,
      },
    });
   
    map.current.addLayer({
      id: "outlineFlorida",
      type: "line",
      source: "Florida",
      layout: {},
      paint: {
        "line-color": "#666699",
        "line-width": 1,
      },
    });
  }

  function changeColor(sliderVal){
    console.log(sliderVal)
    map.current.setPaintProperty(
    'Michigan',
    'fill-opacity',
    parseInt(sliderVal)/100
    );
    map.current.setPaintProperty(
      'California',
      'fill-opacity',
       parseInt(sliderVal)/100
    );
    map.current.setPaintProperty(
      'Florida',
      'fill-opacity',
       parseInt(sliderVal)/100
    );
    map.current.setPaintProperty(
      'Colorado',
      'fill-opacity',
       parseInt(sliderVal)/100
    );
    map.current.setPaintProperty(
      'Washington',
      'fill-opacity',
       parseInt(sliderVal)/100
    );
    }

  function handleChange(value, selectOptionSetter){
    selectOptionSetter(value)
    console.log(value)
    if(value ==='Michigan'){
      map.current.setLayoutProperty('Michigan', 'visibility', 'none');
    }
    if(value === 'California'){
      map.current.setLayoutProperty('California', 'visibility', 'none');
    }
    if(value !== 'California'){
      map.current.setLayoutProperty('California', 'visibility', 'visible');
    }
    if(value === 'Florida'){
      map.current.setLayoutProperty('Florida', 'visibility', 'none');
    }
    if(value !== 'Florida'){
      map.current.setLayoutProperty('Florida', 'visibility', 'visible');
    }
    if(value!=='Michigan'){
      map.current.setLayoutProperty('Michigan', 'visibility', 'visible');
    }
    if(value === 'Colorado'){
      map.current.setLayoutProperty('Colorado', 'visibility', 'none');
    }
    if(value !== 'Colorado'){
      map.current.setLayoutProperty('Colorado', 'visibility', 'visible');
    }
    if(value === 'Washington'){
      map.current.setLayoutProperty('Washington', 'visibility', 'none');
    }
    if(value !== 'Washington'){
      map.current.setLayoutProperty('Washington', 'visibility', 'visible');
    }
    if(value==='All On'){
      map.current.setLayoutProperty('Washington', 'visibility', 'visible');
      map.current.setLayoutProperty('Michigan', 'visibility', 'visible');
      map.current.setLayoutProperty('Florida', 'visibility', 'visible');
      map.current.setLayoutProperty('Colorado', 'visibility', 'visible');
      map.current.setLayoutProperty('California', 'visibility', 'visible');
    }
    if(value === 'All Off'){
      map.current.setLayoutProperty('Michigan', 'visibility', 'none');
      map.current.setLayoutProperty('California', 'visibility', 'none');
      map.current.setLayoutProperty('Florida', 'visibility', 'none');
      map.current.setLayoutProperty('Colorado', 'visibility', 'none');
      map.current.setLayoutProperty('Washington', 'visibility', 'none');
    }
    
    }
  

  function popupStates(event) {
    map.current.getCanvas().style.cursor = 'pointer';

    const centerProp = event.features[0].properties.center;
    const michiganCenter = centerProp ? JSON.parse(centerProp) : event.features[0].geometry.coordinates.slice()[0][0];
    const michiganDescription = event.features[0].properties.description;

    popup.current.setLngLat(michiganCenter).setHTML(michiganDescription).addTo(map.current);
  }

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      
      <div ref={mapContainer} className="map-container" />
      
      <Select
        defaultValue = {selectedOption}
        onChange={e => handleChange(e.value, setSelectedOption)}
        options={options} />

      <ReactSlider
      className="horizontal-slider"
      thumbClassName="thumb"
      trackClassName="track"
      onChange={(value, index) => changeColor(value)}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
    
      </div>
  );
}

export default App;
