import React from 'react';
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

// const MyMapComponent = compose(
//     withProps({
//         googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDMc0K-5i1CwSf2ycj9omb4QlCLoqiLOvg&v=3.exp&libraries=geometry,drawing,places",
//         loadingElement: <div style={{ height: '100%' }} />,
//         containerElement: <div style={{ height: '400px' }} />,
//         mapElement: <div style={{ height: '100%' }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
// )(props => (
//     <GoogleMap defaultZoom={15} defaultCenter={{ lat: -6.867465, lng: 107.608380}}>
//         {props.markers.map(marker => {
//         const onClick = props.onClick.bind(this, marker)
//         return (
//           <Marker
//             key={marker.id}
//             onClick={onClick}
//             position={{ lat: marker.latitude, lng: marker.longitude }}
//           >
//             {props.selectedMarker === marker &&
//               <InfoWindow>
//                 <div>
//                   {marker.shelter}
//                 </div>
//               </InfoWindow>}
//             }
//           </Marker>
//         )
//       })}
//     </GoogleMap>
// ));

// const lat = -6.867460;
// const lng = 107.608380;


const MyMapComponent = compose(withScriptjs, withGoogleMap)(props => {
    return (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: -6.867465, lng: 107.608380 }}>
        {props.markers.map(marker => {
          const onClick = props.onClick.bind(this, marker)
          return (
            <Marker
              key={marker.id}
              onClick={onClick}
              position={props.markers}
            >
              {props.selectedMarker === marker &&
                <InfoWindow>
                  <div>
                    {marker.nama}
                  </div>
                </InfoWindow>}
              }
            </Marker>
          )
        })}
      </GoogleMap>
    )
  })


class map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shelters: [{}],
            selectedMarker: false,
            latitude: [],
            longitude: []
        }
        
    }

    componentDidMount() {
      var link = "http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/laporan/top5";
      fetch(link)
      .then(res => res.json())
      .then((res) => {
          for(var i=0; i<res.laporan.length; i++){
            this.state.shelters[i] = {lat: res.laporan[i].latitude * 1*0, lng: res.laporan[i].longitude * 1};
          }
          console.log(this.state.shelters)
      });
    };
    
    handleClick = (marker) => {
        this.setState({ selectedMarker: marker })
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <MyMapComponent
                    selectedMarker={this.state.selectedMarker}
                    markers={this.state.shelters}
                    onClick={this.handleClick}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMc0K-5i1CwSf2ycj9omb4QlCLoqiLOvg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />} 
                />
            </div>
        );
    }
}

export default map;
