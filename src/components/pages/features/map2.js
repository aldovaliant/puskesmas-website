import React from 'react';
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: -6.867465, lng: 107.608380 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        {console.log(marker.id)}
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            {/* {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.shelter}
                </div>
              </InfoWindow>} */}
          </Marker>
        )
      })}
    </GoogleMap>
  )
});

class map extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      shelters2: [],
      selectedMarker: false,
      gg: 1
    }
  }

  componentDidUpdate(){
    this.state.gg = this.props.dataFromParent;
    console.log("datafromparent: " + this.state.gg);
    this.componentDidMount();
  };
  
  componentDidMount() {
    console.log("datafromparent: " + this.props.dataFromParent);
    fetch("https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan?hal=" + this.state.gg)
      .then(res => res.json())
      .then(res => {
        for(var i=0; i<res.length; i++){
          this.state.shelters[i] = ({id: res[i].id_laporan * 1, latitude: res[i].latitude * 1.0, longitude: res[i].longitude * 1.0});
        }
        this.setState({ shelters2: this.state.shelters})
      })
  };
  handleClick = (marker) => {
    this.setState({ selectedMarker: marker })
  }
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMc0K-5i1CwSf2ycj9omb4QlCLoqiLOvg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default map;
