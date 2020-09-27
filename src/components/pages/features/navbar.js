import React, { Component } from 'react'
import '../css/fontawesome/css/all.css'
import { Link } from 'react-router-dom';
import './css/navbar.scss';
import { getUser, removeUserSession } from '../../Utils/common';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import axios from 'axios';

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

    // handleLogout() {
    //     removeUserSession();
    //     this.props.history.push('/');
    // }

    render() {
        console.log(getUser())
        const user = getUser();
        const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
            <a
                href=""
                ref={ref}
                onClick={e => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
              {/* Render custom icon here */}
            <i id="user" class="fas fa-user-circle"> 
            <h4 id="admin">{user}</h4></i> 
            {/* &#x25bc; */}
            {children}
            </a>
        ));

        return (
            <div>
                <Container fluid>
                    <Row style={{backgroundColor: "lightgrey"}}>
                        {/* <div id="title-div" class="w3-container top"> */}
                            <Col lg={10}><h1 id="title">e-Puskesmas</h1></Col>
                            <Col lg={2}>
                                {/* <i id="user" class="fas fa-user-circle w3-right toptext"> 
                                <h4 id="admin">Admin</h4></i>  */}
                                <Dropdown style={{marginLeft: "60px"}}>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"/>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/" style={{color: "black"}}><i class="fas fa-sign-out-alt">Logout</i></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        {/* </div> */}
                    </Row>
                    <Row>
                        <Col >
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
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
