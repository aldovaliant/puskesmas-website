import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './features/navbar';
import Map from './features/map';
import Map2 from './features/map2';
import './css/dashboard.css';
import './css/timeline.scss';
import rumah from '../assets/images/rumah.jpeg';

export default class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: [],
            jenisLaporan: [],
            tingkatBahaya: [],
            Img: [],
            latitude: [],
            longitude: [],
            idLaporan: [],
        };
    };

    componentDidMount() {
        var tempIdLaporan = [];
        var temptNama = [];
        var temptJenisLaporan = [];
        var temptTingkatBahaya = [];
        var images = []; 
        // var temptLatitude = [];
        // var temptLongitude = [];
        var link = "http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/laporan/top5";
        fetch(link)
        .then(res => res.json())
        .then((res) => {
            for(var i=0; i<res.laporan.length; i++){
                tempIdLaporan[i] = res.laporan[i].id_laporan;
                temptNama[i] = res.laporan[i].nama;
                temptJenisLaporan[i] = res.laporan[i].nama_jenis_penyakit;
                temptTingkatBahaya[i] = res.laporan[i].tingkat_bahaya;
                images[i] = res.laporan[i].link_gambar;
                // temptLatitude[i] = res.laporan[i].latitude;
                // temptLongitude[i] = res.laporan[i].longitude;
            };
            this.setState({
                idLaporan: tempIdLaporan,
                nama: temptNama,
                jenisLaporan: temptJenisLaporan,
                tingkatBahaya:  temptTingkatBahaya,
                Img: images,
                // latitude: temptLatitude,
                // longitude: temptLongitude
            });
        });
    };

    createDivContainer = () => {
        let res = [];
        for (var i = 0; i < 5; i++) {
            res.push(this.createDivTop5(i));
        };
        return res;
    };

    createDivTop5 = (i) => {
        let container = [],
            children = [];
            children.push(
            <li class="w3-bar">
                {/* <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-grey w3-right">edit</span> */}
                <img src={this.state.Img[i]} alt="" class="w3-bar-item w3-hide-small" style={{ 'width': '85px' }} />
                <div class="w3-bar-item">
                    <span class="w3-large">{this.state.nama[i]}</span><br />
                    <span class="badge badge-danger">{this.state.jenisLaporan[i]}</span>
                </div>
            </li>
        );
        container.push(<div>{children}</div>);
        return container;
    };

    render() {
        return (
            <div>
                <Navbar activeNavbar="dashboard" />
                <div class="">
                    <div class="map w3-third">
                        <Map2 />
                    </div>
                    <div class="top5  w3-third">
                        <h1 id="top5Title">Top 5 Laporan</h1>
                        <ul class="w3-ul w3-card-4">
                            {this.createDivContainer()}
                            <li class="w3-bar">
                                <Link to='/Laporan'>
                                    <span class="w3-bar-item w3-button w3-xlarge w3-right w3-border w3-green">
                                        Lihat seluruh laporan >
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="TL w3-third">
                    <div class="timeline">
                        <div class="timeline-block header">
                            <h2>Timeline</h2>
                        </div>
                        <div class="timeline-block step">
                            <div class="step-symbol"></div>
                            <div class="step-title">Jumat, 06/03/20</div>
                            <div class="step-instructions">Tercatat 5 laporan<br />3 laporan suspect COVID-19</div>
                        </div>
                        <div class="timeline-block step">
                            <div class="step-symbol"></div>
                            <div class="step-title">Kamis, 05/03/20</div>
                            <div class="step-instructions">Tercatat 3 laporan<br />1 laporan suspect COVID-19</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
