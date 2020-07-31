import React, { Component } from 'react'
import '../css/fontawesome/css/all.css'
import { Link } from 'react-router-dom';
import './css/navbar.css';

export default class navbar extends Component {
    componentDidMount() {
        let navbar = this.props.activeNavbar;
        if (navbar === "dashboard") {
            document.getElementById("1").className = "active";
            document.getElementById("2").className = "";
            document.getElementById("3").className = "w3-right";
        } else if (navbar === "laporan") {
            document.getElementById("1").className = "";
            document.getElementById("2").className = "active";
            document.getElementById("3").className = "w3-right";
        } else {
            document.getElementById("1").className = "";
            document.getElementById("2").className = "";
            document.getElementById("3").className = "active w3-right";
        }
    }
    render() {
        return (
            <div>
                <div id="title-div" class="w3-container top">
                    <h1 id="title">e-Puskesmas</h1>
                    <i id="user" class="fas fa-user-circle w3-right toptext">
                    <h4 id="admin">Admin</h4></i>
                </div>
                <div id="navbar">
                    <ul>
                        <Link to='./Dashboard'>
                            <li id="1"><a href="#dashboard">Dashboard</a></li>
                        </Link>
                        <Link to='./Laporan'>
                            <li id="2"><a href="#laporan">Laporan</a></li>
                        </Link>
                        <Link to='./Setting'>
                            <li id="3" class="active w3-right"><a href="#contact">Setting</a></li>
                        </Link>
                    </ul>
                </div>
            </div>
        )
    }
}
