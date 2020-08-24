/* eslint-disable jsx-a11y/heading-has-content */
import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap';

var jenis_user = '';

export default class modalTambahUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false
        }
    }

    componentDidUpdate(){
        jenis_user = this.props.jenisUser;
    }

    insertUser(){
        let nama = document.getElementById('nama').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        fetch('https://cors-anywhere.herokuapp.com/https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/user/', {
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "nama": nama,
                "username": username,
                "password": password,
                "jenis_user": jenis_user
            })
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res.message);
                document.getElementById('nama').value = '';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                alert(res.message);
            })
            .catch((error) => {
                console.error(error);
            }); 
    }

    render() {
        return (
            <div> 
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ width: '1000px', marginLeft: '125px'}}
                    className="w3-display-center"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h2>
                                {this.props.jenisUser === 1? "Form Tambah Admin" : "Form Tambah Kader"}
                            </h2>
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label for="nama">Nama:</label>
                            <input type="text" id="nama" className="form-control" name="nama" placeholder="Nama..." ></input><br/>
                            <label for="username">Username:</label>
                            <input type="text" id="username" className="form-control" name="username" placeholder="Username..." ></input><br />
                            <label for="password">Password:</label>
                            <input type="password" id="password" className="form-control" name="password" placeholder="Password..."></input><br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.insertUser}>Tambah User</Button>
                        <Button onClick={this.props.onHide} style={{backgroundColor: "red"}}>Batal</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
