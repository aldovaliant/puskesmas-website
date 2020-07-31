/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { compose, withProps, withStateHandlers  } from "recompose";
import Navbar from './features/navbar';
import Map from './features/map';
import MapModal from './features/map2';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import './css/laporan.css';
import './css/fontawesome/css/all.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

const MapWithAMakredInfoWindow = compose(
    withStateHandlers(() => ({
      isOpen: false,
    }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: -6.867465, lng: 107.608380}}
    >
      <Marker
        position={props.markerPosition}
        onClick={props.onToggleOpen}
      >
        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          {/* <span>{props.nama}</span> */}
        </InfoWindow>}
      </Marker>
    </GoogleMap>
  );

export default class laporan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: [],
            alamat: [],
            tanggal: [],
            jenisLaporan: [],
            tingkatBahaya: [],
            status: [],
            deskripsi: [],
            Img: [],
            latitude: [],
            longitude: [],
            idLaporan: [],
            counter: 0,
            chosenImage: 0,
            list:[],
            coordinates: { lat: -6.867465, lng: 107.608380 },
            limiterList: 0
        }
        console.log(this.state.list);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.prevNextList = this.prevNextList.bind(this);
    };

    showModal = (i) => {
        document.getElementById('id01').style.display='block';  
        var ct = i-1;
        this.setState({ 
            chosenImage: ct,
            coordinates: this.state.list[ct]
        })
        console.log(this.state.list);
        console.log(this.state.coordinates);
    };

    closeModal = () => {
        document.getElementById('id01').style.display='none';  
    };

    prevNextList = (value) => {
        if(value == true) {
            this.state.limiterList += 5;
            this.componentDidMount()
        }else{
            if(this.state.limiterList != 0){
                this.state.limiterList -= 5;
                this.componentDidMount()
            }
        }   
    }

    componentDidMount() {
        var tempIdLaporan = [];
        var temptNama = [];
        var temptAlamat = [];
        var temptTanggal = [];
        var temptJenisLaporan = [];
        var temptTingkatBahaya = [];
        var temptStatus = [];
        var temptDeskripsi = [];
        var images = []; 
        var temptLatitude = [];
        var temptLongitude = [];
        var link = "http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/laporan";
        fetch(link)
        .then(res => res.json())
        .then((res) => {
            for(let i=0; i<res.length; i++){
                tempIdLaporan[i] = res[i].id_laporan;
                temptNama[i] = res[i].nama_pasien;
                temptAlamat[i] = '';
                temptTanggal[i] = res[i].tanggal;
                temptJenisLaporan[i] = res[i].nama_jenis_penyakit;
                temptTingkatBahaya[i] = res[i].tingkat_bahaya;
                temptStatus[i] = res[i].status_laporan;
                temptDeskripsi[i] = res[i].deskripsi;
                images[i] = res[i].link_gambar;
                temptLatitude[i] = res[i].latitude;
                temptLongitude[i] = res[i].longitude;
                this.state.list[i] = {lat: res[i].latitude * 1.0, lng: res[i].longitude * 1.0};
            };
            console.log(this.state.list)
            this.state.counter = res.length;
            console.log("counter: "  + this.state.counter)
            this.setState({
                idLaporan: tempIdLaporan,
                nama: temptNama,
                alamat: temptAlamat,
                tanggal: temptTanggal,
                jenisLaporan: temptJenisLaporan,
                tingkatBahaya:  temptTingkatBahaya,
                status: temptStatus,
                deskripsi: temptDeskripsi,
                Img: images,
                latitude: temptLatitude,
                longitude: temptLongitude
            });
        });
    };

    createDivContainer = () => {
        let res = [];
        var limiter = this.state.limiterList;
        var ctr = 5;
        ctr += limiter
        console.log(ctr)
        for (let i = 0 + limiter; i < ctr ; i++) {
            res.push(this.createDivList(i + limiter));
        };
        return res;
    };

    createDivList = (i) => {
        let container = [],
            children = [];
            children.push(
            <div class="laporan-card w3-panel w3-card">
                    <img id="img" src={this.state.Img[i]} alt="" onClick={() => this.showModal(i+1)}></img>
                    <h6>{this.state.nama[i]}</h6>
                    {/* <h7>Alamat &emsp;&emsp;&emsp; : Jl. Bukit Hegar no.9</h7><br /> */}
                    <h7>Tanggal &emsp;&emsp;&emsp;: {this.state.tanggal[i]}</h7><br />
                    <h7>Jenis Laporan &nbsp;:
                        <span class="badge badge-danger">{this.state.jenisLaporan[i]}</span>
                    </h7><br />
                    <h7>Status &emsp; &emsp; &emsp; : {this.state.status[i]}</h7>
            </div>
        );
        container.push(<div>{children}</div>);
        return container;
    };

    render() {
        return (
            <div>
                <Navbar activeNavbar="laporan" />
                <div id="list">

                    <div id="filter">
                        Tanggal:<input type="date" id="filter-date" name="start" />
                        s.d<input type="date" id="filter-date" name="end" />
                        <label for="jenis-laporan">Jenis Laporan:</label>
                        <select id="jenis-laporan" placeholder="jenis laporan">
                            <option value="bahaya">Bahaya</option>
                            <option value="sedang">Sedang</option>
                            <option value="Tidak Mendesak">Tidak Mendesak</option>
                        </select>

                        <div class="search-container">
                            <input type="text" placeholder="Search.." name="search" />
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </div>
                    </div>

                    <div id="list-laporan">
                        <div id="container-laporan" class="w3-container">
                            {this.createDivContainer()}
                            <div class="laporan-card w3-panel w3-card">
                               <button style={{float: "left"}} onClick={() => this.prevNextList(false)}>prev</button>
                               <button style={{float: "right"}} onClick={() => this.prevNextList(true)}>next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="map">
                    <MapModal/>
                </div> 

                {/* Modal Open */}
                <div id="id01" class="w3-modal">
                    <div id="id02" class="w3-modal-content">
                        <div>
                            <button style={{ float: "right", margin: "5px", color: "red" }} onClick={this.closeModal}><i className="w3-xlarge fa fa-window-close"></i></button>
                        </div>
                        <hr/>
                        <div id="containerAtas" class="w3-container">
                            <div id="w3Map" class="w3-half">
                                <div style={{ height: '100%', width: '100%' }}>
                                    <MapWithAMakredInfoWindow
                                        selectedMarker={this.state.selectedMarker}
                                        markerPosition={this.state.coordinates}
                                        // onClick={this.handleClick}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMc0K-5i1CwSf2ycj9omb4QlCLoqiLOvg&v=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />} 
                                    />
                                </div>
                            </div>
                            <div id="w3Laporan" class="w3-half">
                                <button style={{float: "right"}}>Ubah Status</button>
                                <h3>Status: {this.state.status[this.state.chosenImage]}</h3><br/>
                                <h3>Tanggal: {this.state.tanggal[this.state.chosenImage]}</h3><br/>
                                <h3>Nama: {this.state.nama[this.state.chosenImage]}</h3><br/>
                                <h3>Deskripsi&nbsp;:
                                <p style={{fontSize: "15px", border: "1px solid black", height: "100px", padding: "5px"}}>
                                    {this.state.deskripsi[this.state.chosenImage]}
                                </p>
                                </h3><br/>
                            </div>
                        </div>

                        <div id="containerBawah" class="w3-container">
                            <div class="gallery">
                                <img src={this.state.Img[this.state.chosenImage]} width="600" height="400"/>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Modal End */}
            </div>
            )
        }
    }