/* eslint-disable jsx-a11y/alt-text */
import React, { Component, useState } from 'react'
import { compose, withProps, withStateHandlers  } from "recompose";
import Navbar from './features/navbar';
// import Map from './features/map';
import MapModal from './features/map2';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import './css/laporan.scss';
import './css/fontawesome/css/all.css'
import { DropdownButton, Dropdown, Modal, Button, Carousel } from "react-bootstrap"
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
            limiterList: 0,
            show: false,
            pageNumber: 1,
            pageNumber2: 1,
            jumlahPage: 1
        }
        console.log(this.state.list);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.prevNextList = this.prevNextList.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.searchLaporan = this.searchLaporan.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };

    // Example() {
    //     const [show, setShow] = useState(false);
      
    //     const handleClose = () => setShow(false);
    //     const handleShow = () => setShow(true);
    // }

    handleClose = () => {this.setState({show: false})};
    handleShow = () => {this.setState({show: true})};


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
        if(value == true && this.state.jumlahPage != 0) {
            // this.state.limiterList += 5;
            this.state.pageNumber += 1;
            this.componentDidMount();
        }else if(value == false && this.state.pageNumber != 1){
            // this.state.limiterList -= 5;
            this.state.pageNumber -= 1;
            this.componentDidMount();
        } 
    };

    changeStatus(stat, i){
        // document.getElementById("status").innerHTML="Status: ";
        if(stat == 1){
            this.state.status[i] = "Akan ditindak";
            console.log(this.state.status[i]);
        }else if(stat == 2){
            this.state.status[i] = "Ditindak";
        }else{
            this.state.status[i] = "Selesai";
        }
    };

    searchLaporan() {
        var startDate = document.getElementById("filter-date-start").value;
        var endDate = document.getElementById("filter-date-end").value;
        var inputText = document.getElementById("search").value;

        if((startDate == "" || endDate == "") && inputText ==""){    
            alert("Tolong isi seluruh pencarian!");
            console.log("gagal");
        }else if(startDate == "" || endDate == ""){
            console.log("search: " + inputText); 
        }else if(inputText ==""){
            console.log("start: " + startDate);
            console.log("end: " + endDate);
        }else{
            console.log("gagal");
        } 
    };

    dataToChild() {
        console.log("datachild22: "+this.state.pageNumber2);
        return this.state.pageNumber2;
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

        var link2 = "https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan?hal="+ (this.state.pageNumber + 1);
        fetch(link2)
        .then(res => res.json())
        .then((res) => {
            this.state.jumlahPage = res.length;
        });

        var link = "https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan?hal="+this.state.pageNumber;
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
                temptStatus[i] = res[i].status;
                temptDeskripsi[i] = res[i].nama_laporan;
                images[i] = res[i].link_gambar;
                temptLatitude[i] = res[i].latitude;
                temptLongitude[i] = res[i].longitude;
                this.state.list[i] = {lat: res[i].latitude * 1.0, lng: res[i].longitude * 1.0};
                this.state.pageNumber2 = this.state.pageNumber;
                console.log("datachild2: "+this.state.pageNumber2);
            };
            console.log(this.state.list)
            this.state.counter = res.length;
            console.log(res)
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
            // this.dataToChild();
        });
    };

    createDivContainer = () => {
        let res = [];
        // var limiter = this.state.limiterList;
        // var ctr = 5;
        var ctr = this.state.idLaporan.length
        // ctr += limiter
        // console.log("limiter: " + limiter);
        console.log("ctr: " + ctr);
        for (let i = 0; i < ctr ; i++) {
            res.push(this.createDivList(i));
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
                        Tanggal:<input type="date" className="filter-date" id="filter-date-start" name="start" value="2000-05-05" />
                        s.d<input type="date" className="filter-date" id="filter-date-end" name="end" />
                        <label for="jenis-laporan">Jenis Laporan:</label>
                        <select id="jenis-laporan" placeholder="jenis laporan">
                            <option value="bahaya">Bahaya</option>
                            <option value="sedang">Sedang</option>
                            <option value="Tidak Mendesak">Tidak Mendesak</option>
                        </select>

                        <div class="search-container">
                            <input type="text" placeholder="Search.." id="search" />
                            <button type="submit" onClick={this.searchLaporan}><i class="fa fa-search"></i></button>
                        </div>
                    </div>

                    <div id="list-laporan">
                        <div id="container-laporan" class="w3-container">
                            {this.createDivContainer()}
                            <div class="laporan-card w3-panel w3-card">
                               <Button style={{float: "left", marginBottom: "3px"}} onClick={() => this.prevNextList(false)}>
                                <i className="fa fa-chevron-left"/></Button>
                               <Button style={{float: "right", marginBottom: "3px"}} onClick={() => this.prevNextList(true)}>
                               <i className="fa fa-chevron-right"/></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="map">
                    <MapModal dataFromParent = {this.dataToChild()}/>
                </div> 

                {/* Modal Open */}
                <div id="id01" class="w3-modal">
                    <div id="id02" class="w3-modal-content">
                        <div>
                            <button style={{ float: "right", margin: "5px", color: "red" }} 
                            onClick={this.closeModal}><i className="w3-xlarge fa fa-window-close"></i></button>
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
                                {/* <button style={{float: "right"}} onClick={this.changeStatus}>Ubah Status</button> */}
                                <DropdownButton id="dropdown-basic-button" style={{float: "right"}} title="Ganti Status">
                                    <Dropdown.Item onClick={this.changeStatus(1, this.state.chosenImage)}>Akan ditindak</Dropdown.Item>
                                    <Dropdown.Item onClick={this.changeStatus(2, this.state.chosenImage)}>Ditangani</Dropdown.Item>
                                    <Dropdown.Item onClick={this.changeStatus(3, this.state.chosenImage)}>Selesai</Dropdown.Item>
                                </DropdownButton>
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
                                <img src={this.state.Img[this.state.chosenImage]} onClick={this.handleShow} width="600" height="400"/>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Modal End */}

                <Modal show={this.state.show} onHide={this.handleClose} style={{ marginTop: "50px", marginLeft: "150px"}}>
                    <Modal.Body>
                        <Carousel>
                            <Carousel.Item>
                                <img src={this.state.Img[this.state.chosenImage]} onClick={this.handleShow} width="100%" height="100%"/>
                            </Carousel.Item>
                        </Carousel>
                    </Modal.Body>
                </Modal>
            </div>
            )
        }
    }