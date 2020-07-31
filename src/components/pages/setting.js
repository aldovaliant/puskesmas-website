import React, { Component } from 'react';
import './css/setting.css';
import './css/fontawesome/css/all.css';
import DaftarUser from './features/daftarUser';
import Navbar from './features/navbar';

export default class setting extends Component {

    delete() {

    }

    render() {
        return (
            <div>
                <Navbar activeNavbar="setting" />
                {/* <div id="title-div" class="w3-container top">
                    <h1 id="title">e-Puskesmas</h1>
                    {/* <h1 id="user" class="w3-right toptext">Admin</h1> */}
                {/* <i id="user" class="fas fa-user-circle w3-right toptext"> Admin</i>
                </div> */}
                {/* <div id="navbar">
                    <ul>
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#laporan">Laporan</a></li>
                        <li class="active w3-right"><a href="#contact">Setting</a></li>
                    </ul>
                </div> */}
                <DaftarUser />
            </div>
        )
    }
}
