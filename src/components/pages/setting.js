import React, { Component } from 'react';
import './css/setting.scss';
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
                <DaftarUser />
            </div>
        )
    }
}
